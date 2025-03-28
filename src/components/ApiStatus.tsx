
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';

// Mock API data - in a real app, this would come from actual API endpoints
const mockApiData = [
  { id: 1, name: "Authentication API", status: "operational", latency: "45ms", uptime: "99.99%" },
  { id: 2, name: "Payment Processing API", status: "operational", latency: "62ms", uptime: "99.95%" },
  { id: 3, name: "User Management API", status: "degraded", latency: "120ms", uptime: "99.82%" },
  { id: 4, name: "Analytics API", status: "operational", latency: "58ms", uptime: "99.97%" },
  { id: 5, name: "Notification API", status: "outage", latency: "N/A", uptime: "97.25%" }
];

const fetchApiStatus = async () => {
  // In a real app, this would be a real API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockApiData), 800);
  });
};

const ApiStatus = () => {
  const { data: apis, isLoading } = useQuery({
    queryKey: ['api-status'],
    queryFn: () => fetchApiStatus() as Promise<typeof mockApiData>
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Operational</Badge>;
      case 'degraded':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Degraded</Badge>;
      case 'outage':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Outage</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-casper-800">API Status</CardTitle>
        <CardDescription>Current operational status of all APIs</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-casper-600">Loading API statuses...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {apis?.map((api) => (
              <div key={api.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-md bg-gray-50">
                <div>
                  <h3 className="font-medium text-gray-900">{api.name}</h3>
                  <div className="mt-1 sm:hidden">{getStatusBadge(api.status)}</div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Latency:</span> {api.latency}
                  </div>
                  <div className="text-sm text-gray-500">
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
