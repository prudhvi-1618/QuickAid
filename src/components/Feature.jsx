import React from 'react'
import liveTracking from "../assests/livetracking.jpg"
import Booking from '../assests/booking.png'
import Service from '../assests/Service.jpeg'

const features = [
    {
        imageSrc:liveTracking,
        title:"Instant Booking at Your Fingertips",
        content:"Get immediate access to emergency care with a single tap."
    },
    {
        imageSrc:Booking,
        title:"Stay Informed Every Second",
        content:"Follow your ambulance’s exact location on a live map."
    },
    {
        imageSrc:Service,
        title:"Emergency Support, Anytime You Need It",
        content:"With our 24/7 availability, you can count on us to respond quickly and provide lifesaving care at any hour."
    }
]

const Feature = () => {
  return (
    <div className='sm:m-8 text-zinc-800 flex justify-center p-3'>
        <div className="container max-w-[1200px] flex flex-col justify-between gap-5">
            <div className='text-4xl sm:text-7xl sm:p-4 sm:mb-5'>Features</div>
           { features.map((feature,index)=>{
                return(
                    <div key={index} className={`flex flex-col-reverse sm:gap-10 ${(index%2===0)?"sm:flex-row":"sm:flex-row-reverse"} sm:px-2 sm:my-8`} >
                        <div className='sm:flex-[1.5] '>
                            <img src={feature.imageSrc} alt="" className='w-full h-[375px] rounded-xl border-2 border-zinc-950'/>
                        </div>
                        <div className='sm:flex-2 flex flex-col justify-baseline'>
                            <div className='pt-4 sm:pt-16 text-3xl sm:text-5xl font-medium'>{feature.title}</div>
                            <div className='sm:my-9 py-3 sm:px-3 text-zinc-500 text-[1.1rem] font-medium'>{feature.content}</div>
                        </div>
                    </div>
                )
            })}
        </div>  
    </div>
  )
}

export default Feature