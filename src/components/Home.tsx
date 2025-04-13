import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChartA from '../helper/ChartA'
import IndiaMapDashboard from '../helper/IndiaMapDashboard'

const Home = () => {
  return (
    <div>
      <Navbar />
      <ChartA />
      <IndiaMapDashboard />
      <Footer /> 
    </div>
  )
}

export default Home
