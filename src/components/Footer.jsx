import React from 'react'

const Footer = () => {
  return (
    <div className='bg-zinc-800 text-zinc-100 flex justify-center p-3 rounded-t-2xl '>
        <div className="container max-w-[1200px] flex flex-col justify-between gap-5">
            <div className="main-footer">
                <div className="logo">

                </div>
                <div className="links">
                    
                </div>
            </div>
            <div className="sub-footer flex flex-col items-center justify-center">
            <p>&copy; 2025 Quick Ambulance. All rights reserved.</p>
            <p>Privacy Policy | Terms of Service</p>
            </div>
        </div>
    </div>
  )
}

export default Footer