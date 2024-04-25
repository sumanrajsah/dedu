"use client"
import Image from "next/image";
import React,{useEffect} from "react";
import '../globals.css'
import { authSubscribe,type User,initJuno,signIn, signOut,setDoc,getDoc, listDocs,uploadFile } from "@junobuild/core";
import SideBar from "../components/sidebar";
import CreateModal from "../components/create/create-modal";
import Posts from "../components/posts";
import ReplyModal from "../components/create/reply-modal";



export default function Post() {

  
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
  return (
    <main className="home" >
       <SideBar/>
       <Posts/>
       <CreateModal/>
      <ReplyModal/>
    </main>
  );
}
