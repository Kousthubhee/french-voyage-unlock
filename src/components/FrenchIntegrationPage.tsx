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
  ChevronRight,
  BookOpen,
  Sun,
  MapPin,
  Briefcase,
  Shield,
  IndianRupee,
  Link as LinkIcon,
  Newspaper,
  MessageCircle,
  Star,
} from 'lucide-react';
import { LocalRecommendations } from "./LocalRecommendations";
import { GlossarySidebar } from "./FrenchGlossarySidebar";

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

export const FrenchIntegrationPage = () => {
  // Modal/UI state
  const [usefulLinksOpen, setUsefulLinksOpen] = useState(false);
  const [newsTabOpen, setNewsTabOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Tab state: Social Integration, Food, Practical Living, etc.
  const [activeTab, setActiveTab] = useState<'social' | 'food' | 'practical' | 'news'>('social');

  // Handle feedback "send"
  const handleFeedbackSubmit = () => {
    setFeedbackSent(true);
    setFeedbackText("");
    setTimeout(() => {
      setFeedbackOpen(false);
      setFeedbackSent(false);
    }, 1800);
  };

  // Merge "Language" and "Cultural Etiquette" under Social Integration
  // Combine Festival, Event Calendar under Social too.

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* LEFT COLUMN - MAIN CONTENT (accordion/tabs) */}
      <div className="w-full lg:w-3/4">
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
          <Button variant={activeTab === 'social' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('social')}>
            Social Integration
          </Button>
          <Button variant={activeTab === 'food' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('food')}>
            Food & Groceries
          </Button>
          <Button variant={activeTab === 'practical' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('practical')}>
            Practical Living
          </Button>
          <Button variant={activeTab === 'news' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('news')}>
            News & Media
          </Button>
        </div>
        {/* Tab content accordions */}
        {activeTab === 'social' && (
          <div>
            {/* Social Integration module (combining Language & Etiquette) */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Languages className="mr-3 h-7 w-7 text-blue-600" />
                  <span className="text-xl font-semibold text-blue-900">Language & Cultural Etiquette</span>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="phrases">
                    <AccordionTrigger>Essential Daily Phrases</AccordionTrigger>
                    <AccordionContent>
                      Bonjour (Good morning), Merci (Thank you), S'il vous plaît (Please), Excusez-moi (Excuse me), Où est ...? (Where is ...?)
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="formal">
                    <AccordionTrigger>Formal vs Informal French</AccordionTrigger>
                    <AccordionContent>
                      "Vous" (formal) is used with strangers or professionals; "tu" (informal) for friends or peers.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="gestures">
                    <AccordionTrigger>French Gestures & Body Language</AccordionTrigger>
                    <AccordionContent>
                      La bise (cheek kiss), shrug for "I don't know", handshakes, "donner un bisou" (give a kiss).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="scenarios">
                    <AccordionTrigger>Typical Scenarios & Politeness</AccordionTrigger>
                    <AccordionContent>
                      Greeting in shops, saying "bonjour" before asking questions, saying "au revoir" when leaving.
                    </AccordionContent>
                  </AccordionItem>
                  {/* ADDITION: Mental Health & Adjustment Tips */}
                  <AccordionItem value="mental-health">
                    <AccordionTrigger>Mental Health & Adjustment Tips</AccordionTrigger>
                    <AccordionContent>
                      <div>
                        Moving abroad can be challenging! France offers student counseling services (often free/low-cost via university), and English-speaking therapists can be found in bigger cities. Normalize culture shock—join student clubs, stay connected with friends/family, and practice self-care. For urgent support, dial 3114 (national helpline for mental health).
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  {/* ADDITION: Cultural Comparison */}
                  <AccordionItem value="cultural-comparison">
                    <AccordionTrigger>Cultural Comparison: France vs India</AccordionTrigger>
                    <AccordionContent>
                      <div>
                        French culture emphasizes formality (bonjour, vous), strict punctuality, and quiet in public spaces. Academic methods focus on discussion and debate. Indian culture may be more relaxed on punctuality, and socializing can be more spontaneous. Both value warmth, but expect to adapt to French directness and privacy norms.
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  {/* ADDITION: Indo-French Integration */}
                  <AccordionItem value="indo-french">
                    <AccordionTrigger>Indo-French Integration</AccordionTrigger>
                    <AccordionContent>
                      <div>
                        Join Indo-French friendship groups or cultural associations in your city (look for "France-Inde" on Facebook), attend Holi/Diwali events, or connect at Indian restaurants. Universities often host "international days" featuring Indian culture, and city libraries carry Indian literature sections.
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Festivals & Events + Calendar */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="mr-3 h-7 w-7 text-orange-500" />
                  <span className="text-xl font-semibold text-orange-700">Festivals, Holidays & Student Events</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-[400px] w-full text-sm">
                    <thead>
                      <tr className="bg-orange-50">
                        <th className="p-2 font-medium text-left">Date</th>
                        <th className="p-2 font-medium text-left">Event</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frenchEvents.map(evt => (
                        <tr key={evt.name}>
                          <td className="p-2">{evt.date}</td>
                          <td className="p-2">{evt.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-gray-700 text-xs italic">
                  Student tip: Many universities and cities run "Welcome Weeks," Erasmus socials, and local cultural fests—check your city's student Facebook groups!
                </div>
              </CardContent>
            </Card>
            {/* Local Recommendations as its own section */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Star className="mr-3 h-7 w-7 text-yellow-500" />
                  <span className="text-xl font-semibold text-yellow-700">Student Favorites: Cafés, Study Spots & Clubs</span>
                </div>
                <LocalRecommendations />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tab contents */}
        {activeTab === 'food' && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Utensils className="mr-3 h-7 w-7 text-green-600" />
                <span className="text-xl font-semibold text-green-700">Food & Grocery Survival</span>
              </div>
              <div className="mb-3 text-gray-800 font-semibold">🛒 Major Supermarkets</div>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li><b>Carrefour (market/superstore):</b> Ubiquitous</li>
                <li><b>Leclerc:</b> Common outside city centers</li>
                <li><b>Intermarché / Super U:</b> Local convenience format</li>
                <li><b>Franprix / Monoprix:</b> Urban centers, late hours</li>
                <li><b>Lidl / Aldi:</b> Budget-friendly, limited international</li>
                <li><b>ACTION:</b> Discount store, great for daily needs</li>
                <li>
                  <b>Triangle / Paris Store / Tang Frères:</b> Asian markets for Indian, Chinese, Thai ingredients (Paris, Lyon, Marseille, Lille, Strasbourg, Bordeaux)
                </li>
                <li>
                  <b>Halal Butchers & Indo-Pak Stores:</b> Present in student-populated areas (e.g., La Chapelle in Paris, Guillotière in Lyon)
                </li>
              </ul>
              <div className="mt-4 mb-3 text-gray-800 font-semibold">🍱 Meal Times</div>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li>Lunch: <b>12 PM – 2 PM</b></li>
                <li>Dinner: <b>7 PM – 9 PM</b></li>
                <li>Restaurants often close in between, especially in smaller cities.</li>
              </ul>
              <div className="mt-4 mb-3 text-gray-800 font-semibold">🛒 Supermarket Options</div>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li>Carrefour, Leclerc, Super U, and Lidl carry essentials.</li>
                <li>Asian/Indian stores (Triangle, Paris Store) have dals, rice, masalas, Maggi, etc.</li>
                <li>Items often labeled "<b>végétarien</b>", "<b>halal</b>", or "<b>bio</b>" (organic).</li>
              </ul>
              <div className="mt-4 mb-3 text-gray-800 font-semibold">🍴 Student Dining</div>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li>Check "<b>Resto U</b>" (university canteens) for affordable full meals (~€3.30 with student card).</li>
              </ul>
              <div className="mt-4 mb-3 text-gray-800 font-semibold">💡 Dining Out Tip</div>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li>Politely ask: <span className="italic">"Est-ce végétarien / halal ?"</span> (Is this vegetarian/halal?)</li>
              </ul>
            </CardContent>
          </Card>
        )}

        {activeTab === 'practical' && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="mr-3 h-7 w-7 text-cyan-600" />
                <span className="text-xl font-semibold text-cyan-800">Practical Living & Safety</span>
              </div>
              <Accordion type="single" collapsible className="w-full mb-4">
                {/* INSERT French Bureaucracy Made Simple */}
                <AccordionItem value="bureaucracy">
                  <AccordionTrigger>French Bureaucracy Made Simple</AccordionTrigger>
                  <AccordionContent>
                    <div>
                      French paperwork can feel overwhelming! Register at OFII within three months, open a French bank account for all payments, and get mandatory health insurance (student or national Sécurité Sociale). Always keep copies of your documents (passport, visa, housing attestations). If you need help, visit your university's international office.
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Optionally you can group other practical info as needed */}
              </Accordion>
              <div className="mb-3 text-gray-800 font-semibold">🛡️ Public Transit</div>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li><b>Paris:</b> Use Navigo Pass (monthly/weekly)</li>
                <li><b>Lyon:</b> TCL card</li>
                <li><b>Toulouse:</b> Tisséo card</li>
                <li><b>Other cities:</b> Get a local transit card</li>
                <li>Validate tickets always! Fines for unvalidated travel can be €50+.</li>
              </ul>
              <div className="mt-4 mb-3 text-gray-800 font-semibold">🚲 Getting Around</div>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li><b>Cycling apps:</b> Vélib (Paris), Vélov (Lyon), Bicloo, etc.</li>
                <li>Cities are pedestrian-friendly; walking is safe and common.</li>
              </ul>
              <div className="mt-4 mb-3 text-gray-800 font-semibold">🏠 Apartment Life</div>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li>Quiet Hours: <b>10 PM – 7 AM</b> (legally enforced in most residencies).</li>
                <li>Respect for neighbors is expected.</li>
              </ul>
              <div className="mt-4 mb-3 text-gray-800 font-semibold">🚨 Emergency</div>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li>112 is the EU-wide emergency number (works across all cities).</li>
                <li>For police/fire/ambulance.</li>
              </ul>
            </CardContent>
          </Card>
        )}

        {activeTab === 'news' && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Newspaper className="mr-3 h-7 w-7 text-indigo-600" />
                <span className="text-xl font-semibold text-indigo-900">French News & Media</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {newsMediaRecommendations.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener" className="border rounded px-4 py-3 hover:bg-indigo-50 transition">
                    <div className="font-semibold mb-1 flex items-center">
                      <span className="mr-2">{s.type === "YouTube" ? "📺" : s.type === "Podcast" ? "🎧" : s.type === "App" ? "📱" : "📰"}</span>
                      {s.name}
                    </div>
                    <div className="text-gray-700 text-sm">{s.description}</div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* RIGHT COLUMN - SIDEBAR */}
      <div className="w-full lg:w-1/4 flex flex-col sticky top-6 gap-6 h-max">
        {/* Mini-glossary, useful links/modal, quick access content. */}
        <GlossarySidebar />
      </div>

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
