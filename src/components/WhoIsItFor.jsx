import React from 'react'
import { FaHospitalAlt, FaShieldAlt, FaCity, FaAmbulance } from 'react-icons/fa'

const audiences = [
  {
    icon: FaHospitalAlt,
    title: 'Hospitals',
    desc: 'Seamless patient handoff with real-time ambulance data.'
  },
  {
    icon: FaShieldAlt,
    title: 'Emergency Responders',
    desc: 'Smart dispatching and routing for faster on-ground coordination.'
  },
  {
    icon: FaCity,
    title: 'Government Bodies',
    desc: 'Monitor city-wide emergency vehicle activity and optimize resource allocation.'
  },
  {
    icon: FaAmbulance,
    title: 'Private Ambulance Operators',
    desc: 'Manage fleets efficiently and build trust with real-time updates.'
  }
]

const WhoIsItFor = () => {
  return (
    <section className="bg-zinc-900 py-12 px-4 md:px-0">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-2">Who Is It For?</h2>
        <p className="text-zinc-50 text-lg">Our system is tailored for every part of the emergency response chain.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {audiences.map((aud, idx) => (
          <div
            key={idx}
            className="bg-white border border-zinc-200 rounded-xl p-7 flex flex-col items-center shadow-sm transition-transform hover:scale-105 hover:shadow-lg duration-200"
          >
            <div className="bg-zinc-100 p-4 rounded-full mb-4">
              <aud.icon className="text-zinc-700 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">{aud.title}</h3>
            <p className="text-zinc-600 text-base">{aud.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhoIsItFor
