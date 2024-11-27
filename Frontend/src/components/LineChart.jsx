import React from 'react'
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title, Tooltip);

const LineChart = ({Data}) => {
    // const labels = Data.map((expense) => expense.createdAt); // Days for the x-axis
  const labels=Data.map((expense) => {
    const date = new Date(expense.createdAt); // Converts ISO string to Date object
    return date.toLocaleDateString(); // Returns a locale-specific date format like "11/24/2024"
  });
  const amounts = Data.map((expense) => expense.amount); // Amounts for the y-axis
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        data: amounts,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Expense Data" },
    },
    scales: {
      x: { title: { display: true, text: "Description" } },
      y: { title: { display: true, text: "Amount (Rs)" }, beginAtZero: true },
    },
  };
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <Line data={chartData} options={options} />
    </div>
  )
}

export default LineChart