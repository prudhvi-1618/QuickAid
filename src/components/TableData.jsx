import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import api from '../api';
import TableBody from './TableBody';

const TableData = ({type}) => {
    const [fetchData,setFormData] = useState([]);
    const [header,setHeader] = useState([]);
    useEffect(()=>{   
        const fetch = async ()=>{
            if(type=="ambulance"){
                setHeader(["vehicleNumber","yearOfModel","company","status"]);
            }else{
                setHeader(["username","driverName","phone","email","status"]);
            }
            const res = await api.get(`/${type}/find-all`);
            setFormData(res.data);
            console.log(res.data);
            
        }
        fetch();
    },[type])
    return (
        <div className='flex-1 font-roboto p-4 '>
            <div className='mb-[40vw] sm:m-8 flex flex-col gap-5'>
                <div className=' p-2 flex justify-between'>
                    <div className='w-[45vw] sm:w-[20vw] flex items-center border-1 border-zinc-500 rounded-[5px] p-1'>
                        <CiSearch size="25" className='m-1' />
                        <input type="search" 
                        placeholder='search...'
                        className='w-full focus:border-none focus:outline-none text-xl font-extralight' />
                    </div>
                    <Link to="add" className='flex justify-center items-center gap-3 shadow-md bg-zinc-800 text-zinc-50 rounded-[12px] px-3'>
                        <IoAddOutline size="25" />
                        <div className='text-[18px] font-light'>Add {type}</div>
                    </Link>
                </div>


                <div className="relative sm:m-2 overflow-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                {header.map((element,index)=>(
                                        <th key={index} scope="col" className="px-6 py-3">
                                            {element}
                                        </th>
                                    ))}
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <TableBody data={fetchData} header={header} type={type}/>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default TableData