import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CityCard } from "@/components/school-insights/CityCard";
import { CityInsightsCard } from "@/components/school-insights/CityInsightsCard";
import { InsightsDialog } from "@/components/school-insights/InsightsDialog";
import { SchoolDetail } from "@/components/school-insights/SchoolDetail";

// FIX: Add missing props interface
interface SchoolInsightsPageProps {
  onBack: () => void;
}

interface School {
  id: string;
  name: string;
  city: string;
  description: string;
  levels: string[];
  subjects: string[];
  website: string;
  admissionProcess: string[];
  languageRequirements: string[];
  supportAndFeatures: string[];
  tuition: string;
  ranking: string;
  applicationDeadlines: { label: string, deadline: string }[];
  keyHighlights: string[];
  contacts: { type: string, value: string }[];
}

const schools: School[] = [
  {
    id: "sorbonne",
    name: "Sorbonne University",
    city: "Paris",
    description:
      "Founded in 1257 (merged 2018). Ranked 35th globally (ARWU); alumni include numerous Nobel/Fields laureates. Free French courses for international students; 18 campus libraries with 600,000+ books. Application via Études en France or Parcoursup. French proficiency (DELF/DALF B2+ for most fields, C1 for medicine) required. Application cycles: Parcoursup (Jan–Mar), international: mid-Dec deadline.",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Bachelor’s (Licence): Humanities, Sciences, Engineering, Medicine",
      "Master’s (Master): Physics, Biology, Comp. Sci., History, etc. (some English-taught available)",
      "PhD: Structured doctoral programs (all fields)"
    ],
    website: "https://www.sorbonne-universite.fr/",
    admissionProcess: [
      "Application via Études en France (for most non-EU international students) or Parcoursup (for Bachelor/Licence programs in France).",
      "French proficiency required: DELF/DALF B2+ (most fields), C1 (Medicine).",
      "Application cycles: Parcoursup (Jan-Mar); international: mid-December.",
      "Master & PhD: Direct university portal, research proposal for PhD.",
    ],
    languageRequirements: [
      "French (B2+ required for most courses).",
      "C1 required for Medicine.",
      "Some Masters in English (proof required)."
    ],
    supportAndFeatures: [
      "Free French courses for international students.",
      "18 libraries with 600,000+ books.",
      "Orientation sessions and buddy systems.",
    ],
    tuition: "€170 (Licence/year, EU); €2,770 (non-EU, Licence).",
    ranking: "ARWU 35th (global)",
    applicationDeadlines: [
      { label: "Parcoursup", deadline: "January–March" },
      { label: "International", deadline: "mid-December" }
    ],
    keyHighlights: [
      "Numerous Nobel/Fields laureates among alumni.",
      "Historic institution, merged in 2018.",
      "Strong international community."
    ],
    contacts: [
      { type: "Website", value: "https://www.sorbonne-universite.fr/" },
      { type: "General", value: "contact@sorbonne-universite.fr" },
    ],
  },
  {
    id: "psl",
    name: "PSL University",
    city: "Paris",
    description:
      "Paris Sciences & Lettres (PSL): #1 French university (THE/Shanghai), top‑50 globally. Bachelor's (CPES) fully in English, 40+ Master's taught in English/French, PhD research via constituent schools (ENS, Mines, Dauphine, etc). Highly competitive: 69–82% acceptance. Major global exchange network (Cambridge, UCL, Berkeley).",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Bachelor: CPES multidisciplinary (English, 3 yrs, selective)",
      "Master: ~40 programs (Science, Management, Humanities, Sustainability)",
      "PhD: Research doctorates via constituent schools"
    ],
    website: "https://psl.eu/",
    admissionProcess: [
      "Apply via university or school portal (depending on program).",
      "Highly selective entry especially for CPES Bachelor.",
      "English or French language required (program-dependent).",
      "Deadlines vary by program."
    ],
    languageRequirements: [
      "English for CPES Bachelor.",
      "French or English for Masters, depending on program.",
      "Language certificate (TOEFL/IELTS/TCF/DELF) as requested."
    ],
    supportAndFeatures: [
      "Global exchange network (Cambridge, UCL, Berkeley)",
      "Student housing, cultural activities, research opportunities"
    ],
    tuition: "€170–€601 (bachelor/master, mostly public rate). Private programs vary.",
    ranking: "THE/Shanghai #1 France, top-50 global",
    applicationDeadlines: [
      { label: "CPES Bachelor", deadline: "January" },
      { label: "Masters/PhD", deadline: "Check program; varies Oct–Mar" }
    ],
    keyHighlights: [
      "Top ranked French university; strong research.",
      "Many English-taught masters.",
      "Constituent elite schools (ENS, Dauphine, Mines etc)."
    ],
    contacts: [
      { type: "Website", value: "https://psl.eu/" },
      { type: "Contact", value: "contact@psl.eu" },
    ],
  },
  {
    id: "neoma-paris",
    name: "NEOMA Business School (Paris)",
    city: "Paris",
    description:
      "Triple-accredited (EQUIS, AACSB, AMBA); part of Conférence des Grandes Écoles. Campuses: Paris, Rouen, Reims. 9000+ students (~25% international), 100+ startups/year incubated. Visa, scholarships & orientation support ('HUB' office). Ranked among Europe's top business schools (FT, The Economist).",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Global BBA: 4-year, General/CESEM (double-degree) tracks",
      "Bachelor in Services Management: 3-year professional degree",
      "Master in Management (MiM): Flagship, taught in French & English, €17,500/yr",
      "MSc: Finance, Marketing, Business Analytics, AI, Project Mgmt, etc.",
      "Global Executive MBA, Part-Time MSc, Doctoral",
    ],
    website: "https://www.neoma-bs.com/en/",
    admissionProcess: [
      "Online application through NEOMA portal.",
      "CV, personal statement, and interview required.",
      "Specific requirements depend on program."
    ],
    languageRequirements: [
      "English or French depending on program.",
      "TOEFL/IELTS for English; TCF/DELF/DALF for French programs."
    ],
    supportAndFeatures: [
      "HUB (international student support).",
      "Startup incubator.",
      "Visa support, scholarships."
    ],
    tuition: "€12,000–€17,500/year (MiM), varies by program.",
    ranking: "FT, The Economist: Top European business schools.",
    applicationDeadlines: [
      { label: "MiM", deadline: "Rolling (until filled)" },
      { label: "Other", deadline: "See program page" }
    ],
    keyHighlights: [
      "Triple-accredited business school.",
      "100+ startups/year from incubator.",
      "Strong international community."
    ],
    contacts: [
      { type: "Website", value: "https://www.neoma-bs.com/en/" },
      { type: "International Office", value: "hub@neoma-bs.fr" }
    ],
  },
  {
    id: "telecom-paris",
    name: "Télécom Paris",
    city: "Paris",
    description:
      "Formerly Télécom ParisTech. 3-year Ingénieur & 2-year MSc programs in AI, Cybersecurity, Data Science, Networks. Double degree options (Polytechnique, Mines). ~40% international students. Strong exchange, dual-degree and scholarship support (Eiffel, IMT, Erasmus+).",
    levels: ["Graduate"],
    subjects: [
      "Diplôme d’Ingénieur: Computer Science, Networks & Telecoms (via CPGE, L3/M1, or DUT routes)",
      "MSc in Engineering: AI, Cybersecurity, IoT, Smart Mobility",
      "Post-Master’s degrees: Specialized (Smart Mobility, etc.)",
      "PhD: Doctoral research in engineering fields",
    ],
    website: "https://www.telecom-paris.fr/",
    admissionProcess: [
      "Online application or through Campus France.",
      "Competitive selection (file, interview).",
      "Engineering track admissions (CPGE, equivalent qualification)."
    ],
    languageRequirements: [
      "French B2 for most programs.",
      "Some MSc taught in English (proof required, usually IELTS/TOEFL)."
    ],
    supportAndFeatures: [
      "Strong scholarship opportunities (Eiffel, IMT, Erasmus+ etc).",
      "International student office.",
      "Dual degree & research mobility."
    ],
    tuition: "€2,770–€3,770/year (non-EU), lower for EU.",
    ranking: "Top French engineering school (various rankings).",
    applicationDeadlines: [
      { label: "Most programs", deadline: "January–March" }
    ],
    keyHighlights: [
      "~40% international students.",
      "Renowned in digital, AI, telecoms.",
      "Strong industry links."
    ],
    contacts: [
      { type: "Website", value: "https://www.telecom-paris.fr/" },
      { type: "International Office", value: "internationalrelations@telecom-paris.fr" }
    ],
  },
  {
    id: "escp",
    name: "ESCP Business School",
    city: "Paris",
    description:
      "Internationally renowned, 6 campuses across Europe. Bachelor (BSc) in Management with tracks in Paris, Berlin, London, Madrid, Turin. MiM (2–3 yrs, 70+ specializations, 9+ months placements), 98% BSc placement. MBA, Executive MBAs, MSc (Finance, Strategy, etc). Global accreditations, strong career outcomes.",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Bachelor in Management (BSc): 3 yrs, English, multi-country tracks",
      "Master in Management (MiM): Multi-campus, 2–3 yrs, 70+ specializations",
      "MSc & Specialized Masters: Finance, Innovation, Management etc.",
      "MBA in International Management, Executive MBA, PhD"
    ],
    website: "https://escp.eu/",
    admissionProcess: [
      "Apply online to ESCP.",
      "Motivation letter, CV, transcripts, and interview.",
      "Language test (English or French depending on program)."
    ],
    languageRequirements: [
      "English or French depending on program.",
      "IELTS/TOEFL or TCF/DELF/DALF."
    ],
    supportAndFeatures: [
      "Careers office, global alumni network.",
      "Exchange programs.",
      "International orientation."
    ],
    tuition: "€13,000–€22,350/year depending on program.",
    ranking: "Global top business school (various rankings).",
    applicationDeadlines: [
      { label: "Bachelor", deadline: "Mid-January (main)" },
      { label: "Master", deadline: "Various, check program" }
    ],
    keyHighlights: [
      "6 campuses, multi-country tracks.",
      "Excellent career outcomes.",
      "98% placement after BSc."
    ],
    contacts: [
      { type: "Website", value: "https://escp.eu/" },
      { type: "Admissions", value: "admissions@escp.eu" }
    ],
  },
  {
    id: "essec",
    name: "ESSEC Business School",
    city: "Cergy",
    description:
      "Triple-accredited, ~6,000 students, campuses in Cergy, Singapore, and Rabat. Global BBA (4-yr, 10–16 mo. abroad/internship). MiM Grande École, MBAs, MScs (Paris, Singapore), Exec. MBAs, PhD. Acceptance: BBA selective, MBA 15–25%. Scholarships & global partnerships. Ranked among world’s top management schools.",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Global BBA: 4-year int’l track, extensive internships/abroad",
      "Master in Management (MiM): Grande École specializations",
      "MSc: Data Science, Finance, Marketing and more",
      "MBA & Executive programs: FT/PT, hybrid/weekend",
      "PhD in management"
    ],
    website: "https://www.essec.edu/",
    admissionProcess: [
      "Online application (BBA, MiM, Master, MBA programs).",
      "Test scores required (GMAT/GRE/TAGE MAGE for some).",
      "Motivation letter & interview."
    ],
    languageRequirements: [
      "English for BBA (TOEFL/IELTS), French for some tracks.",
      "Proof of language for MBA/Master."
    ],
    supportAndFeatures: [
      "Global mobility programs, exchange partnerships.",
      "Scholarships and housing support.",
      "Career mentorship."
    ],
    tuition: "BBA: €14,000/year; Masters/MBA: €18,000–€24,000/year.",
    ranking: "FT, QS, Economist: top management school.",
    applicationDeadlines: [
      { label: "BBA", deadline: "Mid-January" },
      { label: "Other", deadline: "Varies (see program page)" }
    ],
    keyHighlights: [
      "Strong international and internship focus.",
      "Triple accredited business school.",
      "Global alumni network."
    ],
    contacts: [
      { type: "Website", value: "https://www.essec.edu/" },
      { type: "Admissions", value: "admissions@essec.edu" }
    ],
  },
  {
    id: "centrale-lyon",
    name: "École Centrale de Lyon",
    city: "Lyon",
    description:
      "Prestigious grand établissement for general engineering (Ingénieur, 5 years), plus M1/M2 Masters (aerospace, data science, etc.) & PhD. Admissions by CapECL, concours, or dual-degree (French/English). B1–B2 French, some programs in English. 20+ sports, large research output.",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "General Engineering (Ingénieur): 5-year integrated, CPGE/university entry",
      "Master’s Degrees: M1/M2 in engineering, physics, data science, aerospace, etc.",
      "PhD & Research tracks in engineering"
    ],
    website: "https://www.ec-lyon.fr/",
    admissionProcess: [
      "Admission via CapECL, concours, or direct entry for international students.",
      "Engineer program: After 2 years CPGE or equivalent.",
      "Masters: Direct application (after BSc/engineering degree)."
    ],
    languageRequirements: [
      "French B1–B2 for most programs.",
      "Some masters in English (IELTS/TOEFL for proof)."
    ],
    supportAndFeatures: [
      "20+ sports clubs and facilities.",
      "Research funding and mobility opportunities.",
      "Buddy/integration programs."
    ],
    tuition: "€601–€2,770/year for EU/EEA; higher for non-EU.",
    ranking: "Leading French engineering grande école.",
    applicationDeadlines: [
      { label: "Engineer/Master", deadline: "Check website, varies" }
    ],
    keyHighlights: [
      "Strong research output.",
      "Integration and sports activities.",
      "Dual-degree options."
    ],
    contacts: [
      { type: "Website", value: "https://www.ec-lyon.fr/" },
      { type: "Admissions", value: "admissions@ec-lyon.fr" }
    ],
  },
  {
    id: "insa-lyon",
    name: "INSA Lyon",
    city: "Lyon",
    description:
      "France’s top public engineering school. 5-year Ingénieur/Grande École (2-year prep, 3-year majors in Civil, CompSci, Biotech, etc.), MSc in English, IBMMAE (International Bachelor). 30% int’l, 36 double-degrees, international sections (EURINSA, ASINSA…). Exchanges worldwide.",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Diplôme d’Ingénieur (5-year): Civil, Computer Science, Telecom, Biotech, Energy, etc.",
      "International Bachelor (IBMMAE): Taught in English, applied science/business",
      "Master of Science, Advanced Masters, Continuing Education",
      "PhD: via INSA/CTI-accredited doctoral schools"
    ],
    website: "https://www.insa-lyon.fr/",
    admissionProcess: [
      "Campus France Etudes en France or direct portal.",
      "Selection based on academic criteria.",
      "Interview for some tracks."
    ],
    languageRequirements: [
      "French for most programs (B1/B2).",
      "IBMMAE/Some MSc in English—TOEFL/IELTS required."
    ],
    supportAndFeatures: [
      "International support office.",
      "Double degrees, exchange programs.",
      "Student associations and integration."
    ],
    tuition: "€601–€2,770/year (EU/EEA); international programs may be higher.",
    ranking: "France's #1 public engineering school.",
    applicationDeadlines: [
      { label: "All programs", deadline: "Check website; varies (Spring most common)" }
    ],
    keyHighlights: [
      "36 double degrees, wide exchange network.",
      "30% international students.",
      "Research and sports facilities."
    ],
    contacts: [
      { type: "Website", value: "https://www.insa-lyon.fr/" },
      { type: "International Relations", value: "relint@insa-lyon.fr" }
    ],
  },
  {
    id: "lumiere-lyon2",
    name: "Université Lumière Lyon 2",
    city: "Lyon",
    description:
      "Major public university: 27,000 students (~15% international). Licence (BA), Master (150+), Doctorat in humanities, law, social sciences, journalism. Parcoursup for Bachelor, direct application for Masters/PhD. B2/C1 French required for most Master’s. Strong research & humanities focus.",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Licence (Bachelor): Humanities, Law, Social Sciences, Journalism, Languages",
      "Master (150+): Prof./research master’s",
      "Doctorat (PhD): with supervisor & research proposal",
      "Specialized (DUT, DU, Agrégation prep)"
    ],
    website: "https://www.univ-lumiere.fr/",
    admissionProcess: [
      "Bachelor: Parcoursup (French national portal).",
      "Master/PhD: direct application on university website.",
      "Research proposal for Doctorat required."
    ],
    languageRequirements: [
      "French B2 (Bachelor); C1 (most Master's or research)."
    ],
    supportAndFeatures: [
      "International student office.",
      "Orientation weeks at start of semester.",
      "Research and library resources."
    ],
    tuition: "€170–€270/year (EU/EEA), higher for non-EU.",
    ranking: "Major French university (not globally ranked).",
    applicationDeadlines: [
      { label: "Bachelor", deadline: "Parcoursup Jan–Mar" },
      { label: "Master/PhD", deadline: "Varies (see website)" }
    ],
    keyHighlights: [
      "Strong in law, humanities & social science.",
      "Large international community.",
      "Accessible public tuition."
    ],
    contacts: [
      { type: "Website", value: "https://www.univ-lumiere.fr/" },
      { type: "International", value: "incoming.mobility@univ-lyon2.fr" }
    ],
  },
  {
    id: "insa-toulouse",
    name: "INSA Toulouse",
    city: "Toulouse",
    description:
      "Leading public grande école for engineering. Diplôme d’Ingénieur (5 years, 8 majors), MSc, MRes (Sustainable Engineering, Nano…), Doctorat. 23% international, part of INSA Group, Toulouse Tech & Erasmus. Highly selective; major exchange/double degree opportunities.",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Diplôme d’Ingénieur (5 years): 8 specializations (Aerospace, etc.)",
      "Master of Science, MRes, Advanced Masters (Sustainable Engineering, etc.)",
      "PhD in engineering and science fields"
    ],
    website: "https://www.insa-toulouse.fr/",
    admissionProcess: [
      "Online application (Etudes en France or INSA portal).",
      "Academic record, motivation, and interview required for most tracks."
    ],
    languageRequirements: [
      "French B1/B2 for most undergraduate programs.",
      "Some MSc in English—proof of English required."
    ],
    supportAndFeatures: [
      "International support; double degrees.",
      "Erasmus exchange.",
      "Campus housing, sports and cultural programs."
    ],
    tuition: "€601–€2,770/year (EU/EEA); higher for non-EU masters.",
    ranking: "Nationally top-ranked engineering grande école.",
    applicationDeadlines: [
      { label: "All programs", deadline: "Spring (see website)" }
    ],
    keyHighlights: [
      "23% international students.",
      "Leading research and industry collaboration.",
      "Vibrant student life."
    ],
    contacts: [
      { type: "Website", value: "https://www.insa-toulouse.fr/" },
      { type: "International", value: "international@insa-toulouse.fr" }
    ],
  },
  {
    id: "paul-sabatier",
    name: "Université Toulouse III – Paul Sabatier",
    city: "Toulouse",
    description:
      "~35,000 students, 68 research labs, QS #580 (2025). Bachelor (Science, Health, IT), Master (Biomolecular, Environmental Health, etc.), Doctorat (multiple STEM schools). Tuition: ~€3–4k/yr EU, €6k+ for int’l/English. Mobility, double degrees & Erasmus supported.",
    levels: ["Undergraduate", "Graduate"],
    subjects: [
      "Bachelor’s & Professional Licences: Science, Health, Sports, IT, Eco-Management",
      "Master’s: Biomolecular Sciences, Environmental Health, STEM",
      "Doctorat: STEM & interdisciplinary research"
    ],
    website: "https://www.univ-toulouse3.fr/",
    admissionProcess: [
      "Bachelor: Parcoursup (for French/EU/EEA); Etudes en France or direct university portal for international.",
      "Master/Doctorat: direct application with research proposal/research CV."
    ],
    languageRequirements: [
      "French B2 (most programs).",
      "Some Master/PhD tracks in English—proof required."
    ],
    supportAndFeatures: [
      "Scholarships for mobility.",
      "Double degree/Erasmus partnerships.",
      "Campus life: sports, societies, housing."
    ],
    tuition: "€3,000–€4,000/year (EU); €6,000+/yr for international/English.",
    ranking: "QS #580 (2025), strong STEM reputation.",
    applicationDeadlines: [
      { label: "Bachelor", deadline: "Parcoursup (Jan–Mar)" },
      { label: "Master/PhD", deadline: "Varies (see program)" }
    ],
    keyHighlights: [
      "68 research labs.",
      "STEM & interdisciplinary focus.",
      "Major double degree options."
    ],
    contacts: [
      { type: "Website", value: "https://www.univ-toulouse3.fr/" },
      { type: "International", value: "international@adm.ups-tlse.fr" }
    ],
  },
];

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
