
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanyDetails from '@/components/CompanyDetails';
import ApiStatus from '@/components/ApiStatus';
import GitHubProjects from '@/components/GitHubProjects';
import VisitorInfo from '@/components/VisitorInfo';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-casper-800 mb-8">Tech Insight Dashboard</h2>
        
        <div className="grid grid-cols-1 gap-8">
          <CompanyDetails />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ApiStatus />
            <GitHubProjects />
          </div>
          
          <VisitorInfo />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
