import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Gemini from '../assets/Google_Gemini_logo.svg.png'
const AIadvice = () => {
    const [loading,setLoading] = useState(false)
    const [flag,setFlag] = useState(false)
    const [advice,setAdvice] = useState();
    const getAIadvice =async()=>{

        try{
            setLoading(true);
            let token = JSON.parse(localStorage.getItem("Token"));
            const response= await axios.get(`${import.meta.env.VITE_URL}/AIadvice`,{headers: {
                Authorization: `Bearer ${token}`,
            }})
            // console.log(response.data)
            setAdvice(response.data)   
            setFlag(true);
            setLoading(false);
        }
        catch(err){
            console.log(err)
        }
    }
    if(loading){
        return(
            <div >
                generating Advice
            </div>
        )
    }
  return (
    <div className='p-2 text-white bg-zinc-900 h-full rounded-xl'>
        {!flag &&
            <div>
                <button onClick={getAIadvice} className='bg-zinc-700 px-4 py-2 rounded'>Advice</button>
            </div>
        }
        {flag && <div className="content p-4">
            {advice}
        </div>}
        <div className='p-4 w-2/4 flex justify-end boder'>
            <img src={Gemini} alt="" />
        </div>
    </div>
  )
}

export default AIadvice