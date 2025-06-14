
export interface FrenchIntegrationModule {
  id: string;
  emoji: string;
  title: string;
  excerpt: string;
  contentComponent: React.ComponentType;
}

import { ModuleLanguage } from "./ModuleLanguage";
import { ModuleCulture } from "./ModuleCulture";
import { ModuleFood } from "./ModuleFood";
import { ModuleFestivals } from "./ModuleFestivals";
import { ModuleStudentLife } from "./ModuleStudentLife";
import { ModuleBureaucracy } from "./ModuleBureaucracy";
import { ModuleMentalHealth } from "./ModuleMentalHealth";
import { ModuleCulturalComparison } from "./ModuleCulturalComparison";
import { ModulePracticalLiving } from "./ModulePracticalLiving";
import { ModuleSafety } from "./ModuleSafety";
import { ModuleIndoFrench } from "./ModuleIndoFrench";

export const modulesData: FrenchIntegrationModule[] = [
  {
    id: "language",
    emoji: "🗣️",
    title: "Language & Communication",
    excerpt: "French survival phrases, speaking tips, gestures, and social scenarios.",
    contentComponent: ModuleLanguage,
  },
  {
    id: "culture",
    emoji: "🤝",
    title: "Cultural Etiquette",
    excerpt: "Norms, do's & don’ts, dining, how to greet, and daily behaviors.",
    contentComponent: ModuleCulture,
  },
  {
    id: "food",
    emoji: "🍽️",
    title: "Food & Grocery Guidance",
    excerpt: "Eating habits, label reading, specialty shopping, dietary guides.",
    contentComponent: ModuleFood,
  },
  {
    id: "festivals",
    emoji: "🎉",
    title: "Festivals & Social Events",
    excerpt: "French holidays, joining meetups, hosting parties, and more.",
    contentComponent: ModuleFestivals,
  },
  {
    id: "student-life",
    emoji: "🏠",
    title: "Student Life Integration",
    excerpt: "Housing, academics, volunteering, work, finance, and community.",
    contentComponent: ModuleStudentLife,
  },
  {
    id: "bureaucracy",
    emoji: "📄",
    title: "French Bureaucracy Made Simple",
    excerpt: "Surviving admin, polite scripts, respectful communication.",
    contentComponent: ModuleBureaucracy,
  },
  {
    id: "mental-health",
    emoji: "🧠",
    title: "Mental Health & Adjustment Tips",
    excerpt: "Culture shock, support groups, self-care, mindfulness.",
    contentComponent: ModuleMentalHealth,
  },
  {
    id: "cultural-comparison",
    emoji: "🌐",
    title: "Cultural Comparison",
    excerpt: "Education, workplace style, values, hierarchy differences.",
    contentComponent: ModuleCulturalComparison,
  },
  {
    id: "practical-living",
    emoji: "📍",
    title: "Practical Living",
    excerpt: "Weather, seasonal tips, navigating public transport.",
    contentComponent: ModulePracticalLiving,
  },
  {
    id: "safety",
    emoji: "🛡️",
    title: "Safety & Emergency",
    excerpt: "Emergency numbers, safety tips, lost docs, university security.",
    contentComponent: ModuleSafety,
  },
  {
    id: "indo-french",
    emoji: "🇮🇳",
    title: "Indo-French Integration",
    excerpt: "Cultural comparison, Indian community, dietary, homesickness.",
    contentComponent: ModuleIndoFrench,
  },
];
