import userProfile from '../assests/user_profile.png'
import React, { useState, useEffect, useRef } from 'react'
import { USERNAME } from '../constants';
import { Link } from 'react-router-dom';

const UserNav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const iconRef = useRef(null);
  let username = localStorage.getItem(USERNAME);


  useEffect(() => {

    const handleClickOutside = (e) => {
      if (iconRef.current && !iconRef.current.contains(e.target)) {
        setShowLogout(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);

  }, []);

  return (
    <div className=' bg-zinc-900 text-[#ffffff] flex justify-center px-3 py-4 '>
      <div className="container max-w-[1400px] flex justify-between gap-5">
        <div className="logo text-4xl">Quick Amb</div>
        <div className="profile" ref={iconRef}>
          <img src={userProfile} alt="" width="41px" onClick={(e)=>setShowLogout(!showLogout)} />
          <div className={`absolute  right-[3vw] w-[45vw] sm:w-[15vw] border text-white bg-black p-3 rounded-md z-50 ${showLogout ? 'opacity-100' : 'opacity-0 invisible'} `}>
            <div className='text-[15px] py-2 sm:text-[1.5vw] capitalize block' >Hii , {username}</div>
            <Link
              to='/logout'
              className="text-[15px] sm:text-[1.4vw] font-medium capitalize transition-opacity duration-300 border bg-black  hover:text-black hover:bg-white px-3 py-1 rounded-full "
              onClick={(e) => e.stopPropagation()}
            >
              log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserNav