"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import './style.css';
import { authSubscribe,type User,initJuno,signIn, signOut,setDoc,getDoc, listDocs } from "@junobuild/core";
import { Likes,Liked,Share,Comment,Repost } from "./svg";
export default function PostBox({post}:any){
const [username,setUsername]=useState('');
const [image,setImage]=useState('');
const [user, setUser] = useState<User | null>(null);
const [likes,setLikes]=useState('');
const [repost,setRepost] =useState('');
const [isLiked, setIsLiked] = useState(false);
const [isRespoted, setIsReposted] = useState(false);
// console.log(post.key);
useEffect(()=>{
  async function handleGet(){
    authSubscribe((user: User | null) => setUser(user));
  try{
      const myList = await listDocs({
          collection: "users",
          filter: {
            owner:user
          }
        });

        setUsername(myList.items[0].data?.username)
        setImage(myList.items[0].data?.image_url)
        console.log(myList.items[0].data?.username)
  }catch(error){
      console.log(error)
  }
}
handleGet();
},[])

const actionPost = async (action:string)=>{}
    return(
        <div className="postbox-body">
          {(post.data.post_type === 'image') &&
<div className="post-body" >
    <div className="post-profile">
      <Image className="p-image" src={image} height={50} width={50} alt='he'/>
<p>{username}</p>
</div>
<div className="post-content">
{post.data.content && (
  <pre className="para" onClick={(e) => e.stopPropagation()}>
    {post.data.content.split(/(#[^\s#]+|\S+\.genx)/).map((part:any, index:any) => {
      if (part.startsWith('#')) {
        const hashtag = part.slice(1); // Remove the '#' symbol
        return (
          <Link key={index} href={`/hashtags/${hashtag}`} onClick={(e) => e.stopPropagation()}>
            <span className="tagged">{part}</span>
          </Link>
        );
      } else if (part.includes('.genx')) {
        return (
          <span key={index}>
            <Link href={`/${part}`} onClick={(e) => e.stopPropagation()} className="tagged">{part}</Link>
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    })}

  </pre>
)}

</div>
  <div className="view-image" onClick={(e) => e.stopPropagation()}>  <Image alt='genx' className="img" src={post.data.media_url} height={1000} width={1000} /> </div>
  </div>
}
          {(post.data.post_type === 'gif') &&
<div className="post-body" >
<div className="post-profile">
<Image className="p-image" src={image} height={50} width={50} alt='he'/>
<p>{username}</p>
</div>
<div className="post-content">
{post.data.content && (
  <pre className="para" onClick={(e) => e.stopPropagation()}>
    {post.data.content.split(/(#[^\s#]+|\S+\.genx)/).map((part:any, index:any) => {
      if (part.startsWith('#')) {
        const hashtag = part.slice(1); // Remove the '#' symbol
        return (
          <Link key={index} href={`/hashtags/${hashtag}`} onClick={(e) => e.stopPropagation()}>
            <span className="tagged">{part}</span>
          </Link>
        );
      } else if (part.includes('.genx')) {
        return (
          <span key={index}>
            <Link href={`/${part}`} onClick={(e) => e.stopPropagation()} className="tagged">{part}</Link>
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    })}

  </pre>
)}

</div>
  <div className="view-image" onClick={(e) => e.stopPropagation()}>  <Image alt='genx' className="img" src={post.data.media_url} height={1000} width={1000} /> </div>
  </div>
}
          {(post.data.post_type === 'text') &&
<div className="post-body" >
<div className="post-profile">
<Image className="p-image" src={image} height={50} width={50} alt='he'/>
<p>{username}</p>
</div>
<div className="post-content">
{post.data.content && (
  <pre className="para" onClick={(e) => e.stopPropagation()}>
    {post.data.content.split(/(#[^\s#]+|\S+\.genx)/).map((part:any, index:any) => {
      if (part.startsWith('#')) {
        const hashtag = part.slice(1); // Remove the '#' symbol
        return (
          <Link key={index} href={`/hashtags/${hashtag}`} onClick={(e) => e.stopPropagation()}>
            <span className="tagged">{part}</span>
          </Link>
        );
      } else if (part.includes('.genx')) {
        return (
          <span key={index}>
            <Link href={`/${part}`} onClick={(e) => e.stopPropagation()} className="tagged">{part}</Link>
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    })}

  </pre>
)}

</div>
  </div>
}
<br/>
<div className="action-bar">
  <div className="action-bar-svg" title="reply">
  <Link href={`?comment=true&to=${username}&id=${post.key}` } className="comment-svg"> <div className="comment-svg">
<Comment/> 
 <p> {typeof post.data.reply_list.length === 'number' && post.data.reply_list.length > 999 ? ((post.data.reply_list.length as number) / 1000).toFixed(1) + 'k' : post.data.reply_list.length.toString()}</p>
 </div> </Link> 
</div> 
<div className="action-bar-svg" title="repost">
  <div className={`repost-svg ${isRespoted ? 'reposted' : ''}`} onClick={() => actionPost('repost')}>
  <Repost/>
 <p> {repost}</p>
  </div>
</div> 
<div className="action-bar-svg" title="like">
{(isLiked)  ? <div className="liked-svg"onClick={() => actionPost('like')}>
<Liked/> 
 <p> {likes}</p>
  </div> : <div className="like-svg" onClick={() => actionPost('like')}>
<Likes/> 
 <p> {typeof post.data.like_list.length === 'number' && post.data.like_list.length > 999 ? ((post.data.like_list.length as number) / 1000).toFixed(1) + 'k' : post.data.like_list.length.toString()}</p>
  </div>}

</div> 
<div className="action-bar-svg" title="share">
<div className="share-svg">
<Share/>
</div>
</div> 
</div>
        </div>
    );
}