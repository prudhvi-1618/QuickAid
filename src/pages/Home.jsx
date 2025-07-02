import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Banner from '../components/Banner.jsx'
import Feature from '../components/Feature.jsx'
import Footer from '../components/Footer.jsx'
import WhoIsItFor from '../components/WhoIsItFor.jsx'
import Testimonials from '../components/Testimonials.jsx'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Feature/>
      <WhoIsItFor />
      <Testimonials />
      <Footer/>  
    </div>
  )
}

export default Home