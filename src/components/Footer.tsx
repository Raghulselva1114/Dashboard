import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-950">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-lg font-bold mb-4">About Energy Consortium</h3>
            <p className="text-gray-400">
            Enabling Energy Transformation to a Low Carbon Future through a Global Academia-Industry-Government Collaboration.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://mnre.gov.in/en/year-wise-achievement/" className="text-gray-400 hover:text-white">Dashboard</a></li>
              <li><a href="https://mnre.gov.in/en/physical-progress/" className="text-gray-400 hover:text-white">Analytics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Reports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Settings</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://x.com/IITMEnergyConso?t=7wDrbSq7j6unTLH1g-qT3A&s=08 " className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="https://www.linkedin.com/company/the-energy-consortium-iit-madras/posts/?feedView=all" className="text-gray-400 hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="https://www.instagram.com/theenergyconsortium?igsh=aG9mNHFqd21rZHR1" className="text-gray-400 hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Energy Consortium. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;