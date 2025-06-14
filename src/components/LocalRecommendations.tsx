import React, { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type CityRec = {
  city: string;
  cafes: string[];
  studySpots: string[];
  clubs: string[];
};

const cities: CityRec[] = [
  {
    city: "Paris",
    cafes: [
      "Shakespeare & Company Café (5th)", 
      "KB Café (9th)", 
      "Café Lomi (18th)", 
      "Grounded (11th)"
    ],
    studySpots: [
      "Bibliothèque Sainte-Geneviève",
      "BPI at Centre Pompidou",
    ],
    clubs: [
      "Sciences Po Student Union",
      "ESCP Student Societies"
    ],
  },
  {
    city: "Lyon",
    cafes: [
      "Slake Coffee House", 
      "Loutsa", 
      "Café Mokxa"
    ],
    studySpots: [
      "Bibliothèque de la Part-Dieu"
    ],
    clubs: [
      "Avenir Lyon (international student group)",
      "ENSL Music Club"
    ],
  },
  {
    city: "Toulouse",
    cafes: [
      "Le Café Cerise",
      "Allegory Coffee Bar",
      "Les Farfadets"
    ],
    studySpots: [
      "Toulouse Capitole University Library",
      "Ombres Blanches Bookstore Café"
    ],
    clubs: [
      "TBS Student Clubs",
      "Erasmus Student Network Toulouse"
    ],
  },
  {
    city: "Rouen",
    cafes: [
      "Citizen Coffee",
      "Métropole Café"
    ],
    studySpots: [
      "Université de Rouen libraries",
      "Docks 76 co-working spots"
    ],
    clubs: [
      "ESIGELEC Clubs",
      "Université de Rouen Social Clubs"
    ],
  },
  {
    city: "Reims",
    cafes: [
      "L'Opéra Café",
      "La Brûlerie Moderne"
    ],
    studySpots: [
      "Sciences Po Reims Library",
      "Bibliothèque Carnegie"
    ],
    clubs: [
      "Champagne Tasting Club (Sciences Po)",
      "Erasmus Club Reims"
    ],
  },
  {
    city: "Lille",
    cafes: [
      "Coffee Makers", 
      "Wally’s Coffee", 
      "La Luck"
    ],
    studySpots: [
      "B.U. de Lille",
      "Gare Saint Sauveur (also cultural events)"
    ],
    clubs: [
      "IÉSEG & EDHEC student associations",
      "ESN Lille"
    ],
  },
  {
    city: "Strasbourg",
    cafes: [ 
      "Café Bretelles", 
      "Oh My Goodness Café"
    ],
    studySpots: [
      "Bibliothèque nationale et universitaire",
      "Shadok coworking"
    ],
    clubs: [
      "UNISTRA Language Exchange",
      "Music & Theater Club"
    ],
  },
  {
    city: "Bordeaux",
    cafes: [
      "SIP Coffee Bar",
      "Books & Coffee"
    ],
    studySpots: [
      "Université de Bordeaux Libraries"
    ],
    clubs: [
      "Erasmus Bordeaux",
      "KEDGE Business School societies"
    ],
  },
  {
    city: "Nice",
    cafes: [
      "Café Marché",
      "Paper Plane"
    ],
    studySpots: [
      "Université Côte d’Azur libraries"
    ],
    clubs: [
      "EDHEC Nice student clubs",
      "Aloha Nice (international welcome)"
    ],
  },
  {
    city: "Marseille",
    cafes: [
      "Deep Coffee Roasters",
      "La Caravelle"
    ],
    studySpots: [
      "Bibliothèque Alcazar",
      "Coworking spots near Vieux Port"
    ],
    clubs: [
      "AMU Sports Clubs",
      "Erasmus Marseille"
    ],
  }
];

const getPinKey = (city: string) => `city-pin-${city}`;

export function LocalRecommendations() {
  const [pinned, setPinned] = useState<{ [city: string]: boolean }>(() => {
    if (typeof window !== "undefined") {
      const keys = Object.fromEntries(cities.map(c => [c.city, !!localStorage.getItem(getPinKey(c.city))]));
      return keys;
    }
    return {};
  });

  const handlePin = (city: string) => {
    setPinned(prev => {
      const newPinned = { ...prev, [city]: !prev[city] };
      if (newPinned[city]) {
        localStorage.setItem(getPinKey(city), "true");
      } else {
        localStorage.removeItem(getPinKey(city));
      }
      return newPinned;
    });
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map(city => (
          <Card key={city.city} className={`transition ${pinned[city.city] ? "ring-2 ring-yellow-300" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center mb-1 justify-between">
                <div className="font-semibold text-gray-900">{city.city}</div>
                <button
                  aria-label={pinned[city.city] ? "Unpin city" : "Pin city"}
                  onClick={() => handlePin(city.city)}
                  className={`hover:text-yellow-500 transition ${pinned[city.city] ? "text-yellow-500" : "text-gray-300"}`}
                  title={pinned[city.city] ? "Unpin this city" : "Pin this city"}
                  tabIndex={0}
                >
                  <Star className={`h-5 w-5`} fill={pinned[city.city] ? "#eab308" : "none"} />
                </button>
              </div>
              <div className="mb-1 text-gray-800"><span className="font-medium">Cafés:</span> {city.cafes.join(", ")}</div>
              <div className="mb-1 text-gray-800"><span className="font-medium">Study:</span> {city.studySpots.join(", ")}</div>
              <div className="text-gray-800"><span className="font-medium">Clubs:</span> {city.clubs.join(", ")}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-3 text-xs text-gray-600 italic">
        Want your favorite spot listed? Suggest it via the Feedback button!
      </div>
    </div>
  );
}
