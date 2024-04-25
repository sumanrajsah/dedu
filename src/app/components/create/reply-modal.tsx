'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState,useEffect,useRef } from "react";
import { uploadFile,setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";

import Link from "next/link";
import './modal.css'
import { useRouter,useSearchParams } from "next/navigation";
import {UploadComponents} from "./components/uploadComp";

type Reply = {
  media_url: string;
  content:string;
  tags:string[];
  post_type:string;
  post_id:string;
};



export default function ReplyModal() {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('comment');
    const postId = searchParams.get('id');
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [posting,setPosting] =useState(false);
    const [content, setContent] = useState('');
    const [success, setSuccess] = useState(false);
    const [text, setText] = useState<string>('');
    const [tag, setTag] = useState<string[]>([]);
    const [audio, setAudio] = useState<string | ArrayBuffer | null>(null);
    const [gif, setGif] = useState<File | null>(null);
    const [previewGif, setPreviewGif] = useState<string | ArrayBuffer | null>(null);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const [image, setImage] = useState<File | null>(null);
    


    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      console.log('Input value:', event.target.value);
      setText(event.target.value);
      const inputValue = event.target.value;
      let tagsArray = inputValue
        .split(/[\s\n]+/)
        .filter(word => word.startsWith('#') && word.trim() !== '#')
        .map(tag => tag.trim());
        
        const lastCharacter = inputValue[inputValue.length - 1];
        if (lastCharacter === '#' || lastCharacter === ' ' || lastCharacter === '\n') {
          tagsArray = tagsArray.slice(0, 5);
        }
      

      console.log('tags array:', tagsArray);
      setTag(tagsArray);
      // You can do something with the input value here
    };

    
    
  
    const handleFileChange = (files: FileList | null) => {
      const file = files?.[0];
      if (file) {
        
          setImage(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);

      }
    };
    
    // Function to handle gif file change
    const handleGifChange = (files: FileList | null) => {
      const file = files?.[0];
      if (file) {
        setGif(file)
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewGif(reader.result);
          setImage(null);
          setAudio(null);
        };
        reader.readAsDataURL(file);
      }
    };
    
    // Function to handle audio file change
    
  

    const [createPost,setCreatePost] = useState(false);
    const togglePost = () => {
      setCreatePost(!createPost);
      setImage(null);
      setGif(null);
      setText('');
      setAudio(null);
    };

    const handlePost = async (e:any) => {
      let result,post;
      setPosting(true);
      if (postId === null) {
        throw new Error("postId should not be null");
      }
try{
  if(image){
   result = await uploadFile({
    data:image,
    collection: "files",
    token: nanoid()
  });
  console.log(result)
 post = {
    media_url:`${result?.downloadUrl}`,
    post_type:'image',
    tags:tag,
    content:text,
    post_id:postId
    };

}
else if(gif){
   result = await uploadFile({
    data:gif,
    collection: "assets",
    token: nanoid()
  });
  console.log(result)
 post= {
    media_url:`${result?.downloadUrl}`,
    post_type:'gif',
    tags:tag,
    content:text,
    post_id:postId
    };
}
else{
  post= {
    media_url:``,
    post_type:'text',
    tags:tag,
    content:text,
    post_id:postId,
    };
}



const key = nanoid();
const doc=await setDoc<Reply>({
  collection: "reply",
  doc: {
    key,
    data: post
  }
});
console.log(doc);
setPosting(false);
setSuccess(true)
if(success){
  router.push('/');
}
}catch(error){
  console.log(error);
  setPosting(false)
}
    }

    const closeModal = useRef<HTMLDivElement>(null);

useEffect(() => {
  // Function to close the post dropdown when clicking outside of it
  function handleClickOutside(event: MouseEvent) {
    if (closeModal.current && !closeModal.current.contains(event.target as Node)) {
      router.push('/');
    }
  }

  // Add event listener when component mounts
  document.addEventListener("mousedown", handleClickOutside);

  // Cleanup event listener when component unmounts
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
     <> 
   {(searchTerm == 'true') && <main className="modal-body"  >
        <div className="modal-cont" ref={closeModal}>
         {!createPost &&   <div className="create-cont" >
                <button className="create-post" onClick={togglePost}>Post</button>
                <button className="create-post-nft">NFT Post</button>
            </div>}

          {createPost &&  <div className="creating-post" >
          <div className="input-field"> <textarea id="feed"  className={`customInput ${isFocused || content.trim() !== '' ? 'focused' : ''}`}
           onFocus={handleFocus}
           onBlur={handleBlur}
           onChange={handleInputChange}
           placeholder="welcome"
          ></textarea><br/>
                
        {image && <div className="preview-image"> <img src={previewImage as string} alt='Preview'  /></div> }
        {gif&& <div className="preview-image"> <img src={previewGif as string} alt='Preview'  /></div> }

          </div>
          <hr className="hr"/>
          <div className="upload-buttons">
            <UploadComponents onImageUpload={handleFileChange} onGifUpload={handleGifChange}/>
          <button className="post-button" onClick={handlePost} disabled={posting}>{(posting)?'Loading...':'Post'}</button>
          </div>
            </div>}
            
            <Link href={'?'} > <button className="close-modal" onClick={togglePost} ><span>&times;</span></button></Link>
        </div>
       {success && <h3 className="success-m" >Successfully posted</h3>}

    </main>}
    </>
  );
}
