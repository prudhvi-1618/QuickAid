import React, { useEffect, useState } from 'react'
import api from '../api';
import { ToastContainer,toast } from 'react-toastify';
import { USERNAME } from '../constants';
import { useNavigate } from 'react-router-dom';

const AmbulanceList = () => {

    const [ambulances,setAmbulances] = useState([]);
    const [selectedItem,setSelectedItem] = useState(null);
    const username = localStorage.getItem(USERNAME);
    const navigate = useNavigate();

    useEffect(()=>{
        async function GetAmbulances(){
            const res = await api.get("/ambulance/available");
            if(res.status===200){
                setAmbulances(res.data); 
            }else{
                console.log("Error: ",res);   
            } 
        }
        GetAmbulances();
    },[username])

    const handleUpdate = async (e)=>{
        if(!selectedItem){
            toast.error("Select the vehicle number");
            return;
        } 
        toast("Updating Vechile number");
        try {
            console.log(username,selectedItem);
            
            await api.post(
              `/driver-logs/update-vehicle`,
              {},
              {
                params: {
                  username:username,
                  vehicleNumber: selectedItem
                },
                withCredentials: true
              }
            );
            toast.success("Vehicle updated successfully!");
            navigate("alerts");
          } catch (error) {
            console.log(error);
            
            if (error.response?.status === 500) {
              const msg = error.response.data?.message || "Internal server error";
              toast.error(`Update failed: ${msg}`);
            } else {
                toast.error("Something went wrong");
            }
          }          
    }
  return (
    <div className='flex flex-col justify-center items-center '>
        <div className='w-[50vw] m-4 mshadow-sm rounded-xl'>
        <div className="my-6">
            <div className='text-5xl mx-4 '>Ambulance List</div>
            <div className='font-normal mx-4 text-zinc-500 '>Pick your ambulance number</div>
        </div>
        {ambulances.length>0&&(
            <div>
                {ambulances.map((item,index)=>(
                <div 
                key={index} 
                className={`text-3xl mx-3 my-4 p-4 border rounded cursor-pointer
                    ${(item===selectedItem)?'text-zinc-100 bg-zinc-800':'bg-zinc-100 text-zinc-800'}`}
                onClick={()=>setSelectedItem(item)}
                >
                    {item}
                </div>
            ))}
            <div className="btn mx-3 text-end">
                <button type="button"
                onClick={handleUpdate}
                className=' border-2 text-2xl rounded-2xl p-4 cursor-pointer w-fit hover:bg-zinc-600 hover:text-zinc-200'>
                    Submit
                </button>
            </div>
            </div>
        )}
        <ToastContainer />
    </div>
    </div>
  )
}

export default AmbulanceList