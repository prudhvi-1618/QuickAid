import React, { useEffect, useState } from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const DriverForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    driverName: '',
    dob: '',
    phone: '',
    email: '',
    license: null
  });

  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/driver?username=${id}`);
        const { status, ...updatedData } = res.data;
        setFormData(prev => ({
          ...prev,
          ...updatedData, 
        }));
        if (res.status === 200) {
          console.log("Driver Data Fetched");
        }
      } catch (err) {
        console.error("Found an error:", err);
      }
    }
    if (id) fetch();
  }, [id])

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);  // This will return full base64 string including metadata
      reader.onerror = (error) => reject(error);
    });


  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "license" && files.length > 0) {
      const file = files[0];
      const base64 = await toBase64(file); // convert file to base64
      setFormData((prev) => ({ ...prev, [name]: base64 }));
    } else {
      setFormData((prev) => ({ ...prev, [name.trim()]: value }));
    }
  };

  const handleAddDriver = async (e) => {
    e.preventDefault();
    try {
      
      const res = await api.post("/driver", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", res);
      if (res.status === 200) {
        console.log("Driver Created");
        navigate("/admin/driver");
      }
    } catch (err) {
      console.error("Found an error:", err);
    }
  };

  const handleUpdation = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/driver", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", res);
      if (res.status === 200) {
        console.log("Driver Updated");
        navigate("/admin/driver");
      }
    } catch (err) {
      console.error("Found an error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/driver?username=${id}`);
      console.log("Success:", res);
      if (res.status === 200) {
        console.log("Driver Deleted");
        navigate("/admin/driver");
      }
    } catch (err) {
      console.error("Found an error:", err);
    }
  };

  return (
    <div className='flex-1 m-2 flex justify-center'>
      <div className='mt-8 md:m-8 w-[90vw] md:w-[50vw] flex flex-col gap-5'>
        <h1 className='text-4xl font-medium'>Add New Driver</h1>
        <div>
          <form onSubmit={id?handleUpdation:handleAddDriver}
          className='text-[1.1rem] text-zinc-600 font-medium flex flex-col gap-2'>
            <div className='w-full flex flex-col'>
              <label htmlFor="username" className='m-1'>User name</label>
              <input type="text"
                onChange={handleChange}
                value={formData.username}
                name="username" id="username"
                readOnly={!!id}
                className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
            </div>
            <div className='w-full flex flex-col'>
              <label htmlFor="driverName" className=' m-1' >Driver name</label>
              <input type="text"
                value={formData.driverName}
                onChange={handleChange}
                name="driverName" id="driverName"
                className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
            </div>
            <div className='w-full flex flex-col'>
              <label htmlFor="password" className=' m-1' >Password</label>
              <input type="password"
                value={formData.password}
                onChange={handleChange}
                name="password" id="password"
                className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
            </div>
            <div className='w-full flex flex-col'>
              <label htmlFor="dob" className=' m-1'>Date of Birth</label>
              <input type="date"
                value={formData.dob}
                onChange={handleChange}
                name="dob" id="dob"
                className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
            </div>
            <div className='w-full flex flex-col '>
              <label htmlFor="email" className=' m-1' >Email address</label>
              <input type="email"
                value={formData.email}
                onChange={handleChange}
                name="email" id="email"
                className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
            </div>
            <div className='w-full flex flex-col ' >
              <label htmlFor="phone" className=' m-1' >Phone number</label>
              <div className='flex gap-2'>
                <div className='px-3 py-2 border-2 border-zinc-200 rounded-[5px] basis-20' >+91</div>
                <input type="tel" name="phone" id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{3}[ ]?[0-9]{3}[ ]?[0-9]{4}"
                  className='w-full p-2 border-2 border-zinc-200 rounded-[5px]' />
              </div>
            </div>
            <div className='w-full flex flex-col '>
              <label htmlFor="license-upload" className=' m-1'>
                Upload License
              </label>
              <label htmlFor="license-upload" className='border-2 border-dashed p-4 border-zinc-200 rounded-[5px] flex justify-center'>
                <div className='flex flex-col items-center gap-3'>
                  <FiUploadCloud size="40" />
                  <div>Choose an image</div>
                  <div className='text-sm'>JPEG,JPG, and PNG formats</div>
                  <div className="btn w-fit p-3 border-2 rounded-2xl cursor-pointer" >Browse file</div>
                </div>
              </label>
              <input
                id="license-upload"
                type="file"
                name='license'
                onChange={handleChange}
                className="invisible"
              />
            </div>
            <div className="flex justify-between">
              {id ? <button type="submit"
                className='mb-[30vw] sm:my-3 text-2xltext-zinc-600 hover:bg-zinc-800 hover:text-[#fff] hover:font-normal hover:border-zinc-700 font-medium px-3 py-2.5 border-2 border-zinc-500 rounded-2xl w-fit cursor-pointer'>
                Update
              </button> :
                <button type="submit"
                  className='mb-[30vw] sm:my-3 text-2xltext-zinc-600 hover:bg-zinc-800 hover:text-[#fff] hover:font-normal hover:border-zinc-700 font-medium px-3 py-2.5 border-2 border-zinc-500 rounded-2xl w-fit cursor-pointer'>
                  Add driver
                </button>
              }
              {id && <button
                onClick={handleDelete}
                className='mb-[30vw] sm:my-3 text-2xltext-zinc-600 hover:bg-zinc-800 hover:text-[#fff] hover:font-normal hover:border-zinc-700 font-medium px-3 py-2.5 border-2 border-zinc-500 rounded-2xl w-fit cursor-pointer'>
                Delete
              </button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DriverForm