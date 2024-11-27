import React, { useContext, useEffect,useState } from 'react'
import { ThemeContext} from '../context/Theme'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
const Edit = () => {
    const navigate = useNavigate();
    const {theme} = useContext(ThemeContext)
    const {id} = useParams()
    const [expenseData,setExpenseData] = useState();
    //gets expense data to show on the page
    const getExpenseData = async ()=>{
        try{
            let token = JSON.parse(localStorage.getItem("Token"));
            if(!token){
                navigate('/')
            }
            const response = await axios.get(`${import.meta.env.VITE_URL}/getExpenseData/${id}`, {headers: {
                Authorization: `Bearer ${token}`,
                }}
            );
            // console.log(response)
            setExpenseData(response.data)
        }
        catch(err){
            console.log(err)
        }
    }
    //posts the data to update it on DB
    const handlePost = async()=>{
        try{
            let token = JSON.parse(localStorage.getItem("Token"));
            if(!token){
                navigate('/')
            }
            const response = await axios.post(`${import.meta.env.VITE_URL}/updateExpenseData/${id}`,{expenseData},{headers: {
                Authorization: `Bearer ${token}`,
                }}
            );
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
    }
    //handles changes on input field and updates states
    const handleInputChange = (e,field) => {
        const { value } = e.target;
        setExpenseData((prev) => ({
          ...prev,
          [field]: value,
        }));
        console.log(expenseData);
      };
    //Cancel btn: navigates user to home page
    const handleCancel = ()=>{
        navigate('/home')
    }
    //Delete btn: places delete request on backend  
    const handleDelete = async() =>{
        try{
            let token = JSON.parse(localStorage.getItem("Token"));
            if(!token){
                navigate('/')
            }
            const response = await axios.post(`${import.meta.env.VITE_URL}/deleteExpenseData/${id}`,{},{headers: {
                Authorization: `Bearer ${token}`,
                }}
            );
            if(response.status == 200){
                navigate("/home")
            }
            // if(response)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getExpenseData();
    },[])
    useEffect(()=>{

    },[expenseData])
    if(!expenseData) return(<div>Something went wrong</div>)
  return (
    <div className={`${theme ? "bg-zinc-100":"bg-black"} ${theme ? "text-black":"text-white"} flex justify-center items-center w-full h-screen `}>
        <div className="Display flex flex-col flex-wrap gap-5 justify-center items-center">
            <div className='flex justify-center flex-col'>
                <div className="title  font-medium text-2xl text-green-600">
                    Expense Data
                </div>
                <div className="p text-sm text-zinc-500">
                    changes in expense
                </div>
            </div>
            <input type="text" onChange={(e)=>handleInputChange(e,"description")} className={`${theme ? "bg-zinc-300":"bg-zinc-900"} rounded-xl px-4 py-2`} defaultValue={expenseData.description} name="" id="" />
            <input type="text" onChange={(e)=>handleInputChange(e,"amount")} className={`${theme ? "bg-zinc-300":"bg-zinc-900"} rounded-xl px-4 py-2`} defaultValue={expenseData.amount} name="" id="" />
            <input type="text" onChange={(e)=>handleInputChange(e,"category")} className={`${theme ? "bg-zinc-300":"bg-zinc-900"} rounded-xl px-4 py-2`} defaultValue={expenseData.category} name="" id="" />
            <div className="actionc">
                <button onClick={handlePost} className={`${theme ? "bg-zinc-300":"bg-zinc-900"} px-4 py-2 rounded m-2 hover:bg-blue-600 duration-100 ease-out hover:scale-105`}>Update</button>
                <button onClick={handleDelete} className={`${theme ? "bg-zinc-300":"bg-zinc-900"} px-4 py-2 rounded m-2 hover:bg-red-600 duration-100 ease-out hover:scale-105`}>Delete</button>
                <button onClick={handleCancel} className={`${theme ? "bg-zinc-300":"bg-zinc-900"} px-4 py-2 rounded m-2 hover:bg-zinc-600 duration-100 ease-out hover:scale-105`}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Edit