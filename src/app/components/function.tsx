"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import './style.css';
import { listDocs,Doc } from "@junobuild/core";
import PostBox from "./postBox";

export function getName(){
const [datas,setData]=useState<Doc<unknown>[]>([]);

        async function handleGet(){
        try{
            const myList = await listDocs({
                collection: "users",
                filter: {
                  order: {
                    desc: true,
                    field: "keys"
                  }
                }
              });

              setData(myList.items)
              console.log(myList.items[0])
        }catch(error){
            console.log(error)
        }
    }


    return(
        <div>

        </div>
    );
}