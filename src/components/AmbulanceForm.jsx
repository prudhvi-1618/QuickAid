import React, { useState,useEffect} from 'react'
import { FiUploadCloud } from "react-icons/fi";
import api from '../api';
import { useNavigate,useParams } from 'react-router-dom';

const AmbulanceForm = () => {
  const [formData,setFormData] = useState({
    vehicleNumber:'',
    color:'',
    yearOfModel:'',
    company:'',
    book :null
});

const navigate = useNavigate();
const { id } = useParams();

useEffect(() => {
  const fetch = async () => {
    try {
      const res = await api.get(`/ambulance?vehicleNumber=${id}`);
      const { status, ...updatedData } = res.data;
      setFormData(prev => ({
        ...prev,
        ...updatedData, 
      }));
      if (res.status === 200) {
        console.log("Ambulance Data Fetched");
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

    if (name === "book" && files.length > 0) {
      const file = files[0];
      const base64 = await toBase64(file); // convert file to base64
      setFormData((prev) => ({ ...prev, [name]: base64 }));
    } else if (name === "yearOfModel") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name.trim()]: value }));
    }
  };
  
  const handleAddAmbulance = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/ambulance", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", res);
      if(res.status===200){
        navigate("/admin/ambulance");
      }
    } catch (err) {
      console.error("Found an error:", err.response?.data || err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/ambulance?vehicleNumber=${id}`);
      console.log("Success:", res);
      if (res.status === 200) {
        console.log("Driver Deleted");
        navigate("/admin/ambulance");
      }
    } catch (err) {
      console.error("Found an error:", err);
    }
  };

  const handleUpdation = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch("/ambulance", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", res);
      if (res.status === 200) {
        console.log("Ambulance Updated");
        navigate("/admin/ambulance");
      }
    } catch (err) {
      console.error("Found an error:", err);
    }
  };
  

  return (
    <div className='flex-1  m-2 flex justify-center'>
        <div className='mt-8 md:m-8 w-[90vw] md:w-[50vw] flex flex-col gap-5'>
            <h1 className='text-4xl font-medium'>Add New Ambulance</h1>
            <div>
              <form 
              onSubmit={id?handleUpdation:handleAddAmbulance}
              className='text-[1.1rem] text-zinc-600 font-medium flex flex-col gap-2'>
                <div className='w-full flex flex-col'>
                    <label htmlFor="vehicleNumber " className=' m-1' >vehicle number </label>
                    <input type="text" name="vehicleNumber " id="vehicleNumber"
                    value={formData.vehicleNumber}
                     onChange={handleChange}
                     className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
                </div>
                <div className='w-full flex flex-col'>
                  <label htmlFor="color" className='m-1' >Color</label>
                  <input type="text" 
                  name="color" id="color" 
                  value={formData.color}
                  onChange={handleChange}
                  className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
                </div>
                <div className='w-full flex flex-col '>
                  <label htmlFor="yearOfModel" className=' m-1' >Year of Model</label>
                  <input type="number" 
                  value={formData.yearOfModel}
                  onChange={handleChange}
                  name="yearOfModel" id="yearOfModel" 
                  className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
                </div>
                <div className='w-full flex flex-col '>
                  <label htmlFor="company" className=' m-1'>Company</label>
                  <input type="text" 
                  onChange={handleChange}
                  name="company" id="company" 
                  value={formData.company}
                  className='px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
                </div>
                <div className='w-full flex flex-col '>
                  <label htmlFor="license-upload" className=' m-1'>
                    Upload cbook
                  </label>
                  <label htmlFor="cbook-upload" className='border-2 border-dashed p-4 border-zinc-200 rounded-[5px] flex justify-center'>
                    <div className='flex flex-col items-center gap-3'>
                      <FiUploadCloud size="40"/>
                      <div>Choose an image</div>
                      <div className='text-sm'>JPEG,JPG, and PNG formats</div> 
                      <div className="btn w-fit p-3 border-2 rounded-2xl cursor-pointer">Browse file</div>
                    </div>
                  </label>
                  <input
                    id="cbook-upload"
                    type="file"
                    onChange={handleChange}
                    name='book'
                    className='invisible'
                  />
                </div>
                {formData.book&&<div className='bg-zinc-300 p-2 rounded-xl'>{formData.book.split("\\")[2]}</div>}
                <div className="flex justify-between">
              {id ? <button type="submit"
                className='mb-[30vw] sm:my-3 text-2xltext-zinc-600 hover:bg-zinc-800 hover:text-[#fff] hover:font-normal hover:border-zinc-700 font-medium px-3 py-2.5 border-2 border-zinc-500 rounded-2xl w-fit cursor-pointer'>
                Update
              </button> :
                <button type="submit"
                  className='mb-[30vw] sm:my-3 text-2xltext-zinc-600 hover:bg-zinc-800 hover:text-[#fff] hover:font-normal hover:border-zinc-700 font-medium px-3 py-2.5 border-2 border-zinc-500 rounded-2xl w-fit cursor-pointer'>
                  Add Ambulance
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

export default AmbulanceForm