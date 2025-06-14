
import { Globe } from "lucide-react";
import { GlossarySidebar } from "./FrenchGlossarySidebar";
import { FrenchIntegrationTabs } from "./french-integration/FrenchIntegrationTabs";

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
            <div className="text-gray-600 text-lg">
              Your practical guide for thriving in France - detailed edition
            </div>
          </div>
        </div>
        {/* TABBED MAIN SECTIONS */}
        <FrenchIntegrationTabs />
      </div>

      {/* RIGHT COLUMN - SIDEBAR */}
      <div className="w-full lg:w-1/4 flex flex-col sticky top-6 gap-6 h-max">
        <GlossarySidebar />
      </div>
    </div>
  );
};
