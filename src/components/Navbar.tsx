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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Dashboard</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Analytics</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-900"></a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Settings</a>
            <button className="w-full text-left px-3 py-2 bg-blue-900 text-white rounded-md">
              Login
            </button>
          </div>
        </div> 
      )}
    </nav>
  );
};

export default Navbar;