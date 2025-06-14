
import {
  BookOpen,
  MessageSquare,
  Users,
  Utensils,
  Calendar,
  Home,
  FileText,
  Brain,
  Globe,
  MapPin,
  Shield,
  IndianRupee,
} from "lucide-react";
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MODULES = [
  {
    key: "lang",
    icon: <MessageSquare size={32} className="text-indigo-600"/>,
    iconBg: "bg-indigo-100",
    title: "Language & Communication",
    topics: 5,
  },
  {
    key: "etiquette",
    icon: <Users size={32} className="text-yellow-600"/>,
    iconBg: "bg-yellow-100",
    title: "Cultural Etiquette",
    topics: 4,
  },
  {
    key: "food",
    icon: <Utensils size={32} className="text-green-700"/>,
    iconBg: "bg-green-100",
    title: "Food & Grocery Guidance",
    topics: 4,
  },
  {
    key: "events",
    icon: <Calendar size={32} className="text-orange-500"/>,
    iconBg: "bg-orange-100",
    title: "Festivals & Social Events",
    topics: 3,
  },
  {
    key: "student",
    icon: <Home size={32} className="text-yellow-700"/>,
    iconBg: "bg-yellow-200",
    title: "Student Life Integration",
    topics: 6,
  },
  {
    key: "bureaucracy",
    icon: <FileText size={32} className="text-rose-700"/>,
    iconBg: "bg-red-100",
    title: "French Bureaucracy Made Simple",
    topics: 3,
  },
  {
    key: "mental",
    icon: <Brain size={32} className="text-teal-600"/>,
    iconBg: "bg-teal-100",
    title: "Mental Health & Adjustment Tips",
    topics: 3,
  },
  {
    key: "cultural",
    icon: <Globe size={32} className="text-indigo-500"/>,
    iconBg: "bg-indigo-100",
    title: "Cultural Comparison",
    topics: 4,
  },
  {
    key: "practical",
    icon: <MapPin size={32} className="text-cyan-700"/>,
    iconBg: "bg-cyan-100",
    title: "Practical Living",
    topics: 2,
  },
  {
    key: "safety",
    icon: <Shield size={32} className="text-pink-400"/>,
    iconBg: "bg-pink-100",
    title: "Safety and Emergency Resources",
    topics: 1,
  },
  {
    key: "indo",
    icon: <IndianRupee size={32} className="text-orange-700"/>,
    iconBg: "bg-orange-200",
    title: "Indo-French Integration",
    topics: 4,
  },
];

export function FrenchIntegrationModulesOverview() {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-7 w-full">
      {MODULES.map((mod) => (
        <Card
          key={mod.key}
          className="p-6 bg-white shadow rounded-xl flex flex-col gap-4 hover:ring-2 hover:ring-indigo-200 transition-all relative"
        >
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center mb-2 shrink-0",
            mod.iconBg
          )}>
            {mod.icon}
          </div>
          <div className="font-semibold text-lg text-gray-900 mb-1">{mod.title}</div>
          <div className="text-gray-500 text-sm">{mod.topics} topic{mod.topics !== 1 && "s"} available</div>
          <a
            href="#"
            className="text-indigo-600 text-sm flex items-center gap-2 mt-auto font-medium hover:underline"
          >
            <BookOpen size={16} className="inline" />
            Start Learning
          </a>
          <span className="absolute right-4 top-4 text-gray-300">
            &gt;
          </span>
        </Card>
      ))}
    </div>
  );
}
