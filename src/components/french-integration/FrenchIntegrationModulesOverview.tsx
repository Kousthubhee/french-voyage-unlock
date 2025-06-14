
import { useState } from "react";
import {
  Languages,
  Calendar,
  Star,
  Utensils,
  MapPin,
  Newspaper,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Module data (merged sections for fewer modules)
const MODULES = [
  {
    key: "social",
    title: "Social & Cultural Integration",
    icon: <Languages className="h-8 w-8 text-blue-600" />,
    description: "Essential French phrases, etiquette, cultural tips, events & favorites.",
  },
  {
    key: "food",
    title: "Food & Groceries",
    icon: <Utensils className="h-8 w-8 text-green-600" />,
    description: "Supermarkets, grocery tips, daily meals, veg/halal life, student dining.",
  },
  {
    key: "practical",
    title: "Practical Living",
    icon: <MapPin className="h-8 w-8 text-cyan-600" />,
    description: "Transport, cycling, apartments, quiet hours, safety & emergencies.",
  },
  {
    key: "news",
    title: "French News & Media",
    icon: <Newspaper className="h-8 w-8 text-indigo-600" />,
    description: "Easy news, podcasts, media, apps & more for staying updated.",
  }
];

// -- Content for each section --
function SocialModule() {
  return (
    <div>
      {/* Language & Etiquette */}
      <h2 className="text-xl font-bold mb-1 flex items-center"><Languages className="w-6 h-6 mr-2 text-blue-600"/>Language & Cultural Etiquette</h2>
      <ul className="list-disc pl-6 text-gray-800 mb-3">
        <li><b>Bonjour (Good morning), Merci (Thank you), S'il vous plaît (Please), Excusez-moi (Excuse me), Où est ...?</b></li>
        <li>Use <b>"vous"</b> (formal) with strangers; <b>"tu"</b> (informal) for friends/peers.</li>
        <li>Gestures: <i>la bise</i> (cheek kiss), shrug = "I don't know", handshake, "donner un bisou".</li>
        <li>Always greet ("bonjour") entering shops; say "au revoir" when leaving.</li>
      </ul>
      {/* Festivals & Calendar */}
      <h2 className="text-xl font-bold mt-6 mb-1 flex items-center"><Calendar className="w-6 h-6 mr-2 text-orange-500"/>Festivals, Holidays & Student Events</h2>
      <table className="min-w-[300px] w-full text-sm mb-2 mt-1">
        <thead><tr className="bg-orange-50">
          <th className="p-2 font-medium text-left">Date</th>
          <th className="p-2 font-medium text-left">Event</th>
        </tr></thead>
        <tbody>
          <tr><td className="p-2">Jan 1</td><td className="p-2">New Year's Day</td></tr>
          <tr><td className="p-2">May 1</td><td className="p-2">Labour Day</td></tr>
          <tr><td className="p-2">July 14</td><td className="p-2">Bastille Day</td></tr>
          <tr><td className="p-2">Sept (varies)</td><td className="p-2">La Rentrée (Back to School/Uni)</td></tr>
          <tr><td className="p-2">June (varies)</td><td className="p-2">Fête de la Musique</td></tr>
          <tr><td className="p-2">Welcome fests</td><td className="p-2">Student Welcome Days, Erasmus Nights</td></tr>
        </tbody>
      </table>
      <div className="text-gray-700 text-xs italic mb-3">
        Tip: Universities host "Welcome Weeks", Erasmus socials & local fests—join Facebook groups!
      </div>
      {/* Faves */}
      <h2 className="text-xl font-bold mt-6 mb-2 flex items-center"><Star className="w-6 h-6 mr-2 text-yellow-500"/>Student Favorites</h2>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <b className="text-blue-900">Paris:</b>
          <ul className="list-disc pl-6 text-gray-800 text-sm">
            <li>Cafés: Café de Flore, Le Procope, Shakespeare & Co Café</li>
            <li>Study: Bibliothèque François-Mitterrand, Cité Intl. Uni Library</li>
            <li>Clubs: Rex Club, Le Duplex</li>
          </ul>
        </div>
        <div>
          <b className="text-blue-900">Lyon:</b>
          <ul className="list-disc pl-6 text-gray-800 text-sm">
            <li>Cafés: Mokxa, Le Luminarium</li>
            <li>Study: Part-Dieu, Université de Lyon Library</li>
            <li>Clubs: Le Sucre, Transbordeur</li>
          </ul>
        </div>
        <div>
          <b className="text-blue-900">Marseille:</b>
          <ul className="list-disc pl-6 text-gray-800 text-sm">
            <li>Cafés: Café de la Banque, Noailles Café</li>
            <li>Study: Alcazar Library, Aix-Marseille Library</li>
            <li>Clubs: Trolleybus, Baby Club</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FoodModule() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3 flex items-center"><Utensils className="w-6 h-6 mr-2 text-green-600"/>Food & Grocery Survival</h2>
      <div className="text-gray-800 font-semibold">🛒 Major Supermarkets</div>
      <ul className="list-disc pl-8 text-gray-700 mb-2">
        <li><b>Carrefour</b> (superstore), <b>Leclerc</b>, <b>Intermarché/Super U</b>, <b>Franprix/Monoprix</b>, <b>Lidl/Aldi</b>, <b>ACTION</b>, Triangle/Paris Store (Asian/Indian, big cities), Halal butchers/Indo-Pak stores (student areas)</li>
      </ul>
      <div className="text-gray-800 font-semibold mt-3">🍱 Meal Times</div>
      <ul className="list-disc pl-8 text-gray-700 mb-2">
        <li>Lunch: <b>12 PM–2 PM</b>; Dinner: <b>7 PM–9 PM</b>. Restaurants often close between.</li>
      </ul>
      <div className="text-gray-800 font-semibold mt-3">🛒 Options</div>
      <ul className="list-disc pl-8 text-gray-700 mb-2">
        <li>Carrefour, Leclerc, Super U, Lidl have basics. Asian/Indian stores stock dals, masalas, Maggi etc.</li>
        <li>Look for labels: <b>végétarien</b>, <b>halal</b>, <b>bio</b> (organic).</li>
      </ul>
      <div className="text-gray-800 font-semibold mt-3">🍴 Student Dining</div>
      <ul className="list-disc pl-8 text-gray-700 mb-2">
        <li>Try <b>Resto U</b> (university canteens) for affordable meals (~€3.30 with student card).</li>
      </ul>
      <div className="text-gray-800 font-semibold mt-3">💡 Dining Out Tip</div>
      <ul className="list-disc pl-8 text-gray-700">
        <li>Politely ask: <span className="italic">“Est-ce végétarien / halal ?”</span></li>
      </ul>
    </div>
  );
}

function PracticalModule() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3 flex items-center"><MapPin className="w-6 h-6 mr-2 text-cyan-600"/>Practical Living & Safety</h2>
      <div className="text-gray-800 font-semibold">🛡️ Public Transit</div>
      <ul className="list-disc pl-8 text-gray-700 mb-2">
        <li>Paris: Navigo Pass; Lyon: TCL; Toulouse: Tisséo; others: get local card</li>
        <li>Always validate tickets—fines can be €50+!</li>
      </ul>
      <div className="text-gray-800 font-semibold mt-3">🚲 Getting Around</div>
      <ul className="list-disc pl-8 text-gray-700 mb-2">
        <li>Cycling apps: Vélib (Paris), Vélov (Lyon), Bicloo...</li>
        <li>Walking is safe & common in cities.</li>
      </ul>
      <div className="text-gray-800 font-semibold mt-3">🏠 Apartment Life</div>
      <ul className="list-disc pl-8 text-gray-700 mb-2">
        <li>Quiet hours: 10 PM–7 AM (enforced); respect neighbors!</li>
      </ul>
      <div className="text-gray-800 font-semibold mt-3">🚨 Emergency</div>
      <ul className="list-disc pl-8 text-gray-700">
        <li>112 = EU-wide emergency; works everywhere for police/fire/ambulance.</li>
      </ul>
    </div>
  );
}

