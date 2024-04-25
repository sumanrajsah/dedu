"use client"
import { createContext, useEffect, useState } from "react";
import { authSubscribe,type User,initJuno,signIn, signOut,setDoc,getDoc, listDocs,uploadFile } from "@junobuild/core";
import './globals.css';
import PropTypes from "prop-types";
import { user } from "./components/create/components/interface";
import { nanoid } from "nanoid";



export const AuthContext = createContext();

export const Auth = ({ children }:any) => {
  const [user, setUser] = useState(undefined);
  const [username,setUsername] = useState('');
  const [available,setAvailable] =useState(true);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading,setLoading]=useState(false);

  useEffect(() => {
    const sub = authSubscribe((user: User | null) => setUser(user));

    // setUser(sub);
    return () => sub();
  }, []);

  async function handleSignIn(){
    let result;
    setLoading(true);
    if(available){
     result = await uploadFile({
      data:image,
      collection: "assets",
      token: nanoid()
    });
    console.log(result)
  }
    checkUsername();
    try{
      const sign=  await signIn();
      console.log(sign);
      authSubscribe((user: User | null) => setUser(user));
      if(available){
        const data:user= {username:username,like_list:[],repost_list:[],post_list:[],image_url:`${result.downloadUrl}`};
        const key = nanoid();
        const doc=await setDoc<user>({
          collection: "users",
          doc: {
            key,
            data: data
          }
        });
        console.log(doc)

      }
    }
    catch(error){
      console.log(error);
    }
  }

  async function handleSignOut(){
    try{
   const l= await signOut();
   const sub = authSubscribe((user: User | null) => setUser(user));

   // setUser(sub);
   return () => sub();
   
    }
    catch(error){
      console.log(error);
    }
  }

async function checkUsername() {
  authSubscribe((user: User | null) => setUser(user));
  try{
    const myDoc = await listDocs({
      collection: "users",
      filter:{
        owner:user,
      }
    });
    console.log(myDoc);
    if(myDoc.items_length){
    setAvailable(false)
    }
  }
  catch(error){
    console.log(error);
  }
}
useEffect(()=>{
checkUsername();
  },[username])
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

console.log(username)
  return (
    <>
    <AuthContext.Provider value={{ user }}>
      {user !== undefined && user !== null ? (
        <div className="home">
          {children}

         <button className="signout-button" onClick={handleSignOut}>signOut</button>
        </div>
      ) : (<div className="home">
       {(username.length>=3 && available && image) && <img src={previewImage as string} alt='Preview' className="image-auth"  />}
        {(username.length>=3 && available) && <input  type='file' accept='image/*' onChange={handleFileChange} />}
        {(username.length>=3 && !available) && <label>Username</label>}
        <input id="username" placeholder="enter here" required onChange={(e)=>setUsername(e.target.value)}/>
        <br/>
      {(username.length>=3 && !available) && <button className="signin-button" onClick={()=>handleSignIn()}>{(!isLoading) ?'SignIn':'wait...'}</button>}
      {(username.length>=3 && available && image) && <button className="signin-button" onClick={()=>handleSignIn()}> {(!isLoading) ?'create':'wait...'}</button>}
        </div>
      )}
    </AuthContext.Provider>
    </>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};