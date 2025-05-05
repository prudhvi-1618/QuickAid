import React from 'react'
import { Link } from 'react-router-dom'
const TableBody = ({type,data,header}) => {
  return (
    <tbody>
        {data.map((item,index)=>(
            <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                {header.map((head,idx)=>{
                    if(head=="status") return <td key={idx} className="px-6 py-4">{item.status?"🟢":"🔴"}</td>
                    return <td key={idx} className="px-6 py-4">{item[head]}</td>
                })}
                { console.log(item, type)}
                <td className="px-6 py-4 text-right">
                    <Link to={type==="ambulance"?`add/${item.vehicleNumber}`:`add/${item.username}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Update
                    </Link>
                </td>
            </tr>
        ))}
    </tbody>
  )
}

export default TableBody