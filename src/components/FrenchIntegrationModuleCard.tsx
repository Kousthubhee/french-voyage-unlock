
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface FrenchIntegrationModuleCardProps {
  module: {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    description: string;
  };
  onClick: () => void;
}

export const FrenchIntegrationModuleCard: React.FC<FrenchIntegrationModuleCardProps> = ({
  module,
  onClick,
}) => {
  return (
    <Card
      className={`cursor-pointer transition-all hover:scale-105 border-2 border-transparent hover:border-blue-200`}
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <CardContent className="flex flex-col items-center p-6 h-48 justify-between relative">
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full mb-3 text-3xl`}
          style={{ background: module.color + "22" }}
        >
          <span className="text-3xl">{module.icon}</span>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">{module.title}</h3>
          <div className="text-xs text-gray-500">{module.description}</div>
        </div>
        <ArrowRight className="absolute bottom-4 right-4 text-blue-500" />
      </CardContent>
    </Card>
  );
};
