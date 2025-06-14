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
        // Grid for all main cards in the "Social Integration" tab
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language & Communication */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Languages className="mr-2 h-7 w-7 text-blue-600" />
                <span className="text-xl font-semibold text-blue-900">🗣️ Language & Communication</span>
              </div>
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
            </CardContent>
          </Card>

          {/* Cultural Etiquette */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Users className="mr-2 h-7 w-7 text-cyan-700" />
                <span className="text-xl font-semibold text-cyan-800">🤝 Cultural Etiquette</span>
              </div>
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
            </CardContent>
          </Card>

          {/* Festivals & Social Events */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Calendar className="mr-2 h-7 w-7 text-orange-500" />
                <span className="text-xl font-semibold text-orange-700">🎉 Festivals & Social Events</span>
              </div>
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
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'food' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Utensils className="mr-3 h-7 w-7 text-green-600" />
                <span className="text-xl font-semibold text-green-700">🍽️ Food & Grocery Guidance</span>
              </div>
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
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'practical' && (
        // Grid for all major practical living cards
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Home className="mr-2 h-7 w-7 text-amber-700" />
                <span className="text-xl font-semibold text-amber-900">🏠 Student Life Integration</span>
              </div>
              <Accordion type="multiple">
                <AccordionItem value="housing-etiquette">
                  <AccordionTrigger>1. Housing Etiquette</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-1 font-semibold">Noise Limits</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Quiet hours: 10 PM to 7 AM on weekdays</li>
                      <li>Quiet hours: 10 PM to 8 AM on weekends</li>
                      <li>No loud music after quiet hours</li>
                    </ul>
                    <div className="mt-2 mb-1 font-semibold">Recycling Rules</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Yellow bins for plastic and metal</li>
                      <li>Blue bins for paper and cardboard</li>
                      <li>Green bins for glass</li>
                      <li>Brown bins for organic waste</li>
                    </ul>
                    <div className="mt-2 mb-1 font-semibold">Greeting Neighbors</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Introduce yourself when moving in</li>
                      <li>Hold doors for others</li>
                      <li>Keep common areas clean</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="academic-culture">
                  <AccordionTrigger>2. French Academic Culture</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-1 font-semibold">Class Participation</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Raise hand before speaking</li>
                      <li>Address professors as "Monsieur" or "Madame"</li>
                      <li>Participate in discussions</li>
                      <li>Ask questions during designated times</li>
                    </ul>
                    <div className="mt-2 mb-1 font-semibold">Email Etiquette</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Use "Monsieur/Madame" in greetings</li>
                      <li>Include clear subject lines</li>
                      <li>End with "Cordialement"</li>
                      <li>Use proper punctuation</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="volunteering">
                  <AccordionTrigger>3. Volunteering & Community Involvement</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Join university volunteer programs</li>
                      <li>Participate in local charity events</li>
                      <li>Engage with student associations</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="homesickness">
                  <AccordionTrigger>4. Dealing with Homesickness</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Connect with international student communities</li>
                      <li>Attend cultural events to feel connected</li>
                      <li>Join online forums for expatriates</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="work-internships">
                  <AccordionTrigger>5. Part-Time Work and Internships</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Allowed 964 hours/year part-time, get work permit via prefecture</li>
                      <li>Check university job boards, Indeed France, or LinkedIn for internships</li>
                      <li>Dress formally for interviews, emphasize teamwork skills</li>
                      <li>Basic French often required, improve with daily practice</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="finance-tips">
                  <AccordionTrigger>6. Financial Planning for Students</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Monthly Costs: Rent €400–700, food €200–300, transport €50–100</li>
                      <li>Apply for CAF housing aid, student meal vouchers (1.50€/meal)</li>
                      <li>Shop at discount stores (Lidl, Aldi), use second-hand markets</li>
                      <li>Open a free student account at BNP Paribas or Société Générale</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <FileText className="mr-2 h-7 w-7 text-violet-600" />
                <span className="text-xl font-semibold text-violet-800">📄 French Bureaucracy Made Simple</span>
              </div>
              <Accordion type="multiple">
                <AccordionItem value="bureaucracy-phrases">
                  <AccordionTrigger>1. Polite Phrases for Navigating Prefectures, OFII, CAF, CPAM</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Bonjour, je suis ici pour... (Good morning, I’m here for...)</li>
                      <li>Pourriez-vous m’aider ? (Could you help me?)</li>
                      <li>Je ne comprends pas, pouvez-vous expliquer ? (I don’t understand, can you explain?)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="admin-frustrations">
                  <AccordionTrigger>2. How to Handle Administrative Frustrations Respectfully</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Stay calm and polite, say "Je suis désolé(e)"</li>
                      <li>Ask to speak to a supervisor if needed</li>
                      <li>Bring all documents and copies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="templates">
                  <AccordionTrigger>3. Template Emails & Scripts for Polite Follow-ups</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-1 font-semibold">Example</div>
                    <div className="text-gray-800"><b>Subject:</b> Suivi de ma demande (Follow-up on my request)</div>
                    <div className="mb-1">Bonjour Madame/Monsieur, Je vous écris concernant ma demande du [date]. Merci de me tenir informé(e). Cordialement, [Your Name]</div>
                    <div className="text-gray-800"><b>Call script:</b> Bonjour, je suis [Name], j’appelle pour suivre ma demande.</div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Brain className="mr-2 h-7 w-7 text-fuchsia-500" />
                <span className="text-xl font-semibold text-fuchsia-800">🧠 Mental Health & Adjustment Tips</span>
              </div>
              <Accordion type="multiple">
                <AccordionItem value="shock-management">
                  <AccordionTrigger>1. Tips for Culture Shock Management</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Take time to adjust, explore gradually</li>
                      <li>Keep a routine (e.g., daily walks)</li>
                      <li>Connect with other internationals</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support-groups">
                  <AccordionTrigger>2. Where to Find Support Groups</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>International Student Associations at universities</li>
                      <li>Local community centers</li>
                      <li>Online groups (e.g., Facebook expat groups)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="mindfulness">
                  <AccordionTrigger>3. Mindfulness or Meditation Resources</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Apps: Headspace (English)</li>
                      <li>Online: YouTube meditation videos</li>
                      <li>Local yoga classes in cities</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <BookOpen className="mr-2 h-7 w-7 text-pink-500" />
                <span className="text-xl font-semibold text-pink-800">🌐 Cultural Comparison</span>
              </div>
              <Accordion type="multiple">
                <AccordionItem value="education-differences">
                  <AccordionTrigger>1. Education System Differences</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>French system: Lecture-based with group projects</li>
                      <li>Emphasis on critical thinking and discussion</li>
                      <li>Flexible schedules with independent study</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="workplace-comm">
                  <AccordionTrigger>2. Workplace Communication Styles</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>French style: Direct and formal</li>
                      <li>Debate and discussion encouraged</li>
                      <li>Focus on work-life balance</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="value-systems">
                  <AccordionTrigger>3. Value Systems: Collectivist vs Individualist</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>France: Individualist, prioritizes personal freedom</li>
                      <li>Emphasis on equality in social settings</li>
                      <li>Value privacy and independence</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="formality-hierarchy">
                  <AccordionTrigger>4. Formality and Hierarchy Differences</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Less hierarchical, titles used formally</li>
                      <li>Informal after rapport is built</li>
                      <li>Respect for personal boundaries</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          {/* Weather & Transport */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Sun className="mr-2 h-7 w-7 text-yellow-400" />
                <span className="text-xl font-semibold text-yellow-700">📍 Practical Living</span>
              </div>
              <Accordion type="multiple">
                <AccordionItem value="weather-tips">
                  <AccordionTrigger>1. Weather Awareness and Seasonal Tips</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>June is warm (20–25°C), bring light clothing, sunscreen, stay hydrated</li>
                      <li>Autumn (September–November) rainy, carry umbrella, waterproof shoes</li>
                      <li>Winter (December–February) cold (0–5°C), pack warm coats, scarves</li>
                      <li>Join winter markets or summer beach activities in coastal cities</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="public-transport">
                  <AccordionTrigger>2. Navigating French Public Transport</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Buy Navigo pass in Paris or city-specific cards, validate tickets</li>
                      <li>Check SNCF or RATP apps for train/métro times, especially during holidays</li>
                      <li>Show student ID for 50–75% off train tickets (SNCF Carte Jeune)</li>
                      <li>Use Vélib’ in Paris or city bikes, follow lane rules</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          {/* Safety */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Shield className="mr-2 h-7 w-7 text-red-600" />
                <span className="text-xl font-semibold text-red-700">🛡️ Safety and Emergency Resources</span>
              </div>
              <Accordion type="multiple">
                <AccordionItem value="emergency-contacts">
                  <AccordionTrigger>1. Emergency Contacts and Safety Tips</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-1"><b>Helplines:</b></div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>112 (emergency)</li>
                      <li>17 (police)</li>
                      <li>15 (medical)</li>
                    </ul>
                    <div className="mt-2 mb-1 font-semibold">Other tips</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Contact university security for on-campus issues</li>
                      <li>Avoid isolated areas at night, stay in well-lit zones</li>
                      <li>Lost documents: Report to prefecture and your embassy</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          {/* Indo-French */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <IndianRupee className="mr-2 h-7 w-7 text-orange-800" />
                <span className="text-xl font-semibold text-orange-900">🇮🇳 Indo-French Integration</span>
              </div>
              <Accordion type="multiple">
                <AccordionItem value="indo-french-compare">
                  <AccordionTrigger>1. Indo-French Cultural Comparison</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-1 font-semibold">Education</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>France: Lecture-based, India: Exam-focused</li>
                      <li>France: Group projects, India: Individual study</li>
                      <li>France: Flexible schedules, India: Structured</li>
                    </ul>
                    <div className="mt-2 mb-1 font-semibold">Workplace</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>France: Direct and formal, India: Respectful and indirect</li>
                      <li>France: Debate encouraged, India: Hierarchy respected</li>
                      <li>France: Work-life balance, India: Long hours</li>
                    </ul>
                    <div className="mt-2 mb-1 font-semibold">Values</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>France: Individualist, India: Collectivist (family/community focus)</li>
                      <li>France: Equality in social settings, India: Respect for elders</li>
                    </ul>
                    <div className="mt-2 mb-1 font-semibold">Formality and Hierarchy</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>France: Less hierarchical, India: Strong hierarchy by age/status</li>
                      <li>France: Informal after rapport, India: Formal longer</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="indian-community">
                  <AccordionTrigger>2. Indian Community Resources</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Join Indian Student Associations at universities</li>
                      <li>Visit temples (e.g., Sri Sri Radha Krishna Temple in Paris)</li>
                      <li>Connect via online groups (e.g., Facebook Indian in France)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="indian-diet">
                  <AccordionTrigger>3. Indian Dietary Preferences</AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-1 font-semibold">Grocery Tips</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Find dal, masala, and atta at Indian stores or Carrefour</li>
                      <li>Rice and spices at Tang Frères or ethnic markets</li>
                      <li>Check for vegetarian/halal labels</li>
                    </ul>
                    <div className="mt-2 font-semibold">Phrases</div>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Je suis végétarien et j’évite le porc. (I am vegetarian and avoid pork.)</li>
                      <li>Avez-vous des plats sans viande ? (Do you have meat-free dishes?)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="homesick-indian">
                  <AccordionTrigger>4. Managing Homesickness with Indian Context</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 text-gray-800">
                      <li>Connect with Indian student communities</li>
                      <li>Celebrate festivals like Diwali with local groups</li>
                      <li>Cook familiar dishes to feel at home</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
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
