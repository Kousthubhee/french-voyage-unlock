
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface InsightsDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  cityName: string;
  localInsights: { title: string; description: string; tips: string[] }[];
}

export function InsightsDialog({ open, onOpenChange, cityName, localInsights }: InsightsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Local Insights for {cityName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {localInsights.map((insight, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                <p className="text-gray-600 mb-4">{insight.description}</p>
                <ul className="space-y-2">
                  {insight.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
