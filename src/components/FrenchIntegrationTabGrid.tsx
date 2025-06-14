
import React from "react";
import ModuleCard from "./ModuleCard";
import { ModuleContent } from "@/data/frenchIntegrationModules";

interface FrenchIntegrationTabGridProps {
  modules: ModuleContent[];
}
const FrenchIntegrationTabGrid: React.FC<FrenchIntegrationTabGridProps> = ({ modules }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {modules.map((mod, idx) => (
      <ModuleCard key={mod.title + idx} title={mod.title} preview={mod.preview} details={mod.details} />
    ))}
  </div>
);

export default FrenchIntegrationTabGrid;
