import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CityCard } from "@/components/school-insights/CityCard";
import { CityInsightsCard } from "@/components/school-insights/CityInsightsCard";
import { InsightsDialog } from "@/components/school-insights/InsightsDialog";
import { SchoolDetail } from "@/components/school-insights/SchoolDetail";

interface School {
  id: string;
  name: string;
  city: string;
  description: string;
  levels: string[];
  subjects: string[];
  website: string;
}

const schools: School[] = [
  {
    id: "sorbonne",
    name: "Sorbonne University",
    city: "Paris",
    description: "Humanities, sciences, and medicine",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Humanities", "Science", "Medicine"],
    website: "https://www.sorbonne-universite.fr/",
  },
  {
    id: "psl",
    name: "PSL University",
    city: "Paris",
    description: "Includes ENS, Dauphine, Mines ParisTech",
    levels: ["Graduate"],
    subjects: ["Science", "Economics", "Engineering"],
    website: "https://psl.eu/",
  },
  {
    id: "polytechnique",
    name: "École Polytechnique",
    city: "Paris",
    description: "Elite engineering grande école.",
    levels: ["Graduate"],
    subjects: ["Engineering", "Science", "Economics"],
    website: "https://www.polytechnique.edu/",
  },
  {
    id: "hec-paris",
    name: "HEC Paris",
    city: "Paris",
    description: "Top global business school",
    levels: ["Graduate"],
    subjects: ["MBA", "Grande École"],
    website: "https://www.hec.edu/",
  },
  {
    id: "escp",
    name: "ESCP Business School",
    city: "Paris",
    description: "Multi-campus, Paris is the flagship",
    levels: ["Graduate"],
    subjects: ["MIM", "MBA"],
    website: "https://escp.eu/",
  },
  {
    id: "sciencespo-paris",
    name: "Sciences Po Paris",
    city: "Paris",
    description: "Political science, international affairs",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Politics", "International Affairs"],
    website: "https://www.sciencespo.fr/",
  },
  {
    id: "neoma-paris",
    name: "NEOMA Business School (Paris)",
    city: "Paris",
    description: "Executive & MSc programs",
    levels: ["Graduate"],
    subjects: ["MSc", "Executive"],
    website: "https://www.neoma-bs.com/en/",
  },
  {
    id: "telecom-paris",
    name: "Télécom Paris",
    city: "Paris",
    description: "Tech-focused grande école",
    levels: ["Graduate"],
    subjects: ["Engineering", "Telecom"],
    website: "https://www.telecom-paris.fr/",
  },
  {
    id: "essec",
    name: "ESSEC Business School",
    city: "Cergy",
    description: "Cergy campus in Paris region",
    levels: ["Graduate"],
    subjects: ["MIM", "MBA", "MSc"],
    website: "https://www.essec.edu/",
  },
  {
    id: "centrale-lyon",
    name: "École Centrale de Lyon",
    city: "Lyon",
    description: "Engineering and applied sciences",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.ec-lyon.fr/",
  },
  {
    id: "insa-lyon",
    name: "INSA Lyon",
    city: "Lyon",
    description: "Public engineering school",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
    website: "https://www.insa-lyon.fr/",
  },
  {
    id: "claude-bernard",
    name: "Université Claude Bernard Lyon 1",
    city: "Lyon",
    description: "Sciences and medicine",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Medicine", "Science"],
    website: "https://www.univ-lyon1.fr/",
  },
  {
    id: "em-lyon",
    name: "EM Lyon Business School",
    city: "Lyon",
    description: "Prestigious business Grande École",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc"],
    website: "https://www.em-lyon.fr/",
  },
  {
    id: "lumiere-lyon2",
    name: "Université Lumière Lyon 2",
    city: "Lyon",
    description: "Social sciences and arts",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Arts", "Social Sciences"],
    website: "https://www.univ-lumiere.fr/",
  },
  {
    id: "supaero",
    name: "ISAE-SUPAERO",
    city: "Toulouse",
    description: "Top aerospace engineering school",
    levels: ["Graduate"],
    subjects: ["Aerospace Engineering"],
    website: "https://www.isae-supaero.fr/",
  },
  {
    id: "insa-toulouse",
    name: "INSA Toulouse",
    city: "Toulouse",
    description: "Public engineering school",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
    website: "https://www.insa-toulouse.fr/",
  },
  {
    id: "paul-sabatier",
    name: "Université Toulouse III – Paul Sabatier",
    city: "Toulouse",
    description: "Science, tech, health",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Technology", "Health"],
    website: "https://www.univ-toulouse3.fr/",
  },
  {
    id: "tbs",
    name: "TBS Education",
    city: "Toulouse",
    description: "Grande École business program",
    levels: ["Graduate"],
    subjects: ["Business"],
    website: "https://www.tbs-education.fr/",
  },
  {
    id: "capitole",
    name: "Université Toulouse 1 Capitole",
    city: "Toulouse",
    description: "Law, economics, management",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Law", "Economics", "Management"],
    website: "https://www.univ-toulouse1.fr/",
  },
  {
    id: "neoma-rouen",
    name: "NEOMA Business School (Main campus)",
    city: "Rouen",
    description: "PGE, MSc, BBA programs",
    levels: ["Graduate"],
    subjects: ["PGE", "MSc", "BBA"],
    website: "https://www.neoma-bs.com/en/",
  },
  {
    id: "insa-rouen",
    name: "INSA Rouen Normandie",
    city: "Rouen",
    description: "Engineering across multiple domains",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
    website: "https://www.insa-rouen.fr/",
  },
  {
    id: "rouen-univ",
    name: "Université de Rouen Normandie",
    city: "Rouen",
    description: "Comprehensive university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
    website: "https://www.univ-rouen.fr/",
  },
  {
    id: "esigelec",
    name: "ESIGELEC Rouen",
    city: "Rouen",
    description: "Electronics and digital tech",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.esigelec.fr/",
  },
  {
    id: "neoma-reims",
    name: "NEOMA Business School (Reims)",
    city: "Reims",
    description: "Core business programs",
    levels: ["Graduate"],
    subjects: ["Business", "MBA", "MSc"],
    website: "https://www.neoma-bs.com/en/",
  },
  {
    id: "sciencespo-reims",
    name: "Sciences Po Campus Reims",
    city: "Reims",
    description: "International program focus",
    levels: ["Undergraduate"],
    subjects: ["Politics", "Global Affairs"],
    website: "https://www.sciencespo.fr/",
  },
  {
    id: "reims-univ",
    name: "Université de Reims Champagne-Ardenne",
    city: "Reims",
    description: "Regional public university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
    website: "https://www.univ-reims.fr/",
  },
  {
    id: "esiec",
    name: "ESIEC Reims",
    city: "Reims",
    description: "Packaging and digital engineering",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.esiec.fr/",
  },
  {
    id: "lille-univ",
    name: "Université de Lille",
    city: "Lille",
    description: "Large multidisciplinary public university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
    website: "https://www.univ-lille.fr/",
  },
  {
    id: "edhec-lille",
    name: "EDHEC Business School",
    city: "Lille",
    description: "Top 5 French business school",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc", "Finance"],
    website: "https://www.edhec.fr/",
  },
  {
    id: "centrale-lille",
    name: "École Centrale de Lille",
    city: "Lille",
    description: "Elite engineering school",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.ec-lille.fr/",
  },
  {
    id: "ieseg",
    name: "IESEG School of Management",
    city: "Lille",
    description: "AACSB-accredited Grande École",
    levels: ["Graduate"],
    subjects: ["Management", "MSc"],
    website: "https://www.ieseg.fr/",
  },
  {
    id: "hei",
    name: "HEI – Hautes Études d'Ingénieur",
    city: "Lille",
    description: "Private engineering school",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.hei.fr/",
  },
  {
    id: "strasbourg-univ",
    name: "Université de Strasbourg",
    city: "Strasbourg",
    description: "Prestigious university, strong in sciences and humanities",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Humanities"],
    website: "https://www.univ-strasbourg.fr/",
  },
  {
    id: "insa-strasbourg",
    name: "INSA Strasbourg",
    city: "Strasbourg",
    description: "Part of the INSA engineering network",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
    website: "https://www.insa-strasbourg.fr/",
  },
  {
    id: "em-strasbourg",
    name: "EM Strasbourg Business School",
    city: "Strasbourg",
    description: "Business school within the university",
    levels: ["Graduate"],
    subjects: ["Business"],
    website: "https://www.em-strasbourg.fr/",
  },
  {
    id: "sciencespo-strasbourg",
    name: "Sciences Po Strasbourg",
    city: "Strasbourg",
    description: "Regional campus of Sciences Po",
    levels: ["Undergraduate"],
    subjects: ["Politics"],
    website: "https://www.sciencespo.fr/",
  },
  {
    id: "bordeaux-univ",
    name: "Université de Bordeaux",
    city: "Bordeaux",
    description: "Comprehensive research university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Engineering"],
    website: "https://www.univ-bordeaux.fr/",
  },
  {
    id: "kedge-bordeaux",
    name: "KEDGE Business School",
    city: "Bordeaux",
    description: "Top-tier business school",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc"],
    website: "https://www.kedge-business-school.fr/",
  },
  {
    id: "enseirb",
    name: "ENSEIRB-MATMECA",
    city: "Bordeaux",
    description: "Engineering in IT, electronics, math",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.enseirb-matmeca.fr/",
  },
  {
    id: "sciencespo-bordeaux",
    name: "Sciences Po Bordeaux",
    city: "Bordeaux",
    description: "Political science and international studies",
    levels: ["Undergraduate"],
    subjects: ["Politics"],
    website: "https://www.sciencespo.fr/",
  },
  {
    id: "inpbordeaux",
    name: "INP Bordeaux",
    city: "Bordeaux",
    description: "Engineering network incl. ENSEIRB-MATMECA, ENSCBP",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.inp-bordeaux.fr/",
  },
  {
    id: "uca",
    name: "Université Côte d'Azur",
    city: "Nice",
    description: "Alliance of local institutions under one label",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
    website: "https://www.univ-cotedazur.fr/",
  },
  {
    id: "skema-nice",
    name: "SKEMA Business School (Sophia)",
    city: "Nice",
    description: "Global business school with AI focus",
    levels: ["Graduate"],
    subjects: ["Business", "AI"],
    website: "https://www.skema.fr/",
  },
  {
    id: "polytech-nice",
    name: "Polytech Nice Sophia",
    city: "Nice",
    description: "Engineering school within UCA",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
    website: "https://www.polytech-nice.fr/",
  },
  {
    id: "edhec-nice",
    name: "EDHEC Business School (Nice)",
    city: "Nice",
    description: "Specializes in Finance MSc and Global MBA",
    levels: ["Graduate"],
    subjects: ["Finance", "MBA"],
    website: "https://www.edhec.fr/",
  },
  {
    id: "mines-sophia",
    name: "Mines Paris – Sophia",
    city: "Sophia Antipolis",
    description: "AI and systems engineering research campus",
    levels: ["Graduate"],
    subjects: ["Engineering", "AI"],
    website: "https://www.mines-paris-sophia.fr/",
  },
  {
    id: "amu",
    name: "Aix-Marseille Université",
    city: "Marseille",
    description: "One of France's largest public universities",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
    website: "https://www.univ-amu.fr/",
  },
  {
    id: "kedge-marseille",
    name: "KEDGE Business School (Marseille)",
    city: "Marseille",
    description: "Major business school",
    levels: ["Graduate"],
    subjects: ["Business"],
    website: "https://www.kedge-business-school.fr/",
  },
  {
    id: "centrale-marseille",
    name: "École Centrale de Marseille",
    city: "Marseille",
    description: "Part of the Centrale engineering group",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.ec-marseille.fr/",
  },
  {
    id: "polytech-marseille",
    name: "Polytech Marseille",
    city: "Marseille",
    description: "Engineering programs under AMU",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
    website: "https://www.polytech-marseille.fr/",
  },
  {
    id: "grenoble-univ",
    name: "Université Grenoble Alpes",
    city: "Grenoble",
    description: "Leading research university in sciences and humanities",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Humanities", "Engineering"],
    website: "https://www.univ-grenoble-alpes.fr/",
  },
  {
    id: "grenoble-inp",
    name: "Grenoble INP",
    city: "Grenoble",
    description: "Engineering institute with multiple schools",
    levels: ["Graduate"],
    subjects: ["Engineering", "Technology"],
    website: "https://www.grenoble-inp.fr/",
  },
  {
    id: "gem",
    name: "Grenoble Ecole de Management",
    city: "Grenoble",
    description: "Top business school with tech focus",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc", "Business"],
    website: "https://www.grenoble-em.fr/",
  },
  {
    id: "ensimag",
    name: "Ensimag",
    city: "Grenoble",
    description: "Engineering school specializing in IT and applied math",
    levels: ["Graduate"],
    subjects: ["Engineering", "IT"],
    website: "https://www.ensimag.fr/",
  },
  {
    id: "sciencespo-grenoble",
    name: "Sciences Po Grenoble",
    city: "Grenoble",
    description: "Political science and governance programs",
    levels: ["Undergraduate"],
    subjects: ["Politics", "Governance"],
    website: "https://www.sciencespo.fr/",
  },
  {
    id: "nantes-univ",
    name: "Université de Nantes",
    city: "Nantes",
    description: "Comprehensive public university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
    website: "https://www.univ-nantes.fr/",
  },
  {
    id: "audencia",
    name: "Audencia Business School",
    city: "Nantes",
    description: "Top-tier business school with international focus",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc", "Business"],
    website: "https://www.audencia.fr/",
  },
  {
    id: "centrale-nantes",
    name: "École Centrale de Nantes",
    city: "Nantes",
    description: "Elite engineering grande école",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.ec-nantes.fr/",
  },
  {
    id: "polytech-nantes",
    name: "Polytech Nantes",
    city: "Nantes",
    description: "Engineering school under Université de Nantes",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
    website: "https://www.polytech-nantes.fr/",
  },
  {
    id: "oniris",
    name: "Oniris",
    city: "Nantes",
    description: "Engineering in food science and veterinary medicine",
    levels: ["Graduate"],
    subjects: ["Engineering", "Veterinary"],
    website: "https://www.oniris.fr/",
  },
  {
    id: "larochelle-univ",
    name: "Université de La Rochelle",
    city: "La Rochelle",
    description: "Public university with environmental focus",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Environment", "Humanities"],
    website: "https://www.univ-larochelle.fr/",
  },
  {
    id: "excelia",
    name: "Excelia Business School",
    city: "La Rochelle",
    description: "Business school with tourism and sustainability programs",
    levels: ["Graduate"],
    subjects: ["Business", "Tourism", "MSc"],
    website: "https://www.excelia.fr/",
  },
  {
    id: "eigsi",
    name: "EIGSI La Rochelle",
    city: "La Rochelle",
    description: "General engineering with maritime focus",
    levels: ["Graduate"],
    subjects: ["Engineering"],
    website: "https://www.eigsi.fr/",
  },
  {
    id: "institut-ocean",
    name: "Institut de l'Océan",
    city: "La Rochelle",
    description: "Marine and environmental research programs",
    levels: ["Graduate"],
    subjects: ["Marine Science", "Environment"],
    website: "https://www.institut-ocean.fr/",
  },
];

interface SchoolInsightsPageProps {
  onBack: () => void;
}

const cityData = [
  {
    name: "Paris",
    emoji: "🗼",
    description: "The heart of France – rich history, fashion, and art.",
    localInsights: [
      {
        title: "Public Transport",
        description: "Metro, buses and trams.",
        tips: [
          "Get a Navigo card for unlimited public transport.",
          "Lines 1 & 14 are automated and fast.",
          "Avoid rush hour if possible.",
        ],
      },
      {
        title: "Student Life",
        description: "Vibrant, international, with lots of events.",
        tips: [
          "Check out student bars around Latin Quarter.",
          "Many museums offer free entry for students.",
        ],
      },
    ],
    transport: "Metro, RER, buses cover the city efficiently.",
    famousPlaces: "Louvre, Eiffel Tower, Notre-Dame, Montmartre.",
    sportsFacilities: "University gyms, running tracks along the Seine.",
    studentLife: "International community, cultural events, night life.",
    schoolsCount: schools.filter(s => s.city === "Paris").length,
  },
  {
    name: "Lyon",
    emoji: "🦁",
    description: "France’s culinary capital and student city.",
    localInsights: [
      {
        title: "Local Cuisine",
        description: "Try out the famous 'bouchons'.",
        tips: [
          "Don’t miss quenelles and praline tarts.",
          "Explore Croix-Rousse for hidden gems.",
        ],
      },
    ],
    transport: "Metro, bus, tramways and funicular.",
    famousPlaces: "Basilica of Notre-Dame de Fourvière, Parc de la Tête d'Or.",
    sportsFacilities: "University sports centers, Rhône river paths.",
    studentLife: "Vibrant nightlife, student associations.",
    schoolsCount: schools.filter(s => s.city === "Lyon").length,
  },
  {
    name: "Cergy",
    emoji: "🌳",
    description: "Modern city in Paris' green belt, lively student hub.",
    localInsights: [],
    transport: "RER A, bus lines; direct train to Paris.",
    famousPlaces: "Axe Majeur, marina, leisure island.",
    sportsFacilities: "Base de loisirs, rowing, swimming.",
    studentLife: "Student festivals, bars, affordable housing.",
    schoolsCount: schools.filter(s => s.city === "Cergy").length,
  },
  {
    name: "Toulouse",
    emoji: "🛩️",
    description: "The pink city—known for aerospace and warm climate.",
    localInsights: [],
    transport: "Metro, tram, bus.",
    famousPlaces: "Capitole, Canal du Midi, Cité de l'Espace.",
    sportsFacilities: "Stadium de Toulouse, parks along Garonne.",
    studentLife: "Cafés, rugby games, summer festivals.",
    schoolsCount: schools.filter(s => s.city === "Toulouse").length,
  },
  {
    name: "Rouen",
    emoji: "⛪",
    description: "Medieval history on the Seine, lively student city.",
    localInsights: [],
    transport: "Metro, bus, TEOR.",
    famousPlaces: "Rouen Cathedral, Gros-Horloge.",
    sportsFacilities: "Kindarena, Seine river walks.",
    studentLife: "Student parties, riverside bars.",
    schoolsCount: schools.filter(s => s.city === "Rouen").length,
  },
  {
    name: "Reims",
    emoji: "🍾",
    description: "Champagne capital with rich history and student life.",
    localInsights: [],
    transport: "Tram, bus, TGV to Paris.",
    famousPlaces: "Reims Cathedral, Champagne cellars.",
    sportsFacilities: "Stade Auguste Delaune, local gyms.",
    studentLife: "Festivals, cellar tours, city squares.",
    schoolsCount: schools.filter(s => s.city === "Reims").length,
  },
  {
    name: "Lille",
    emoji: "🌧️",
    description: "Young, vibrant and friendly in France's north.",
    localInsights: [],
    transport: "Metro, tram, bus.",
    famousPlaces: "Grand Place, Vieux Lille.",
    sportsFacilities: "Stade Pierre-Mauroy, parks.",
    studentLife: "Nightlife, international students, cheap eats.",
    schoolsCount: schools.filter(s => s.city === "Lille").length,
  },
  {
    name: "Strasbourg",
    emoji: "🗺️",
    description: "European city with Franco-German heritage.",
    localInsights: [],
    transport: "Tram, bus, bikes.",
    famousPlaces: "Petite France, Cathedral, EU Parliament.",
    sportsFacilities: "Stade de la Meinau, Rhenus.",
    studentLife: "Christmas market, cross-border events.",
    schoolsCount: schools.filter(s => s.city === "Strasbourg").length,
  },
  {
    name: "Bordeaux",
    emoji: "🍇",
    description: "Wine capital by the Atlantic, UNESCO World Heritage.",
    localInsights: [],
    transport: "Tram, bus, bike.",
    famousPlaces: "Place de la Bourse, Cité du Vin.",
    sportsFacilities: "Matmut Atlantique stadium.",
    studentLife: "River festivals, food markets.",
    schoolsCount: schools.filter(s => s.city === "Bordeaux").length,
  },
  {
    name: "Nice",
    emoji: "🏖️",
    description: "Sunny Riviera, Mediterranean beaches and culture.",
    localInsights: [],
    transport: "Tram, bus.",
    famousPlaces: "Promenade des Anglais, Vieux Nice.",
    sportsFacilities: "Beach sports, Stade Allianz Riviera.",
    studentLife: "Seafood, nightlife, international vibe.",
    schoolsCount: schools.filter(s => s.city === "Nice").length,
  },
  {
    name: "Sophia Antipolis",
    emoji: "🌲",
    description: "Innovative science and tech park near Nice.",
    localInsights: [],
    transport: "Bus, car.",
    famousPlaces: "Tech business hubs, close to Antibes beaches.",
    sportsFacilities: "Campus sports, cycling trails.",
    studentLife: "Research, green spaces, student cafés.",
    schoolsCount: schools.filter(s => s.city === "Sophia Antipolis").length,
  },
  {
    name: "Marseille",
    emoji: "⛵",
    description: "Historic port city on the Mediterranean.",
    localInsights: [],
    transport: "Metro, tram, bus, ferry.",
    famousPlaces: "Vieux-Port, Notre-Dame de la Garde.",
    sportsFacilities: "Vélodrome stadium, coastal runs.",
    studentLife: "Diverse cuisine, concerts, seaside venues.",
    schoolsCount: schools.filter(s => s.city === "Marseille").length,
  },
  {
    name: "Grenoble",
    emoji: "🏔️",
    description: "Alpine student city and innovation hub.",
    localInsights: [],
    transport: "Tram, bus.",
    famousPlaces: "Bastille, cable car, Isère river.",
    sportsFacilities: "Ski, mountain sports, stadium.",
    studentLife: "Ski trips, tech events, outdoor life.",
    schoolsCount: schools.filter(s => s.city === "Grenoble").length,
  },
  {
    name: "Nantes",
    emoji: "🦑",
    description: "Atlantic city with creative and green spirit.",
    localInsights: [],
    transport: "Tram, bus, ferry.",
    famousPlaces: "Château des Ducs, Machines de l’Île.",
    sportsFacilities: "Stade de la Beaujoire, riverside parks.",
    studentLife: "Festivals, clubs, local food.",
    schoolsCount: schools.filter(s => s.city === "Nantes").length,
  },
  {
    name: "La Rochelle",
    emoji: "⚓",
    description: "Coastal charm, eco-friendly and marine studies.",
    localInsights: [],
    transport: "Bus, bike, ferry.",
    famousPlaces: "Old Port, towers, Aquarium.",
    sportsFacilities: "Water sports, yachting, cycling.",
    studentLife: "Seafood, beach, student nights.",
    schoolsCount: schools.filter(s => s.city === "La Rochelle").length,
  },
];

