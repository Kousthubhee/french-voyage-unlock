import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, MapPin, Users, BookOpen, Info } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CityCard } from "@/components/school-insights/CityCard";
import { SchoolCard } from "@/components/school-insights/SchoolCard";
import { SchoolDetail } from "@/components/school-insights/SchoolDetail";
import { CityInsightsCard } from "@/components/school-insights/CityInsightsCard";
import { InsightsDialog } from "@/components/school-insights/InsightsDialog";

// --- Define types and seed data directly in this file ---

type School = {
  id: string;
  name: string;
  description: string;
  location: string;
  tuition?: string;
  programs: string[];
  website?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  // NEW optional fields for detail
  transport?: string;
  famousPlaces?: string;
  sportsFacilities?: string;
  studentLife?: string;
};

type LocalInsight = {
  title: string;
  description: string;
  tips: string[];
};

type City = {
  name: string;
  emoji?: string;
  description: string;
  transport: string;
  famousPlaces: string;
  sportsFacilities: string;
  studentLife: string;
  schools: School[];
  localInsights: LocalInsight[];
};

const citiesData: Record<string, City> = {
  paris: {
    name: "Paris",
    emoji: "🗼",
    description:
      "Over 40 universities and Grandes Écoles, including top ones like Sorbonne, PSL, Sciences Po, Polytechnique, and more.",
    transport: "Navigo pass (metro, bus, RER, tram)",
    famousPlaces: "Eiffel Tower, Louvre, Montmartre, Notre-Dame",
    sportsFacilities: "CROUS gyms, Stade Charlety, Jean Bouin stadium",
    studentLife: "Vibrant culture, student discounts, international events",
    schools: [
      {
        id: "sorbonne",
        name: "Sorbonne University",
        programs: ["Humanities", "Science", "Medicine", "Law"],
        website: "https://www.sorbonne-universite.fr",
        description: "Top-ranked public university in arts and sciences",
        location: "Paris",
        transport: "Navigo pass (metro, bus, RER, tram)",
        famousPlaces: "Eiffel Tower, Louvre, Montmartre, Notre-Dame",
        sportsFacilities: "CROUS gyms, Stade Charlety, Jean Bouin stadium",
        studentLife: "Vibrant culture, student discounts, international events",
      },
      {
        id: "psl",
        name: "Université PSL",
        programs: ["Physics", "Economics", "Humanities", "Math"],
        website: "https://www.psl.eu",
        description: "Paris Sciences et Lettres, elite research university.",
        location: "Paris",
        transport: "Navigo pass (metro, bus, RER, tram)",
        famousPlaces: "Eiffel Tower, Louvre, Montmartre, Notre-Dame",
        sportsFacilities: "CROUS gyms, Stade Charlety, Jean Bouin stadium",
        studentLife: "Vibrant culture, student discounts, international events",
      },
      {
        id: "sciencespo-paris",
        name: "Sciences Po Paris",
        programs: ["Bachelors", "Masters"],
        website: "https://www.sciencespo.fr",
        description: "Elite school of political science and international relations.",
        location: "Paris",
        transport: "Navigo pass (metro, bus, RER, tram)",
        famousPlaces: "Eiffel Tower, Louvre, Montmartre, Notre-Dame",
        sportsFacilities: "CROUS gyms, Stade Charlety, Jean Bouin stadium",
        studentLife: "Vibrant culture, student discounts, international events",
      },
      {
        id: "polytechnique",
        name: "École Polytechnique",
        programs: ["Engineering", "Masters", "PhD"],
        website: "https://www.polytechnique.edu",
        description: "Top French engineering and science Grande École.",
        location: "Palaiseau, Paris region",
        transport: "Navigo pass (metro, bus, RER, tram)",
        famousPlaces: "Eiffel Tower, Louvre, Montmartre, Notre-Dame",
        sportsFacilities: "CROUS gyms, Stade Charlety, Jean Bouin stadium",
        studentLife: "Vibrant culture, student discounts, international events",
      },
      {
        id: "aup",
        name: "American University of Paris",
        programs: ["Bachelors", "Masters"],
        website: "https://www.aup.edu",
        description:
          "Private liberal arts university with US-style degrees.",
        location: "Paris",
        transport: "Navigo pass (metro, bus, RER, tram)",
        famousPlaces: "Eiffel Tower, Louvre, Montmartre, Notre-Dame",
        sportsFacilities: "CROUS gyms, Stade Charlety, Jean Bouin stadium",
        studentLife: "Vibrant culture, student discounts, international events",
      },
      {
        id: "paris-cite",
        name: "Université Paris Cité",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://u-paris.fr",
        description: "Comprehensive public university formed from Paris Diderot and Descartes.",
        location: "Paris",
        transport: "Navigo pass (metro, bus, RER, tram)",
        famousPlaces: "Eiffel Tower, Montparnasse Tower",
        sportsFacilities: "University sports complex, public arenas",
        studentLife: "Central campuses, active student clubs",
      },
      {
        id: "panth-sorbonne",
        name: "Université Paris 1 Panthéon-Sorbonne",
        programs: ["Law", "Humanities", "Economics"],
        website: "https://www.pantheonsorbonne.fr",
        description: "Top public university for humanities and social sciences.",
        location: "Paris",
        transport: "RATP metro lines 1, 4, 7, 10",
        famousPlaces: "Sorbonne, Luxembourg Gardens",
        sportsFacilities: "Stade Sébastien Charléty, CROUS gym",
        studentLife: "Lively Left Bank student atmosphere",
      },
      {
        id: "paris-nanterre",
        name: "Université Paris Nanterre",
        programs: ["Law", "Psychology", "Social Sciences"],
        website: "https://www.parisnanterre.fr",
        description: "Large public university with a strong law and humanities focus.",
        location: "Nanterre (Paris)",
        transport: "RER A line to Nanterre Université",
        famousPlaces: "La Défense, Nanterre Theatre",
        sportsFacilities: "On-campus sports halls and running track",
        studentLife: "Vibrant campus, known for political activism",
      },
      {
        id: "paris-saclay",
        name: "Université Paris-Saclay",
        programs: ["Science", "Engineering", "Medicine", "PhD"],
        website: "https://www.universite-paris-saclay.fr",
        description: "Top-ranked research university with international prestige.",
        location: "Saclay (Paris region)",
        transport: "RER B + university shuttles",
        famousPlaces: "Orsay Valley, Plateau de Saclay",
        sportsFacilities: "Advanced sports and lab facilities",
        studentLife: "International research and STEM culture",
      }
    ],
    localInsights: [
      {
        title: "Cost of Living",
        description: "Paris is world-famous—but expensive!",
        tips: [
          "Use Navigo pass for affordable transport.",
          "Many museums are free for students under 26.",
        ],
      },
    ],
  },
  lyon: {
    name: "Lyon",
    emoji: "🦁",
    description: "Key public universities & Grandes Écoles; vibrant student city.",
    transport: "TCL metro/tram/bus, Vélo'v bikes",
    famousPlaces: "Basilica of Notre-Dame de Fourvière, Parc de la Tête d'Or",
    sportsFacilities: "Stade de Gerland, Campus INSA sports complex",
    studentLife: "Renowned for food, affordable housing, vibrant riverfront",
    schools: [
      {
        id: "lyon1",
        name: "Université Claude Bernard Lyon 1",
        programs: ["Biology", "Engineering", "Pharmacy", "Sports Science"],
        website: "https://www.univ-lyon1.fr",
        description: "Major public university for science and medicine",
        location: "Lyon",
        transport: "TCL metro/tram/bus, Vélo'v bikes",
        famousPlaces: "Basilica of Notre-Dame de Fourvière, Parc de la Tête d'Or",
        sportsFacilities: "Stade de Gerland, Campus INSA sports complex",
        studentLife: "Renowned for food, affordable housing, vibrant riverfront",
      },
      {
        id: "emlyon",
        name: "emlyon business school",
        programs: ["Business", "Management", "Entrepreneurship"],
        website: "https://www.em-lyon.com",
        description: "Prestigious private business school with international outlook",
        location: "Lyon",
        transport: "TCL metro/tram/bus, Vélo'v bikes",
        famousPlaces: "Basilica of Notre-Dame de Fourvière, Parc de la Tête d'Or",
        sportsFacilities: "Stade de Gerland, Campus INSA sports complex",
        studentLife: "Renowned for food, affordable housing, vibrant riverfront",
      },
      {
        id: "insa-lyon",
        name: "INSA Lyon",
        programs: ["Engineering", "Masters"],
        website: "https://www.insa-lyon.fr",
        description: "Top engineering and applied science Grande École.",
        location: "Lyon",
        transport: "TCL metro/tram/bus, Vélo'v bikes",
        famousPlaces: "Basilica of Notre-Dame de Fourvière, Parc de la Tête d'Or",
        sportsFacilities: "Stade de Gerland, Campus INSA sports complex",
        studentLife: "Renowned for food, affordable housing, vibrant riverfront",
      },
      {
        id: "lyon2",
        name: "Université Lumière Lyon 2",
        programs: ["Humanities", "Law", "Social Sciences"],
        website: "https://www.univ-lyon2.fr",
        description: "Public university focused on social sciences and arts.",
        location: "Lyon",
        transport: "TCL metro/tram/bus, Vélo'v bikes",
        famousPlaces: "Basilica of Notre-Dame de Fourvière, Parc de la Tête d'Or",
        sportsFacilities: "Stade de Gerland, Campus INSA sports complex",
        studentLife: "Renowned for food, affordable housing, vibrant riverfront",
      },
      {
        id: "lyon3",
        name: "Université Jean Moulin Lyon 3",
        programs: ["Law", "Languages", "Business"],
        website: "https://www.univ-lyon3.fr",
        description: "Focuses on law, philosophy, and modern languages.",
        location: "Lyon",
        transport: "TCL metro/tram/bus, Vélo’v",
        famousPlaces: "Presqu’île, Croix-Rousse",
        sportsFacilities: "Gymnasiums, riverside running paths",
        studentLife: "Downtown campuses, many libraries",
      },
      {
        id: "centrale-lyon",
        name: "Centrale Lyon",
        programs: ["Engineering", "Masters"],
        website: "https://www.ec-lyon.fr",
        description: "Top engineering Grande École in France.",
        location: "Écully, Lyon",
        transport: "TER + TCL buses",
        famousPlaces: "Techlid, Lyon Confluence",
        sportsFacilities: "Engineering sports union, labs",
        studentLife: "Focused, highly technical campus",
      },
      {
        id: "sciencespo-lyon",
        name: "Sciences Po Lyon",
        programs: ["Political Science", "European Studies"],
        website: "https://www.sciencespo-lyon.fr",
        description: "Elite school for politics and international relations.",
        location: "Lyon",
        transport: "TCL metro/tram/bus",
        famousPlaces: "Tête d'Or Park, Saône riverbanks",
        sportsFacilities: "University indoor courts, municipal fields",
        studentLife: "Academic, globally connected environment",
      }
    ],
    localInsights: [
      {
        title: "Food & Student Life",
        description: "Lyon is renowned for its cuisine and vibrant student activity.",
        tips: [
          "Try a local 'bouchon' for authentic Lyonnaise food.",
          "Student discounts galore: public bikes, opera, and cinema.",
        ],
      },
    ],
  },
  toulouse: {
    name: "Toulouse",
    emoji: "🚀",
    description:
      "Major aerospace and tech hub, home to leading universities.",
    transport: "Tisséo network (metro, tram, bus)",
    famousPlaces: "Capitole de Toulouse, Canal du Midi, Cité de l'espace",
    sportsFacilities: "Stade Toulousain, ISAE SUPAERO sports hall",
    studentLife: "Strong aerospace culture, lots of green space, student clubs",
    schools: [
      {
        id: "ut1",
        name: "Toulouse 1 Capitole University",
        programs: ["Law", "Political Science", "Economics", "Business"],
        website: "https://www.ut-capitole.fr",
        description: "Specialized in law, economics, management",
        location: "Toulouse",
        transport: "Tisséo network (metro, tram, bus)",
        famousPlaces: "Capitole de Toulouse, Canal du Midi, Cité de l'espace",
        sportsFacilities: "Stade Toulousain, ISAE SUPAERO sports hall",
        studentLife: "Strong aerospace culture, lots of green space, student clubs",
      },
      {
        id: "isup-tlse",
        name: "ISAE-SUPAERO",
        programs: ["Aerospace Engineering", "Mechanical Systems", "AI and Robotics", "Masters", "PhD"],
        website: "https://www.isae-supaero.fr",
        description: "Europe’s leading aerospace engineering school.",
        location: "Toulouse",
        transport: "Tisséo network (metro, tram, bus)",
        famousPlaces: "Capitole de Toulouse, Canal du Midi, Cité de l'espace",
        sportsFacilities: "Stade Toulousain, ISAE SUPAERO sports hall",
        studentLife: "Strong aerospace culture, lots of green space, student clubs",
      },
      {
        id: "tse-tlse",
        name: "Toulouse School of Economics",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.tse-fr.eu",
        description: "Renowned for economics research and teaching.",
        location: "Toulouse",
        transport: "Tisséo network (metro, tram, bus)",
        famousPlaces: "Capitole de Toulouse, Canal du Midi, Cité de l'espace",
        sportsFacilities: "Stade Toulousain, ISAE SUPAERO sports hall",
        studentLife: "Strong aerospace culture, lots of green space, student clubs",
      },
      {
        id: "enac",
        name: "ENAC (École Nationale de l'Aviation Civile)",
        programs: ["Aviation Engineering", "Masters", "PhD"],
        website: "https://www.enac.fr",
        description: "France’s top aviation and aerospace school.",
        location: "Toulouse",
        transport: "Tisséo metro/bus",
        famousPlaces: "Cité de l’Espace, Garonne Riverwalk",
        sportsFacilities: "On-campus sports airstrip and gyms",
        studentLife: "Aviation-centered tech community",
      },
      {
        id: "tbs",
        name: "TBS Education",
        programs: ["Bachelors", "MSc", "MBA"],
        website: "https://www.tbs-education.com",
        description: "Leading business school with AACSB, EQUIS accreditations.",
        location: "Toulouse",
        transport: "Tisséo metro, airport shuttle",
        famousPlaces: "Place du Capitole",
        sportsFacilities: "Rowing, tennis, student gyms",
        studentLife: "Business meets rugby culture",
      },
      {
        id: "utjj",
        name: "Université Toulouse Jean Jaurès",
        programs: ["Humanities", "Arts", "Language"],
        website: "https://www.univ-tlse2.fr",
        description: "Liberal arts and language university in Toulouse.",
        location: "Toulouse",
        transport: "Tisséo line A metro",
        famousPlaces: "Saint-Cyprien, Patte d'Oie",
        sportsFacilities: "Student gym, rec clubs",
        studentLife: "Creative and diverse student environment",
      }
    ],
    localInsights: [
      {
        title: "Aerospace City",
        description: "Known for Airbus, Cité de l'Espace & student life.",
        tips: [
          "Save on rent by sharing a 'coloc' (shared flat) near Rangueil.",
          "Check out the summer Toulouse Plages by the river!",
        ],
      },
    ],
  },
  rouen: {
    name: "Rouen",
    emoji: "🏰",
    description: "Historic city with modern universities and vibrant cultural scene.",
    transport: "MyAstuce card for bus/metro/tram",
    famousPlaces: "Rouen Cathedral, Gros-Horloge, Joan of Arc Museum",
    sportsFacilities: "Kindarena, Local cricket and badminton clubs",
    studentLife: "Historical ambiance, modern student hubs, affordable rent",
    schools: [
      {
        id: "rouen-univ",
        name: "Université de Rouen Normandie",
        programs: ["Literature", "Science", "Engineering", "Nursing"],
        website: "https://www.univ-rouen.fr",
        description: "Public university with strong science and humanities programs.",
        location: "Rouen",
        transport: "MyAstuce card for bus/metro/tram",
        famousPlaces: "Rouen Cathedral, Gros-Horloge, Joan of Arc Museum",
        sportsFacilities: "Kindarena, Local cricket and badminton clubs",
        studentLife: "Historical ambiance, modern student hubs, affordable rent",
      },
      {
        id: "neoma-rouen",
        name: "NEOMA Business School (Rouen Campus)",
        programs: ["Business", "Finance", "Marketing", "Luxury Management"],
        website: "https://www.neoma-bs.com",
        description: "Top French business school with international focus.",
        location: "Rouen",
        transport: "MyAstuce card for bus/metro/tram",
        famousPlaces: "Rouen Cathedral, Gros-Horloge, Joan of Arc Museum",
        sportsFacilities: "Kindarena, Local cricket and badminton clubs",
        studentLife: "Historical ambiance, modern student hubs, affordable rent",
      },
      {
        id: "iae-rouen",
        name: "IAE Rouen Normandie",
        programs: ["Business", "Management"],
        website: "https://iae.univ-rouen.fr",
        description: "University-affiliated business school in Rouen.",
        location: "Rouen",
        transport: "MyAstuce card for bus/metro/tram",
        famousPlaces: "Rouen Cathedral, Gros-Horloge, Joan of Arc Museum",
        sportsFacilities: "Kindarena, Local cricket and badminton clubs",
        studentLife: "Historical ambiance, modern student hubs, affordable rent",
      },
      {
        id: "esigelec-rouen",
        name: "ESIGELEC Rouen",
        programs: ["Engineering", "Embedded Systems", "Masters"],
        website: "https://www.esigelec.fr",
        description: "Grandes Écoles-level engineering institute.",
        location: "Rouen",
        transport: "MyAstuce pass",
        famousPlaces: "Rue du Gros Horloge",
        sportsFacilities: "Tech-based labs and fitness centers",
        studentLife: "Small city charm, high-tech training",
      },
      {
        id: "esigelec",
        name: "ESIGELEC",
        programs: ["Engineering", "Digital Systems"],
        website: "https://www.esigelec.fr",
        description: "Noted school for embedded systems and electronics.",
        location: "Rouen",
        transport: "MyAstuce tram line T4",
        famousPlaces: "Seine riverbanks",
        sportsFacilities: "Tech gym, university field",
        studentLife: "STEM community in a quiet city",
      }
    ],
    localInsights: [
      {
        title: "Student Budgeting",
        description: "Rouen is affordable for food and housing.",
        tips: [
          "Weekly markets offer fresh produce at great prices.",
          "Historic center: lots of free and low-cost museums.",
        ],
      },
    ],
  },
  reims: {
    name: "Reims",
    emoji: "🍾",
    description: "Champagne region’s capital with strong universities.",
    transport: "Citura bus & tram system",
    famousPlaces: "Reims Cathedral, Champagne Houses, Palace of Tau",
    sportsFacilities: "CREPS sports center, local cricket/basketball clubs",
    studentLife: "Champagne region charm, active Erasmus student groups",
    schools: [
      {
        id: "urca",
        name: "Université de Reims Champagne-Ardenne",
        programs: ["Medicine", "Biology", "Law", "Humanities"],
        website: "https://www.univ-reims.fr",
        description: "Multidisciplinary public university.",
        location: "Reims",
        transport: "Citura bus & tram system",
        famousPlaces: "Reims Cathedral, Champagne Houses, Palace of Tau",
        sportsFacilities: "CREPS sports center, local cricket/basketball clubs",
        studentLife: "Champagne region charm, active Erasmus student groups",
      },
      {
        id: "neoma-reims",
        name: "NEOMA Business School (Reims Campus)",
        programs: ["International Business", "Marketing", "Finance"],
        website: "https://www.neoma-bs.com",
        description: "Renowned business school with global reach.",
        location: "Reims",
        transport: "Citura bus & tram system",
        famousPlaces: "Reims Cathedral, Champagne Houses, Palace of Tau",
        sportsFacilities: "CREPS sports center, local cricket/basketball clubs",
        studentLife: "Champagne region charm, active Erasmus student groups",
      },
      {
        id: "sciencespo-reims",
        name: "Sciences Po Reims",
        programs: ["Political Science", "International Relations"],
        website: "https://www.sciencespo.fr",
        description: "Highly reputed political studies campus under Sciences Po.",
        location: "Reims",
        transport: "Citura bus & tram system",
        famousPlaces: "Reims Cathedral, Champagne Houses, Palace of Tau",
        sportsFacilities: "CREPS sports center, local cricket/basketball clubs",
        studentLife: "Champagne region charm, active Erasmus student groups",
      },
      {
        id: "esad-reims",
        name: "Reims School of Art and Design",
        programs: ["Design", "Visual Arts"],
        website: "https://www.esad-reims.fr",
        description: "Creative school focused on visual communication.",
        location: "Reims",
        transport: "Citura tram and bus",
        famousPlaces: "Champagne caves, Carnegie Library",
        sportsFacilities: "Art campus gym + shared city facilities",
        studentLife: "Creative community, champagne culture",
      },
      {
        id: "sciencespo-campus-reims",
        name: "Sciences Po Campus de Reims",
        programs: ["International Relations", "Political Science"],
        website: "https://www.sciencespo.fr",
        description: "English-taught BA programs in global affairs.",
        location: "Reims",
        transport: "Citura + walking distance to city center",
        famousPlaces: "Reims Cathedral, Palais du Tau",
        sportsFacilities: "Small gym, tennis courts",
        studentLife: "International environment",
      }
    ],
    localInsights: [
      {
        title: "Champagne Life",
        description: "City surrounded by world-famous vineyards.",
        tips: [
          "Visit champagne houses—many have student discounts.",
          "The city is very bike-friendly.",
        ],
      },
    ],
  },
  lille: {
    name: "Lille",
    emoji: "🌧️",
    description: "Northern hub for business, engineering, and vibrant student life.",
    transport: "Transpole metro/tram system",
    famousPlaces: "Grand Place, Palais des Beaux-Arts",
    sportsFacilities: "CROUS gyms, football/rugby fields",
    studentLife: "Young crowd, proximity to Belgium",
    schools: [
      {
        id: "skema-lille",
        name: "SKEMA Business School (Lille)",
        programs: ["Bachelors", "MSc", "MBA"],
        website: "https://www.skema.edu",
        description: "Prestigious business school with campuses worldwide.",
        location: "Lille",
        transport: "Transpole metro/tram system",
        famousPlaces: "Grand Place, Palais des Beaux-Arts",
        sportsFacilities: "CROUS gyms, football/rugby fields",
        studentLife: "Young crowd, proximity to Belgium",
      },
      {
        id: "lille-catho",
        name: "Lille Catholic University",
        programs: ["Bachelors", "Masters"],
        website: "https://www.univ-catholille.fr",
        description: "Private multidisciplinary university with strong research.",
        location: "Lille",
        transport: "Transpole metro/tram system",
        famousPlaces: "Grand Place, Palais des Beaux-Arts",
        sportsFacilities: "CROUS gyms, football/rugby fields",
        studentLife: "Young crowd, lots of student discounts",
      },
      {
        id: "ieseg-lille",
        name: "IESEG School of Management",
        programs: ["Bachelors", "MSc", "MBA"],
        website: "https://www.ieseg.fr",
        description: "Highly ranked business school with global links.",
        location: "Lille",
        transport: "Metro Line 1 – Lille Flandres",
        famousPlaces: "Wazemmes market, Citadelle",
        sportsFacilities: "Indoor fitness, basketball courts",
        studentLife: "Business-focused, international outlook",
      },
      {
        id: "isen-lille",
        name: "ISEN Lille",
        programs: ["Digital Engineering", "Telecom"],
        website: "https://www.isen-lille.fr",
        description: "Specialized digital/telecom school.",
        location: "Lille",
        transport: "Lille metro/tramway",
        famousPlaces: "Grand Place, Rue Solférino",
        sportsFacilities: "Robotics sports and competitions",
        studentLife: "Digital innovation hotspot",
      }
    ],
    localInsights: [
      {
        title: "Flea Markets & Nightlife",
        description: "Don’t miss the Braderie de Lille or busy student bars.",
        tips: [
          "‘Vieux Lille’ district full of lively cafés.",
          "Public transport: TER cards for regional discounts.",
        ],
      },
    ],
  },
  strasbourg: {
    name: "Strasbourg",
    emoji: "🌉",
    description:
      "Central European location; diverse and international universities.",
    transport: "CTS network, trams crossing into Germany",
    famousPlaces: "Cathedral, Petite France, European Parliament",
    sportsFacilities: "CROUS gym, Rhine stadium",
    studentLife: "Cultural capital, multilingual student community",
    schools: [
      {
        id: "em-strasbourg",
        name: "EM Strasbourg Business School",
        programs: ["Business", "Marketing", "Finance"],
        website: "https://www.em-strasbourg.eu",
        description:
          "Only business school integrated into a public university in France.",
        location: "Strasbourg",
        transport: "CTS network, trams crossing into Germany",
        famousPlaces: "Cathedral, Petite France, European Parliament",
        sportsFacilities: "CROUS gym, Rhine stadium",
        studentLife: "Cultural capital, multilingual student community",
      },
      {
        id: "insa-strasbourg",
        name: "INSA Strasbourg",
        programs: ["Engineering", "Architecture", "Masters"],
        website: "https://www.insa-strasbourg.fr",
        description: "Public Grande École in engineering and design.",
        location: "Strasbourg",
        transport: "CTS tram network",
        famousPlaces: "Cathedral, Petite France, Neustadt",
        sportsFacilities: "University gym, indoor courts",
        studentLife: "French-German culture, multilingual campus",
      },
      {
        id: "sciencespo-strasbourg",
        name: "Sciences Po Strasbourg",
        programs: ["Political Science", "International Relations"],
        website: "https://www.sciencespo-strasbourg.fr",
        description: "Highly ranked political science school with EU focus.",
        location: "Strasbourg",
        transport: "CTS tram network",
        famousPlaces: "Cathedral, Petite France, Neustadt",
        sportsFacilities: "University gym, indoor courts",
        studentLife: "Near European Parliament, cross-border community",
      }
    ],
    localInsights: [
      {
        title: "Cross-Border Life",
        description: "Trams cross the border to Germany! Experience EU culture.",
        tips: [
          "Get the CTS youth card for travel savings.",
          "Christmas Market is magical every winter.",
        ],
      },
    ],
  },
  bordeaux: {
    name: "Bordeaux",
    emoji: "🍇",
    description:
      "Wine capital with strong science and business universities.",
    transport: "TBM trams and bus network",
    famousPlaces: "Place de la Bourse, Garonne Riverwalk",
    sportsFacilities: "Darwin hall, public rowing & tennis courts",
    studentLife: "Wine and surf, historic downtown life",
    schools: [
      {
        id: "sciencespo-bordeaux",
        name: "Sciences Po Bordeaux",
        programs: ["Political Science", "International Studies"],
        website: "https://www.sciencespobordeaux.fr",
        description: "Renowned for public administration and policy.",
        location: "Bordeaux",
        transport: "TBM trams and bus network",
        famousPlaces: "Place de la Bourse, Garonne Riverwalk",
        sportsFacilities: "Darwin hall, public rowing & tennis courts",
        studentLife: "Wine and surf, historic downtown life",
      },
      {
        id: "bordeaux-montaigne",
        name: "Bordeaux Montaigne University",
        programs: ["Humanities", "Languages", "Journalism"],
        website: "https://www.u-bordeaux-montaigne.fr",
        description: "Public university with arts and language focus.",
        location: "Bordeaux",
        transport: "TBM tram system",
        famousPlaces: "Place de la Victoire, Darwin ecosystem",
        sportsFacilities: "Public rowing docks, rugby fields",
        studentLife: "Laid-back, riverfront energy",
      },
      {
        id: "ensap-bordeaux",
        name: "ENSAP Bordeaux",
        programs: ["Architecture", "Urbanism"],
        website: "https://www.bordeaux.archi.fr",
        description: "Top public school for architecture and city planning.",
        location: "Bordeaux",
        transport: "Tram A, B, C",
        famousPlaces: "Stone Bridge, Bassins des Lumières",
        sportsFacilities: "On-campus design labs + rec rooms",
        studentLife: "Interdisciplinary creativity meets wine region",
      },
      {
        id: "bordeaux-inp",
        name: "Institut Polytechnique de Bordeaux",
        programs: ["Engineering", "Computer Science"],
        website: "https://www.bordeaux-inp.fr",
        description: "Engineering cluster with several tech schools.",
        location: "Bordeaux",
        transport: "Tram A, Bus 10",
        famousPlaces: "Victoire Square, Pessac",
        sportsFacilities: "Polytech fitness center",
        studentLife: "Engineering and startup culture",
      }
    ],
    localInsights: [
      {
        title: "Urban Beaches",
        description: "Cycling & picnics along the Garonne River embankments.",
        tips: [
          "Darwin hall has student-friendly coworking and cheap meals.",
          "Vineyard visits accessible on public tram.",
        ],
      },
    ],
  },
  nice: {
    name: "Nice",
    emoji: "🌞",
    description:
      "Mediterranean city, mild weather and cosmopolitan schools.",
    transport: "Tramway + Ligne d’Azur buses",
    famousPlaces: "Promenade des Anglais, Castle Hill, Old Town",
    sportsFacilities: "Sea sports, climbing gyms, campus courts",
    studentLife: "Sunny climate, beachside student life",
    schools: [
      {
        id: "uca-nice",
        name: "Université Côte d’Azur",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://univ-cotedazur.eu",
        description: "Alliance of institutions: strong in science & innovation.",
        location: "Nice",
        transport: "Tramway + Ligne d’Azur buses",
        famousPlaces: "Promenade des Anglais, Castle Hill, Old Town",
        sportsFacilities: "Sea sports, climbing gyms, campus courts",
        studentLife: "Sunny climate, beachside student life",
      },
      {
        id: "skema-nice",
        name: "SKEMA Business School",
        programs: ["BBA", "Masters", "MBA"],
        website: "https://www.skema.edu",
        description: "Top-tier international business school in Sophia Antipolis.",
        location: "Nice",
        transport: "Tramway + Ligne d’Azur buses",
        famousPlaces: "Promenade des Anglais, Castle Hill, Old Town",
        sportsFacilities: "Cycling, paddle tennis, campus fitness",
        studentLife: "Sunny climate, beachside student life",
      }
    ],
    localInsights: [
      {
        title: "Beach & Festivals",
        description: "Study under the sun: from the Old Town to the Promenade des Anglais.",
        tips: [
          "Carnaval de Nice is a must in February.",
          "Public beach chairs are free for students before 10am.",
        ],
      },
    ],
  },
  marseille: {
    name: "Marseille",
    emoji: "⛵",
    description: "Major port city; most universities under Aix‑Marseille University umbrella.",
    transport: "RTM metro, tram, and buses",
    famousPlaces: "Old Port, Calanques, Notre-Dame de la Garde",
    sportsFacilities: "Campus sports centers, sea-side sports",
    studentLife: "Diverse city, beach culture, Mediterranean food",
    schools: [
      {
        id: "amu",
        name: "Aix-Marseille Université",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.univ-amu.fr",
        description: "France’s largest public university, spanning all major academic fields.",
        location: "Marseille",
        transport: "RTM metro, tram, and buses",
        famousPlaces: "Old Port, Calanques, Notre-Dame de la Garde",
        sportsFacilities: "Campus sports centers, sea-side sports",
        studentLife: "Diverse city, beach culture, Mediterranean food",
      },
      {
        id: "kedge-marseille",
        name: "KEDGE Business School (Marseille)",
        programs: ["MBA", "MSc"],
        website: "https://www.kedge.edu",
        description: "Top business school, focus on sustainability and global trade.",
        location: "Marseille",
        transport: "RTM metro, tram, and buses",
        famousPlaces: "Old Port, Calanques, Notre-Dame de la Garde",
        sportsFacilities: "Campus gyms, Calanques for hiking/swimming",
        studentLife: "Lively port city, great food and music culture",
      },
      {
        id: "polytech-marseille",
        name: "Polytech Marseille",
        programs: ["Engineering", "Applied Science"],
        website: "https://polytech.univ-amu.fr",
        description: "Engineering school under Aix-Marseille University.",
        location: "Marseille",
        transport: "RTM bus/metro",
        famousPlaces: "Parc Borély, Prado Beach",
        sportsFacilities: "Tech training centers, open campus",
        studentLife: "Tech meets Mediterranean chill",
      },
      {
        id: "centrale-marseille",
        name: "École Centrale de Marseille",
        programs: ["Engineering", "Research Masters"],
        website: "https://www.centrale-marseille.fr",
        description: "Selective French Grande École in engineering.",
        location: "Marseille",
        transport: "Bus 21/Metro M2",
        famousPlaces: "Corniche Kennedy, Vieux-Port",
        sportsFacilities: "Student sailing, gym and squash",
        studentLife: "Innovation and sea breeze lifestyle",
      }
    ],
    localInsights: [
      {
        title: "Multicultural City",
        description: "Enjoy Mediterranean food, local music, and world-class beaches.",
        tips: [
          "Vieux-Port is student nightlife central.",
          "Take a ferry to Frioul Islands for 5€!",
        ],
      },
    ],
  }
};

