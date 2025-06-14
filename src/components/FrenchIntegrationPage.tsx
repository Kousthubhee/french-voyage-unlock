import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import {
  Languages,
  Users,
  Utensils,
  Calendar,
  Home,
  FileText,
  Brain,
  Globe,
  BookOpen,
  Sun,
  Shield,
  IndianRupee,
  Link as LinkIcon,
  Newspaper,
  MessageCircle,
  Star,
} from 'lucide-react';

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

// Define module descriptors for each tab
const socialModules = [
  {
    id: "language",
    icon: <Languages className="h-7 w-7 text-blue-600" />,
    color: "blue",
    title: "🗣️ Language & Communication",
    content: (
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="phrases">
          <AccordionTrigger>1. Daily French Phrases for Survival</AccordionTrigger>
          <AccordionContent>
            <div className="mb-2 font-semibold text-blue-800">Greetings</div>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Bonjour (Good morning/afternoon) – Used until 6 PM</li>
              <li>Bonsoir (Good evening) – Used after 6 PM</li>
              <li>Salut (Hi/Bye) – Informal for friends</li>
              <li>Au revoir (Goodbye) – Formal farewell</li>
            </ul>
            <div className="mt-2 font-semibold text-blue-800">Groceries</div>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Où est… ? (Where is…?)</li>
              <li>Combien ça coûte ? (How much does it cost?)</li>
              <li>Je voudrais… (I would like…)</li>
              <li>Avez-vous… ? (Do you have…?)</li>
            </ul>
            <div className="mt-2 font-semibold text-blue-800">Emergencies</div>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Aidez-moi ! (Help me!)</li>
              <li>Appelez une ambulance ! (Call an ambulance!)</li>
              <li>Je ne me sens pas bien. (I don’t feel well.)</li>
              <li>Où est l’hôpital ? (Where is the hospital?)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="slang-formal">
          <AccordionTrigger>2. Slang vs Formal French Usage Guide</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Use <b>"vous"</b> with strangers, elderly, and professionals</li>
              <li>Use <b>"tu"</b> with friends and peers; slang like "cool" or "sympa"</li>
              <li>Start formal, wait for "tu" invitation</li>
              <li>Avoid slang in business settings</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="voice-pronunciation">
          <AccordionTrigger>3. Voice & Pronunciation Practice</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li><b>Bonjour</b> (bohn-zhoor) – Practice nasal “on” sound</li>
              <li><b>Merci</b> (mair-see) – Soft “r” and clear “i”</li>
              <li><b>Excusez-moi</b> (ex-koo-zay-mwa) – Emphasize “mwa”</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="gestures">
          <AccordionTrigger>4. Common Cultural Gestures and What They Mean</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Shrugging shoulders – Indifference or “I don’t know”</li>
              <li>Cheek kiss (la bise) – Greeting close friends</li>
              <li>Pointing with lips – Directing attention subtly</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="convo-scenarios">
          <AccordionTrigger>5. Conversation Scenarios</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>At a bakery: "Bonjour, une baguette s’il vous plaît."</li>
              <li>At prefecture: "Bonjour, je suis ici pour ma carte de séjour."</li>
              <li>At doctor’s: "Bonjour, j’ai besoin d’une consultation."</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    id: "etiquette",
    icon: <Users className="h-7 w-7 text-cyan-700" />,
    color: "cyan",
    title: "🤝 Cultural Etiquette",
    content: (
      <Accordion type="multiple">
        <AccordionItem value="norms">
          <AccordionTrigger>1. French Social Norms</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Arrive on time for professional meetings</li>
              <li>Maintain arm’s length personal space</li>
              <li>Directness is common, don’t take it personally</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="dos-donts">
          <AccordionTrigger>2. Do’s and Don’ts in Public Settings</AccordionTrigger>
          <AccordionContent>
            <div className="mb-1 font-semibold">Métro:</div>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Keep voice low, no loud calls</li>
              <li>Offer seats to elderly or pregnant passengers</li>
              <li>Avoid eating or drinking</li>
            </ul>
            <div className="mt-2 mb-1 font-semibold">Markets:</div>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Greet vendors with "Bonjour"</li>
              <li>Don’t haggle, prices are fixed</li>
              <li>Carry cash for small purchases</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="dining-etiquette">
          <AccordionTrigger>3. Dining Etiquette in France</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Place bread on table, not plate</li>
              <li>Say "bon appétit" before eating</li>
              <li>Keep hands on table, not lap</li>
              <li>Tipping 5-10% for exceptional service</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="how-greet">
          <AccordionTrigger>4. How to Greet</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>La bise (cheek kisses) for close friends, 2–4 times</li>
              <li>Handshake for formal or first meetings</li>
              <li>Use "Monsieur" or "Madame" with titles</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    id: "festivals",
    icon: <Calendar className="h-7 w-7 text-orange-500" />,
    color: "orange",
    title: "🎉 Festivals & Social Events",
    content: (
      <Accordion type="multiple">
        <AccordionItem value="holidays-events">
          <AccordionTrigger>1. French Public Holidays and Cultural Events (2025)</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>New Year’s Day (January 1)</li>
              <li>Easter Monday (April 21)</li>
              <li>Labor Day (May 1)</li>
              <li>Victory Day (May 8)</li>
              <li>Ascension Day (May 29)</li>
              <li>Whit Monday (June 9)</li>
              <li>Bastille Day (July 14)</li>
              <li>Assumption Day (August 15)</li>
              <li>All Saints’ Day (November 1)</li>
              <li>Armistice Day (November 11)</li>
              <li>Christmas Day (December 25)</li>
              <li>Fête de la Musique (June 21)</li>
              <li>Tour de France (July 5–27)</li>
              <li>Summer Sales (June 25–July 22)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="local-events-meetups">
          <AccordionTrigger>2. Joining Local Events & Meetups</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Use Meetup for local groups</li>
              <li>Join Erasmus events at universities</li>
              <li>Attend city festivals (e.g., Nice Carnival)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="potluck-party">
          <AccordionTrigger>3. How to Host/Attend a Potluck or Party in France</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Bring a dish to share</li>
              <li>Arrive 15 minutes late (quart d’heure de politesse)</li>
              <li>Offer to help clean up</li>
              <li>Thank host with "Merci pour l’invitation"</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
];

const foodModules = [
  {
    id: "food-guide",
    icon: <Utensils className="h-7 w-7 text-green-600" />,
    color: "green",
    title: "🍽️ Food & Grocery Guidance",
    content: (
      <Accordion type="multiple">
        <AccordionItem value="eating-habits">
          <AccordionTrigger>1. French Eating Habits</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Lunch at 12–2 PM, dinner at 7–9 PM</li>
              <li>Cold food (e.g., salads) common</li>
              <li>Smaller portions, multiple courses</li>
              <li>Coffee after meals, not during</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="food-labels">
          <AccordionTrigger>2. Reading Food Labels and Identifying Dietary Needs</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Look for "végétarien" or "sans viande"</li>
              <li>Halal marked as "halal" on packaging</li>
              <li>Check ingredients for pork (porc)</li>
              <li>Ask staff if unsure: "Est-ce végétarien/halal ?"</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="specialty-shopping">
          <AccordionTrigger>3. Tips for Specialty Grocery Shopping</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Specialty items at Carrefour or Leclerc</li>
              <li>Visit local Asian or African markets for diverse spices</li>
              <li>Check online stores for international products</li>
              <li>Explore ethnic food shops in major cities</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="allergy-phrases">
          <AccordionTrigger>4. Explaining Allergies or Dietary Restrictions in French</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Je suis allergique à... (I am allergic to...)</li>
              <li>Je ne mange pas de... (I don’t eat...)</li>
              <li>Pouvez-vous éviter...? (Can you avoid...?)</li>
              <li>Je suis végétarien/vegan. (I am vegetarian/vegan.)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
];

// TODO: Define practicalModules and newsModules similarly with their content

export const FrenchIntegrationPage = () => {
  // Modal/UI state
  const [usefulLinksOpen, setUsefulLinksOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Tab state: Social Integration, Food, Practical Living, etc.
  const [activeTab, setActiveTab] = useState<'social' | 'food' | 'practical' | 'news'>('social');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // Handle feedback "send"
  const handleFeedbackSubmit = () => {
    setFeedbackSent(true);
    setFeedbackText("");
    setTimeout(() => {
      setFeedbackOpen(false);
      setFeedbackSent(false);
    }, 1800);
  };

  // Card render helper for a module
  const ModuleGrid = ({ modules }: { modules: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {modules.map((module) => (
        <Card
          key={module.id}
          className="transition-all duration-300 hover:scale-[1.03] border-2 border-transparent hover:border-blue-200 cursor-pointer"
          onClick={() => setExpandedModuleId(expandedModuleId === module.id ? null : module.id)}
        >
          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              {module.icon}
              <span className={`ml-2 text-xl font-semibold text-${module.color}-900`}>{module.title}</span>
            </div>
            {expandedModuleId === module.id && (
              <div className="mt-2">{module.content}</div>
            )}
            {expandedModuleId !== module.id && (
              <div className="text-gray-500 text-sm">Click to expand details...</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

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

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <Button variant={activeTab === 'social' ? 'secondary' : 'ghost'} onClick={() => { setActiveTab('social'); setExpandedModuleId(null); }}>
          Social Integration
        </Button>
        <Button variant={activeTab === 'food' ? 'secondary' : 'ghost'} onClick={() => { setActiveTab('food'); setExpandedModuleId(null); }}>
          Food & Groceries
        </Button>
        <Button variant={activeTab === 'practical' ? 'secondary' : 'ghost'} onClick={() => { setActiveTab('practical'); setExpandedModuleId(null); }}>
          Practical Living
        </Button>
        <Button variant={activeTab === 'news' ? 'secondary' : 'ghost'} onClick={() => { setActiveTab('news'); setExpandedModuleId(null); }}>
          News & Media
        </Button>
      </div>

      {activeTab === 'social' && <ModuleGrid modules={socialModules} />}
      {activeTab === 'food' && <ModuleGrid modules={foodModules} />}
      {/* TODO: Create "practicalModules" and "newsModules" arrays and plug in here similarly */}

      {/* Useful Links Modal */}
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

      {/* Feedback Modal */}
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
              <Button onClick={handleFeedbackSubmit} className="mt-4 w-full">
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
