
import { Card, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { GlossarySidebar } from "./FrenchGlossarySidebar";

// Import all section components
import { LanguageCommunicationSection } from "./french-integration/sections/LanguageCommunicationSection";
import { CulturalEtiquetteSection } from "./french-integration/sections/CulturalEtiquetteSection";
import { FoodGrocerySection } from "./french-integration/sections/FoodGrocerySection";
import { FestivalsEventsSection } from "./french-integration/sections/FestivalsEventsSection";
import { StudentLifeSection } from "./french-integration/sections/StudentLifeSection";
import { BureaucracySection } from "./french-integration/sections/BureaucracySection";
import { MentalHealthSection } from "./french-integration/sections/MentalHealthSection";
import { CulturalComparisonSection } from "./french-integration/sections/CulturalComparisonSection";
import { PracticalLivingSection } from "./french-integration/sections/PracticalLivingSection";
import { SafetySection } from "./french-integration/sections/SafetySection";
import { IndoFrenchSection } from "./french-integration/sections/IndoFrenchSection";

export const FrenchIntegrationPage = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* LEFT COLUMN - MAIN CONTENT */}
      <div className="w-full lg:w-3/4">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center text-indigo-900 mb-2">
              <Globe className="h-8 w-8 mr-3 text-indigo-600" />
              French Cultural Integration
            </h1>
            <div className="text-gray-600 text-lg">Your practical guide for thriving in France - detailed edition</div>
          </div>
        </div>
        {/* MAIN SECTIONS */}
        <Card className="mb-8"><CardContent className="p-6"><LanguageCommunicationSection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><CulturalEtiquetteSection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><FoodGrocerySection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><FestivalsEventsSection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><StudentLifeSection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><BureaucracySection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><MentalHealthSection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><CulturalComparisonSection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><PracticalLivingSection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><SafetySection /></CardContent></Card>
        <Card className="mb-8"><CardContent className="p-6"><IndoFrenchSection /></CardContent></Card>
      </div>

      {/* RIGHT COLUMN - SIDEBAR */}
      <div className="w-full lg:w-1/4 flex flex-col sticky top-6 gap-6 h-max">
        <GlossarySidebar />
      </div>
    </div>
  );
};
