import React,{useState,useEffect} from 'react'
import { ThemeContext } from '../context/Theme.jsx' 
import { useContext } from 'react'
import grocey from "../assets/grocery.png"
const Amount = ({Data}) => {
  const { theme } = useContext(ThemeContext);
  const [list, setList] = useState()

  const calculateTotals = (data) => {
    const categoryTotals = {};
    let overallTotal = 0;

    data.forEach((expense) => {
      // Add amount to category total
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }

      // Add to overall total
      overallTotal += expense.amount;
    });

    return { categoryTotals, overallTotal };
  };

  const { categoryTotals, overallTotal } = calculateTotals(Data);
  useEffect(()=>{
    setList(Data)
  },[Data])
  return (
    <div className={`flex font-customFont  justify-center rounded-xl ${theme?"bg-zinc-100":"bg-zinc-900"} h-full`}>
      <div className="category m-2 w-full">
        <div className="title mr-6 text-xl flex justify-end font-medium text-zinc-500">
          category
        </div>
        <div className="category-list w-full mt-4 overflow-y-scroll no-scrollbar h-2/4">
        {Object.entries(categoryTotals).map(([category, total]) => (
          <div key={category} className={`category-card m-2 ${theme ? "text-zinc-900":"text-zinc-100"} font-medium flex justify-around items-center`}>
            <div className="category-name flex justify-start w-2/4">
              {category}
            </div>
            <div className="amount">
              {total}
            </div>
          </div>
        ))}
        </div>
        <div className="total-amt bottom-0">
          <div className={`title flex justify-end mr-6 text-xl font-medium text-zinc-500 `}>
            amount 
          </div>
          <div className={`font-bold text-4xl flex justify-end mr-6 ${theme ? "text-zinc-500" : "text-zinc-100"}`}>
            {overallTotal}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Amount