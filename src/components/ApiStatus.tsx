
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { toast } from "@/hooks/use-toast";

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
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl font-bold text-casper-800 dark:text-casper-200">API Status</CardTitle>
          <CardDescription>Current operational status of all APIs</CardDescription>
        </div>
        <button 
          onClick={() => refetch()} 
          className="text-sm px-2 py-1 rounded bg-casper-100 hover:bg-casper-200 dark:bg-casper-700 dark:hover:bg-casper-600 transition-colors"
        >
          Refresh
        </button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-casper-600 dark:text-casper-300">Loading API statuses...</div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-32 text-red-500">
            Failed to fetch API status. Please try again.
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {apis?.map((api) => (
              <div key={api.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{api.name}</h3>
                  <div className="mt-1 sm:hidden">{getStatusBadge(api.status)}</div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Latency:</span> {api.latency}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Uptime:</span> {api.uptime}
                  </div>
                  <div className="hidden sm:block">{getStatusBadge(api.status)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiStatus;
