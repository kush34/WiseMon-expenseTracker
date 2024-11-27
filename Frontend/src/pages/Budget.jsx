import React,{useState,useEffect,useContext} from 'react'
import {ThemeContext, ThemeProvider} from '../context/Theme'
import BudgetChart from '../components/BudgetChart'
import SummarySection from '../components/SummarySection'
import BudgetGist from '../components/BudgetGist'
import Profile from '../components/Profile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AIadvice from '../components/AIadvice'
const Budget = () => {
  const {theme} = useContext(ThemeContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [expenseData,setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getExpenseData = async ()=>{
    try{

      let token = JSON.parse(localStorage.getItem("Token"));
      if(!token){
          navigate('/')
      }
      await axios.get(`${import.meta.env.VITE_URL}/getExpenseData`, 
        {headers: {
        Authorization: `Bearer ${token}`,
        }})
      .then((res)=>{
      //   console.log(res);
        setExpenseData(res.data)
      })
    }catch(err){
      console.log(err.message)
    }
  }
  const getUserData =async ()=>{
    try{
        let token = JSON.parse(localStorage.getItem("Token"));
            // console.log(token);
        await axios.get(`${import.meta.env.VITE_URL}/getUserData`,
          {headers: {
            Authorization: `Bearer ${token}`,
          }},)
        .then((res)=>{
            // console.log(res);
            setUser(res.data);
      })
    }
    catch(err){
      console.log(err.message)
    }
}
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getExpenseData(), getUserData()]);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user || expenseData.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-500">
        No data available
      </div>
    );
  }
  return (
    <div className={`${theme ? 'bg-zinc-400' : 'bg-black'} ${theme ? 'text-zinc-400' : 'text-zinc-500'} flex w-full h-screen`}>
      <div className="left w-3/4 ">
        <div className="chartsection h-3/4 p-2">
          <BudgetChart Data = {expenseData} user={user}/>
        </div>
        <div className="summarysection h-1/4 p-2">
          <SummarySection/>
        </div>
      </div>
      <div className="right w-1/4">
        <div className="budget h-2/5 p-2">
          <BudgetGist Data={expenseData} user={user}/>
        </div>
        <div className="profile p-2">
          <Profile/>
        </div>
        <div className="AIadvice p-2 h-2/6">
          <AIadvice/>
        </div>
        <div className='p-4'>
          <button onClick={()=>navigate('/home')} className='text-white bg-green-700 rounded px-8 py-2 hover:bg-green-600 ease-out duration-50'>Back</button>
        </div>
      </div>
    </div>
  )
}

export default Budget