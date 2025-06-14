
import { FrenchIntegrationModulesOverview } from "./french-integration/FrenchIntegrationModulesOverview";
import { GlossarySidebar } from "./FrenchGlossarySidebar";

export const FrenchIntegrationPage = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* LEFT COLUMN - MAIN CONTENT */}
      <div className="w-full lg:w-3/4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 mb-2">
              🇫🇷 French Integration Guide
            </h1>
            <div className="text-gray-600 text-lg">
              Interactive, step-by-step advice for thriving as a student in France
            </div>
          </div>
        </div>
        {/* Grid of modules/cards */}
        <FrenchIntegrationModulesOverview />
      </div>

      {/* RIGHT COLUMN - SIDEBAR */}
      <div className="w-full lg:w-1/4 flex flex-col sticky top-6 gap-6 h-max">
        <GlossarySidebar />
      </div>
    </div>
  );
};
