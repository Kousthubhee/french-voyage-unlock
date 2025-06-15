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
  schools: School[];
  localInsights: LocalInsight[];
};

const citiesData: Record<string, City> = {
  paris: {
    name: "Paris",
    emoji: "🗼",
    description: "Over 40 universities and Grandes Écoles, including top ones like Sorbonne, PSL, Sciences Po, Polytechnique, and more.",
    schools: [
      {
        id: "psl",
        name: "Université PSL",
        description: "A top multi-institution university: physics, social science, arts, and more.",
        location: "Paris",
        tuition: "€200–€5,000/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://psl.eu",
        contact: { email: "admissions@psl.eu", phone: "+33 1 85 76 08 70" }
      },
      {
        id: "paris-sorbonne",
        name: "Sorbonne University",
        description: "World-leading institution for humanities, sciences, and medicine.",
        location: "Paris",
        tuition: "€277–€4,000/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.sorbonne-universite.fr",
      },
      {
        id: "sciences-po-paris",
        name: "Sciences Po Paris",
        description: "Elite school of political science and international relations.",
        location: "Paris",
        tuition: "€0–€13,000/year",
        programs: ["Bachelors", "Masters"],
        website: "https://www.sciencespo.fr",
      },
      {
        id: "polytechnique-paris",
        name: "École Polytechnique",
        description: "Top French engineering and science Grande École.",
        location: "Palaiseau, Paris area",
        tuition: "€13,000/year",
        programs: ["Engineering", "Masters", "PhD"],
        website: "https://www.polytechnique.edu",
      },
      {
        id: "american-paris",
        name: "American University of Paris",
        description: "Private liberal arts university with US-style degrees.",
        location: "Paris",
        tuition: "$38,000/year",
        programs: ["Bachelors", "Masters"],
        website: "https://www.aup.edu",
      }
    ],
    localInsights: [
      {
        title: "Cost of Living",
        description: "Paris is world-famous—but expensive!",
        tips: [
          "Use Navigo pass for affordable transport.",
          "Many museums are free for students under 26."
        ]
      }
    ]
  },

  lyon: {
    name: "Lyon",
    emoji: "🦁",
    description: "Major public universities & Grandes Écoles; vibrant student city.",
    schools: [
      {
        id: "ens-lyon",
        name: "ENS de Lyon",
        description: "Prestigious teacher/research training school.",
        location: "Lyon",
        tuition: "€243–€601/year",
        programs: ["Masters", "PhD"],
        website: "https://www.ens-lyon.fr",
      },
      {
        id: "insa-lyon",
        name: "INSA Lyon",
        description: "Top engineering and applied science Grande École.",
        location: "Villeurbanne, Lyon",
        tuition: "€601/year",
        programs: ["Engineering", "Masters"],
        website: "https://www.insa-lyon.fr",
      },
      {
        id: "emlyon",
        name: "emlyon business school",
        description: "Famous business school focused on entrepreneurship.",
        location: "Écully, Lyon",
        tuition: "€16,900/year",
        programs: ["MSc Management", "MBA"],
        website: "https://www.em-lyon.com",
      }
    ],
    localInsights: [
      {
        title: "Food & Student Life",
        description: "Lyon is renowned for its cuisine and vibrant student activity.",
        tips: [
          "Try a local 'bouchon' for authentic Lyonnaise food.",
          "Student discounts galore: public bikes, opera, and cinema."
        ]
      }
    ]
  },

  toulouse: {
    name: "Toulouse",
    emoji: "🚀",
    description: "Major aerospace and tech hub, home to leading universities.",
    schools: [
      {
        id: "ut3",
        name: "Toulouse III – Paul Sabatier University",
        description: "Specialized in science, health, engineering, and sports.",
        location: "Toulouse",
        tuition: "€170–€601/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.univ-tlse3.fr",
      },
      {
        id: "tse",
        name: "Toulouse School of Economics",
        description: "Renowned for economics research and teaching.",
        location: "Toulouse",
        tuition: "€243–€400/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.tse-fr.eu",
      },
      {
        id: "isae-supaero",
        name: "Institut Supérieur de l'Aéronautique et de l'Espace (ISAE‑Supaero)",
        description: "Europe’s leading aerospace engineering school.",
        location: "Toulouse",
        tuition: "€14,000/year",
        programs: ["Aerospace Engineering", "Masters", "PhD"],
        website: "https://www.isae-supaero.fr",
      }
    ],
    localInsights: [
      {
        title: "Aerospace City",
        description: "Known for Airbus, Cité de l'Espace & student life.",
        tips: [
          "Save on rent by sharing a 'coloc' (shared flat) near Rangueil.",
          "Check out the summer Toulouse Plages by the river!"
        ]
      }
    ]
  },

  rouen: {
    name: "Rouen",
    emoji: "🏰",
    description: "Historic city with modern universities and vibrant cultural scene.",
    schools: [
      {
        id: "rouen-univ",
        name: "Université de Rouen Normandie",
        description: "Main public university in Normandy region.",
        location: "Rouen",
        tuition: "€170–€601/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.univ-rouen.fr",
      },
      {
        id: "neoma-rouen",
        name: "NEOMA Business School (Rouen campus)",
        description: "International BBA, business & management programs.",
        location: "Rouen",
        tuition: "€13,000/year",
        programs: ["PGE", "MSc", "BBA"],
        website: "https://www.neoma-bs.com",
      }
    ],
    localInsights: [
      {
        title: "Student Budgeting",
        description: "Rouen is affordable for food and housing.",
        tips: [
          "Weekly markets offer fresh produce at great prices.",
          "Historic center: lots of free and low-cost museums."
        ]
      }
    ]
  },

  reims: {
    name: "Reims",
    emoji: "🍾",
    description: "Champagne region’s capital with strong universities.",
    schools: [
      {
        id: "urca",
        name: "University of Reims Champagne-Ardenne (URCA)",
        description: "Major regional public university.",
        location: "Reims",
        tuition: "€170–€601/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.univ-reims.fr",
      },
      {
        id: "neoma-reims",
        name: "NEOMA Business School (Reims campus)",
        description: "Leading business school with international focus.",
        location: "Reims",
        tuition: "€13,000/year",
        programs: ["BBA", "MSc"],
        website: "https://www.neoma-bs.com",
      }
    ],
    localInsights: [
      {
        title: "Champagne Life",
        description: "City surrounded by world-famous vineyards.",
        tips: [
          "Visit champagne houses—many have student discounts.",
          "The city is very bike-friendly."
        ]
      }
    ]
  },

  lille: {
    name: "Lille",
    emoji: "🌧️",
    description: "Northern hub for business, engineering, and vibrant student life.",
    schools: [
      {
        id: "lille-univ",
        name: "University of Lille",
        description: "One of France’s largest multidisciplinary universities.",
        location: "Lille",
        tuition: "€170–€601/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.univ-lille.fr",
      },
      {
        id: "edhec-lille",
        name: "EDHEC Business School",
        description: "Top business school best known for finance.",
        location: "Lille",
        tuition: "€15,000/year",
        programs: ["MBA", "MSc", "Finance"],
        website: "https://www.edhec.edu",
      }
    ],
    localInsights: [
      {
        title: "Flea Markets & Nightlife",
        description: "Don’t miss the Braderie de Lille or busy student bars.",
        tips: [
          "‘Vieux Lille’ district full of lively cafés.",
          "Public transport: TER cards for regional discounts."
        ]
      }
    ]
  },

  strasbourg: {
    name: "Strasbourg",
    emoji: "🌉",
    description: "Central European location; diverse and international universities.",
    schools: [
      {
        id: "strasbourg-univ",
        name: "University of Strasbourg",
        description: "Historic university with top science and arts programs.",
        location: "Strasbourg",
        tuition: "€170–€601/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.unistra.fr",
      },
      {
        id: "insa-strasbourg",
        name: "INSA Strasbourg",
        description: "Engineering, architecture and design programs.",
        location: "Strasbourg",
        tuition: "€601/year",
        programs: ["Engineering", "Masters"],
        website: "https://www.insa-strasbourg.fr",
      }
    ],
    localInsights: [
      {
        title: "Cross-Border Life",
        description: "Trams cross the border to Germany! Experience EU culture.",
        tips: [
          "Get the CTS youth card for travel savings.",
          "Christmas Market is magical every winter."
        ]
      }
    ]
  },

  bordeaux: {
    name: "Bordeaux",
    emoji: "🍇",
    description: "Wine capital with strong science and business universities.",
    schools: [
      {
        id: "bordeaux-univ",
        name: "University of Bordeaux",
        description: "Research-intensive public university.",
        location: "Bordeaux",
        tuition: "€170–€601/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.u-bordeaux.fr",
      },
      {
        id: "kedge-bordeaux",
        name: "KEDGE Business School",
        description: "Top-tier business school, well-known internationally.",
        location: "Bordeaux",
        tuition: "€16,000/year",
        programs: ["MBA", "MSc"],
        website: "https://www.kedge.edu",
      }
    ],
    localInsights: [
      {
        title: "Urban Beaches",
        description: "Cycling & picnics along the Garonne River embankments.",
        tips: [
          "Darwin hall has student-friendly coworking and cheap meals.",
          "Vineyard visits accessible on public tram."
        ]
      }
    ]
  },

  nice: {
    name: "Nice",
    emoji: "🌞",
    description: "Mediterranean city, mild weather and cosmopolitan schools.",
    schools: [
      {
        id: "uca",
        name: "Université Côte d’Azur",
        description: "Alliance of institutions: strong in science & innovation.",
        location: "Nice",
        tuition: "€170–€601/year",
        programs: ["Various"],
        website: "https://univ-cotedazur.eu",
      },
      {
        id: "skema-nice",
        name: "SKEMA Business School",
        description: "Top international business school.",
        location: "Sophia Antipolis/Nice",
        tuition: "€16,000/year",
        programs: ["BBA", "Masters", "MBA"],
        website: "https://www.skema.edu",
      }
    ],
    localInsights: [
      {
        title: "Beach & Festivals",
        description: "Study under the sun: from the Old Town to the Promenade des Anglais.",
        tips: [
          "Carnaval de Nice is a must in February.",
          "Public beach chairs are free for students before 10am."
        ]
      }
    ]
  },

  marseille: {
    name: "Marseille",
    emoji: "⛵",
    description: "Major port city; most universities under Aix‑Marseille University umbrella.",
    schools: [
      {
        id: "amu",
        name: "Aix-Marseille Université",
        description: "France’s largest public university, spanning all major academic fields.",
        location: "Marseille",
        tuition: "€170–€601/year",
        programs: ["Bachelors", "Masters", "PhD"],
        website: "https://www.univ-amu.fr",
      },
      {
        id: "kedge-marseille",
        name: "KEDGE Business School (Marseille campus)",
        description: "Business, Management and International Trade programs.",
        location: "Marseille",
        tuition: "€16,000/year",
        programs: ["MBA", "MSc"],
        website: "https://www.kedge.edu",
      }
    ],
    localInsights: [
      {
        title: "Multicultural City",
        description: "Enjoy Mediterranean food, local music, and world-class beaches.",
        tips: [
          "Vieux-Port is student nightlife central.",
          "Take a ferry to Frioul Islands for 5€!"
        ]
      }
    ]
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
    const contact = getContact(selectedSchool);
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setSelectedSchool(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedSchool.name}</h1>
            <p className="text-lg text-gray-600">{selectedSchool.description}</p>
            <div className="flex items-center justify-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {selectedSchool.location}
            </div>
            {selectedSchool.website && (
              <a
                href={selectedSchool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-blue-600 underline hover:text-blue-800"
              >
                <span className="mr-1">Official website</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h8m0 0v8m0-8l-8 8" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">🎓 Programs Offered</h2>
              <div className="flex flex-wrap gap-1">
                {selectedSchool.programs.map((prog, idx) => (
                  <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {prog}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">📅 Tuition & Fees</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                <li>Application fee: €100–200</li>
                <li>Living expenses: €800–1,200/month</li>
                <li>Books & materials: €500–800/year</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">🌐 Admission Requirements</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                <li>Bachelor's degree (any field)</li>
                <li>GMAT/GRE scores</li>
                <li>English proficiency (TOEFL/IELTS)</li>
                <li>Personal statement</li>
                <li>2–3 recommendation letters</li>
                <li>Work experience (preferred)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">📞 Contact Information</h2>
              <div className="text-sm text-gray-700 space-y-1">
                {selectedSchool?.id === 'neoma-rouen' && (
                  <>
                    <p>
                      <span className="font-medium">📧</span>{' '}
                      <a href="mailto:international.admissions@neoma-bs.fr" className="underline text-blue-600">
                        international.admissions@neoma-bs.fr
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">📱</span>{' '}
                      <a href="tel:+33344633300" className="underline text-blue-600">
                        +33 3 44 63 33 00
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">🌐</span>{' '}
                      <a
                        href="https://www.neoma-bs.com/en/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600"
                      >
                        www.neoma-bs.com/en/
                      </a>
                    </p>
                  </>
                )}
                {selectedSchool?.website && selectedSchool?.id !== 'neoma-rouen' && (
                  <>
                    <p>
                      <span className="font-medium">📧</span>{' '}
                      admissions@{selectedSchool.website.replace(/https?:\/\/(www\.)?/, '').replace(/\/.*/, '')}
                    </p>
                    <p>
                      <span className="font-medium">📱</span> +33 1 XX XX XX XX
                    </p>
                    <p>
                      <span className="font-medium">🌐</span>{' '}
                      <a
                        href={selectedSchool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600"
                      >
                        {selectedSchool.website.replace(/https?:\/\//, '')}
                      </a>
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">📌 Application Deadlines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-blue-800">Fall Intake</h3>
                <p className="text-sm text-gray-700">September 2025</p>
                <p className="text-xs text-gray-500">Deadline: March 15, 2025</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-green-800">Spring Intake</h3>
                <p className="text-sm text-gray-700">January 2026</p>
                <p className="text-xs text-gray-500">Deadline: October 15, 2025</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-purple-800">Summer Intake</h3>
                <p className="text-sm text-gray-700">June 2025</p>
                <p className="text-xs text-gray-500">Deadline: January 15, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">🏫 {cityData.name} - School & Local Insights</h1>
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
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Local Insights for {cityData.name}</h2>
              </div>
              <Button onClick={() => setShowInsights(true)} variant="outline">
                View All Tips
              </Button>
            </div>
            <p className="text-gray-600 mb-4">Get insider knowledge about living and studying in {cityData.name}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cityData.localInsights.map((insight, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-gray-500">No schools found for selected filters.</div>
          ) : filteredSchools.map((school, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow" onClick={() => setSelectedSchool(school)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{school.name}</CardTitle>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {school.location}
                    </div>
                  </div>
                  <div>
                    {school.website && (
                      <a href={school.website} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-700" onClick={e => e.stopPropagation()}>
                        <svg className="inline w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h8m0 0v8m0-8l-8 8" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{school.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">{school.tuition || 'Contact for details'}</span>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium">Programs:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {school.programs.map((program, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Local Insights Modal */}
        <Dialog open={showInsights} onOpenChange={setShowInsights}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Local Insights for {cityData.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {cityData.localInsights.map((insight, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <p className="text-gray-600 mb-4">{insight.description}</p>
                    <ul className="space-y-2">
                      {insight.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
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
          <div className="col-span-3 text-center py-8 text-gray-500">No schools found for selected filters.</div>
        ) : citiesFiltered.map(({ cityKey, city, schools }) => (
          <Card key={cityKey} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedCity(cityKey)}>
            <CardHeader>
              <CardTitle className="text-lg">{city.name} {city.emoji}</CardTitle>
              <p className="text-sm text-gray-600">{city.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{schools.length} Schools</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Local Tips</span>
                </div>
                <Button size="sm">Explore</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
