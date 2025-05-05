import React from 'react'
import UserNav from '../components/UserNav'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <UserNav/>
      <div className='flex flex-col-reverse md:flex-row'>
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout