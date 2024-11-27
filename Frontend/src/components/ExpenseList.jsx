import React, { useEffect, useState } from "react";
import { ThemeContext } from "../context/Theme.jsx";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ExpenseList = ({ Data }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [expenseList, setExpenseList] = useState(Data);
  useEffect(() => {
    setExpenseList(Data); // Update state when the prop changes
  }, [Data]);
  const handleExpense = (expense) =>{
    // console.log(expense._id);
    navigate(`/${expense._id}`)
  }
  return (
    <div
      className={`rounded-xl ${theme ? "bg-zinc-100" : "bg-zinc-900"} ${
        theme ? "text-zinc-700" : "text-zinc-400"
      } h-full`}
    >
      <div className="title-list flex justify-around p-4 border-b-2 border-zinc-300">
        <div className="desc">Description</div>
        <div className="amount">Amount</div>
        <div className="category">Category</div>
      </div>
      <div
        className={`expense-list h-2/3 p-4 overflow-y-scroll no-scrollbar ${
          theme ? "text-zinc-900" : "text-zinc-200"
        }`}
      >
        {expenseList.map((expense, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center p-1 hover:text-green-500 font-medium"
              onClick={()=>handleExpense(expense)}
            >
              <div className="flex-1 text-center">{expense.description}</div>
              <div className="flex-1 text-center">{expense.amount}</div>
              <div className="flex-1 text-center">{expense.category}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseList;
