
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface CityInsightsCardProps {
  cityName: string;
  localInsights: { title: string; description: string }[];
  onShowAll: () => void;
}

export function CityInsightsCard({ cityName, localInsights, onShowAll }: CityInsightsCardProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Local Insights for {cityName}</h2>
          </div>
          <Button onClick={onShowAll} variant="outline">
            View All Tips
          </Button>
        </div>
        <p className="text-gray-600 mb-4">
          Get insider knowledge about living and studying in {cityName}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {localInsights.map((insight, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
