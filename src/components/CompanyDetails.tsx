
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const companyInfo = {
  name: "Casper Technologies",
  description: "Leading provider of innovative tech solutions and API services.",
  founded: "2020",
  headquarters: "San Francisco, CA",
  website: "caspertech.io",
  email: "info@caspertech.io"
};

const CompanyDetails = () => {
  return (
    <Card className="border-l-4 border-l-casper-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-casper-800">Company Details</CardTitle>
        <CardDescription>Official information about Casper Tech</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Company Name</p>
            <p className="font-medium">{companyInfo.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Founded</p>
            <p className="font-medium">{companyInfo.founded}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Headquarters</p>
            <p className="font-medium">{companyInfo.headquarters}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Website</p>
            <p className="font-medium">{companyInfo.website}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Contact Email</p>
            <p className="font-medium">{companyInfo.email}</p>
          </div>
          <div className="col-span-1 md:col-span-2 space-y-1 mt-2">
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="font-medium">{companyInfo.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDetails;
