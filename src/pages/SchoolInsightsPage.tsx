import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface School {
  id: string;
  name: string;
  city: string;
  description: string;
  levels: string[];
  subjects: string[];
}

const schools: School[] = [
  {
    id: "sorbonne",
    name: "Sorbonne University",
    city: "Paris",
    description: "Humanities, sciences, and medicine",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Humanities", "Science", "Medicine"],
  },
  {
    id: "psl",
    name: "PSL University",
    city: "Paris",
    description: "Includes ENS, Dauphine, Mines ParisTech",
    levels: ["Graduate"],
    subjects: ["Science", "Economics", "Engineering"],
  },
  {
    id: "polytechnique",
    name: "École Polytechnique",
    city: "Paris",
    description: "Elite engineering grande école.",
    levels: ["Graduate"],
    subjects: ["Engineering", "Science", "Economics"],
  },
  {
    id: "hec-paris",
    name: "HEC Paris",
    city: "Paris",
    description: "Top global business school",
    levels: ["Graduate"],
    subjects: ["MBA", "Grande École"],
  },
  {
    id: "escp",
    name: "ESCP Business School",
    city: "Paris",
    description: "Multi-campus, Paris is the flagship",
    levels: ["Graduate"],
    subjects: ["MIM", "MBA"],
  },
  {
    id: "sciencespo-paris",
    name: "Sciences Po Paris",
    city: "Paris",
    description: "Political science, international affairs",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Politics", "International Affairs"],
  },
  {
    id: "neoma-paris",
    name: "NEOMA Business School (Paris)",
    city: "Paris",
    description: "Executive & MSc programs",
    levels: ["Graduate"],
    subjects: ["MSc", "Executive"],
  },
  {
    id: "telecom-paris",
    name: "Télécom Paris",
    city: "Paris",
    description: "Tech-focused grande école",
    levels: ["Graduate"],
    subjects: ["Engineering", "Telecom"],
  },
  {
    id: "essec",
    name: "ESSEC Business School",
    city: "Cergy",
    description: "Cergy campus in Paris region",
    levels: ["Graduate"],
    subjects: ["MIM", "MBA", "MSc"],
  },
  {
    id: "centrale-lyon",
    name: "École Centrale de Lyon",
    city: "Lyon",
    description: "Engineering and applied sciences",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "insa-lyon",
    name: "INSA Lyon",
    city: "Lyon",
    description: "Public engineering school",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "claude-bernard",
    name: "Université Claude Bernard Lyon 1",
    city: "Lyon",
    description: "Sciences and medicine",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Medicine", "Science"],
  },
  {
    id: "em-lyon",
    name: "EM Lyon Business School",
    city: "Lyon",
    description: "Prestigious business Grande École",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc"],
  },
  {
    id: "lumiere-lyon2",
    name: "Université Lumière Lyon 2",
    city: "Lyon",
    description: "Social sciences and arts",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Arts", "Social Sciences"],
  },
  {
    id: "supaero",
    name: "ISAE-SUPAERO",
    city: "Toulouse",
    description: "Top aerospace engineering school",
    levels: ["Graduate"],
    subjects: ["Aerospace Engineering"],
  },
  {
    id: "insa-toulouse",
    name: "INSA Toulouse",
    city: "Toulouse",
    description: "Public engineering school",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "paul-sabatier",
    name: "Université Toulouse III – Paul Sabatier",
    city: "Toulouse",
    description: "Science, tech, health",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Technology", "Health"],
  },
  {
    id: "tbs",
    name: "TBS Education",
    city: "Toulouse",
    description: "Grande École business program",
    levels: ["Graduate"],
    subjects: ["Business"],
  },
  {
    id: "capitole",
    name: "Université Toulouse 1 Capitole",
    city: "Toulouse",
    description: "Law, economics, management",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Law", "Economics", "Management"],
  },
  {
    id: "neoma-rouen",
    name: "NEOMA Business School (Main campus)",
    city: "Rouen",
    description: "PGE, MSc, BBA programs",
    levels: ["Graduate"],
    subjects: ["PGE", "MSc", "BBA"],
  },
  {
    id: "insa-rouen",
    name: "INSA Rouen Normandie",
    city: "Rouen",
    description: "Engineering across multiple domains",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "rouen-univ",
    name: "Université de Rouen Normandie",
    city: "Rouen",
    description: "Comprehensive university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
  },
  {
    id: "esigelec",
    name: "ESIGELEC Rouen",
    city: "Rouen",
    description: "Electronics and digital tech",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "neoma-reims",
    name: "NEOMA Business School (Reims)",
    city: "Reims",
    description: "Core business programs",
    levels: ["Graduate"],
    subjects: ["Business", "MBA", "MSc"],
  },
  {
    id: "sciencespo-reims",
    name: "Sciences Po Campus Reims",
    city: "Reims",
    description: "International program focus",
    levels: ["Undergraduate"],
    subjects: ["Politics", "Global Affairs"],
  },
  {
    id: "reims-univ",
    name: "Université de Reims Champagne-Ardenne",
    city: "Reims",
    description: "Regional public university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
  },
  {
    id: "esiec",
    name: "ESIEC Reims",
    city: "Reims",
    description: "Packaging and digital engineering",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "lille-univ",
    name: "Université de Lille",
    city: "Lille",
    description: "Large multidisciplinary public university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
  },
  {
    id: "edhec-lille",
    name: "EDHEC Business School",
    city: "Lille",
    description: "Top 5 French business school",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc", "Finance"],
  },
  {
    id: "centrale-lille",
    name: "École Centrale de Lille",
    city: "Lille",
    description: "Elite engineering school",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "ieseg",
    name: "IESEG School of Management",
    city: "Lille",
    description: "AACSB-accredited Grande École",
    levels: ["Graduate"],
    subjects: ["Management", "MSc"],
  },
  {
    id: "hei",
    name: "HEI – Hautes Études d'Ingénieur",
    city: "Lille",
    description: "Private engineering school",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "strasbourg-univ",
    name: "Université de Strasbourg",
    city: "Strasbourg",
    description: "Prestigious university, strong in sciences and humanities",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Humanities"],
  },
  {
    id: "insa-strasbourg",
    name: "INSA Strasbourg",
    city: "Strasbourg",
    description: "Part of the INSA engineering network",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "em-strasbourg",
    name: "EM Strasbourg Business School",
    city: "Strasbourg",
    description: "Business school within the university",
    levels: ["Graduate"],
    subjects: ["Business"],
  },
  {
    id: "sciencespo-strasbourg",
    name: "Sciences Po Strasbourg",
    city: "Strasbourg",
    description: "Regional campus of Sciences Po",
    levels: ["Undergraduate"],
    subjects: ["Politics"],
  },
  {
    id: "bordeaux-univ",
    name: "Université de Bordeaux",
    city: "Bordeaux",
    description: "Comprehensive research university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Engineering"],
  },
  {
    id: "kedge-bordeaux",
    name: "KEDGE Business School",
    city: "Bordeaux",
    description: "Top-tier business school",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc"],
  },
  {
    id: "enseirb",
    name: "ENSEIRB-MATMECA",
    city: "Bordeaux",
    description: "Engineering in IT, electronics, math",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "sciencespo-bordeaux",
    name: "Sciences Po Bordeaux",
    city: "Bordeaux",
    description: "Political science and international studies",
    levels: ["Undergraduate"],
    subjects: ["Politics"],
  },
  {
    id: "inpbordeaux",
    name: "INP Bordeaux",
    city: "Bordeaux",
    description: "Engineering network incl. ENSEIRB-MATMECA, ENSCBP",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "uca",
    name: "Université Côte d'Azur",
    city: "Nice",
    description: "Alliance of local institutions under one label",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
  },
  {
    id: "skema-nice",
    name: "SKEMA Business School (Sophia)",
    city: "Nice",
    description: "Global business school with AI focus",
    levels: ["Graduate"],
    subjects: ["Business", "AI"],
  },
  {
    id: "polytech-nice",
    name: "Polytech Nice Sophia",
    city: "Nice",
    description: "Engineering school within UCA",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "edhec-nice",
    name: "EDHEC Business School (Nice)",
    city: "Nice",
    description: "Specializes in Finance MSc and Global MBA",
    levels: ["Graduate"],
    subjects: ["Finance", "MBA"],
  },
  {
    id: "mines-sophia",
    name: "Mines Paris – Sophia",
    city: "Sophia Antipolis",
    description: "AI and systems engineering research campus",
    levels: ["Graduate"],
    subjects: ["Engineering", "AI"],
  },
  {
    id: "amu",
    name: "Aix-Marseille Université",
    city: "Marseille",
    description: "One of France's largest public universities",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
  },
  {
    id: "kedge-marseille",
    name: "KEDGE Business School (Marseille)",
    city: "Marseille",
    description: "Major business school",
    levels: ["Graduate"],
    subjects: ["Business"],
  },
  {
    id: "centrale-marseille",
    name: "École Centrale de Marseille",
    city: "Marseille",
    description: "Part of the Centrale engineering group",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "polytech-marseille",
    name: "Polytech Marseille",
    city: "Marseille",
    description: "Engineering programs under AMU",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "grenoble-univ",
    name: "Université Grenoble Alpes",
    city: "Grenoble",
    description: "Leading research university in sciences and humanities",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Humanities", "Engineering"],
  },
  {
    id: "grenoble-inp",
    name: "Grenoble INP",
    city: "Grenoble",
    description: "Engineering institute with multiple schools",
    levels: ["Graduate"],
    subjects: ["Engineering", "Technology"],
  },
  {
    id: "gem",
    name: "Grenoble Ecole de Management",
    city: "Grenoble",
    description: "Top business school with tech focus",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc", "Business"],
  },
  {
    id: "ensimag",
    name: "Ensimag",
    city: "Grenoble",
    description: "Engineering school specializing in IT and applied math",
    levels: ["Graduate"],
    subjects: ["Engineering", "IT"],
  },
  {
    id: "sciencespo-grenoble",
    name: "Sciences Po Grenoble",
    city: "Grenoble",
    description: "Political science and governance programs",
    levels: ["Undergraduate"],
    subjects: ["Politics", "Governance"],
  },
  {
    id: "nantes-univ",
    name: "Université de Nantes",
    city: "Nantes",
    description: "Comprehensive public university",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Various"],
  },
  {
    id: "audencia",
    name: "Audencia Business School",
    city: "Nantes",
    description: "Top-tier business school with international focus",
    levels: ["Graduate"],
    subjects: ["MBA", "MSc", "Business"],
  },
  {
    id: "centrale-nantes",
    name: "École Centrale de Nantes",
    city: "Nantes",
    description: "Elite engineering grande école",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "polytech-nantes",
    name: "Polytech Nantes",
    city: "Nantes",
    description: "Engineering school under Université de Nantes",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "oniris",
    name: "Oniris",
    city: "Nantes",
    description: "Engineering in food science and veterinary medicine",
    levels: ["Graduate"],
    subjects: ["Engineering", "Veterinary"],
  },
  {
    id: "larochelle-univ",
    name: "Université de La Rochelle",
    city: "La Rochelle",
    description: "Public university with environmental focus",
    levels: ["Undergraduate", "Graduate"],
    subjects: ["Science", "Environment", "Humanities"],
  },
  {
    id: "excelia",
    name: "Excelia Business School",
    city: "La Rochelle",
    description: "Business school with tourism and sustainability programs",
    levels: ["Graduate"],
    subjects: ["Business", "Tourism", "MSc"],
  },
  {
    id: "eigsi",
    name: "EIGSI La Rochelle",
    city: "La Rochelle",
    description: "General engineering with maritime focus",
    levels: ["Graduate"],
    subjects: ["Engineering"],
  },
  {
    id: "institut-ocean",
    name: "Institut de l'Océan",
    city: "La Rochelle",
    description: "Marine and environmental research programs",
    levels: ["Graduate"],
    subjects: ["Marine Science", "Environment"],
  },
];

interface SchoolInsightsPageProps {
  onBack: () => void;
}

export function SchoolInsightsPage({ onBack }: SchoolInsightsPageProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");

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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Checklist
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">School Insights</h1>
      </div>

      {/* City selection */}
      <div className="mb-6 flex gap-3 flex-wrap">
        {cityList.map((city) => (
          <Button
            key={city}
            variant={selectedCity === city ? "default" : "outline"}
            onClick={() => {
              setSelectedCity(city);
              setSubjectFilter("All");
            }}
          >
            {city}
          </Button>
        ))}
      </div>

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
                <Card key={school.id}>
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
