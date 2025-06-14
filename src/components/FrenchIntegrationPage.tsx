
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

      {/* Tab content */}
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

          {/* Local Recommendations (Student Favorites) */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Star className="mr-3 h-7 w-7 text-yellow-500" />
                <span className="text-xl font-semibold text-yellow-700">Student Favorites: Cafés, Study Spots & Clubs</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {studentFavorites.map(city => (
                  <div key={city.city} className="border rounded p-3 bg-yellow-50 shadow-sm">
                    <div className="font-semibold text-gray-900 mb-1">{city.city}</div>
                    <div className="mb-1 text-gray-800"><span className="font-medium">Cafés:</span> {city.cafes.join(', ')}</div>
                    <div className="mb-1 text-gray-800"><span className="font-medium">Study:</span> {city.studySpots.join(', ')}</div>
                    <div className="text-gray-800"><span className="font-medium">Clubs:</span> {city.clubs.join(', ')}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-600 italic">
                Want your favorite spot listed? Suggest it via the Feedback button!
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'food' && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Utensils className="mr-3 h-7 w-7 text-green-600" />
              <span className="text-xl font-semibold text-green-700">Food & Grocery Survival</span>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700">
              <li>Lunch: 12–2 PM, Dinner: 7–9 PM, most restaurants close between.</li>
              <li>Many supermarkets offer basic Indian/Asian items (labeled "végétarien", "halal").</li>
              <li>Look for Carrefour, Leclerc, local ethnic markets for spices and ingredients.</li>
              <li>At restaurants, ask: "Est-ce végétarien/halal ?"</li>
              <li>Check university canteens ("Resto U") for cheap student meals.</li>
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
            <ul className="list-disc pl-8 space-y-2 text-gray-700">
              <li>Public transit: Get a Navigo pass (Paris) or check your city’s transport site.</li>
              <li>Always validate tickets—spot checks are common!</li>
              <li>Use city bikes or walk, most cities are pedestrian-friendly.</li>
              <li>Quiet hours: 10pm–7am in most apartments.</li>
              <li>Call 112 for any emergency throughout the EU.</li>
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
