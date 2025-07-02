import React from 'react'
import { FaHospitalAlt, FaAmbulance, FaUserMd } from 'react-icons/fa'
import { MdFamilyRestroom } from 'react-icons/md'

const testimonials = [
  {
    quote: "With this system, we cut down ambulance dispatch time by nearly 40%. That’s lives saved.",
    name: "Dr. Meera Shah",
    role: "Hospital Administrator",
    org: "CityCare Hospital",
    badgeIcon: <FaHospitalAlt className="text-zinc-700 text-lg" />,
    badgeLabel: "Hospital Admin",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "The routing system cuts through traffic, and the dispatch updates are instant.",
    name: "Ravi Kumar",
    role: "Ambulance Driver",
    org: "Metro EMS",
    badgeIcon: <FaAmbulance className="text-zinc-700 text-lg" />,
    badgeLabel: "Driver",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "I could see the ambulance arriving in real-time — it gave me peace of mind during a stressful moment.",
    name: "Anjali Patel",
    role: "Family Member",
    org: "User",
    badgeIcon: <MdFamilyRestroom className="text-zinc-700 text-lg" />,
    badgeLabel: "Family",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
]

const Testimonials = () => {
  return (
    <section className="bg-zinc-50 py-12 px-4 md:px-0">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">What Our Users Are Saying</h2>
        <p className="text-zinc-600 text-lg">Real stories from the people who rely on our system every day.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white border border-zinc-200 rounded-xl p-7 shadow-md flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg duration-200"
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-zinc-100"
            />
            <span className="flex items-center gap-2 text-sm px-3 py-1 bg-zinc-100 rounded-full mb-3 font-medium">
              {t.badgeIcon}
              {t.badgeLabel}
            </span>
            <blockquote className="italic text-zinc-700 mb-4 relative">
              <span className="text-2xl text-zinc-400 absolute -left-4 -top-2">“</span>
              {t.quote}
              <span className="text-2xl text-zinc-400 absolute -right-4 -bottom-2">”</span>
            </blockquote>
            <div className="font-bold text-zinc-900">{t.name}</div>
            <div className="text-zinc-600 text-sm">{t.role}, {t.org}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
