import React,{useState,useEffect,useContext} from 'react'
import {ThemeContext, ThemeProvider} from '../context/Theme'
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import BudgetGist from './BudgetGist';

const BudgetChart = ({Data,user}) => {
  const [saving, setSaving] = useState(15000)
  const [spending, setSpending] = useState(15000)
  const [budget, setBudget]= useState(30000)

  const calculateSpending = ()=>{
    let Total = 0;
    Data.map((expense)=>{
        Total += expense.amount
        console.log(spending)

    })
    setSpending(Total);
    let saving = user.budget-Total;
    setSaving(saving)
  }
  useEffect(()=>{
    calculateSpending();
  },[])
  const data = {
    labels: ['spending', 'saving'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [ spending, saving],
        backgroundColor: [
          // '#0682b8', 
          '#ff0905', 
          '#00ff2a', 
        ],
        hoverBackgroundColor: [
          // '#3a8ee8',
        '#f72420',
        '#28ad40',
      ],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left',
      },
      tooltip: {
        enabled: true,
      },
    },
  };


  const {theme} = useContext(ThemeContext);
  return (
    <div className={`${theme ? 'bg-zinc-100' : 'bg-zinc-900'} ${theme ? 'text-zinc-400' : 'text-zinc-500'} p-24 h-full rounded-xl`}>
        <Doughnut data={data} options={options} />
    </div>
  )
}

export default BudgetChart