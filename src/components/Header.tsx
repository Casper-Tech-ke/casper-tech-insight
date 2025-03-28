
import React from 'react';
import { Clock, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    <header className="bg-gradient-to-r from-casper-800 to-casper-600 text-white py-6 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-3xl font-bold tracking-tighter">CASPER TECH</h1>
          <div className="h-8 w-2 bg-casper-300 ml-3 animate-pulse-subtle"></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center text-casper-100">
            <Clock size={18} className="mr-2" />
            <span>{formatTime(currentTime)}</span>
          </div>
          <div className="flex items-center text-casper-100">
            <Globe size={18} className="mr-2" />
            <span>Status Dashboard</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
