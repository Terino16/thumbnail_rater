"use client"
import {useState} from "react"
import {UserButton,SignInButton,SignOutButton,useSession }from "@clerk/nextjs"
import {useMutation,useQuery} from "convex/react"
import { api } from "../../convex/_generated/api"




export default function Home() {
  const [text,setText]=useState("");
  const {isSignedIn}=useSession();
  const createThumbNail=useMutation(api.thumbnails.createThumbNail)
  const getThumbNail=useQuery(api.thumbnails.getThumbNail)
  
  const HandleSubmit=async (e:React.FormEvent)=>{
    e.preventDefault();
    await createThumbNail({title:text})
    setText("");
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
{isSignedIn? <SignOutButton/>:<SignInButton/>}
{isSignedIn&& (
  <div>
    <form onSubmit={HandleSubmit}>
      <input value={text} onChange={(e)=>{setText(e.target.value)}} className="p-2 bg-transparent text-white rounded-sm border-[1px] border-gray-300"/>
      <button type="submit" className="p-2 bg-red-500">Submit</button>
    </form>

    {getThumbNail?.map(thumbnail=>{return(<div key={thumbnail._id}>{thumbnail.title}</div>)})}
  </div>
)}


    </main>
  );
}
