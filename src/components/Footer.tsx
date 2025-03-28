
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-casper-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">CASPER TECH</h3>
            <p className="text-sm text-gray-300">Real-time technology insights</p>
          </div>
          <div className="text-sm text-gray-300">
            © {currentYear} CASPER Technologies. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
