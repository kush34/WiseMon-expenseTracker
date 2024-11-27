import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { ThemeContext } from '../context/Theme.jsx' 
import { useContext } from 'react'
const AddExpense = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleAddExpense = async()=>{
        // console.log(description,amount,category);
        let token = JSON.parse(localStorage.getItem("Token"));
        // console.log(token);
        await axios.post(`${import.meta.env.VITE_URL}/newExpense`,{
            description,
            amount,
            category
        },{headers: {
            Authorization: `Bearer ${token}`,
          }},)
        .then((res)=>{
            // console.log(res);
            if(res.status == 200){
                navigate("/home")
            }
        })
    }
  return (
    <div>
        <div className={`main w-full h-screen ${theme?"bg-zinc-100":"bg-zinc-900"} border-2 border-black font-customFont flex flex-col justify-center items-center`}>
            <div className="title text-2xl font-semibold text-green-700">
                Add Expense
            </div>
            <div className="title-pata text-zinc-500">
                maintain record of your spend
            </div>
            <div className="input-fielf flex flex-col items-center justify-center">
                <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="block m-2 bg-zinc-300 rounded-xl px-8 py-2 text-black outline-none placeholder-zinc-500"
                placeholder="Description"
                />
                <input
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                className="block m-2 bg-zinc-300 rounded-xl px-8 py-2 text-black outline-none placeholder-zinc-500"
                placeholder="Amount"
                />
                <select 
                className='m-2 px-24 py-2 bg-zinc-300 text-zinc-500 rounded-xl' 
                id="category"
                onChange={(e)=>setCategory(e.target.value)}
                value={category}
                >
                    <option value="grocery">Grocey</option>
                    <option value="fuel">Fuel</option>
                    <option value="rent">Rent</option>
                    <option value="snacks">Snacks</option>
                </select>
                <div className='m-2'>
                    <button onClick={handleAddExpense} className='bg-green-600 px-24 py-2 text-white font-medium rounded-xl'>Add</button>
                </div>
                <div className='m-2'>
                    <button onClick={()=>navigate("/home")} className='bg-blue-600 px-24 py-2 text-white font-medium rounded-xl'>Back</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default AddExpense