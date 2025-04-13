import React from 'react';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics'
import Report from './components/Report'
import Production from './components/Production'



// import IndiaMapDashboard from './components/IndiaMapDashboard';

function App() {
  return (
  <div className="min-h-screen bg-slate-100">
      <Router>
       <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/Report" element={<Report/>} />
              <Route path="/production" element={<Production/>} />

              
        </Routes>
          
       
       </Router>
      
      </div>
      
      );
}
export default App;
