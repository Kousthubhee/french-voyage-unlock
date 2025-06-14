
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
  ArrowLeft,
} from "lucide-react";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MODULES = [
  {
    key: "lang",
    icon: <MessageSquare size={32} className="text-indigo-600" />,
    iconBg: "bg-indigo-100",
    title: "Language & Communication",
    topics: 5,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Language & Communication</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Daily French phrases for survival, greetings, emergencies, and grocery shopping.</li>
          <li>Guide: Slang vs formal French, when to use "vous" or "tu".</li>
          <li>Practice pronunciation: Key everyday expressions.</li>
          <li>Common cultural gestures and their meaning.</li>
          <li>Sample conversation scenarios (bakery, prefecture, doctor’s).</li>
        </ul>
      </div>
    ),
  },
  {
    key: "etiquette",
    icon: <Users size={32} className="text-yellow-600" />,
    iconBg: "bg-yellow-100",
    title: "Cultural Etiquette",
    topics: 4,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Cultural Etiquette</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>French social norms: punctuality, space, directness.</li>
          <li>Do’s and don’ts in public: métro, markets, tips.</li>
          <li>Dining etiquette: bread, saying "bon appétit", hand placement, tipping.</li>
          <li>French greetings: la bise, handshake, using titles.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "food",
    icon: <Utensils size={32} className="text-green-700" />,
    iconBg: "bg-green-100",
    title: "Food & Grocery Guidance",
    topics: 4,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Food & Grocery Guidance</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>French eating habits & meal times.</li>
          <li>How to read food labels, identify vegetarian/halal.</li>
          <li>Shopping: best chains, finding ethnic food, local markets.</li>
          <li>Explaining allergies or restrictions in French.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "events",
    icon: <Calendar size={32} className="text-orange-500" />,
    iconBg: "bg-orange-100",
    title: "Festivals & Social Events",
    topics: 3,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Festivals & Social Events</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>French public holidays and cultural events.</li>
          <li>Joining local events and university meetups.</li>
          <li>How to attend/host a potluck or party in France.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "student",
    icon: <Home size={32} className="text-yellow-700" />,
    iconBg: "bg-yellow-200",
    title: "Student Life Integration",
    topics: 6,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Student Life Integration</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Housing etiquette: noise limits, recycling, meeting neighbors.</li>
          <li>French academic culture & classroom expectations.</li>
          <li>Volunteering, community involvement, student associations.</li>
          <li>Managing homesickness and support groups.</li>
          <li>Part-time jobs & internships; how to apply.</li>
          <li>Financial planning: rent, food, opening bank accounts.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "bureaucracy",
    icon: <FileText size={32} className="text-rose-700" />,
    iconBg: "bg-red-100",
    title: "French Bureaucracy Made Simple",
    topics: 3,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">French Bureaucracy Made Simple</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Basic phrases for prefectures, CAF, OFII, CPAM.</li>
          <li>Handling administrative frustrations gracefully.</li>
          <li>Email/call templates for polite follow-ups.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "mental",
    icon: <Brain size={32} className="text-teal-600" />,
    iconBg: "bg-teal-100",
    title: "Mental Health & Adjustment Tips",
    topics: 3,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Mental Health & Adjustment Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Managing culture shock and transition stress.</li>
          <li>Where to find support groups (onsite/online).</li>
          <li>Mindfulness and meditation resources.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "cultural",
    icon: <Globe size={32} className="text-indigo-500" />,
    iconBg: "bg-indigo-100",
    title: "Cultural Comparison",
    topics: 4,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Cultural Comparison</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Education system differences.</li>
          <li>French workplace communication styles vs others.</li>
          <li>Value systems: collectivist vs individualist cultures.</li>
          <li>Formality & hierarchy in social and work life.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "practical",
    icon: <MapPin size={32} className="text-cyan-700" />,
    iconBg: "bg-cyan-100",
    title: "Practical Living",
    topics: 2,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Practical Living</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Weather and seasonal tips (clothes, adaptation).</li>
          <li>How to use French public transport and apps.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "safety",
    icon: <Shield size={32} className="text-pink-400" />,
    iconBg: "bg-pink-100",
    title: "Safety and Emergency Resources",
    topics: 1,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Safety and Emergency Resources</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Emergency contacts and numbers (police, ambulance, medical).</li>
          <li>Personal safety tips, especially for students.</li>
          <li>What to do if documents are lost/stolen.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "indo",
    icon: <IndianRupee size={32} className="text-orange-700" />,
    iconBg: "bg-orange-200",
    title: "Indo-French Integration",
    topics: 4,
    details: (
      <div>
        <h2 className="text-xl font-bold mb-3">Indo-French Integration</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Indo-French differences: education, workplace, values, hierarchy.</li>
          <li>Indian student/community resources, groups, and temples.</li>
          <li>Finding Indian groceries and communicating dietary needs.</li>
          <li>Managing homesickness for Indian students.</li>
        </ul>
      </div>
    ),
  },
];

export function FrenchIntegrationModulesOverview() {
  const [selected, setSelected] = useState<string | null>(null);
  const activeModule = MODULES.find((m) => m.key === selected);

  if (activeModule) {
    return (
      <div className="w-full flex justify-center">
        <Card className="max-w-xl w-full p-6 bg-white shadow rounded-xl flex flex-col gap-4 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelected(null)}
            className="mb-3 w-fit"
          >
            <ArrowLeft className="mr-1" />
            Back to Modules
          </Button>
          <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center mb-2 shrink-0",
              activeModule.iconBg
            )}>
            {activeModule.icon}
          </div>
          <div className="font-bold text-2xl text-gray-900 mb-1">{activeModule.title}</div>
          <div className="text-gray-500 text-sm mb-2">{activeModule.topics} topic{activeModule.topics !== 1 && "s"} available</div>
          {activeModule.details}
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-7 w-full">
      {MODULES.map((mod) => (
        <Card
          key={mod.key}
          tabIndex={0}
          role="button"
          aria-label={`${mod.title} module`}
          className="p-6 bg-white shadow rounded-xl flex flex-col gap-4 hover:ring-2 hover:ring-indigo-200 transition-all relative cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setSelected(mod.key)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setSelected(mod.key);
          }}
        >
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center mb-2 shrink-0",
            mod.iconBg
          )}>
            {mod.icon}
          </div>
          <div className="font-semibold text-lg text-gray-900 mb-1">{mod.title}</div>
          <div className="text-gray-500 text-sm">
            {mod.topics} topic{mod.topics !== 1 && "s"} available
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="text-indigo-600 text-sm flex items-center gap-2 mt-auto font-medium hover:underline focus:outline-none"
            onClick={e => {
              e.stopPropagation();
              setSelected(mod.key);
            }}
          >
            <BookOpen size={16} className="inline" />
            Start Learning
          </button>
          <span className="absolute right-4 top-4 text-gray-300">
            &gt;
          </span>
        </Card>
      ))}
    </div>
  );
}
