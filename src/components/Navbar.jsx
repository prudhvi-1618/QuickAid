import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const menuItem = [
      {
          name: "About",
          url:""
      },
      {
          name: "Contact us",
          url:""
      },
      {
          name: "Sign in",
          url:"/login"
      },
  ]

  return (
    // fixed w-full top-0
      <div className=' bg-zinc-900 text-[#ffffff] flex justify-center p-3 '>
        <div className="container max-w-[1200px] flex justify-between gap-5">
          <div className="logo text-xl">Quick Amb</div>
          <div className="links flex gap-5 ">
            {menuItem.map((item, index) => {
              return (
                <Link to={item.url} key={index}>
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
  )
}

export default Navbar