import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import React from 'react';

const FeatureCard = ({title, desc, para, Icon}) => {
  return (
    <div>
      <Card className="w-96 mx-auto">
        <CardHeader className="flex flex-col items-center text-center">
          {Icon && <Icon className="w-12 h-12 mb-2 text-blue-600" />}
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
           {para}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureCard;
