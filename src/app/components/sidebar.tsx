"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import './style.css';
import { authSubscribe,type User,initJuno,signIn, signOut } from "@junobuild/core";
import { useRouter } from "next/navigation";

export default function SideBar(){
const router = useRouter();
function navigate(){
    router.push('/posts');
}
function home(){
    router.push('/');
}
    return(
        <div className="sidebar-body">
            <div className="menu-button-bar">
            <p onClick={home}>Home</p>
            <p>Explore</p>
            <p onClick={navigate}>Posts</p>
            <Link href={'?create=true'} className="create" > <button>Create</button></Link>
            </div>
        </div>
    );
}