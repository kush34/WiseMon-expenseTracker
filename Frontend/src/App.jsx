import React,{useState} from 'react'
import Login from './components/Login'
import "./index.css"
import Register from './components/Register'
import home from './assets/home.png'
const App = () => {
  const [flag, setflag] = useState(true)
  const handleFlag = ()=>{
    setflag(value=>!value);
  }
  return (
    <div 
    className='bg-opacity w-full h-screen'
    >
        <div className="w-full main flex justify-center items-center flex-col md:flex-row flex-wrap h-screen">
          <div className="w-1/2  border-black left flex justify-center items-center">
            <div className="title flex flex-col items-end">
              <h1 className='font-custom font-semibold text-6xl'>WiseMon</h1>
              <div className="sm-title text-zinc-500">
                your money mind
              </div>
              <div className="hidden md:inline bottomImg bottom-0 w-72 h-12 ">
                <img src={home} alt="illustrations" />
               </div>
            </div>
          </div>
          <div className="w-1/2 border-black flex flex-col justify-center items-center right">
            {flag ? (<Login/>):(<Register/>)}
            <div className='mt-2'>
              <p className='cursor-pointer' onClick={handleFlag}>New Here</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default App