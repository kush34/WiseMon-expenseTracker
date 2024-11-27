import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL}/register`,
        {
          name,  
          email,
          password,
        },
        {
          Credentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        if(res.status == 200){
            navigate(0);
        }
      });
  };
  return (
    <div className="font-customFont">
    <div className="flex flex-col justify-center items-center">
      <div className="head text-2xl">Register</div>
      <div className="title-p text-zinc-400">to get started</div>
      <div className="input-field">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="block m-2 bg-zinc-300 rounded-xl px-8 py-2 text-black outline-none placeholder-zinc-500"
            placeholder="your name"
          />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          className="block m-2 bg-zinc-300 rounded-xl px-8 py-2 text-black outline-none placeholder-zinc-500"
          placeholder="your email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="block m-2 bg-zinc-300 rounded-xl px-8 py-2 text-black outline-none placeholder-zinc-500"
          placeholder="choose password"
        />
      </div>
      <div className="btn">
        <button
          onClick={handleSubmit}
          className="bg-green-500 rounded text-lg font-medium text-white px-8 py-1 hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  )
}

export default Register