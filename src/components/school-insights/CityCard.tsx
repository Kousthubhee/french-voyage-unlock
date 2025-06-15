
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

interface CityCardProps {
  name: string;
  emoji?: string;
  description: string;
  schoolsCount: number;
  onClick: () => void;
}

export function CityCard({ name, emoji, description, schoolsCount, onClick }: CityCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader>
        <CardTitle className="text-lg">
          {name} {emoji}
        </CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{schoolsCount} Schools</span>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Local Tips</span>
          </div>
          <Button size="sm">Explore</Button>
        </div>
      </CardContent>
    </Card>
  );
}