function NewsModule() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3 flex items-center"><Newspaper className="w-6 h-6 mr-2 text-indigo-600"/>French News & Media</h2>
      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <a href="https://www.lepetitjournal.com/" target="_blank" rel="noopener" className="border rounded px-4 py-3 hover:bg-indigo-50 transition">
          <div className="font-semibold mb-1 flex items-center"><span className="mr-2">📰</span>Le Petit Journal</div>
          <div className="text-gray-700 text-sm">Simplified news in French for beginners.</div>
        </a>
        <a href="https://www.youtube.com/c/PieceofFrench" target="_blank" rel="noopener" className="border rounded px-4 py-3 hover:bg-indigo-50 transition">
          <div className="font-semibold mb-1 flex items-center"><span className="mr-2">📺</span>Piece of French</div>
          <div className="text-gray-700 text-sm">French lessons/vlogs with real-life context.</div>
        </a>
        <a href="https://radiolingua.com/coffeebreakfrench/" target="_blank" rel="noopener" className="border rounded px-4 py-3 hover:bg-indigo-50 transition">
          <div className="font-semibold mb-1 flex items-center"><span className="mr-2">🎧</span>Coffee Break French</div>
          <div className="text-gray-700 text-sm">Short conversations for learners.</div>
        </a>
        <a href="https://podcast.duolingo.com/french" target="_blank" rel="noopener" className="border rounded px-4 py-3 hover:bg-indigo-50 transition">
          <div className="font-semibold mb-1 flex items-center"><span className="mr-2">📱</span>Duolingo French Podcast</div>
          <div className="text-gray-700 text-sm">Stories for French practice.</div>
        </a>
      </div>
      <div className="text-sm text-gray-600">
        More: <a href="https://www.wordreference.com/" className="text-blue-700 underline" target="_blank" rel="noopener">WordReference dictionary</a>
      </div>
    </div>
  );
}

// Choose which content for each module
const MODULE_CONTENT: Record<string, () => JSX.Element> = {
  social: SocialModule,
  food: FoodModule,
  practical: PracticalModule,
  news: NewsModule,
};

export function FrenchIntegrationModulesOverview() {
  const [selected, setSelected] = useState<string | null>(null);
  const handleBack = () => setSelected(null);

  if (selected) {
    const Content = MODULE_CONTENT[selected];
    const mod = MODULES.find(m => m.key === selected)!;
    return (
      <div>
        <Button variant="ghost" onClick={handleBack} className="mb-3">&larr; Back to Modules</Button>
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-2">
              {mod.icon}
              <span className="text-2xl font-bold ml-3">{mod.title}</span>
            </div>
            <div className="mb-2 text-gray-700">{mod.description}</div>
            <Content />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-900 mb-8">French Cultural Integration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULES.map(mod => (
          <Card
            key={mod.key}
            onClick={() => setSelected(mod.key)}
            className="cursor-pointer transition-all duration-200 hover:scale-105 hover:border-blue-300"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              {mod.icon}
              <div className="text-xl font-semibold mt-3 mb-1 text-gray-900">{mod.title}</div>
              <div className="text-gray-700 text-sm">{mod.description}</div>
              <Button className="mt-4">Start Learning</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FrenchIntegrationModulesOverview;
