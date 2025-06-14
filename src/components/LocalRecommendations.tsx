
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
    cafes: ["Café de Flore", "Le Procope", "Shakespeare & Company Café", "Dose Café", "KB Coffee Roasters"],
    studySpots: ["Bibliothèque François-Mitterrand", "Cité Internationale Universitaire Library", "Sainte-Geneviève Library"],
    clubs: ["Rex Club", "Le Duplex", "Nouveau Casino", "Wanderlust"],
  },
  {
    city: "Lyon",
    cafes: ["Café Mokxa", "Le Luminarium", "Slake Coffee"],
    studySpots: ["Bibliothèque de la Part-Dieu", "Université de Lyon Library"],
    clubs: ["Le Sucre", "Transbordeur", "L'Absolu"],
  },
  {
    city: "Toulouse",
    cafes: ["Café Cerise", "La Fiancée", "Les Fils à Maman"],
    studySpots: ["Bibliothèque d'Étude et du Patrimoine", "Université Toulouse Library"],
    clubs: ["Le Bikini", "Connexion Live", "The Hopscotch Pub"],
  },
  {
    city: "Rouen",
    cafes: ["Café Hamlet", "Suppose Café", "La Petite Bouffe"],
    studySpots: ["Bibliothèque Simone de Beauvoir", "Université de Rouen Library"],
    clubs: ["Le 106", "Le So", "Le Bateau Ivre"],
  },
  {
    city: "Reims",
    cafes: ["Café du Palais", "L'Epicerie Au Bon Manger", "Café de la Paix"],
    studySpots: ["Médiathèque Jean Falala", "Bibliothèque Carnegie"],
    clubs: ["Club 30", "Le Vogue", "L'Atrium"],
  },
  {
    city: "Lille",
    cafes: ["Coffee Makers", "Tamper Espresso Bar", "Le Dandy"],
    studySpots: ["Bibliothèque Universitaire SHS", "Lille Grand Palais Library"],
    clubs: ["Magazine Club", "Network Club", "Le Baron"],
  },
  {
    city: "Strasbourg",
    cafes: ["Café Bretelles", "Oh My Goodness Café", "What the Cake?"],
    studySpots: ["Médiathèque André Malraux", "Université de Strasbourg Library"],
    clubs: ["La Laiterie", "Mudd Club", "The Living Room"],
  },
  {
    city: "Bordeaux",
    cafes: ["Black List Café", "SIP Coffee Bar", "L'Alchimiste Café Boutique"],
    studySpots: ["Bibliothèque Mériadeck", "Université de Bordeaux Library"],
    clubs: ["I.Boat", "La Plage", "Le Black Diamond"],
  },
  {
    city: "Nice",
    cafes: ["Café Marché", "Empreinte Café", "Brulerie des Cafés Indien"],
    studySpots: ["Bibliothèque Louis Nucéra", "Université Côte d'Azur Library"],
    clubs: ["High Club", "Le Glam", "Studio 47"],
  },
  {
    city: "Marseille",
    cafes: ["Café de la Banque", "Noailles Café", "La Caravelle"],
    studySpots: ["Alcazar Library", "Université Aix-Marseille Library"],
    clubs: ["Le Trolleybus", "Baby Club", "Le Spartacus"],
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
