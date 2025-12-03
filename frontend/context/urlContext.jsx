import axios from "axios";
import { createContext, useContext, useState } from "react";

const urlContext = createContext([])

export const UrlProvider = ({children})=>{
    const [allUrls,setAllUrls] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const callGetAllUrlsApi = ()=>{
        axios(import.meta.env.VITE_API_URL)
            .then((res)=>{
                setAllUrls(res.data.allUrls)
                setIsLoading(false)

            })
            .catch((err) => {
                console.error("Failed to fetch URLs:", err);
                setIsLoading(false);
            });
       
    }
    return(
        <urlContext.Provider value={{allUrls,setAllUrls,callGetAllUrlsApi,isLoading}}>
            {children}
        </urlContext.Provider>
    )
}

export const useUrls = ()=>{
    return useContext(urlContext)
}