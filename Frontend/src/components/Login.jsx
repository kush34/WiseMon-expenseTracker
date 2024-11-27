import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL}/login`,
        {
          email,
          password,
        },
        {
          Credentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.Token);
        if (res.data.Token) {
          localStorage.setItem("Token", JSON.stringify(res.data.Token));
          navigate("/home")
        }
      });
    localStorage.setItem();
  };
  return (
    <div className="font-customFont">
      <div className="flex flex-col justify-center items-center">
        <div className="head text-2xl">Login</div>
        <div className="title-p text-zinc-400">to get started</div>
        <div className="input-field">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            className="block m-2 bg-zinc-300 rounded-xl px-8 py-2 text-black outline-none placeholder-zinc-500"
            placeholder="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="block m-2 bg-zinc-300 rounded-xl px-8 py-2 text-black outline-none placeholder-zinc-500"
            placeholder="password"
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
        <div className="btn mt-4">
          <button className="m-1 bg-blue-500 rounded text-lg font-medium text-white px-8 py-1 hover:bg-blue-600">
            Google
          </button>
          <button className="m-1 bg-black rounded text-lg font-medium text-white px-10 py-1 hover:bg-zinc-900">
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
