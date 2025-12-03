import React, { useState } from 'react'
import { useUrls } from '../context/urlContext';
import axios from 'axios';

function Row({children}) {
    const {_id,url_name,short_url} = children;
    const [orginalUrl,setOriginalUrl] = useState(url_name)
    const [isEditing,setIsEditing] = useState(false);
    const {allUrls,setAllUrls} = useUrls();

    const onDelete = ()=>{
        axios.delete(import.meta.env.VITE_API_URL,{data:{id:_id}})
        .then((res)=>{
            // console.log(res.data)
            if(res.data.success){
                setAllUrls(allUrls.filter((item)=>(item._id != _id)))
            }
        })
        .catch((err)=>{
            // console.log("this")
            console.log(err)
        })
    }


   

    const callEditApi = ()=>{
        axios.put(import.meta.env.VITE_API_URL,{id:_id,url_name:orginalUrl})
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log("onEdit error")
            console.log(err)
        })

    }
     const onEdit = ()=>{
        let newState = !isEditing
        setIsEditing(newState)
        if(url_name === orginalUrl) return
        callEditApi();
    }
    // console.log(children)
  return (
    <>
    <div className='grid grid-cols-3 justify-center items-center m-2 '>
        <input
        value={orginalUrl}
        onChange={(e)=>{setOriginalUrl(e.target.value)}}
        disabled={!isEditing}
        className={`p-1 outline-0 ${isEditing ? "outline-2":""}`}
        />
        <div className='flex justify-center items-center'>{short_url}</div>
        <div className='flex justify-center  items-center gap-4'>
            <button 
            className='border-1 p-1 rounded bg-green-400 hover:bg-green-600'
            onClick={()=>{onEdit()}}
            >
                {!isEditing?"Edit":"Done"}
            </button>
            <button 
            className='border-1 p-1 rounded bg-red-400 hover:bg-red-600'
            onClick={()=>{onDelete()}}
            >Delete
            </button>
        </div>
    </div>
    <hr />
    </>
  )
}

export default Row