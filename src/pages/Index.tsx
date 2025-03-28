
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanyDetails from '@/components/CompanyDetails';
import ApiStatus from '@/components/ApiStatus';
import GitHubProjects from '@/components/GitHubProjects';
import VisitorInfo from '@/components/VisitorInfo';
import BlogPosts from '@/components/BlogPosts';
import VisitorCounter from '@/components/VisitorCounter';

const Index = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-casper-600 to-casper-800 dark:from-casper-400 dark:to-casper-600 mb-2">
            Casper Tech Insights
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time dashboard for monitoring APIs, GitHub projects, and tech insights
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-8">
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="w-full">
            <ApiStatus />
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <BlogPosts />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <CompanyDetails />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <GitHubProjects />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <VisitorCounter />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <VisitorInfo />
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
