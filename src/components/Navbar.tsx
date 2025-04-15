import React, { useState } from 'react';
import { Menu, X,  } from 'lucide-react';
import HomePageImg from "../assets/Energy Consortium.webp"
import '../style/navbar.css'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg w-full z-50 h-32">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-32">
          <div className="flex items-center">
            <div className="z-50 flex-shrink-0 flex items-center">
             
              <a href='https://energyconsortium.org/?fbclid=IwY2xjawJF_xtleHRuA2FlbQIxMQABHYt_DuF6E500qbtveDB-xDQwsDg-6zQixKGjYWGhRVSIBuoJOrEgg6CV7Q_aem_4HMhnpmnbxj6rz2HpiQjoQ' className="ml-2 text-xl font-bold text-blue-900 "><img className="HomePage-img img-fluid" src={HomePageImg} alt="HomePageImg" /></a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
          
            <a href="Dashboard" className="text-gray-700 hover:text-blue-900">Dashboard</a>
            <a href="Analytics" className="text-gray-700 hover:text-blue-900">Analytics</a>
            <a href="Production" className="text-gray-700 hover:text-blue-900">Production of Energy Resources</a>
            <a href="Report" className="text-gray-700 hover:text-blue-900">Availability of Energy Resources</a>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
              Login
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
    <div className="min-h-screen bg-white flex items-center justify-center relative">
    {/* Sidebar Menu */}
    <div className="w-full max-w-xs shadow-md rounded-xl bg-white p-4 z-10">
      {/* Header */}
      
  
      {/* Navigation with dropdown icons */}
      <nav className="space-y-2">
        {["Dashboard", "Analytics", "Production of Energy Resources", "Availability of Energy Resources","Login"].map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center px-3 py-2 text-blue-800 hover:bg-gray-100 rounded-md transition-all"
          >
            <span>{item}</span>
            {item !== "Home" && <span className="text-lg">▾</span>}
          </div>
        ))}
      </nav>
    </div>
  
    {/* Background image - light faded */}
    <img 
      src="/mnt/data/d27c30c0-103c-4aed-9e72-e69cb65bb69c.png" 
      alt="Energy Sector Growth" 
      className="absolute inset-0 w-full h-full object-contain opacity-5 z-0" 
    />
  </div>
  
  

  
  

     
      )}
    </nav>
  );
};

export default Navbar;