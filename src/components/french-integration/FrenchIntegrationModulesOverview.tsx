
import React, { useState } from "react";
import { modulesData } from "./modulesData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const FrenchIntegrationModulesOverview = () => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  if (activeModuleId) {
    const module = modulesData.find(m => m.id === activeModuleId);
    if (!module) return null;
    const DetailComponent = module.contentComponent;
    return (
      <div>
        <Button variant="outline" onClick={() => setActiveModuleId(null)} className="mb-6">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Modules
        </Button>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <span className="mr-3 text-2xl">{module.emoji}</span>
              <h2 className="font-bold text-2xl">{module.title}</h2>
            </div>
            <DetailComponent />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulesData.map(m => (
          <Card
            key={m.id}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => setActiveModuleId(m.id)}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-2">
                <span className="text-4xl mr-3">{m.emoji}</span>
                <h3 className="text-lg font-semibold">{m.title}</h3>
              </div>
              <div className="text-gray-700 text-sm">{m.excerpt}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
