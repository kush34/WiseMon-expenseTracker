import React, { useEffect } from 'react';
import { ThemeContext } from '../context/Theme.jsx' ;
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'; 
import { FaMoneyCheckDollar } from "react-icons/fa6";

const Operation = ({Data}) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const excludeFields = ['user_id', '_id', '__v'];  
  const handleCsv = () => {
    try {
      // Check if Data is an array of objects
      console.log(Data);
      const filteredData = Data.map(item => {
        // Create a new object excluding the unwanted fields
        const filteredItem = { ...item };
        excludeFields.forEach(field => {
          delete filteredItem[field]; // Remove the unwanted fields
        });
        return filteredItem;
      });

      const csvData = [
      Object.keys(filteredData[0]), // header row
      ...filteredData.map(item => Object.values(item)) // data rows
    ]
      .map(row => row.join(',')) // join each row with commas
      .join('\n'); // join rows with newlines
  
      // Create Blob from the CSV data
      const blob = new Blob([csvData], { type: 'text/csv' });
  
      // Create an object URL for the Blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.csv'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
    }
  };

  const exportToPDF = (data) => {
    const doc = new jsPDF();
  
    // Table headers
    const headers = [['description','category', 'amount','createdAt']];
  
    // Extract data into an array for the table
    const tableData = data.map(expense => [
      expense.description,
      expense.category,
      expense.amount,
      expense.createdAt
    ]);
  
    // Add headers and table data
    doc.autoTable({
      head: headers,
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] }, // Set header background color
    });
  
    // Save the PDF with a specific filename
    doc.save('expenses.pdf');
  };
  const callPDF = ()=>{
    exportToPDF(Data);
  }

  return (
    <div className={`flex justify-center items-center rounded-xl ${theme?"bg-zinc-100":"bg-zinc-900"} h-full`}>
      <div className='flex flex-col justify-center items-center'>
        <div className="head text-xl text-zinc-500 font-medium">
          Expense Operation
        </div>
        <div className='xl:flex flex-wrap'>
          <button onClick={()=>navigate("/addExpense")} className='bg-zinc-600 px-4 rounded text-white font-medium py-2 m-2 hover:bg-green-700 duration-100 ease-out hover:scale-105'>Append</button>
          <button onClick={handleCsv} className='bg-zinc-600 px-4 rounded text-white font-medium py-2 m-2 hover:bg-blue-700 duration-100 ease-out hover:scale-105'>CSV</button>
          <button onClick={callPDF} className='bg-zinc-600 px-4 rounded text-white font-medium py-2 m-2 hover:bg-red-700 duration-100 ease-out hover:scale-105'>PDF</button>
          <button onClick={()=>navigate("/budget")} className='bg-zinc-600 px-4 rounded text-white font-medium py-2 m-2 hover:bg-green-700 duration-100 ease-out hover:scale-105'><FaMoneyCheckDollar /></button>
        </div>
      </div>
    </div>
  )
}

export default Operation