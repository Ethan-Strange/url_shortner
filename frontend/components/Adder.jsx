import axios from 'axios';
import React, { useState } from 'react'
import { useUrls } from '../context/urlContext';


function Adder() {
    const [url,setUrl] = useState("");
    const [shortId,setShortId] = useState("");
    const {allUrls,setAllUrls} = useUrls();
    const callAddApi = async()=>{
        if(!url) return;
        const res = await axios.post(import.meta.env.VITE_API_URL,{
            url_name:url
        })
        setShortId(res.data.new_url.short_url)
        setAllUrls([res.data.new_url,...allUrls])
        console.log(allUrls)
        // console.log(res)
        setUrl("")
    }
  return (
    <div className='flex p-3 justify-center items-center bg-black text-white flex-col'>
        <div className='flex items-center justify-center gap-3'>
            <input type="text"
            placeholder='Enter url to shorten'
            value={url}
            onChange={(e)=>{setUrl(e.target.value)}}
            className='w-2xl p-1 border-1 outline-0'
            />
            <button className='border-2 rounded-xl p-1'
            onClick={()=>{callAddApi()}}
            >Generate
            </button>
        </div>
        {shortId && 
            <div className='p-4'>
                Short url: 
                <a className="ml-1" target='_blank' href={`http://localhost:8080/api/${shortId}`}>
                http://localhost:8080/api/{shortId}
                </a>
            </div>
        }

    </div>
  )
}

export default Adder