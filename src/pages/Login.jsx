import React, { useState } from 'react'
import stripe from '../assests/bg-4.jpg'
import { Link ,useNavigate} from 'react-router-dom'
import api from '../api.js'
import {USERNAME,ROLE} from '../constants.js'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);      
      toast.success('Authenticating..');
      const res = await api.post("/auth/login", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      if(res.status==200){
        const role = res.data.roles[0].authority;
        const res_s = await api.post("/auth/login-success",{
          username:res.data.username,
          role:role
        });
        localStorage.setItem(USERNAME,res_s.data.username);
        localStorage.setItem(ROLE,res_s.data.role); 
        if(role==="ADMIN") navigate("/admin");
        else if(role==="DRIVER") navigate("/driver");
        else navigate("/app");
      }else{
        console.log("the res status: ",res);
        
      }
    } catch (err) {
      toast.error("Login error");
      console.error("Login error:", err.response?.data || err.message);
    }

  };
  
  return (
    <div
      className={`w-[100vw] h-[100vh]  bg-cover sm:bg-center mix-blend-color-burn flex justify-center items-center`}
      style={{ backgroundImage: `url(${stripe})`}}
    >
      <div className='bg-zinc-50 w-[550px] px-5 sm:px-12 py-5 m-4 border-0 shadow-md rounded-[13px] flex flex-col justify-center ' >
        <div className='mt-5 mb-3 flex items-center'>
          <div className='w-[60px] h-[60px] mr-3 bg-zinc-200 rounded-full'></div>
          <div className='text-3xl font-bold text-start  relative z-10'>Log in</div>
        </div>
        <form onSubmit={handleLogin} className='text-[1.1rem] text-zinc-600 font-medium flex flex-col gap-2'>

          <div className='w-full flex flex-col '>
            <label htmlFor="username" className=' m-1' >User name</label>
            <input type="text" 
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            name="username" id="username" 
            className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
          </div>
          <div className='w-full flex flex-col ' >
            <label htmlFor="password" className=' m-1' >Password</label>
            <input type="password" 
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            name="password" id="password" 
            className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <button type="submit"
              className='my-6 sm:my-3 text-2xl text-zinc-600 hover:bg-zinc-800 hover:text-[#fff] hover:font-normal hover:border-zinc-700 font-medium px-3 py-2 border-2 border-zinc-500 rounded-2xl w-fit cursor-pointer'>
              Log in
            </button>
            <div className='text-zinc-700 font-medium underline decoration-solid cursor-pointer' >Forget your password</div>
          </div>
        </form>
        <div className='flex flex-col justify-center items-center'>
          <div className='mt-4 sm:mt-12 mb-5 border-3 border-zinc-300 w-3/4 rounded-2xl'></div>
          <div className='text-[20px] text-zinc-500 ' >Don't have an account?</div>
          <Link 
              to="/register"
            className='my-3 text-2xl text-[#fff] hover:text-zinc-900  bg-zinc-700 hover:bg-[#fff]  px-3 py-2 border-1 rounded-2xl w-fit cursor-pointer'>
            Sign up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login