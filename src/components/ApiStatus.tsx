
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { toast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock API data - in a real app, this would come from actual API endpoints
const mockApiData = [
  { id: 1, name: "Authentication API", status: "operational", latency: "45ms", uptime: "99.99%" },
  { id: 2, name: "Payment Processing API", status: "operational", latency: "62ms", uptime: "99.95%" },
  { id: 3, name: "User Management API", status: "degraded", latency: "120ms", uptime: "99.82%" },
  { id: 4, name: "Analytics API", status: "operational", latency: "58ms", uptime: "99.97%" },
  { id: 5, name: "Notification API", status: "outage", latency: "N/A", uptime: "97.25%" }
];

// External API endpoints
const externalApiEndpoints = [
  { id: 6, name: "Gifted Tech API", url: "https://apis.giftedtech.web.id/status" },
  { id: 7, name: "David Cyril Tech API", url: "https://apis.davidcyriltech.my.id/status" },
  { id: 8, name: "Nexoracle API", url: "https://api.nexoracle.com/status" }
];

const fetchApiStatus = async () => {
  // Start with our mock data for internal APIs
  const apiData = [...mockApiData];
  
  // Try to fetch status from each external API
  for (const endpoint of externalApiEndpoints) {
    try {
      // We use a timeout to avoid hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(endpoint.url, {
        signal: controller.signal,
        method: 'GET'
      }).catch(error => {
        clearTimeout(timeoutId);
        throw error;
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        // Format may vary based on the actual API response structure
        apiData.push({
          id: endpoint.id,
          name: endpoint.name,
          status: data.status || "unknown",
          latency: data.latency || "N/A",
          uptime: data.uptime || "N/A"
        });
      } else {
        apiData.push({
          id: endpoint.id,
          name: endpoint.name,
          status: "unreachable",
          latency: "N/A",
          uptime: "N/A"
        });
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint.name}:`, error);
      // Add the endpoint with an error status
      apiData.push({
        id: endpoint.id,
        name: endpoint.name,
        status: "unreachable",
        latency: "N/A",
        uptime: "N/A"
      });
    }
  }
  
  return apiData;
};

const ApiStatus = () => {
  const { data: apis, isLoading, isError, refetch } = useQuery({
    queryKey: ['api-status'],
    queryFn: fetchApiStatus,
    refetchInterval: 60000, // Refetch every 60 seconds
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch API status:", error);
        toast({
          title: "Error",
          description: "Failed to fetch API status. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="text-green-500 h-5 w-5" />;
      case 'degraded':
        return <AlertTriangle className="text-yellow-500 h-5 w-5" />;
      case 'outage':
      case 'unreachable':
        return <AlertCircle className="text-red-500 h-5 w-5" />;
      default:
        return <AlertCircle className="text-gray-500 h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Operational</Badge>;
      case 'degraded':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Degraded</Badge>;
      case 'outage':
      case 'unreachable':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Outage</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Unknown</Badge>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg">
        <CardHeader className="pb-2 flex flex-row justify-between items-center bg-gradient-to-r from-casper-600 to-casper-800 text-white">
          <div>
            <CardTitle className="text-xl font-bold">API Status Dashboard</CardTitle>
            <CardDescription className="text-gray-100">Current operational status of all services</CardDescription>
          </div>
          <button 
            onClick={() => refetch()} 
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="animate-spin text-casper-600 dark:text-casper-300">
                <RefreshCw className="h-8 w-8" />
              </div>
            </div>
          ) : isError ? (
            <div className="flex flex-col justify-center items-center h-64 text-red-500 bg-red-50/50 dark:bg-red-900/10">
              <AlertCircle className="h-12 w-12 mb-2" />
              <p className="text-lg font-medium">Failed to fetch API status</p>
              <p className="text-sm text-red-400 dark:text-red-300">Please try again</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {apis?.map((api) => (
                <motion.div 
                  key={api.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center p-4 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(api.status)}
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{api.name}</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-4 mt-1">
                        <span>Latency: {api.latency}</span>
                        <span>Uptime: {api.uptime}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(api.status)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ApiStatus;
