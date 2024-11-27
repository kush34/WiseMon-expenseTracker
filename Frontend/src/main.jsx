import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Landing from './pages/Landing.jsx';
import { ThemeProvider } from './context/Theme.jsx';
import {
  createBrowserRouter,
  Route,
  Routes,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AddExpense from './components/AddExpense.jsx';
import Edit from './components/Edit.jsx';
import Budget from './pages/Budget.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" exact element={<App/>}/>
      <Route path='home' element={<Landing/>}/>
      <Route path='addExpense' element={<AddExpense />}/>
      <Route path='/:id' element={<Edit />}/>
      <Route path='/budget' element={<Budget />}/>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
      <RouterProvider router={router}/>
  </ThemeProvider>
)
