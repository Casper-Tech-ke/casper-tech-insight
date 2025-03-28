
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisitorStats {
  totalVisitors: number;
  activeVisitors: number;
  lastUpdated: string;
}

// Mock visitor data
const fetchVisitorStats = async (): Promise<VisitorStats> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalVisitors: 15842,
        activeVisitors: 27,
        lastUpdated: new Date().toISOString(),
      });
    }, 500);
  });
};

const VisitorCounter = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['visitor-stats'],
    queryFn: fetchVisitorStats,
    refetchInterval: 60000 // Refresh every minute
  });

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-casper-800 dark:text-casper-200 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Visitor Statistics
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-16">
            <div className="animate-pulse text-casper-600">Loading stats...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="bg-gradient-to-br from-casper-100 to-white dark:from-casper-800 dark:to-casper-900 p-4 rounded-lg shadow-sm"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-xs font-medium text-casper-500 dark:text-casper-300 mb-1">Total Visitors</div>
              <div className="text-2xl font-bold text-casper-700 dark:text-casper-200">
                {stats?.totalVisitors.toLocaleString()}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-casper-100 to-white dark:from-casper-800 dark:to-casper-900 p-4 rounded-lg shadow-sm"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-xs font-medium text-casper-500 dark:text-casper-300 mb-1">Active Now</div>
              <div className="text-2xl font-bold text-casper-700 dark:text-casper-200">
                {stats?.activeVisitors}
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
              </div>
            </motion.div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Last updated: {stats ? new Date(stats.lastUpdated).toLocaleTimeString() : "Updating..."}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorCounter;
