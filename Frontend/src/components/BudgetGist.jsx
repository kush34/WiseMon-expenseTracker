import React,{useState,useEffect,useContext} from 'react'
import {ThemeContext, ThemeProvider} from '../context/Theme'
import { IoSaveOutline } from 'react-icons/io5';

const BudgetGist = ({Data,user}) => {
  const {theme} = useContext(ThemeContext);
  const [spending, setSpending] = useState()
  const [saving, setSaving] = useState()
  const [userData, setUserData] = useState(user)
  const calculateSpending = ()=>{
    let Total = 0;
    Data.map((expense)=>{
        Total += expense.amount
        console.log(spending)

    })
    setSpending(Total);
    let saving = userData.budget-Total;
    setSaving(saving)
  }
  
  useEffect(()=>{
    calculateSpending();
  })
  useEffect(() => {
}, [Data])
useEffect(() => {
}, [user])
  
  return (
    <div
    className={`${theme ? 'bg-zinc-100' : 'bg-zinc-900'} ${theme ? 'text-zinc-400' : 'text-zinc-500'} h-full rounded-xl`}
    >
        <div className="head text-xl font-medium flex justify-end p-4">
            Summary
        </div>
        <div className="list">
            <div className="spending flex justify-between p-4">
                <div className="title">
                    Spending
                </div>
                <div className="amount">
                    {spending}
                </div>
            </div>
            <div className="budget flex justify-between p-4">
                <div className="title">
                    Budget
                </div>
                <div className="amount ">
                    {userData.budget}
                </div>
            </div>
            <div className="saving flex justify-between p-4 text-green-700">
                <div className="title font-medium">
                    Saving
                </div>
                <div className="amount font-medium ">
                    {saving}
                </div>
            </div>
        </div>
    </div>
  )
}

export default BudgetGist