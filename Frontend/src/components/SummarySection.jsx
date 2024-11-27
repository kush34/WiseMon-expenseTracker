import React,{useState,useEffect,useContext} from 'react'
import {ThemeContext, ThemeProvider} from '../context/Theme'
const SummarySection = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <div className={`${theme ? 'bg-zinc-100' : 'bg-zinc-900'} ${theme ? 'text-zinc-400' : 'text-zinc-500'} h-full rounded-xl`}>
        
    </div>
  )
}

export default SummarySection