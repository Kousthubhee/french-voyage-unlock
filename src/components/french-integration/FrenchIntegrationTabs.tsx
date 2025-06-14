
import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageCommunicationSection } from "./sections/LanguageCommunicationSection";
import { CulturalEtiquetteSection } from "./sections/CulturalEtiquetteSection";
import { FoodGrocerySection } from "./sections/FoodGrocerySection";
import { FestivalsEventsSection } from "./sections/FestivalsEventsSection";
import { StudentLifeSection } from "./sections/StudentLifeSection";
import { BureaucracySection } from "./sections/BureaucracySection";
import { MentalHealthSection } from "./sections/MentalHealthSection";
import { CulturalComparisonSection } from "./sections/CulturalComparisonSection";
import { PracticalLivingSection } from "./sections/PracticalLivingSection";
import { SafetySection } from "./sections/SafetySection";
import { IndoFrenchSection } from "./sections/IndoFrenchSection";

export function FrenchIntegrationTabs() {
  return (
    <Tabs defaultValue="language" className="w-full">
      <TabsList className="flex flex-wrap gap-2 mb-6 bg-gray-100 mt-2">
        <TabsTrigger value="language">Language & Communication</TabsTrigger>
        <TabsTrigger value="etiquette">Cultural Etiquette</TabsTrigger>
        <TabsTrigger value="food">Food & Grocery Guidance</TabsTrigger>
        <TabsTrigger value="festivals">Festivals & Social Events</TabsTrigger>
        <TabsTrigger value="student">Student Life Integration</TabsTrigger>
        <TabsTrigger value="bureaucracy">French Bureaucracy</TabsTrigger>
        <TabsTrigger value="mental">Mental Health & Adjustment</TabsTrigger>
        <TabsTrigger value="comparison">Cultural Comparison</TabsTrigger>
        <TabsTrigger value="living">Practical Living</TabsTrigger>
        <TabsTrigger value="safety">Safety & Emergency</TabsTrigger>
        <TabsTrigger value="indofrench">Indo-French Integration</TabsTrigger>
      </TabsList>
      <TabsContent value="language"><Card><CardContent><LanguageCommunicationSection /></CardContent></Card></TabsContent>
      <TabsContent value="etiquette"><Card><CardContent><CulturalEtiquetteSection /></CardContent></Card></TabsContent>
      <TabsContent value="food"><Card><CardContent><FoodGrocerySection /></CardContent></Card></TabsContent>
      <TabsContent value="festivals"><Card><CardContent><FestivalsEventsSection /></CardContent></Card></TabsContent>
      <TabsContent value="student"><Card><CardContent><StudentLifeSection /></CardContent></Card></TabsContent>
      <TabsContent value="bureaucracy"><Card><CardContent><BureaucracySection /></CardContent></Card></TabsContent>
      <TabsContent value="mental"><Card><CardContent><MentalHealthSection /></CardContent></Card></TabsContent>
      <TabsContent value="comparison"><Card><CardContent><CulturalComparisonSection /></CardContent></Card></TabsContent>
      <TabsContent value="living"><Card><CardContent><PracticalLivingSection /></CardContent></Card></TabsContent>
      <TabsContent value="safety"><Card><CardContent><SafetySection /></CardContent></Card></TabsContent>
      <TabsContent value="indofrench"><Card><CardContent><IndoFrenchSection /></CardContent></Card></TabsContent>
    </Tabs>
  );
}
