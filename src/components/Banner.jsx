import React from 'react'
import banner from '../assests/banner.jpg'
import { Link } from 'react-router-dom'


const Banner = () => {
  return (
    <div className='sm:m-8 text-zinc-800 flex justify-center sm:p-3'>
        <div className="container max-w-[1200px] flex justify-between gap-5">
            <div className="banner w-full sm:h-[80vh] flex flex-col sm:flex-row justify-around">
                <div className='font-roboto flex-[1.55] px-5' >
                    <div className='text-4xl sm:text-6xl pt-11  font-medium'> Emergency Care, Anytime, Anywhere</div>
                    <div className='my-4 sm:my-8 sm:p-3 text-zinc-600 text-[1rem] sm:text-[1.1rem] font-medium'>
                        Book an ambulance in seconds and track its live location in real-time. We ensure swift medical assistance at your doorstep.
                    </div>
                    <div className='flex flex-col sm:flex-row sm:justify-baseline'>
                        <Link 
                            to="/app"
                            className='px-8 py-4 flex items-center gap-6 rounded-full bg-zinc-800 text-white w-fit'>
                            Book an Ambulance
                        </Link>
                        <div className='px-4 sm:px-8 py-4 flex items-center gap-6 text-zinc-600 underline decoration-solid cursor-pointer'>
                            Track Your Ambulance
                        </div>
                    </div>
                </div>
                <div className='flex-2 px-3 py-5 sm:px-7 ' >
                    <img src={banner} alt="" className="w-full h-full object-cover rounded-md"  />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner