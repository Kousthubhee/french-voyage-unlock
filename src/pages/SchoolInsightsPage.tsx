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
    description: "Top global business school. Triple-accredited: EQUIS, AACSB, AMBA. Global Rankings: FT European Business School top 2–3; FT MiM #1 Europe; MSc Finance #1 worldwide.",
    levels: ["Graduate"],
    subjects: [
      "Grande École – MiM",
      "MBA",
      "Executive MBA",
      "Trium EMBA",
      "MSc (various)",
      "PhD",
    ],
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
    description: "Political science, international affairs. Top 50 global, Top EU political science. Highly selective Bachelor’s & Master’s programs; Paris and international campuses.",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Bachelor’s (College Universitaire)",
      "Master’s (multiple schools)",
      "One-Year Master’s",
      "PhD"
    ],
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
        title: "Transport",
        description:
          "Robust metro, RER, buses with discounted Navigo Imagine R card for students under 26.",
        tips: [
          "Get the Navigo Imagine R card for unlimited public transport if you are under 26.",
          "Metro lines 1 & 14 are automated and fastest during peak times.",
          "Vélib' bike-sharing is now safer thanks to extra bike lanes.",
          "Cycling commutes now outpace car usage thanks to heavy investment in bike lanes and Vélib'.",
        ],
      },
      {
        title: "Cycling",
        description:
          "Heavy investment in bike lanes & Vélib’; cycling commutes now outpace car usage.",
        tips: [
          "Use Vélib' bike-sharing for safe and affordable cycling.",
          "Bike lanes are extensive—consider cycling for daily commutes.",
        ],
      },
      {
        title: "Sports",
        description:
          "Free access to city-run football pitches, rugby fields & athletic tracks. University sports complexes (~60-100 activities) across city/suburbs.",
        tips: [
          "University sports complexes offer a wide range of activities.",
          "City football, rugby and athletics pitches are free for students.",
          "Look for legacy sports parks from Paris 2024 for unique events.",
        ],
      },
      {
        title: "Student Life",
        description:
          "Great Erasmus/student community life, coliving options, cultural events—'bonjour/merci' etiquette matters!",
        tips: [
          "Student association bars in the Latin Quarter are popular and budget-friendly.",
          "Museums like the Louvre and musée d’Orsay offer free/reduced entry for students.",
          "Learning 'bonjour' and 'merci' goes a long way!",
          "Participate in city cultural events to meet other students.",
        ],
      },
      {
        title: "Nearby Landmarks",
        description:
          "World-class museums (Louvre, musée d’Orsay), parks, and major events (Stade de France, aquatic centre, legacy of Paris 2024).",
        tips: [
          "Always check for student discounts at major attractions and events.",
        ],
      },
    ],
    transport: "Metro, RER, buses cover the city efficiently.",
    famousPlaces: "Louvre, Eiffel Tower, Notre-Dame, Montmartre.",
    sportsFacilities: "University gyms, running tracks along the Seine.",
    studentLife: "International community, cultural events, night life.",
    schoolsCount: schools.filter((s) => s.city === "Paris").length,
  },
  {
    name: "Lyon",
    emoji: "🦁",
    description: "France’s culinary capital and student city.",
    localInsights: [
      {
        title: "Transport",
        description: "Efficient TCL metro/trams/buses plus Velo’v bike-sharing.",
        tips: [
          "Use the TCL app to plan multi-modal journeys.",
          "Velo’v is the best way to navigate the inner city and cost-effective for students.",
        ],
      },
      {
        title: "Green & Sporty",
        description: "Over 200 sports offered; 200 km of trails, parks, riversides for outdoor activities.",
        tips: [
          "Jog or cycle along the Rhône/Saône riverfronts for great views.",
          "Check out student discounts for gyms and sports centers via LyonCampus.com.",
        ],
      },
      {
        title: "Campus Life",
        description:
          "Institutions like INSA & Centrale Lyon offer tailored student support, sports centres, cafeteria, wellness.",
        tips: [
          "Join a student association for instant local friends and tips.",
          "Student wellness coordinators and subsidized cafeterias help new arrivals.",
        ],
      },
      {
        title: "Nearby/Excursions",
        description: "Rhône/Saône riverfronts, regional Beaujolais vineyards, Alpine gateway.",
        tips: [
          "Plan weekend trips to Beaujolais or take short train rides to the Alps for snow sports.",
        ],
      },
    ],
    transport: "Metro, bus, tramways and funicular.",
    famousPlaces: "Basilica of Notre-Dame de Fourvière, Parc de la Tête d'Or.",
    sportsFacilities: "University sports centers, Rhône river paths.",
    studentLife: "Vibrant nightlife, student associations.",
    schoolsCount: schools.filter((s) => s.city === "Lyon").length,
  },
  {
    name: "Cergy",
    emoji: "🌳",
    description: "Modern city in Paris' green belt, lively student hub.",
    localInsights: [
      {
        title: "Campus",
        description: "Green campus of CY Tech, served by RER A and buses 25 min from Paris center.",
        tips: [
          "RER A runs late into the evening—great for exploring Paris or late-night returns.",
          "Use buses for easy and cheap access to Port Cergy or leisure island.",
        ],
      },
      {
        title: "Student Life",
        description: "University residences, libraries, cafeterias, and 47 student associations.",
        tips: [
          "Join clubs at the university center—most offer free trial events.",
          "CYU’s cafeterias serve affordable, filling meals (RU Cergy).",
        ],
      },
      {
        title: "Sports Facilities",
        description:
          "273 public/open and campus sports facilities, including sailing, water-skiing, kayaking, ice-hockey at Aren’Ice arena (3,000‑seat).",
        tips: [
          "Try watersports on the lake or join student sailing/kayak clubs for discounted lessons.",
          "Aren’Ice hosts student nights for ice skating and hockey games.",
        ],
      },
      {
        title: "Nearby Attractions",
        description:
          "Leisure lake, parks, Port Cergy terraces, concerts, and cinemas.",
        tips: [
          "Port Cergy is perfect for riverside walks and concerts in spring/summer.",
          "Check the local cinema for French-language deals and VO (original version) film nights.",
        ],
      },
    ],
    transport: "RER A, bus lines; direct train to Paris.",
    famousPlaces: "Axe Majeur, marina, leisure island.",
    sportsFacilities: "Base de loisirs, rowing, swimming.",
    studentLife: "Student festivals, bars, affordable housing.",
    schoolsCount: schools.filter((s) => s.city === "Cergy").length,
  },
  {
    name: "Toulouse",
    emoji: "🛩️",
    description: "The pink city—known for aerospace and warm climate.",
    localInsights: [
      {
        title: "Transport",
        description:
          "Tisséo network (metro, tram, buses) plus Pastel card (~€10/mo for under‑26).",
        tips: [
          "Tisséo network covers metro, tram, buses. Get the Pastel card for affordable rides if you're under 26.",
        ],
      },
      {
        title: "Cycling",
        description:
          "VélôToulouse bike-sharing; good bike lanes, e.g., to INSA and campus.",
        tips: [
          "VélôToulouse bike-sharing is great for students.",
          "Bike lanes expand every year—try cycling to campus.",
        ],
      },
      {
        title: "Student Life",
        description:
          "Ranked France’s #1 student city; vibrant nightlife, 130k+ students, affordable housing & food halls (like Cartoucherie).",
        tips: [
          "Check out Cartoucherie food halls for budget eats and meeting friends.",
          "Many student events around universities—join at least one club or activity.",
        ],
      },
      {
        title: "Sports & Heritage",
        description:
          "City is rugby capital—Stade Toulousain, Toulouse FC (football), Stade Municipal; rich heritage along Canal du Midi, Romanesque basilica.",
        tips: [
          "Catch a rugby or football match for authentic Toulouse spirit.",
          "Walk along Canal du Midi for heritage sites and relaxing views.",
        ],
      },
    ],
    transport: "Metro, tram, bus.",
    famousPlaces: "Capitole, Canal du Midi, Cité de l'Espace.",
    sportsFacilities: "Stadium de Toulouse, parks along Garonne.",
    studentLife: "Cafés, rugby games, summer festivals.",
    schoolsCount: schools.filter((s) => s.city === "Toulouse").length,
  },
  {
    name: "Rouen",
    emoji: "⛪",
    description: "Medieval history on the Seine, lively student city.",
    localInsights: [
      {
        title: "Old Town & Culture",
        description:
          "Historic old town, Joan of Arc festival, museums (Beaux-Arts), CROUS student residencies.",
        tips: [
          "Don't miss the Joan of Arc festival each year.",
          "Beaux-Arts museum is a great student-friendly spot on weekends.",
        ],
      },
      {
        title: "Transport",
        description:
          "Public transport via Réseau Astuce local network; bike rentals.",
        tips: [
          "Get a student discount transit card for city buses and trams.",
        ],
      },
      {
        title: "Sports",
        description:
          "University sports facilities: gymnasiums, fields, tennis courts.",
        tips: [
          "Check out university gyms for affordable sports facilities.",
        ],
      },
      {
        title: "Nearby",
        description:
          "Seine valley, Monet’s Giverny within easy train reach.",
        tips: [
          "Take a day-trip to Monet’s Giverny!",
        ],
      },
    ],
    transport: "Metro, bus, TEOR.",
    famousPlaces: "Rouen Cathedral, Gros-Horloge.",
    sportsFacilities: "Kindarena, Seine river walks.",
    studentLife: "Student parties, riverside bars.",
    schoolsCount: schools.filter((s) => s.city === "Rouen").length,
  },
  {
    name: "Reims",
    emoji: "🍾",
    description: "Champagne capital with rich history and student life.",
    localInsights: [
      {
        title: "Transport",
        description: "Public transport (bus & tram), bike/sharing (Vél’hop).",
        tips: [
          "tram/bus offer easy access to all university campuses.",
          "Try Vél’hop for convenient bike-sharing!",
        ],
      },
      {
        title: "Champagne Houses & Events",
        description:
          "Champagne house tours with student discounts; annual national fairs and festivals.",
        tips: [
          "Look for student discount tickets at local Champagne houses.",
          "Habits de Lumière festival in December is a must-see.",
        ],
      },
      {
        title: "Sports",
        description:
          "University gyms, stadiums, aquatic centres.",
        tips: [
          "Check out university gym passes for affordable fitness.",
        ],
      },
      {
        title: "Landmarks",
        description:
          "Reims Cathedral, Palais du Tau; annual festivals.",
        tips: [
          "Festivals and culture are all around the city centre.",
        ],
      },
    ],
    transport: "Tram, bus, TGV to Paris.",
    famousPlaces: "Reims Cathedral, Champagne cellars.",
    sportsFacilities: "Stade Auguste Delaune, local gyms.",
    studentLife: "Festivals, cellar tours, city squares.",
    schoolsCount: schools.filter((s) => s.city === "Reims").length,
  },
  {
    name: "Lille",
    emoji: "🌧️",
    description: "Young, vibrant and friendly in France's north.",
    localInsights: [
      {
        title: "Transport",
        description: "Good tram, metro, bus network; bike-sharing (V’Lille) and TER regional trains.",
        tips: [
          "Try V’Lille for campus commutes.",
          "Use TER regional trains for day trips in northern France.",
        ],
      },
      {
        title: "Sports",
        description: "Multi-venue halls, Stade Pierre-Mauroy, campus gyms.",
        tips: [
          "Check out student discounts at Stade Pierre-Mauroy events.",
        ],
      },
      {
        title: "Culture",
        description: "Vieux Lille cafes, museums (Palais des Beaux-Arts), student-friendly discounts.",
        tips: [
          "Explore Vieux Lille’s cafes for a real local vibe.",
          "Visit Palais des Beaux-Arts with your student ID for reduced entry.",
          "Attend the grand Braderie festival for a unique city-wide market experience.",
        ],
      },
    ],
    transport: "Metro, tram, bus.",
    famousPlaces: "Grand Place, Vieux Lille.",
    sportsFacilities: "Stade Pierre-Mauroy, parks.",
    studentLife: "Nightlife, international students, cheap eats.",
    schoolsCount: schools.filter((s) => s.city === "Lille").length,
  },
  {
    name: "Strasbourg",
    emoji: "🗺️",
    description: "European city with Franco-German heritage.",
    localInsights: [
      {
        title: "Culture & Lifestyle",
        description:
          "Strong Franco-German heritage, world-famous Christmas market.",
        tips: [
          "Visit the European Parliament if you enjoy politics.",
          "Plan for city-crossing tram rides—Strasbourg is cyclist and pedestrian-friendly.",
          "Don't miss the Strasbourg Christmas market.",
        ],
      },
      {
        title: "Events & Outdoors",
        description: "Cross-border EU events, excellent river/canal activities.",
        tips: [
          "Explore riverside walks and canal kayaking.",
        ],
      },
    ],
    transport: "Tram, bus, bikes.",
    famousPlaces: "Petite France, Cathedral, EU Parliament.",
    sportsFacilities: "Stade de la Meinau, Rhenus.",
    studentLife: "Christmas market, cross-border events.",
    schoolsCount: schools.filter((s) => s.city === "Strasbourg").length,
  },
  {
    name: "Bordeaux",
    emoji: "🍇",
    description: "Wine capital by the Atlantic, UNESCO World Heritage.",
    localInsights: [
      {
        title: "Transport",
        description:
          "Tram, bus, bike all provide easy access to university and city nightlife.",
        tips: [
          "Use the TBM app to get real-time transit info.",
          "Bike paths lead along the river—great for leisure rides.",
        ],
      },
      {
        title: "Wine & Culture",
        description:
          "City is famous for wine, festivals, and riverfront events.",
        tips: [
          "Tour Cité du Vin (Wine Museum) with student pricing.",
        ],
      },
      {
        title: "Sports & Outdoor",
        description:
          "Stadium and river activities available for students.",
        tips: [
          "Catch a game or jog at Matmut Atlantique stadium.",
        ],
      },
    ],
    transport: "Tram, bus, bike.",
    famousPlaces: "Place de la Bourse, Cité du Vin.",
    sportsFacilities: "Matmut Atlantique stadium.",
    studentLife: "River festivals, food markets.",
    schoolsCount: schools.filter((s) => s.city === "Bordeaux").length,
  },
  {
    name: "Nice",
    emoji: "🏖️",
    description: "Sunny Riviera, Mediterranean beaches and culture.",
    localInsights: [
      {
        title: "Transport & Outdoors",
        description:
          "Nice tramway, bus, bike-sharing (Vélobleu); coastal and hill hikes nearby.",
        tips: [
          "Use Vélobleu bikes for exploring beach and hill routes.",
          "Catch the tram for quick downtown access.",
        ],
      },
      {
        title: "Sports & Lifestyle",
        description:
          "Mediterranean beaches for swimming, water sports; tennis, student gyms.",
        tips: [
          "Join a campus gym right by the beach.",
          "Try paddleboard or kayak rentals in summer.",
        ],
      },
      {
        title: "Culture & Nearby",
        description:
          "Promenade des Anglais, old town cafés, carnivals, Jazz Festival.",
        tips: [
          "Visit the Nice Jazz Festival every July.",
          "Day-trip to Cannes, Monaco, or Mercantour mountains with fellow students.",
        ],
      },
    ],
    transport: "Tram, bus.",
    famousPlaces: "Promenade des Anglais, Vieux Nice.",
    sportsFacilities: "Beach sports, Stade Allianz Riviera.",
    studentLife: "Seafood, nightlife, international vibe.",
    schoolsCount: schools.filter((s) => s.city === "Nice").length,
  },
  {
    name: "Sophia Antipolis",
    emoji: "🌲",
    description: "Innovative science and tech park near Nice.",
    localInsights: [
      {
        title: "Tech & Transport",
        description:
          "Europe's largest tech park with high density of startups, R&D. Served by Lignes d’Azur buses, good road links, campus bike paths.",
        tips: [
          "Join on-campus innovation clubs for networking.",
          "Bike or bus between different tech campuses.",
        ],
      },
      {
        title: "Sports & Lifestyle",
        description:
          "Nature, hiking trails, Mediterranean micro-climate, fitness culture, local gyms.",
        tips: [
          "Try local fitness classes or join a nature hiking group.",
          "Make the most of Sophia/Valbonne cultural events for students.",
        ],
      },
    ],
    transport: "Bus, car.",
    famousPlaces: "Tech business hubs, close to Antibes beaches.",
    sportsFacilities: "Campus sports, cycling trails.",
    studentLife: "Research, green spaces, student cafés.",
    schoolsCount: schools.filter((s) => s.city === "Sophia Antipolis").length,
  },
  {
    name: "Marseille",
    emoji: "⛵",
    description: "Historic port city on the Mediterranean.",
    localInsights: [
      {
        title: "Transport",
        description:
          "RTM metro, tram, buses; Vélos and Ferries for Frioul & Calanques.",
        tips: [
          "Hop on a ferry for day-trips to Frioul islands or Calanques.",
        ],
      },
      {
        title: "Sports & Outdoors",
        description:
          "Vieux-Port waterfront gyms, water sports (sailing, paddle), student clubs, Stade Vélodrome.",
        tips: [
          "Try out sailing or paddle-boarding with student clubs.",
          "See a match at Stade Vélodrome for true Marseille spirit.",
        ],
      },
      {
        title: "Culture & Events",
        description:
          "Multicultural food, Mucem, concerts; Fête de la Musique June; Fiesta des Suds in October.",
        tips: [
          "Make sure to attend the Fiesta des Suds festival in October.",
        ],
      },
      {
        title: "Outdoors",
        description:
          "Calanques National Park, beaches, hiking routes.",
        tips: [
          "Go hiking in Calanques NP for gorgeous Mediterranean views.",
        ],
      },
    ],
    transport: "Metro, tram, bus, ferry.",
    famousPlaces: "Vieux-Port, Notre-Dame de la Garde.",
    sportsFacilities: "Vélodrome stadium, coastal runs.",
    studentLife: "Diverse cuisine, concerts, seaside venues.",
    schoolsCount: schools.filter((s) => s.city === "Marseille").length,
  },
  {
    name: "Grenoble",
    emoji: "🏔️",
    description: "Alpine student city and innovation hub.",
    localInsights: [
      {
        title: "Transport & Outdoors",
        description:
          "Tram/bus network; bike-sharing. Proximity to Alps for skiing, mountaineering, hiking.",
        tips: [
          "Use bike-sharing to explore parks and campus.",
          "Ski and climbing clubs welcome international students.",
        ],
      },
      {
        title: "Festivals & Student Life",
        description:
          "International events: Fête des Lumières, climbing festivals, Grenoble Jazz Festival.",
        tips: [
          "Attend the Grenoble Jazz Festival and local climbing meets.",
        ],
      },
      {
        title: "Campus & Local Life",
        description:
          "Campus gyms, student mountain sport associations.",
        tips: [
          "Join a mountain sports association for trips to the Alps.",
          "Sample the local beer scene with student friends after ski days.",
        ],
      },
    ],
    transport: "Tram, bus.",
    famousPlaces: "Bastille, cable car, Isère river.",
    sportsFacilities: "Ski, mountain sports, stadium.",
    studentLife: "Ski trips, tech events, outdoor life.",
    schoolsCount: schools.filter((s) => s.city === "Grenoble").length,
  },
  {
    name: "Nantes",
    emoji: "🦑",
    description: "Atlantic city with creative and green spirit.",
    localInsights: [
      {
        title: "Transport",
        description:
          "Tram, bus, Navibus river shuttles; bike-sharing (Bicloo).",
        tips: [
          "Use Bicloo bike-sharing for easy city transport.",
          "Try a Navibus river shuttle ride for a unique commute.",
        ],
      },
      {
        title: "Sports & Student Life",
        description:
          "Université teams, St-Jean football pitches, rowing on Erdre/Loire.",
        tips: [
          "Join a sports team or try rowing in the city rivers.",
        ],
      },
      {
        title: "Culture",
        description:
          "Machines de l’Île, Voyage à Nantes summer art trail. Erasmus community, bar/resto deals, and cheap costs.",
        tips: [
          "Check out the Machines de l’Île for creative inspiration.",
          "Look for Erasmus bar deals and food discounts!",
        ],
      },
    ],
    transport: "Tram, bus, ferry.",
    famousPlaces: "Château des Ducs, Machines de l’Île.",
    sportsFacilities: "Stade de la Beaujoire, riverside parks.",
    studentLife: "Festivals, clubs, local food.",
    schoolsCount: schools.filter((s) => s.city === "Nantes").length,
  },
  {
    name: "La Rochelle",
    emoji: "⚓",
    description: "Coastal charm, eco-friendly and marine studies.",
    localInsights: [
      {
        title: "Transport",
        description:
          "RTC bus, bike paths; Ile de Ré ferry connections.",
        tips: [
          "Take the ferry for day-trips to Ile de Ré.",
          "Bike along coastal paths for ocean views.",
        ],
      },
      {
        title: "Sports & Outdoors",
        description:
          "Sailing, surfing, kayaking; university sports centre.",
        tips: [
          "Join university water sports clubs.",
        ],
      },
      {
        title: "Lifestyle & Festivals",
        description:
          "Port city vibes, beaches; Francofolies music festival July; Tour du Monde student events.",
        tips: [
          "Don’t miss the Francofolies music festival in July.",
          "Check out Tour du Monde for international student culture nights.",
        ],
      },
      {
        title: "Nature & Day Trips",
        description: "Fort Boyard boat tours, Île de Ré day trips.",
        tips: [
          "Book a boat tour to Fort Boyard for a fun weekend.",
        ],
      },
    ],
    transport: "Bus, bike, ferry.",
    famousPlaces: "Old Port, towers, Aquarium.",
    sportsFacilities: "Water sports, yachting, cycling.",
    studentLife: "Seafood, beach, student nights.",
    schoolsCount: schools.filter((s) => s.city === "La Rochelle").length,
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
