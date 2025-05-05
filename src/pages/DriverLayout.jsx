import React from 'react'
import { Outlet } from 'react-router-dom';
import UserNav from '../components/UserNav';

const DriverLayout = () => {
  return (
    <div>
        <UserNav />
        <Outlet />
    </div>
  )
}

export default DriverLayout