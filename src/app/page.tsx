"use client"
import Image from "next/image";
import React,{useEffect} from "react";
import { signIn } from "@junobuild/core";
import { initJuno,authSubscribe } from "@junobuild/core";
import { setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";
import './globals.css'
import { Auth } from "./auth";
import SideBar from "./components/sidebar";
import CreateModal from "./components/create/create-modal";
import Posts from "./components/posts";
import ReplyModal from "./components/create/reply-modal";



export default function Home() {

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
      <Auth>
       <SideBar/>
       <Posts/>
       <CreateModal/>
      <ReplyModal/>
      </Auth>
    </main>
  );
}
