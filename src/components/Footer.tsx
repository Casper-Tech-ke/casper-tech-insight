
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-casper-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold bg-gradient-to-r from-casper-300 to-white bg-clip-text text-transparent">CASPER TECH</h3>
            <p className="text-sm text-gray-300">Real-time technology insights</p>
          </motion.div>
          <motion.div 
            className="text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © {currentYear} CASPER Technologies. All rights reserved.
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-6 pt-6 border-t border-casper-700 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <h4 className="font-medium mb-2 text-casper-300">Products</h4>
            <ul className="space-y-1 text-gray-400">
              <li>API Platform</li>
              <li>DevTools</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-casper-300">Resources</h4>
            <ul className="space-y-1 text-gray-400">
              <li>Documentation</li>
              <li>Blog</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-casper-300">Company</h4>
            <ul className="space-y-1 text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-casper-300">Connect</h4>
            <ul className="space-y-1 text-gray-400">
              <li>Twitter</li>
              <li>GitHub</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
