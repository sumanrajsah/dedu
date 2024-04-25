"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import './style.css';
import { listDocs,Doc,initJuno } from "@junobuild/core";
import PostBox from "./postBox";

export default function Posts(){
const [datas,setData]=useState<Doc<unknown>[]>([]);
useEffect(() => {
    
  (async () => {
    try {
      await initJuno({
        satelliteId: "xdlzc-taaaa-aaaal-ajaqq-cai",
      });
    } catch (error) {
      console.error('Error initializing Juno:', error);
    }
  })();
}, []);
useEffect(()=>{
        async function handleGet(){
        try{
            const myList = await listDocs({
                collection: "posts",
                filter: {
                  order: {
                    desc: true,
                    field: "updated_at"
                  }
                }
              });

              setData(myList.items)
              console.log(myList.items[0])
        }catch(error){
            console.log(error)
        }
    }

        handleGet();
    },[])

    return(
        <div className="posts-body">
           {datas.map((data:Doc<unknown>,index) => (
         <PostBox key={index} post={data}/>
        ))}
        </div>
    );
}