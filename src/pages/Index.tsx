
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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h2 
          className="text-2xl font-bold text-casper-800 dark:text-casper-200 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tech Insight Dashboard
        </motion.h2>
        
        <div className="grid grid-cols-1 gap-8">
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <BlogPosts />
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <CompanyDetails />
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
            <VisitorCounter />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <ApiStatus />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <GitHubProjects />
            </motion.div>
          </div>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
            <VisitorInfo />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
