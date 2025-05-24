import React from 'react'
import liveTracking from "../assests/livetracking.jpg"
import Booking from '../assests/booking.png'
import Service from '../assests/Service.jpeg'

const features = [
    {
        imageSrc:liveTracking,
        title:"Instant Booking at Your Fingertips",
        content:`In a medical emergency, every second counts. 
         With our streamlined platform, you can book an ambulance instantly—no long calls, no waiting lines. Just enter your location, choose the ambulance type, and confirm.
         Whether it's for yourself or someone in need, getting emergency medical transport is now as easy as a tap.`
    },
    {
        imageSrc:Booking,
        title:"Stay Informed Every Second",
        content:`No more guessing or waiting in uncertainty. Once your ambulance is on the way, you can track its live location in real time on an interactive map. 
         See exactly where it is, how far away, and how long it will take to reach you.
         This live tracking feature keeps you and your loved ones updated every moment, providing peace of mind during high-stress situations.
        `
    },
    {
        imageSrc:Service,
        title:"Emergency Support, Anytime You Need It",
        content:`Medical emergencies can happen at any hour—and when they do, we're ready. Our ambulance services are available 24/7, including nights, weekends, and holidays.
         Whether it’s a late-night crisis or a midday emergency, our team is always on standby to dispatch help immediately.`
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
                        <div className='sm:flex-2 flex flex-col justify-baseline sm:px-3'>
                            <div className=' sm:pt-16 text-3xl sm:text-5xl font-medium'>{feature.title}</div>
                            <div className='sm:my-9 py-3  text-zinc-500 text-[1.1rem] font-medium'>{feature.content}</div>
                        </div>
                    </div>
                )
            })}
        </div>  
    </div>
  )
}

export default Feature