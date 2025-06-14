
import React, { useState } from "react";
import {
  Languages, Users, Calendar, Utensils, Home, FileText, Brain, BookOpen, Sun,
  Shield, IndianRupee, Globe, MessageCircle, Link as LinkIcon, Newspaper, ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FrenchIntegrationModuleCard from "./FrenchIntegrationModuleCard";

// Hardcoded modules meta-info
const modulesMeta = [
  {
    key: "language",
    title: "Language & Communication",
    icon: <Languages />,
    topicCount: 5,
    description: "Essential French phrases, daily convos, and pronunciation tips.",
    colorClass: "text-blue-700",
  },
  {
    key: "etiquette",
    title: "Cultural Etiquette",
    icon: <Users />,
    topicCount: 4,
    description: "Master polite norms, greetings, and public dos and don'ts.",
    colorClass: "text-cyan-800",
  },
  {
    key: "events",
    title: "Festivals & Social Events",
    icon: <Calendar />,
    topicCount: 3,
    description: "Key holidays, how to join and host French parties.",
    colorClass: "text-orange-700",
  },
  {
    key: "food",
    title: "Food & Groceries",
    icon: <Utensils />,
    topicCount: 4,
    description: "Eating habits, labels, allergy tips, and specialty shopping.",
    colorClass: "text-green-700",
  },
  {
    key: "studentLife",
    title: "Student Life Integration",
    icon: <Home />,
    topicCount: 6,
    description: "Housing, finances, academics, volunteering and more.",
    colorClass: "text-amber-900",
  },
  {
    key: "bureaucracy",
    title: "French Bureaucracy",
    icon: <FileText />,
    topicCount: 3,
    description: "Navigate prefectures, polite phrases, and follow-up tips.",
    colorClass: "text-violet-700",
  },
  {
    key: "mentalHealth",
    title: "Mental Health & Tips",
    icon: <Brain />,
    topicCount: 3,
    description: "Culture shock, support groups, and wellbeing resources.",
    colorClass: "text-fuchsia-700",
  },
  {
    key: "culturalComparison",
    title: "Cultural Comparison",
    icon: <BookOpen />,
    topicCount: 4,
    description: "French vs Indian education, work, and value systems.",
    colorClass: "text-pink-800",
  },
  {
    key: "practicalLiving",
    title: "Practical Living",
    icon: <Sun />,
    topicCount: 2,
    description: "Weather hacks, public transport, and local survival tips.",
    colorClass: "text-yellow-600",
  },
  {
    key: "safety",
    title: "Safety & Emergency",
    icon: <Shield />,
    topicCount: 1,
    description: "Emergency contacts, helplines, and personal safety advice.",
    colorClass: "text-red-700",
  },
  {
    key: "indoFrench",
    title: "Indo-French Integration",
    icon: <IndianRupee />,
    topicCount: 4,
    description: "Compare life, food, and homesickness from a Desi lens.",
    colorClass: "text-orange-900",
  }
];

// Dummy topics for demo: would map each module key to its topic accordion previously used
const allTopics: Record<string, Array<{ title: string; content: React.ReactNode }>> = {
  language: [
    { title: "Daily Phrases", content: "Bonjour, Merci, Où est...? (Where is...?) etc." },
    { title: "Slang vs. Formal", content: "Use 'tu' with friends, 'vous' for strangers. Avoid slang in business." },
    { title: "Pronunciation", content: "Practice nasal 'on', soft 'r', clear 'i' in Merci." },
    { title: "Cultural Gestures", content: "French shrug, la bise, use of lips for pointing." },
    { title: "Conversation Scenarios", content: "Bakery: 'Une baguette, s'il vous plaît.' Prefecture: 'Je suis ici pour...'" },
  ],
  etiquette: [
    { title: "Social Norms", content: "Arrive on time, arm’s length distance, directness." },
    { title: "Do’s and Don’ts", content: "Quiet metro, greet vendors at market, tipping." },
    { title: "Dining Etiquette", content: "Bread on table, bon appétit, hands visible." },
    { title: "How to Greet", content: "Bise for friends, handshake for formal, use 'Monsieur/Madame'." },
  ],
  events: [
    { title: "French Holidays", content: "Bastille Day, Easter Monday, Fête de la Musique, etc." },
    { title: "Joining Events", content: "Meetup app, Erasmus nights, city festivals." },
    { title: "Parties & Potlucks", content: "Bring a dish, arrive fashionably late, thank the host." },
  ],
  food: [
    { title: "French Eating Habits", content: "12–2 PM lunch, small portions, coffee after food." },
    { title: "Food Labels", content: "Look for végétarien/halal, ask staff for clarity." },
    { title: "Specialty Shopping", content: "Carrefour, ethnic stores, online shopping." },
    { title: "Allergy Phrases", content: "Je suis allergique à..., Pouvez-vous éviter...?" },
  ],
  studentLife: [
    { title: "Housing Etiquette", content: "Quiet hours, recycling, greeting neighbors." },
    { title: "Academic Culture", content: "Raise hand, address profs formally, polite emails." },
    { title: "Volunteering", content: "Join uni programs, charity, student associations." },
    { title: "Homesickness", content: "Connect with international students, join forums." },
    { title: "Part-time Jobs", content: "Allowed 964 hrs, job boards, interviews." },
    { title: "Financial Planning", content: "CAF aid, student vouchers, open bank account." },
  ],
  bureaucracy: [
    { title: "Polite Phrases", content: "Je suis ici pour..., Pourriez-vous m’aider ?, Merci, Cordialement." },
    { title: "Admin Frustrations", content: "Stay calm, ask for supervisor, bring all documents." },
    { title: "Templates", content: "Subject: Suivi de ma demande. Bonjour Madame/Monsieur..." },
  ],
  mentalHealth: [
    { title: "Culture Shock Tips", content: "Take time, create routines, connect with others." },
    { title: "Support Groups", content: "Student assoc., community centers, Facebook groups." },
    { title: "Mindfulness Resources", content: "Headspace, YouTube, local yoga." },
  ],
  culturalComparison: [
    { title: "Education Diff.", content: "French: lecture/group, India: exam/individual." },
    { title: "Workplace Comm.", content: "French: direct, debate; India: respectful, hierarchy." },
    { title: "Value Systems", content: "France: individualism; India: family focus." },
    { title: "Formality & Hierarchy", content: "France: informal after rapport, India: longer formal." },
  ],
  practicalLiving: [
    { title: "Weather Tips", content: "Warm June, autumn rain, winter coats, sunscreen." },
    { title: "Public Transport", content: "Navigo pass Paris, SNCF apps, student discounts." },
  ],
  safety: [
    { title: "Emergency Contacts", content: "112 emergency, 17 police, 15 medical, campus security." },
  ],
  indoFrench: [
    { title: "Edu Comparison", content: "France: flexible, India: exam-heavy." },
    { title: "Indian Community", content: "Student groups, temples, FB groups." },
    { title: "Indian Diet", content: "Buy dal/masala at Indian stores, veg/halal labels." },
    { title: "Homesickness", content: "Celebrate Diwali, cook familiar dishes." },
  ]
};
// Sample data for student favorites
const studentFavorites = [
  {
    city: "Paris",
    cafes: ["Café de Flore", "Le Procope", "Shakespeare & Company Café"],
    studySpots: ["Bibliothèque François-Mitterrand", "Cité Internationale Universitaire Library"],
    clubs: ["Rex Club", "Le Duplex", "Nouveau Casino"],
  },
  {
    city: "Lyon",
    cafes: ["Café Mokxa", "Le Luminarium", "Slake Coffee"],
    studySpots: ["Bibliothèque de la Part-Dieu", "Université de Lyon Library"],
    clubs: ["Le Sucre", "Transbordeur", "L'Absolu"],
  },
  {
    city: "Marseille",
    cafes: ["Café de la Banque", "Noailles Café"],
    studySpots: ["Alcazar Library", "Université Aix-Marseille Library"],
    clubs: ["Le Trolleybus", "Baby Club"],
  }
];

// Useful links
const usefulLinks = [
  {
    label: "Campus France (Official student portal)",
    url: "https://www.campusfrance.org/en"
  },
  {
    label: "Indian in France Facebook group",
    url: "https://www.facebook.com/groups/indiansinfrance/"
  },
  {
    label: "French-English Dictionary (WordReference)",
    url: "https://www.wordreference.com/"
  },
  {
    label: "Duolingo (App)",
    url: "https://www.duolingo.com/"
  },
  {
    label: "OFII (French Immigration & Integration)",
    url: "https://www.ofii.fr/en/"
  },
  {
    label: "24/7 Emergency Number (All Europe): 112",
    url: "tel:112"
  }
];

// French News/Media
const newsMediaRecommendations = [
  {
    type: "Newspaper",
    name: "Le Petit Journal",
    url: "https://www.lepetitjournal.com/",
    description: "Simplified news in French for beginners.",
  },
  {
    type: "YouTube",
    name: "Piece of French",
    url: "https://www.youtube.com/c/PieceofFrench",
    description: "French lessons and vlogs with real-life context.",
  },
  {
    type: "Podcast",
    name: "Coffee Break French",
    url: "https://radiolingua.com/coffeebreakfrench/",
    description: "Short French conversations for learners.",
  },
  {
    type: "App",
    name: "Duolingo French Podcast",
    url: "https://podcast.duolingo.com/french",
    description: "Engaging short stories for French practice.",
  }
];

// Major French holidays/events for calendar
const frenchEvents = [
  { date: "Jan 1", name: "New Year's Day" },
  { date: "Apr 21", name: "Easter Monday" },
  { date: "May 1", name: "Labour Day" },
  { date: "July 14", name: "Bastille Day" },
  { date: "Sept (varies)", name: "La Rentrée (Back to School/Uni)" },
  { date: "Nov 1", name: "All Saints' Day" },
  { date: "Dec 25", name: "Christmas" },
  { date: "June (varies)", name: "Fête de la Musique" },
  { date: "Uni fests", name: "Student Welcome Days, Erasmus Nights" }
];

// Feedback & dialog state hooks left the same...
export const FrenchIntegrationPage = () => {
  const [usefulLinksOpen, setUsefulLinksOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Main state: which module is expanded?
  const [expandedModuleKey, setExpandedModuleKey] = useState<string | null>(null);

  // Helper: back to grid
  const handleBack = () => setExpandedModuleKey(null);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center text-indigo-900 mb-2">
            <Globe className="h-8 w-8 mr-3 text-indigo-600" />
            French Cultural Integration
          </h1>
          <div className="text-gray-600 text-lg">Interactive and practical guide for thriving in France</div>
        </div>
        <div className="flex flex-row gap-2">
          <Button variant="outline" onClick={() => setUsefulLinksOpen(true)}>
            <LinkIcon className="h-5 w-5 mr-2" />
            Useful Links & Contacts
          </Button>
          <Button variant="outline" onClick={() => setFeedbackOpen(true)}>
            <MessageCircle className="h-5 w-5 mr-1" />
            Feedback
          </Button>
        </div>
      </div>

      {/* Module grid, or expanded view */}
      {!expandedModuleKey ? (
        // GRID VIEW
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mb-12">
          {modulesMeta.map((mod) => (
            <FrenchIntegrationModuleCard
              key={mod.key}
              icon={mod.icon}
              title={mod.title}
              topicCount={mod.topicCount}
              description={mod.description}
              colorClass={mod.colorClass}
              onClick={() => setExpandedModuleKey(mod.key)}
            />
          ))}
        </div>
      ) : (
        // EXPANDED MODULE
        <div className="mb-10 animate-fade-in">
          <Button variant="ghost" size="sm" className="mb-3 flex items-center" onClick={handleBack}>
            <span className="mr-2">{/* Back arrow, using lucide ArrowRight rotated */}<span className="inline-block rotate-180"><ArrowRight className="h-4 w-4" /></span></span>
            Back to Modules
          </Button>
          <Card className="mb-4">
            <CardContent className="pt-8 pb-6 px-7">
              <div className="flex items-center gap-3 mb-2">
                <span className={modulesMeta.find(m => m.key === expandedModuleKey)?.colorClass + " text-2xl"}>
                  {modulesMeta.find(m => m.key === expandedModuleKey)?.icon}
                </span>
                <span className="font-bold text-xl">{modulesMeta.find(m => m.key === expandedModuleKey)?.title}</span>
                <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
                  {modulesMeta.find(m => m.key === expandedModuleKey)?.topicCount} topics
                </span>
              </div>
              <div className="text-gray-600 mb-4">
                {modulesMeta.find(m => m.key === expandedModuleKey)?.description}
              </div>
              <ol className="space-y-4 mt-7">
                {(allTopics[expandedModuleKey] || []).map((topic, idx) => (
                  <li key={topic.title} className="border-l-4 pl-4 border-indigo-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-indigo-700 font-bold">{idx + 1}.</span>
                      <span className="font-semibold">{topic.title}</span>
                    </div>
                    <div className="text-gray-700 mt-1 text-sm">{topic.content}</div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Useful Links Dialog */}
      <Dialog open={usefulLinksOpen} onOpenChange={setUsefulLinksOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              <LinkIcon className="mr-2 h-6 w-6 text-indigo-600" />
              Useful Links & Contacts
            </DialogTitle>
          </DialogHeader>
          <ul className="space-y-3 mt-4">
            {usefulLinks.map(l =>
              <li key={l.label}>
                <a href={l.url} target="_blank" rel="noopener" className="text-blue-600 hover:underline flex items-center">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {l.label}
                </a>
              </li>
            )}
          </ul>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              <MessageCircle className="mr-2 h-6 w-6 text-green-600" />
              Suggest a Topic or Send Feedback
            </DialogTitle>
          </DialogHeader>
          {!feedbackSent ? (
            <div>
              <div className="mb-3 text-gray-700">
                Which French habit/culture surprised you most? What topic or resource would help you thrive? We value your input!
              </div>
              <Input
                placeholder="Share your feedback or suggestions here"
                value={feedbackText}
                maxLength={200}
                onChange={e => setFeedbackText(e.target.value)}
              />
              <Button onClick={() => {
                setFeedbackSent(true);
                setFeedbackText("");
                setTimeout(() => {
                  setFeedbackOpen(false);
                  setFeedbackSent(false);
                }, 1800);
              }} className="mt-4 w-full">
                Submit Feedback
              </Button>
            </div>
          ) : (
            <div className="py-6 text-center text-green-600 font-medium">
              Thank you for your feedback! 🌟
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
