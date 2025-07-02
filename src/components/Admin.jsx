import React from 'react'
import { FaAmbulance, FaUser, FaRoute, FaCalendarCheck } from 'react-icons/fa'

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-zinc-200">
    <div className="flex items-center space-x-4">
      <div className="bg-zinc-100 p-3 rounded-full">
        <Icon className="text-zinc-700 text-2xl" />
      </div>
      <div>
        <h3 className="text-zinc-500 text-sm font-medium">{title}</h3>
        <p className="text-zinc-900 text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
)

const Admin = () => {
  const stats = [
    { icon: FaAmbulance, title: 'Total Ambulances', value: '24' },
    { icon: FaUser, title: 'Active Drivers', value: '18' },
    { icon: FaRoute, title: 'Ongoing Trips', value: '5' },
    { icon: FaCalendarCheck, title: 'Today\'s Bookings', value: '12' }
  ]

  return (
    <div className="flex-1  p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
          <p className="text-zinc-600 mt-1">Welcome to the admin dashboard</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-zinc-200">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">Recent Bookings</h2>
            <div className="space-y-4">
              {/* Placeholder for recent bookings list */}
              <div className="flex justify-between items-center p-3 bg-zinc-50 rounded">
                <div>
                  <p className="font-medium text-zinc-900">Emergency Booking #1242</p>
                  <p className="text-sm text-zinc-600">City Hospital → Metro Hospital</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">In Progress</span>
              </div>
              {/* Add more booking items here */}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-zinc-200">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">Available Ambulances</h2>
            <div className="space-y-4">
              {/* Placeholder for ambulance list */}
              <div className="flex justify-between items-center p-3 bg-zinc-50 rounded">
                <div>
                  <p className="font-medium text-zinc-900">Ambulance #A-123</p>
                  <p className="text-sm text-zinc-600">Type: Advanced Life Support</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">Available</span>
              </div>
              {/* Add more ambulance items here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin