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
    // colorClass: "text-blue-700", // Not needed
  },
  {
    key: "etiquette",
    title: "Cultural Etiquette",
    icon: <Users />,
    topicCount: 4,
    description: "Master polite norms, greetings, and public dos and don'ts.",
    // colorClass: "text-cyan-800",
  },
  {
    key: "events",
    title: "Festivals & Social Events",
    icon: <Calendar />,
    topicCount: 3,
    description: "Key holidays, how to join and host French parties.",
    // colorClass: "text-orange-700",
  },
  {
    key: "food",
    title: "Food & Groceries",
    icon: <Utensils />,
    topicCount: 4,
    description: "Eating habits, labels, allergy tips, and specialty shopping.",
    // colorClass: "text-green-700",
  },
  {
    key: "studentLife",
    title: "Student Life Integration",
    icon: <Home />,
    topicCount: 6,
    description: "Housing, finances, academics, volunteering and more.",
    // colorClass: "text-amber-900",
  },
  {
    key: "bureaucracy",
    title: "French Bureaucracy",
    icon: <FileText />,
    topicCount: 3,
    description: "Navigate prefectures, polite phrases, and follow-up tips.",
    // colorClass: "text-violet-700",
  },
  {
    key: "mentalHealth",
    title: "Mental Health & Tips",
    icon: <Brain />,
    topicCount: 3,
    description: "Culture shock, support groups, and wellbeing resources.",
    // colorClass: "text-fuchsia-700",
  },
  {
    key: "culturalComparison",
    title: "Cultural Comparison",
    icon: <BookOpen />,
    topicCount: 4,
    description: "French vs Indian education, work, and value systems.",
    // colorClass: "text-pink-800",
  },
  {
    key: "practicalLiving",
    title: "Practical Living",
    icon: <Sun />,
    topicCount: 2,
    description: "Weather hacks, public transport, and local survival tips.",
    // colorClass: "text-yellow-600",
  },
  {
    key: "safety",
    title: "Safety & Emergency",
    icon: <Shield />,
    topicCount: 1,
    description: "Emergency contacts, helplines, and personal safety advice.",
    // colorClass: "text-red-700",
  },
  {
    key: "indoFrench",
    title: "Indo-French Integration",
    icon: <IndianRupee />,
    topicCount: 4,
    description: "Compare life, food, and homesickness from a Desi lens.",
    // colorClass: "text-orange-900",
  }
];

// Dummy topics for demo: would map each module key to its topic accordion previously used
const allTopics: Record<string, Array<{ title: string; content: React.ReactNode }>> = {
  language: [
    {
      title: "Daily Phrases",
      content: (
        <>
          <strong>Key expressions you’ll use daily:</strong>
          <ul className="list-disc ml-5 mt-1 mb-2 text-[15px]">
            <li>
              <b>Bonjour</b> (Good morning/Hello) – use when you enter shops, class, or meet anyone.
            </li>
            <li>
              <b>Merci</b> (Thank you), <b>S'il vous plaît</b> (Please)
            </li>
            <li>
              <b>Où est...?</b> (Where is...?) – e.g. “Où est la bibliothèque ?”
            </li>
          </ul>
          <div>
            Always greet shopkeepers, drivers, and officials. Saying <b>“Au revoir”</b> (Goodbye) when leaving is polite and expected!
          </div>
        </>
      ),
    },
    {
      title: "Slang vs. Formal",
      content: (
        <>
          <p>
            French has two forms of "you": <b>tu</b> (informal) for friends/peers and <b>vous</b> (formal) for adults, strangers, teachers, and officials.
            Default to <b>vous</b> if unsure. Be cautious with slang ("wesh", "ouais", "putain")—use it only with close friends!
          </p>
          <div className="mt-1 text-[15px]">Tip: In official emails, always use "vous" and polite closings (“Cordialement” means “Best regards”).</div>
        </>
      ),
    },
    {
      title: "Pronunciation",
      content: (
        <>
          <div>
            Many French sounds don’t exist in English! Practice the nasal “on” (as in “non”), the rolling “r”, and clear vowels. The "r" is guttural and pronounced in the throat.
          </div>
          <ul className="list-disc ml-5 mt-1 text-[15px]">
            <li>
              <b>Merci</b> (pronounced: mehr-si)
            </li>
            <li>
              <b>Non</b> (no): nasal—sounds like “noh~”
            </li>
          </ul>
          <div>Listen and mimic – YouTube and Duolingo have pronunciation practice.</div>
        </>
      ),
    },
    {
      title: "Cultural Gestures",
      content: (
        <>
          <ul className="list-disc ml-5 mt-1 text-[15px]">
            <li>
              <b>La bise</b>: Light cheek kisses (usually 2, sometimes 3–4 depending on region!) for friends and acquaintances.
            </li>
            <li>
              <b>The French shrug</b> & pursed lips: Universal way to say “I don’t know” or “it’s not important”.
            </li>
            <li>
              Use lips or a gesture (not finger) to point.
            </li>
          </ul>
          <div>Don’t hug unless you’re close friends; a handshake is appropriate for formal greetings.</div>
        </>
      ),
    },
    {
      title: "Conversation Scenarios",
      content: (
        <>
          <div>
            <b>At the bakery:</b> “Une baguette, s’il vous plaît.” (“A baguette, please.”) <br />
            <b>At the prefecture:</b> “Je suis ici pour prendre rendez-vous.” (“I am here for an appointment.”)
          </div>
          <div className="mt-2">
            Practice transactional dialogues (shops, transport, hospitals). French people appreciate your effort!
          </div>
        </>
      ),
    },
  ],
  etiquette: [
    {
      title: "Social Norms",
      content: (
        <>
          <ul className="list-disc ml-5 mt-1 mb-2 text-[15px]">
            <li>
              <b>Punctuality</b>: 5–10 min late is acceptable socially, but always be on time for official appointments and classes.
            </li>
            <li>
              <b>Personal space</b>: Stand arm’s length away. Avoid loud conversations in public.
            </li>
            <li>
              <b>Eye contact</b> is expected in France.
            </li>
          </ul>
          <div>
            The French value privacy—don’t ask personal questions early on!
          </div>
        </>
      ),
    },
    {
      title: "Do’s and Don’ts",
      content: (
        <>
          <b>Do:</b>
          <ul className="list-disc ml-5">
            <li>Say “Bonjour”/“Bonsoir” when entering any shop.</li>
            <li>Thank or greet bus drivers, cashiers (“Merci, bonne journée!”).</li>
            <li>Offer help or a seat to elders.</li>
          </ul>
          <b>Don’t:</b>
          <ul className="list-disc ml-5 mb-2">
            <li>Eat or talk loudly on the metro.</li>
            <li>Jump the queue (waiting line).</li>
            <li>Assume everyone speaks English—always <i>ask</i> first.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Dining Etiquette",
      content: (
        <>
          <ul className="list-disc ml-5 mb-2 text-[15px]">
            <li>
              Bread goes on the tablecloth—not the plate.
            </li>
            <li>
              Both hands visible (rest wrists on the table, not in your lap).
            </li>
            <li>
              Always say <b>“Bon appétit”</b> (enjoy your meal) before you start.
            </li>
            <li>
              Wait for everyone to be served before eating.
            </li>
          </ul>
          <div>Tip: It’s polite to finish your plate and not ask for changes to a dish.</div>
        </>
      ),
    },
    {
      title: "How to Greet",
      content: (
        <>
          <ul className="list-disc ml-5 mb-2 text-[15px]">
            <li>
              <b>La bise</b> (cheek kisses): For friends or classmates, always start on the left. Number varies by region (ask!).
            </li>
            <li>
              Shake hands for formal or first-time greetings.
            </li>
            <li>
              Always address teachers, staff, and elders as “Monsieur” or “Madame.”
            </li>
          </ul>
        </>
      ),
    },
  ],
  events: [
    {
      title: "French Holidays",
      content: (
        <>
          <div>
            <b>Bastille Day (14 July)</b>: Fireworks, parades (national holiday). <br />
            <b>Fête de la Musique (June)</b>: Free concerts in the streets. <br />
            <b>Easter Monday, All Saints’ Day, Christmas</b>: Many shops close! Plan shopping ahead.
          </div>
          <div className="mt-2">Tip: University and city events are often publicized on social media and city websites.</div>
        </>
      ),
    },
    {
      title: "Joining Events",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>Use Meetup, Facebook, Erasmus groups to join student or cultural events.</li>
            <li>Most cities host integration events for international students in September–October.</li>
            <li>You can join “apéro” (drinks + snacks) or “soirée” (party) invitations—bring snacks or drinks!</li>
          </ul>
        </>
      ),
    },
    {
      title: "Parties & Potlucks",
      content: (
        <>
          <div>
            French home gatherings are called "soirées" or "apéro" (pre-dinner drinks/snacks). It’s common to bring a dish or drink for everyone.
          </div>
          <ul className="list-disc ml-5 mt-1 text-[15px]">
            <li>
              Arrive 10–15 min late (not too early!).
            </li>
            <li>
              Thank the host before leaving (“Merci pour l’invitation !”).
            </li>
          </ul>
        </>
      ),
    },
  ],
  food: [
    {
      title: "French Eating Habits",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              <b>Lunch</b> is 12–2 PM. Most shops close. Plan your day!
            </li>
            <li>
              Coffee is usually had <i>after</i> meals, served small and strong (“un café”).
            </li>
            <li>
              Meals are slower and more social—don’t rush.
            </li>
          </ul>
          <div>
            Dinner can be as late as 8–9 PM, especially in Paris or bigger cities.
          </div>
        </>
      ),
    },
    {
      title: "Food Labels",
      content: (
        <>
          <div>
            <b>Végétarien</b>: vegetarian <br />
            <b>Halal</b>: halal <br />
            <b>Bio</b>: organic <br />
            Ask “Est-ce que ce plat contient de la viande/poisson?” (“Does this dish contain meat/fish?”)
          </div>
        </>
      ),
    },
    {
      title: "Specialty Shopping",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              <b>Carrefour</b>, <b>Intermarché</b>, <b>Lidl</b>: Supermarkets with budget options.
            </li>
            <li>
              <b>Asian/African/Indian grocery stores</b> in city centers for masala, lentils, etc.
            </li>
            <li>
              Open-air markets: Fresh produce, great prices!
            </li>
            <li>
              Check online delivery—Picard for frozen foods.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Allergy Phrases",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>“Je suis allergique à...” (I am allergic to...)</li>
            <li>“Pouvez-vous éviter...?” (Can you avoid...?)</li>
            <li>Show your allergies in writing if needed—French waiters can help, but be clear.</li>
          </ul>
        </>
      ),
    },
  ],
  studentLife: [
    {
      title: "Housing Etiquette",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              <b>Quiet hours</b>: 10 PM–7 AM—avoid noisy activities (music, vacuuming).
            </li>
            <li>
              Greet neighbors (“Bonjour, ça va?”). Don’t ignore them.
            </li>
            <li>
              Sort and recycle trash; check building's instructions.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Academic Culture",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              Professors addressed formally—use “Monsieur” or “Madame.”
            </li>
            <li>
              Raise your hand and wait before speaking.
            </li>
            <li>
              Send polite, well-structured emails with greetings, clear subject, and a closing like “Cordialement”.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Volunteering",
      content: (
        <>
          <div>
            <b>Student associations</b> and city charities always look for volunteers.
          </div>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              Great way to network and practice French!
            </li>
            <li>
              Volunteer fairs are held in September.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Homesickness",
      content: (
        <>
          <div>
            <b>Feeling down is common!</b> Connect with other international students, join cultural associations, or organize weekend trips.
          </div>
          <div>
            Regular video chats with family & friends from home helps.
          </div>
        </>
      ),
    },
    {
      title: "Part-time Jobs",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              Allowed to work up to 964 hours/year on a student visa.
            </li>
            <li>
              Jobs: babysitting, tutoring, restaurants, school labs.
            </li>
            <li>
              Use Pôle Emploi, university boards, or LinkedIn to search.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Financial Planning",
      content: (
        <>
          <div>
            <b>CAF:</b> Apply online for housing assistance (up to €200/mo).<br />
            <b>Student discounts:</b> Card for transport, cinema, cafes. Always ask!
          </div>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              Open a French bank account for rent, scholarships, utilities.
            </li>
          </ul>
        </>
      ),
    },
  ],
  bureaucracy: [
    {
      title: "Polite Phrases",
      content: (
        <>
          <div>
            <b>At offices, always:</b> Greet—“Bonjour, Madame/Monsieur.”<br />
            <b>Ask:</b> “Je suis ici pour…” (“I’m here for…”), “Pourriez-vous m’aider ?” (“Could you help me?”)
          </div>
          <div className="mt-1">Always end with “Merci, bonne journée !” (“Thank you, have a nice day!”)</div>
        </>
      ),
    },
    {
      title: "Admin Frustrations",
      content: (
        <>
          <div>
            Bureaucracy is slow—expect delays and missing documents. Stay calm and polite; it helps your case.
          </div>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              Make copies of EVERYTHING—including your passport, visa, and forms.
            </li>
            <li>
              Always ask for a receipt (“reçu”) or confirmation.
            </li>
            <li>
              If stuck, politely request to speak to another official (“Quelqu’un d’autre disponible ?”)
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Templates",
      content: (
        <>
          <div>
            <b>Email/letter subject:</b> Suivi de ma demande (“Follow up on my request”)<br />
            <b>Email greeting:</b> Bonjour Madame/Monsieur,<br />
            <b>Closing:</b> Merci d’avance. Cordialement, [your name]
          </div>
        </>
      ),
    },
  ],
  mentalHealth: [
    {
      title: "Culture Shock Tips",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              Give yourself time. Routines help—same breakfast, explore neighborhoods slowly.
            </li>
            <li>
              Journal or note your emotions during the first weeks.
            </li>
          </ul>
          <div>
            Remember, feelings of confusion and "homesickness" are normal and temporary!
          </div>
        </>
      ),
    },
    {
      title: "Support Groups",
      content: (
        <>
          <div>
            Your university likely has a student psychologist and peer groups. Many universities offer free mental health support (counselor, helpline).
          </div>
          <ul className="list-disc ml-5 text-[15px]">
            <li>Indian/French Facebook groups, WhatsApp groups, and volunteer-run associations can provide community.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Mindfulness Resources",
      content: (
        <>
          <div>
            Apps like <b>Headspace</b> or <b>Petit BamBou</b> for guided meditation.
          </div>
          <div>
            Local yoga studios often offer student discounts. Try YouTube channels for free daily routines.
          </div>
        </>
      ),
    },
  ],
  culturalComparison: [
    {
      title: "Education Diff.",
      content: (
        <>
          <div>
            <b>France:</b> Classes prioritize debate, presentations, and collective projects. Less focus on rote learning.<br/>
            <b>India:</b> Exams, theory, and respect for hierarchy are more important.<br/>
          </div>
          <div>
            Be prepared for group work and speaking up in French classes!
          </div>
        </>
      ),
    },
    {
      title: "Workplace Comm.",
      content: (
        <>
          <div>
            <b>French style:</b> direct, debate encouraged, polite disagreement is fine.
          </div>
          <div>
            <b>Indian style:</b> Politeness, indirect feedback, avoid contradicting superiors in public.
          </div>
          <div>In France, it’s acceptable to question and debate with professors and managers.</div>
        </>
      ),
    },
    {
      title: "Value Systems",
      content: (
        <>
          <div>
            <b>France:</b> Individualism, independence, and personal development.
          </div>
          <div>
            <b>India:</b> Family-oriented, community, close ties.
          </div>
          <div>
            French students often move out by 18–20, live alone, and value “me time".
          </div>
        </>
      ),
    },
    {
      title: "Formality & Hierarchy",
      content: (
        <>
          <div>
            In France, formality drops fast after introductions; students often address professors by first name after a while. In India, titles and respect stay longer.
          </div>
        </>
      ),
    },
  ],
  practicalLiving: [
    {
      title: "Weather Tips",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              <b>Autumn:</b> Sudden rain—always have a small umbrella.
            </li>
            <li>
              <b>Winter:</b> Dress in layers; heating in homes can be strong, but outside very cold.
            </li>
            <li>
              <b>Summer:</b> Can be hot but dry—use sunscreen!
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Public Transport",
      content: (
        <>
          <div>
            <b>Paris:</b> Get Navigo or Imagine'R card for unlimited monthly use.
          </div>
          <div>
            <b>Trains:</b> SNCF mobile app for booking, check student discounts.
          </div>
          <div>
            City bikes (Vélib, Velo'v) are affordable and convenient.
          </div>
        </>
      ),
    },
  ],
  safety: [
    {
      title: "Emergency Contacts",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              <b>112</b>: All emergencies (EU-wide, English okay)
            </li>
            <li>
              <b>17</b>: Police
            </li>
            <li>
              <b>15</b>: Medical emergencies
            </li>
            <li>
              <b>18</b>: Firefighters
            </li>
            <li>
              Many universities have their own campus security/helpline.
            </li>
          </ul>
          <div>
            <b>General Safety Tips:</b>
            <ul className="list-disc ml-5">
              <li>Keep valuables hidden in public/transit.</li>
              <li>Don’t walk alone late at night in isolated areas.</li>
            </ul>
          </div>
        </>
      ),
    },
  ],
  indoFrench: [
    {
      title: "Edu Comparison",
      content: (
        <>
          <div>
            French system focuses more on analytical skills, less pressure than India but more on self-study and discussion.
          </div>
          <div>
            Expect fewer class hours but more projects and reading.
          </div>
        </>
      ),
    },
    {
      title: "Indian Community",
      content: (
        <>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              Connect via Facebook groups (“Indians in France”), WhatsApp, or university associations.
            </li>
            <li>
              Temples, gurudwaras, or Indian restaurants often organize community events.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Indian Diet",
      content: (
        <>
          <div>
            Vegetarian/vegan food is available but can be expensive in restaurants—cook at home!
          </div>
          <ul className="list-disc ml-5 text-[15px]">
            <li>
              Buy dals, rice, masala in ethnic grocery stores.
            </li>
            <li>
              Check for <b>“végétarien”</b> or <b>“halal”</b> options in canteens/cafés.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Homesickness",
      content: (
        <>
          <div>
            Celebrate Indian festivals (Diwali, Holi) with friends. Cook familiar recipes or join group meals.
          </div>
          <div>
            Share your culture with French friends—they’re often curious!
          </div>
        </>
      ),
    },
  ],
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
              onClick={() => setExpandedModuleKey(mod.key)}
            />
          ))}
        </div>
      ) : (
        // EXPANDED MODULE
        <div className="mb-10 animate-fade-in">
          <Button variant="ghost" size="sm" className="mb-3 flex items-center" onClick={handleBack}>
            <span className="mr-2">
              <span className="inline-block rotate-180"><ArrowRight className="h-4 w-4" /></span>
            </span>
            Back to Modules
          </Button>
          <Card className="mb-4">
            <CardContent className="pt-8 pb-6 px-7">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl text-gray-700">
                  {modulesMeta.find(m => m.key === expandedModuleKey)?.icon}
                </span>
                <span className="font-bold text-xl text-gray-800">{modulesMeta.find(m => m.key === expandedModuleKey)?.title}</span>
                <span className="ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full border">
                  {modulesMeta.find(m => m.key === expandedModuleKey)?.topicCount} topics
                </span>
              </div>
              <div className="text-gray-600 mb-4">
                {modulesMeta.find(m => m.key === expandedModuleKey)?.description}
              </div>
              <ol className="space-y-4 mt-7">
                {(allTopics[expandedModuleKey] || []).map((topic, idx) => (
                  <li key={topic.title} className="border-l-4 pl-4 border-gray-200">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-gray-700">{idx + 1}.</span>
                      <span className="font-semibold text-gray-800">{topic.title}</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2 text-gray-800 text-sm">
                      {topic.content}
                    </div>
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
