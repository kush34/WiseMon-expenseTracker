import React,{useState,useEffect} from 'react'
import { ThemeContext } from '../context/Theme.jsx' 
import { useContext } from 'react'
import { Line } from "react-chartjs-2";
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
import { IoPieChart } from "react-icons/io5";
import PieChart from './PieChart.jsx';
import { FaChartLine } from "react-icons/fa";
import LineChart from './LineChart.jsx';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title, Tooltip);

const Chart = ({Data}) => {
  const { theme } = useContext(ThemeContext);
  const [flag, setFlag] = useState(true);
  return (
    <div className={`rounded-xl ${theme?"bg-zinc-100":"bg-zinc-900"} ${theme?"text-zinc-700":"text-zinc-400"} h-full`}>
          <div className='flex w-full h-full justify-center items-center'>
            <div 
            className='w-full h-full max-w-[600px] mx-auto overflow-hidden'
            >
              {flag ? (
                <div className='flex justify-center h-full items-center'>
                  <LineChart Data={Data}/>
                </div>
                ): 
                (
                  <div className='flex justify-center h-full items-center'>
                    <PieChart Data={Data}/>
                  </div>
                )}
            </div>
            <div className="p-2 flex justify-center items-center">
              <button onClick={()=>setFlag(value=>!value)} className='xl:text-2xl hover:scale-105  ease-in-out duration-100 hover:text-green-500'>{flag?<IoPieChart /> :<FaChartLine />
}              </button>
            </div>
        </div>
    </div>
  )
}

export default Chart