// Helper to extract level from program name
function extractCourseLevel(program: string): string {
  // Accepts variants like "MSc", "MBA", "Masters", etc.
  const lower = program.toLowerCase();
  if (lower.startsWith('msc') || lower.startsWith('master')) return "Masters";
  if (lower.startsWith('mba')) return "MBA";
  if (lower.startsWith('bsc') || lower.startsWith('bachelor')) return "Bachelors";
  if (lower.startsWith('phd')) return "PhD";
  if (lower.startsWith('doctor')) return "PhD";
  if (lower.startsWith('license') || lower.startsWith('licence')) return "Bachelors";
  return "Other";
}

export const SchoolInsightsPage = ({ onBack }: { onBack: () => void }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  // --- New two-level filter state ---
  const [courseLevelFilter, setCourseLevelFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');

  // Gather all programs across all cities for two-level filter
  const programsByLevel: Record<string, Set<string>> = {};
  Object.values(citiesData).forEach(city => {
    city.schools.forEach(school => {
      school.programs.forEach(prog => {
        const level = extractCourseLevel(prog);
        if (!programsByLevel[level]) programsByLevel[level] = new Set();
        programsByLevel[level].add(prog);
      });
    });
  });
  const allLevels = Object.keys(programsByLevel).sort((a, b) => {
    // Prioritize main ones first for user-friendliness.
    const order = ["Bachelors", "Masters", "MBA", "PhD", "Other"];
    return order.indexOf(a) - order.indexOf(b);
  });

  // Subjects/programs for current selected level, for use in subject filter
  const programSubjects =
    courseLevelFilter === 'all'
      ? Object.values(programsByLevel).flatMap(set => Array.from(set)).sort()
      : Array.from(programsByLevel[courseLevelFilter] || []).sort();

  // Helper: Filter schools given the two-level filter.
  function filterSchools(schools: School[]) {
    return schools.filter(school => {
      // Both course level and (if selected) subject must match.
      const hasProgramWithLevel = school.programs.some(
        p => courseLevelFilter === 'all' || extractCourseLevel(p) === courseLevelFilter
      );
      const hasSpecificProgram =
        programFilter === 'all' ||
        school.programs.some(p => p === programFilter);
      return hasProgramWithLevel && hasSpecificProgram;
    });
  }

  // SCHOOL CONTACT INFORMATION DISPLAY
  const getContact = (school: School) => school.contact || {};

  // Find the school currently displayed
  const findSchoolById = (id: string | undefined): School | undefined => {
    if (!id) return undefined;
    for (const cityKey of Object.keys(citiesData)) {
      const city = citiesData[cityKey];
      const sch = city.schools.find((s) => s.id === id);
      if (sch) return sch;
    }
    return undefined;
  };

  // Detailed School View
  if (selectedSchool) {
    return (
      <SchoolDetail school={selectedSchool} onBack={() => setSelectedSchool(null)} />
    );
  }

  // City-Specific View with Schools and Local Insights (add two-level filter here)
  if (selectedCity && citiesData[selectedCity]) {
    const cityData = citiesData[selectedCity];

    // All schools in this city filtered by courseLevel and program
    const filteredSchools = filterSchools(cityData.schools);

    // Program subjects for this city only and current level (for tabs/subjects dropdown)
    const cityProgramsByLevel: Record<string, Set<string>> = {};
    cityData.schools.forEach(school => {
      school.programs.forEach(prog => {
        const level = extractCourseLevel(prog);
        if (!cityProgramsByLevel[level]) cityProgramsByLevel[level] = new Set();
        cityProgramsByLevel[level].add(prog);
      });
    });
    const citySubjects =
      courseLevelFilter === 'all'
        ? Object.values(cityProgramsByLevel).flatMap(set => Array.from(set)).sort()
        : Array.from(cityProgramsByLevel[courseLevelFilter] || []).sort();

    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => {
            setSelectedCity(null);
            setCourseLevelFilter('all');
            setProgramFilter('all');
          }} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🏫 {cityData.name} - School & Local Insights
            </h1>
            <p className="text-lg text-gray-600">{cityData.description}</p>
          </div>
        </div>
        {/* --- Two-level filters --- */}
        <div className="flex flex-wrap gap-4 items-center justify-end mb-6">
          <div>
            <label htmlFor="city-course-level-filter" className="block text-xs mb-1 text-gray-700">Filter by Level</label>
            <Select value={courseLevelFilter} onValueChange={val => {
              setCourseLevelFilter(val);
              setProgramFilter('all');
            }}>
              <SelectTrigger className="w-40" id="city-course-level-filter">
                <SelectValue>{courseLevelFilter === "all" ? "All Levels" : courseLevelFilter}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {Object.keys(cityProgramsByLevel).sort((a, b) => allLevels.indexOf(a) - allLevels.indexOf(b)).map(lvl =>
                  <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="city-program-filter" className="block text-xs mb-1 text-gray-700">Filter by Subject</label>
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-64" id="city-program-filter">
                <SelectValue>{programFilter === "all" ? "All Subjects" : programFilter}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {citySubjects.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Local Insights Section */}
        <CityInsightsCard
          cityName={cityData.name}
          transport={cityData.transport}
          famousPlaces={cityData.famousPlaces}
          sportsFacilities={cityData.sportsFacilities}
          studentLife={cityData.studentLife}
          onShowAll={() => setShowInsights(true)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-gray-500">No schools found for selected filters.</div>
          ) : filteredSchools.map((school, index) => (
            <SchoolCard key={index} school={school} onClick={() => setSelectedSchool(school)} />
          ))}
        </div>
        <InsightsDialog
          open={showInsights}
          onOpenChange={setShowInsights}
          cityName={cityData.name}
          localInsights={cityData.localInsights}
        />
      </div>
    );
  }

  // Main Cities View — add top-level filters here
  // Compute which cities to display based on filters:
  const citiesFiltered = Object.entries(citiesData).map(([cityKey, city]) => ({
    cityKey,
    city,
    schools: filterSchools(city.schools),
  })).filter(({ schools }) => schools.length > 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🏫 School & Local Insights</h1>
          <p className="text-lg text-gray-600">Explore French schools and get local insights for each city</p>
        </div>
      </div>
      {/* --- Two-level filter bar (global) --- */}
      <div className="flex flex-wrap gap-4 items-center justify-end mb-8">
        <div>
          <label htmlFor="main-course-level-filter" className="block text-xs mb-1 text-gray-700">Filter by Level</label>
          <Select value={courseLevelFilter} onValueChange={val => {
            setCourseLevelFilter(val);
            setProgramFilter('all');
          }}>
            <SelectTrigger className="w-40" id="main-course-level-filter">
              <SelectValue>{courseLevelFilter === "all" ? "All Levels" : courseLevelFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {allLevels.map(lvl =>
                <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="main-program-filter" className="block text-xs mb-1 text-gray-700">Filter by Subject</label>
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-64" id="main-program-filter">
              <SelectValue>{programFilter === "all" ? "All Subjects" : programFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {programSubjects.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {citiesFiltered.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No schools found for selected filters.
          </div>
        ) : citiesFiltered.map(({ cityKey, city, schools }) => (
          <CityCard
            key={cityKey}
            name={city.name}
            emoji={city.emoji}
            description={city.description}
            schoolsCount={schools.length}
            onClick={() => setSelectedCity(cityKey)}
          />
        ))}
      </div>
    </div>
  );
};
