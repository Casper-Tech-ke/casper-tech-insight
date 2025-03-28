
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { Smartphone } from 'lucide-react';

interface VisitorData {
  ip: string | null;
  browser: string | null;
  os: string | null;
  deviceType: string | null;
  screenResolution: string | null;
  batteryStatus: {
    level: number | null;
    charging: boolean | null;
  };
  connectionType: string | null;
  language: string | null;
}

const VisitorInfo = () => {
  const [batteryInfo, setBatteryInfo] = useState<{ level: number | null; charging: boolean | null }>({
    level: null,
    charging: null,
  });

  // Function to get battery information if available
  useEffect(() => {
    if ('getBattery' in navigator) {
      // @ts-ignore - getBattery() exists but TypeScript doesn't recognize it
      navigator.getBattery().then((battery: any) => {
        const updateBatteryInfo = () => {
          setBatteryInfo({
            level: Math.floor(battery.level * 100),
            charging: battery.charging,
          });
        };

        updateBatteryInfo();

        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);

        return () => {
          battery.removeEventListener('levelchange', updateBatteryInfo);
          battery.removeEventListener('chargingchange', updateBatteryInfo);
        };
      });
    }
  }, []);

  const fetchVisitorInfo = async (): Promise<VisitorData> => {
    // Most of this information can be determined client-side
    // For IP address, you'd typically use an external service in a real app

    // Get browser info
    const userAgent = navigator.userAgent;
    let browser = null;
    
    if (userAgent.indexOf("Firefox") > -1) {
      browser = "Firefox";
    } else if (userAgent.indexOf("SamsungBrowser") > -1) {
      browser = "Samsung Browser";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      browser = "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
      browser = "Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
      browser = "Microsoft Edge (Legacy)";
    } else if (userAgent.indexOf("Edg") > -1) {
      browser = "Microsoft Edge (Chromium)";
    } else if (userAgent.indexOf("Chrome") > -1) {
      browser = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
      browser = "Safari";
    } else {
      browser = "Unknown";
    }
    
    // Get OS info
    let os = null;
    if (userAgent.indexOf("Win") > -1) {
      os = "Windows";
    } else if (userAgent.indexOf("Mac") > -1) {
      os = "MacOS";
    } else if (userAgent.indexOf("Linux") > -1) {
      os = "Linux";
    } else if (userAgent.indexOf("Android") > -1) {
      os = "Android";
    } else if (userAgent.indexOf("iOS") > -1 || userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) {
      os = "iOS";
    } else {
      os = "Unknown";
    }
    
    // Get device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent.toLowerCase());
    let deviceType = null;
    
    if (isTablet) {
      deviceType = "Tablet";
    } else if (isMobile) {
      deviceType = "Mobile";
    } else {
      deviceType = "Desktop";
    }
    
    // Get connection info
    let connectionType = null;
    if ('connection' in navigator && navigator.connection) {
      // @ts-ignore - connection exists but TypeScript doesn't recognize it
      connectionType = navigator.connection.effectiveType || "Unknown";
    }

    // Simulate IP address fetch (in a real app, we'd use an external service)
    const mockIp = "192.168.1.XXX"; // Masked for privacy in this example

    return {
      ip: mockIp,
      browser,
      os,
      deviceType,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      batteryStatus: batteryInfo,
      connectionType,
      language: navigator.language,
    };
  };

  const { data: visitorData, isLoading, isError } = useQuery({
    queryKey: ['visitor-info'],
    queryFn: fetchVisitorInfo
  });

  const getBatteryStatusDisplay = () => {
    if (visitorData?.batteryStatus.level === null || visitorData?.batteryStatus.charging === null) {
      return <span className="text-gray-500">Not available</span>;
    }
    
    let batteryColor = "bg-green-100 text-green-800";
    if (visitorData.batteryStatus.level < 20) {
      batteryColor = "bg-red-100 text-red-800";
    } else if (visitorData.batteryStatus.level < 50) {
      batteryColor = "bg-yellow-100 text-yellow-800";
    }
    
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className={batteryColor}>
          {visitorData.batteryStatus.level}%
        </Badge>
        {visitorData.batteryStatus.charging && (
          <span className="text-green-600 text-xs">⚡ Charging</span>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Smartphone size={20} className="text-casper-600" />
          <CardTitle className="text-xl font-bold text-casper-800">Your Device Info</CardTitle>
        </div>
        <CardDescription>Information about your current device and browser</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-casper-600">Detecting device information...</div>
          </div>
        ) : isError ? (
          <div className="text-red-500">Error fetching device information</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">IP Address</p>
              <p className="font-medium">{visitorData?.ip || "Unknown"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Browser</p>
              <p className="font-medium">{visitorData?.browser || "Unknown"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Operating System</p>
              <p className="font-medium">{visitorData?.os || "Unknown"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Device Type</p>
              <p className="font-medium">{visitorData?.deviceType || "Unknown"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Screen Resolution</p>
              <p className="font-medium">{visitorData?.screenResolution || "Unknown"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Battery Status</p>
              {getBatteryStatusDisplay()}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Connection</p>
              <p className="font-medium">{visitorData?.connectionType || "Unknown"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Language</p>
              <p className="font-medium">{visitorData?.language || "Unknown"}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitorInfo;
