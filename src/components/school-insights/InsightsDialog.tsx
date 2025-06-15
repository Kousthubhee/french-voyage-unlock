
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, Landmark, Trophy, GraduationCap } from "lucide-react";
import React from "react";

interface InsightsDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  cityName: string;
  localInsights: { title: string; description: string; tips: string[] }[];
  transport: string;
  famousPlaces: string;
  sportsFacilities: string;
  studentLife: string;
}

export function InsightsDialog({
  open,
  onOpenChange,
  cityName,
  localInsights,
  transport,
  famousPlaces,
  sportsFacilities,
  studentLife,
}: InsightsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Local Insights for {cityName}</DialogTitle>
        </DialogHeader>
        {/* --- The 4 main insights, styled just like the CityInsightsCard --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Bus className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Transport</h3>
            </div>
            <p className="text-sm text-gray-600">{transport}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Landmark className="h-5 w-5 mr-2 text-purple-700" />
              <h3 className="font-semibold text-gray-900">Nearby Landmarks</h3>
            </div>
            <p className="text-sm text-gray-600">{famousPlaces}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Trophy className="h-5 w-5 mr-2 text-green-700" />
              <h3 className="font-semibold text-gray-900">Sports Facilities</h3>
            </div>
            <p className="text-sm text-gray-600">{sportsFacilities}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <GraduationCap className="h-5 w-5 mr-2 text-teal-600" />
              <h3 className="font-semibold text-gray-900">Student Life</h3>
            </div>
            <p className="text-sm text-gray-600">{studentLife}</p>
          </div>
        </div>
        {/* --- Local Insights tips section --- */}
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
