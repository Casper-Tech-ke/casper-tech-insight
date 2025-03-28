
import React from 'react';
import { Clock, Globe, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import MusicPlayer from './MusicPlayer';
import { motion } from 'framer-motion';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };
  
  return (
    <header className="bg-gradient-to-r from-casper-700 to-casper-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="py-4 flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="flex items-center mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <Activity className="h-8 w-8 mr-3 text-casper-300" />
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-casper-200">
                CASPER TECH
              </h1>
            </div>
            <div className="h-8 w-2 bg-casper-300 ml-3 animate-pulse-subtle hidden md:block"></div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center text-casper-100">
              <Clock size={18} className="mr-2" />
              <span>{formatTime(currentTime)}</span>
            </div>
            <div className="flex items-center text-casper-100">
              <Globe size={18} className="mr-2" />
              <span>API Status</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <MusicPlayer />
            </div>
          </motion.div>
        </div>
        
        <motion.nav 
          className="py-3 border-t border-casper-600/30 flex justify-center overflow-x-auto no-scrollbar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ul className="flex space-x-8 text-sm font-medium">
            <li><a href="/" className="text-white hover:text-casper-200 px-2 py-1 rounded-md transition-colors">Dashboard</a></li>
            <li><a href="#api-status" className="text-white hover:text-casper-200 px-2 py-1 rounded-md transition-colors">API Status</a></li>
            <li><a href="#blog" className="text-white hover:text-casper-200 px-2 py-1 rounded-md transition-colors">Blog</a></li>
            <li><a href="#projects" className="text-white hover:text-casper-200 px-2 py-1 rounded-md transition-colors">Projects</a></li>
            <li><a href="#analytics" className="text-white hover:text-casper-200 px-2 py-1 rounded-md transition-colors">Analytics</a></li>
          </ul>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;
