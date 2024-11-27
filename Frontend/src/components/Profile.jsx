import React,{useEffect,useState} from 'react'
import Pfp from "../assets/pfp.png"
import { ThemeContext } from '../context/Theme.jsx' 
import { useContext } from 'react'
import { IoCloudyNight } from "react-icons/io5";
import axios from 'axios'
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const navigate = useNavigate();
  const [user,setUser]=useState();
  // const getUserData =async ()=>{
  //   let token = JSON.parse(localStorage.getItem("Token"));
  //       // console.log(token);
  //   await axios.get(`${import.meta.env.VITE_URL}/getUserData`,
  //     {headers: {
  //       Authorization: `Bearer ${token}`,
  //     }},)
  //   .then((res)=>{
  //       // console.log(res);
  //       setUser(res.data);
  //   })
  // }
  const logOut = ()=>{
    localStorage.clear();
    navigate("/")
  }
  // useEffect(()=>{
  //   getUserData();
  // },[])
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`flex justify-center items-center rounded-xl ${theme?"bg-zinc-100":"bg-zinc-900"} ${theme?"text-zinc-500":"text-zinc-100"} h-full`}>
      <div className='flex justify-center items-center'>
        <div className='hover:scale-105 ease-out duration-100'>
          <img src={Pfp} alt="" className='w-12 h-12 rounded-full' />
        </div>
        <div className="Name p-4 font-medium text-2xl text-green-500">
          WiseMon
        </div>
        <div className="header-toggle-buttons">
        <button className='bg-zinc-600 px-4 py-2 rounded-full text-white hover:bg-green-500 duration-100 ease-out hover:scale-105' onClick={() => toggleTheme()}><IoCloudyNight />
        </button>
        <button onClick={logOut} className='m-2 bg-zinc-600 px-4 py-2 rounded-full text-white hover:bg-red-600 duration-100 ease-out hover:scale-105'><LuLogOut />
        </button>
      </div>
      </div>
      </div>
  )
}

export default Profile