// fallback if cityData entry not found
function getCityDetails(cityName: string) {
  return (
    cityData.find(c => c.name === cityName) || {
      name: cityName,
      emoji: "",
      description: "",
      localInsights: [],
      transport: "Local buses and trams available.",
      famousPlaces: "",
      sportsFacilities: "",
      studentLife: "",
      schoolsCount: schools.filter(s => s.city === cityName).length,
    }
  );
}

export function SchoolInsightsPage({ onBack }: SchoolInsightsPageProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [showCityInsights, setShowCityInsights] = useState(false);

  // Track selected school for detail modal/page
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);

  // All unique cities from the data
  const cityList = Array.from(new Set(schools.map((s) => s.city)));

  // Schools for selected city
  const citySchools = selectedCity
    ? schools.filter((school) => school.city === selectedCity)
    : [];

  // Subjects for selected city
  const availableSubjects = selectedCity
    ? Array.from(
        new Set(citySchools.flatMap((s) => s.subjects || []))
      ).sort()
    : [];

  // Schools to display (subject filter applied if needed)
  let displayedSchools = citySchools;
  if (subjectFilter !== "All" && selectedCity) {
    displayedSchools = citySchools.filter((school) =>
      (school.subjects || []).includes(subjectFilter)
    );
  }

  const cityDetails = selectedCity ? getCityDetails(selectedCity) : null;

  // School details view: show only detail, with a back button to city
  if (selectedSchool) {
    return (
      <SchoolDetail
        school={{
          ...selectedSchool,
          programs: selectedSchool.subjects || [],
          website: selectedSchool.website || "",
          location: selectedSchool.city || "",
        }}
        onBack={() => setSelectedSchool(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        {/* Only show Checklist back button when in city selection view */}
        {!selectedCity ? (
          <>
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Checklist
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">School Insights</h1>
          </>
        ) : (
          <>
            {/* In city view or school grid, show Back to Cities */}
            <Button variant="ghost" onClick={() => setSelectedCity(null)} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{selectedCity} – Schools & Info</h1>
          </>
        )}
      </div>

      {/* Grid Card view for city selection */}
      {!selectedCity && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Explore by City</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6">
            {cityList.map((city) => {
              const cityDef = getCityDetails(city);
              return (
                <CityCard
                  key={city}
                  name={cityDef.name}
                  emoji={cityDef.emoji}
                  description={cityDef.description}
                  schoolsCount={cityDef.schoolsCount}
                  onClick={() => setSelectedCity(city)}
                  localInsights={cityDef.localInsights}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* City Insights Card & Dialog */}
      {selectedCity && (
        <div className="mb-4">
          <CityInsightsCard
            cityName={cityDetails.name}
            transport={cityDetails.transport}
            famousPlaces={cityDetails.famousPlaces}
            sportsFacilities={cityDetails.sportsFacilities}
            studentLife={cityDetails.studentLife}
            onShowAll={() => setShowCityInsights(true)}
          />
          <InsightsDialog
            open={showCityInsights}
            onOpenChange={setShowCityInsights}
            cityName={cityDetails.name}
            localInsights={cityDetails.localInsights}
            transport={cityDetails.transport}
            famousPlaces={cityDetails.famousPlaces}
            sportsFacilities={cityDetails.sportsFacilities}
            studentLife={cityDetails.studentLife}
          />
        </div>
      )}

      {/* Filter by Subject: ONLY IF a city is selected AND there is >1 subject */}
      {selectedCity && availableSubjects.length > 1 && (
        <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
          <label htmlFor="subject-filter" className="font-medium text-gray-700">
            Filter by Subject:
          </label>
          <select
            id="subject-filter"
            className="border rounded px-2 py-2 text-sm md:w-64 w-full focus:outline-none"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="All">All Subjects</option>
            {availableSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Insights Cards & Schools grid */}
      {selectedCity ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Schools in {selectedCity}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSchools.length > 0 ? (
              displayedSchools.map((school) => (
                <Card
                  key={school.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    setSelectedSchool({
                      ...school,
                      programs: school.subjects || [],
                      website: school.website || "",
                      location: school.city || "",
                    })
                  }
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {school.name}
                    </h3>
                    <p className="text-sm text-gray-600">{school.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(school.subjects || []).map((subj) => (
                        <span
                          key={subj}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {subj}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-gray-500 text-center">
                No schools found for this subject in {selectedCity}.
              </div>
            )}
          </div>
        </div>
      ) : (
        // Local insights view for when no city selected
        <div className="text-gray-500 text-center">
          Select a city to explore school insights.
        </div>
      )}
    </div>
  );
}
