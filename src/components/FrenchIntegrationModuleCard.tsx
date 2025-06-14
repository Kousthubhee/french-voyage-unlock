
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FrenchIntegrationModuleCardProps {
  icon: React.ReactNode;
  title: string;
  topicCount: number;
  description: string;
  colorClass?: string;
  onClick?: () => void;
}

export const FrenchIntegrationModuleCard: React.FC<FrenchIntegrationModuleCardProps> = ({
  icon,
  title,
  topicCount,
  description,
  colorClass = "text-indigo-700",
  onClick,
}) => (
  <button
    className={cn(
      "group relative flex flex-col items-start justify-between rounded-xl bg-white shadow-md border p-5 w-full aspect-square min-h-[220px] transition hover:shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
      "hover:scale-105 active:scale-100"
    )}
    tabIndex={0}
    onClick={onClick}
    aria-label={`${title}: Start Learning`}
    type="button"
  >
    <div className="flex items-center justify-between w-full">
      <span className={cn("text-3xl", colorClass)}>{icon}</span>
      <span className={cn(
        "rounded-full px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700",
        colorClass
      )}>
        {topicCount} topics
      </span>
    </div>
    <div className="mt-4">
      <div className={cn("text-lg font-bold mb-1", colorClass)}>{title}</div>
      <div className="text-sm text-gray-600 min-h-[38px]">{description}</div>
    </div>
    <div className="mt-auto w-full flex justify-between items-center pt-3">
      <span
        className={cn("font-medium text-indigo-700 text-sm group-hover:underline flex items-center gap-2", colorClass)}
      >
        Start Learning
        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </span>
    </div>
  </button>
);

export default FrenchIntegrationModuleCard;
