import React, { useState } from 'react'
import stripe from '../assests/bg-4.jpg'
import { Link,useNavigate } from 'react-router-dom';
import api from '../api.js';

const Register = () => {
  const [form,setForm] = useState({
      username:'',
      password:'',
      confirmPassword:'',
      name:'',
      phone:'',
      email:'',
    });
  const navigate = useNavigate();
  const userSubmit = async (e)=>{
    e.preventDefault();
    try{ 
      const res = await api.post('/user',{
        username:form.username,
        password: form.password,
        fullName: form.name,
        phone:form.phone,
        email:form.email,
      });
      navigate('/login')
    }catch(e){
      console.log("Error occured",e);
      
    } 
  }
  
  return (
    <div
      className="w-[100vw] h-[100vh] flex justify-center items-center"
      style={{ backgroundImage: `url(${stripe})`,  backgroundSize: 'cover',backgroundPosition: 'center', mixBlendMode:"color-burn" }}
    >
      <div > 
        <div className='bg-zinc-50 w-full px-8 sm:px-12 py-5 rounded-[13px] flex flex-col justify-center shadow-md' >
          <div className='mt-5 mb-3 flex'>
            <div className='w-[60px] h-[60px] mr-3 bg-zinc-200 rounded-full'></div>
            <div>
              <div className='text-3xl font-bold text-start  relative z-10'>Create an account</div>
              <div className='text-zinc-400 flex gap-1'>
                Already have an account? <Link to="/login" className='text-zinc-700 font-medium underline decoration-solid cursor-pointer'>Log in</Link>
              </div>
            </div>
          </div>
          <form onSubmit={userSubmit} className='text-[1.1rem] text-zinc-600 font-medium flex flex-col gap-2'>
            <div className="name-section flex flex-col sm:flex-row gap-2 ">
              <div className='w-full flex flex-col basis-16'>
                <label htmlFor="userName" className=' m-1' >User Name</label>
                <input type="text" 
                onChange={(e)=>setForm((prev)=>({...prev,username:e.target.value}))}
                value={form.username}
                name="userName" id="userName" 
                className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
              </div>
              <div className='w-full flex flex-col ' >
              <label htmlFor="name" 
              className=' m-1' >Full Name</label>
              <input type="text" 
              onChange={(e)=>setForm((prev)=>({...prev,name:e.target.value}))}
              value={form.name}
              name="name" id="name" 
              className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
            </div>
            </div>
            <div className='w-full flex flex-col '>
              <label htmlFor="email" className=' m-1' >Email address</label>
              <input type="email" 
              onChange={(e)=>setForm((prev)=>({...prev,email:e.target.value}))}
              value={form.email}
              name="email" id="email" 
              className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
            </div>
            <div className="password-section flex flex-col sm:flex-row gap-2 ">
              <div className='w-full flex flex-col ' >
                <label htmlFor="password" className=' m-1' >Password</label>
                <input type="password" 
                onChange={(e)=>setForm((prev)=>({...prev,confirmPassword:'',password:e.target.value}))}
                value={form.password}
                name="password" id="password" 
                className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
              </div>
              <div className='w-full flex flex-col ' >
                <label htmlFor="confirm-password" className=' m-1' >Confirm your password</label>
                <input type="password" 
                onChange={(e)=>setForm((prev)=>({...prev,confirmPassword:e.target.value}))}
                value={form.confirmPassword}
                name="confirm-password" id="confirm-password" 
                className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
              </div>
            </div>
            <div className='w-full flex flex-col ' >
              <label htmlFor="phone" className=' m-1' >Phone number</label>
              <div className='flex gap-2'>
                <div className='px-3 py-2 border-2 border-zinc-200 rounded-[5px] basis-20' >+91</div>
                <input type="tel" 
                onChange={(e)=>setForm((prev)=>({...prev,phone:e.target.value}))}
                value={form.phone}
                name="phone" id="phone" 
                  pattern="[0-9]{3}[ ]?[0-9]{3}[ ]?[0-9]{4}" 
                  className='w-full p-2 border-2 border-zinc-200 rounded-[5px]' />
              </div>
            </div>
            {/* <div className='w-full flex flex-col ' >
              <label htmlFor="address" className=' m-1' >Address</label>
              <textarea className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' ></textarea>
            </div> */}
            <button type="submit"
              className='my-3 text-2xltext-zinc-600 hover:bg-zinc-800 hover:text-[#fff] hover:font-normal hover:border-zinc-700 font-medium px-3 py-2.5 border-2 border-zinc-500 rounded-2xl w-fit cursor-pointer'>
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register