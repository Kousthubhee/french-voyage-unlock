
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
import { PracticalLivingSection } from "./sections/PracticalLivingSection";
import { StudentLifeSection } from "./sections/StudentLifeSection";
import { FestivalsEventsSection } from "./sections/FestivalsEventsSection";
import { BureaucracySection } from "./sections/BureaucracySection";
import { SafetySection } from "./sections/SafetySection";
import { MentalHealthSection } from "./sections/MentalHealthSection";
import { CulturalComparisonSection } from "./sections/CulturalComparisonSection";
import { IndoFrenchSection } from "./sections/IndoFrenchSection";

export function FrenchIntegrationTabs() {
  return (
    <Tabs defaultValue="communication" className="w-full">
      <TabsList className="flex flex-wrap gap-2 mb-6 bg-gray-100 mt-2">
        <TabsTrigger value="communication">Communication & Etiquette</TabsTrigger>
        <TabsTrigger value="foodliving">Food & Living</TabsTrigger>
        <TabsTrigger value="studentlife">Student & Everyday Life</TabsTrigger>
        <TabsTrigger value="bureaucracy">Bureaucracy & Emergency</TabsTrigger>
        <TabsTrigger value="culturebridge">Cultural Bridge</TabsTrigger>
      </TabsList>

      {/* Communication & Etiquette */}
      <TabsContent value="communication">
        <Card className="mb-4"><CardContent><LanguageCommunicationSection /></CardContent></Card>
        <Card><CardContent><CulturalEtiquetteSection /></CardContent></Card>
      </TabsContent>

      {/* Food & Living */}
      <TabsContent value="foodliving">
        <Card className="mb-4"><CardContent><FoodGrocerySection /></CardContent></Card>
        <Card><CardContent><PracticalLivingSection /></CardContent></Card>
      </TabsContent>

      {/* Student & Everyday Life */}
      <TabsContent value="studentlife">
        <Card className="mb-4"><CardContent><StudentLifeSection /></CardContent></Card>
        <Card><CardContent><FestivalsEventsSection /></CardContent></Card>
        <Card className="mt-4"><CardContent><MentalHealthSection /></CardContent></Card>
      </TabsContent>

      {/* Bureaucracy & Emergency */}
      <TabsContent value="bureaucracy">
        <Card className="mb-4"><CardContent><BureaucracySection /></CardContent></Card>
        <Card><CardContent><SafetySection /></CardContent></Card>
      </TabsContent>

      {/* Cultural Bridge */}
      <TabsContent value="culturebridge">
        <Card className="mb-4"><CardContent><CulturalComparisonSection /></CardContent></Card>
        <Card className="mb-4"><CardContent><IndoFrenchSection /></CardContent></Card>
      </TabsContent>
    </Tabs>
  );
}
