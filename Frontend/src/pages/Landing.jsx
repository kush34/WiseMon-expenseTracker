import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Chart from "../components/Chart"
import ExpenseList from '../components/ExpenseList'
import Amount from "../components/Amount"
import Operation from "../components/Operation"
import Profile from "../components/Profile"
import { ThemeContext } from '../context/Theme.jsx' 
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const Landing = () => {
    const navigate = useNavigate();
    const [expenseData,setExpenseData] = useState([]);
    const { theme } = useContext(ThemeContext);

    const getExpenseData = ()=>{
        let token = JSON.parse(localStorage.getItem("Token"));
        if(!token){
            navigate('/')
        }
        axios.get(`${import.meta.env.VITE_URL}/getExpenseData`, 
          {headers: {
          Authorization: `Bearer ${token}`,
          }})
        .then((res)=>{
        //   console.log(res);
          setExpenseData(res.data)
        })
    }
    useEffect(()=>{
        getExpenseData();
    },[])
  return (
    <div className={`flex flex-wrap ${theme ? "bg-zinc-300":"bg-black"}`}>
        <div className="left h-3/4  w-full xl:w-3/4  md:h-screen">
            <div className="p-2 h-3/4  xl:h-2/3 Left-up drop-shadow-3xl">
                <Chart Data={expenseData}/>
            </div>
            <div className="p-2  h-1/4 xl:h-1/3 Left-Down drop-shadow-3xl">
                <ExpenseList Data={expenseData}/>
            </div>
        </div>
        <div className="right w-full xl:w-1/4 h-screen">
            <div className="1 p-2 h-2/5 drop-shadow-3xl">
                <Amount Data={expenseData}/>
            </div>
            <div className="2 p-2 h-2/5 drop-shadow-3xl">
                <Operation Data={expenseData}/>
            </div>
            <div className="3 p-2 h-1/5 drop-shadow-3xl">
                <Profile/>
            </div>
        </div>
    </div>
  )
}

export default Landing