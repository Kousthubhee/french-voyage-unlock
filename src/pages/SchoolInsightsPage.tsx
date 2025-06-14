import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, MapPin, Users, BookOpen, Star, Info, Building2 } from 'lucide-react';

interface School {
  id: string;
  name: string;
  description: string;
  location: string;
  ranking?: string;
  tuition?: string;
  programs: string[];
  website?: string;
}

interface LocalInsight {
  title: string;
  description: string;
  tips: string[];
}

interface City {
  name: string;
  description: string;
  emoji: string;
  schools: School[];
  localInsights: LocalInsight[];
}

interface SchoolInsightsPageProps {
  onBack: () => void;
}

export const SchoolInsightsPage = ({ onBack }: SchoolInsightsPageProps) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  const cities: Record<string, City> = {
    paris: {
      name: 'Paris',
      description: 'Capital city with top-tier schools in all domains',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'sorbonne',
          name: 'Sorbonne University',
          description: 'A historic university leading in humanities and sciences.',
          location: 'Paris',
          programs: ['Humanities', 'Sciences', 'Medicine', 'Law'],
          website: 'https://www.sorbonne-universite.fr/',
        },
        {
          id: 'hec-paris',
          name: 'HEC Paris',
          description: 'World-class business school, globally top-ranked for management.',
          location: 'Jouy-en-Josas',
          programs: ['Grande École', 'MBA', 'MSc', 'Summer School'],
          website: 'https://www.hec.edu/',
        },
        {
          id: 'polytechnique',
          name: 'École Polytechnique',
          description: 'Elite engineering school with strong science and research reputation.',
          location: 'Palaiseau (Paris area)',
          programs: ['Engineering', 'Masters', 'PhD', 'Bachelor'],
          website: 'https://www.polytechnique.edu/',
        },
        {
          id: 'sciencespo-paris',
          name: 'Sciences Po Paris',
          description: 'France’s leading university for political/social sciences and public affairs.',
          location: 'Paris',
          programs: ['BA', 'Master Public Policy', 'PhD', 'International Programs'],
          website: 'https://www.sciencespo.fr/en/',
        },
        {
          id: 'psl',
          name: 'PSL University',
          description: 'Interdisciplinary Paris university, home to ENS, Dauphine, Mines ParisTech.',
          location: 'Paris',
          programs: ['Science', 'Economics', 'Arts', 'Engineering'],
          website: 'https://www.psl.eu/en',
        },
        // ... Add more real schools as desired ...
      ],
      // ... keep existing localInsights as is ...
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Paris efficiently with metro, buses, bikes, and intercity options",
          tips: [
            "Get a Navigo card (€350/year student pass) via the Île-de-France Mobilités app for unlimited Métro, bus, and tram travel",
            "Use Vélib’ bikes through the Vélib’ Métropole app for short trips",
            "FlixBus connects to Lyon, Toulouse, and more from Paris-Bercy Seine—book via the FlixBus app (from €5)",
            "SNCF TGV trains to other cities (e.g., Lyon in 2 hours) via SNCF Connect app"
          ]
        },
        {
          title: "Student Life & Culture",
          description: "Paris blends historic charm with a vibrant student scene",
          tips: [
            "Hang out in the Latin Quarter for cheap eats like falafel (€6-8) at Rue Mouffetard",
            "Join student associations (BDE) at your school for networking",
            "Visit museums like the Louvre for free if you're an EU student under 26",
            "Attend Fête de la Musique (June 21) for free concerts across the city"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation in the city",
          tips: [
            "Book badminton courts at Gymnase Rosa Parks via Anybuddy",
            "Informal cricket games at Bois de Vincennes with expat groups—football is more common",
            "Relax or study at Parc des Buttes-Chaumont with scenic views",
            "Explore must-visit spots like the Eiffel Tower, Notre-Dame, and Sacré-Cœur"
          ]
        }
      ]
    },
    lyon: {
      name: 'Lyon',
      description: 'Hub of engineering, medicine, and business',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'centrale-lyon',
          name: 'École Centrale de Lyon',
          description: 'One of France’s oldest and most prestigious engineering schools.',
          location: 'Lyon',
          programs: ['Engineering', 'Masters', 'PhD'],
          website: 'https://www.ec-lyon.fr/',
        },
        {
          id: 'em-lyon',
          name: 'emlyon business school',
          description: 'Leading business school recognized for entrepreneurship and management.',
          location: 'Lyon',
          programs: ['BBA', 'Grande École', 'MBA', 'MSc'],
          website: 'https://www.em-lyon.com/',
        },
        {
          id: 'insa-lyon',
          name: 'INSA Lyon',
          description: 'Top engineering institute known for research-intensive programs.',
          location: 'Lyon',
          programs: ['Engineering', 'Master', 'PhD'],
          website: 'https://www.insa-lyon.fr/en/',
        },
        // ... More real schools ...
      ],
      // ... keep existing localInsights as is ...
      localInsights: [
        {
          title: "Transportation",
          description: "Efficient public transport system in Lyon",
          tips: [
            "TCL card (€35/month student pass) via TCL Compte Mobilité app covers metro, tram, and bus",
            "Velo’v bike rentals through the Velo’v app—great for Presqu’île",
            "FlixBus from Lyon Perrache to Paris, Toulouse, etc. (from €15) via FlixBus app",
            "SNCF TGV to Paris in 2 hours—book via SNCF Connect app"
          ]
        },
        {
          title: "Food & Culture",
          description: "Lyon is the gastronomic capital of France",
          tips: [
            "Try Lyonnaise cuisine at bouchons like Le Café des Fédérations (€15 with student discounts)",
            "Visit Les Halles de Lyon food market for local flavors",
            "Attend Fête des Lumières (December 5-8)—volunteer for free access",
            "Hang out at Les Berges du Rhône for cheap drinks and picnics"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Explore parks and sports facilities in Lyon",
          tips: [
            "Book badminton courts at Gymnase Bellecombe via Anybuddy",
            "Parc de la Tête d’Or for informal cricket with expat groups, or rugby",
            "Relax at Parc de la Tête d’Or—enjoy fields, a lake, and a free zoo",
            "Must-visit: Vieux Lyon, Basilique Notre-Dame de Fourvière"
          ]
        }
      ]
    },
    toulouse: {
      name: 'Toulouse',
      description: 'Leading aerospace and tech education hub',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'supaero',
          name: 'ISAE-SUPAERO',
          description: 'The world’s reference in aerospace higher education.',
          location: 'Toulouse',
          programs: ['Engineering', 'Masters', 'PhD'],
          website: 'https://www.isae-supaero.fr/en/',
        },
        {
          id: 'tbs',
          name: 'TBS Education',
          description: 'A top business school with campuses in Toulouse and worldwide.',
          location: 'Toulouse',
          programs: ['Bachelor', 'Grande École', 'MSc', 'MBA'],
          website: 'https://www.tbs-education.com/',
        },
        // ... More real schools ...
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Get around Toulouse with ease",
          tips: [
            "Tisséo metro, trams, and buses (€15/month student pass) via Tisséo Collectivités app",
            "VélôToulouse bikes through the VélôToulouse app—perfect for flat terrain",
            "FlixBus to Bordeaux, Paris, etc. (from €9) via FlixBus app",
            "SNCF TGV to Paris in 4 hours via SNCF Connect app"
          ]
        },
        {
          title: "Aerospace & Lifestyle",
          description: "Toulouse is a hub for aerospace with a sunny vibe",
          tips: [
            "Visit Cité de l’Espace for aerospace inspiration",
            "Network with Airbus professionals for internships",
            "Enjoy Toulouse Plages (July-August) for free riverbank events",
            "Hang out at Place Saint-Pierre for €2 beers at Le Saint des Seins"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Saint-Sernin via Anybuddy",
            "Prairie des Filtres for informal cricket with expat groups—football is more common",
            "Relax at Jardin des Plantes with open spaces",
            "Must-visit: Basilique de Saint-Sernin, Place du Capitole"
          ]
        }
      ]
    },
    rouen: {
      name: 'Rouen',
      description: 'Historic city with modern business and tech schools',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'neoma-rouen',
          name: 'NEOMA Business School (Main campus)',
          description:
            "NEOMA is a top-tier French business school accredited by EQUIS, AACSB, and AMBA, offering a diverse and global curriculum with strong corporate and international ties.",
          location: 'Rouen',
          programs: [
            'Programme Grande École (Master in Management, PGE)',
            'Global BBA',
            'MSc International Project Development',
            'MSc Finance',
            'MSc Marketing French Excellence',
            'TEMA (Digital Transformation Undergraduate)',
            'Executive MBA',
            'Doctorate in Business Administration (DBA)',
            'International Bachelor in Business Administration',
          ],
          website: 'https://www.neoma-bs.com/en/',
        },
        {
          id: 'insa-rouen',
          name: 'INSA Rouen Normandie',
          description:
            "A respected engineering school delivering multidisciplinary training and research in fields such as chemical and process engineering, civil engineering, mechanical, computer science, and more.",
          location: 'Rouen',
          programs: [
            'Chemical and Process Engineering',
            'Civil Engineering',
            'Computer Science Engineering',
            'Electrical Engineering',
            'Instrumentation & Measurements',
            'Mathematics Engineering',
            'Mechanical Engineering',
            'Data Science',
            'Cybersecurity',
            'Automotive Engineering (MSc Track)',
          ],
          website: 'https://www.insa-rouen.fr/en/',
        },
        {
          id: 'rouen-univ',
          name: 'Université de Rouen Normandie',
          description:
            "One of Normandy’s key public universities, spanning humanities, science, engineering, health, law, and management, with strong research links.",
          location: 'Rouen',
          programs: [
            'Bachelor of Law',
            'Bachelor of Science',
            'Bachelor of Arts and Humanities',
            'Bachelor of Medicine',
            'Master in Chemistry',
            'Master in Economics and Management',
            'Master in Health Sciences',
            'Master in Computer Science'
          ],
          website: 'https://www.univ-rouen.fr/',
        },
        {
          id: 'esigelec',
          name: 'ESIGELEC Rouen',
          description:
            "A highly regarded engineering institute specialized in electronics, embedded systems, robotics, and digital technologies, with strong employability.",
          location: 'Rouen, Saint-Étienne-du-Rouvray',
          programs: [
            'Diplôme d\'Ingénieur (Master level)',
            'MSc in Embedded Systems',
            'MSc in Big Data',
            'MSc in Systems Modelling',
            'Advanced Master in Artificial Intelligence and Robotics',
            'Bachelor in Electronics Engineering',
          ],
          website: 'https://www.esigelec.fr/en',
        }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Rouen with ease",
          tips: [
            "Astuce network (€30/month student pass) via My Astuce app for TEOR buses, trams, and Calypso shuttle",
            "Lovélo bike rentals through the Lovélo app",
            "FlixBus to Paris, Lyon, etc. (from €7) via FlixBus app from 33 Avenue Champlain",
            "SNCF trains to Paris in 1 hour via SNCF Connect app"
          ]
        },
        {
          title: "Culture & Events",
          description: "Experience Rouen's rich history and events",
          tips: [
            "Attend Jeanne d'Arc Festival (May 31, 2025) for parades and markets",
            "Explore the medieval old town—Rue du Gros-Horloge has €7-10 crêperies",
            "Le Marignan bar near the cathedral offers €3 drinks on Thursdays",
            "Visit Cathédrale Notre-Dame and Jeanne d'Arc Tower"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Saint-Exupéry via local clubs",
            "Jardins de l'Hôtel de Ville for informal cricket with expat groups—rugby is more popular",
            "Relax at Parc de Grammont with trails",
            "Must-visit: Musée des Beaux-Arts for cultural outings"
          ]
        }
      ]
    },
    reims: {
      name: 'Reims',
      description: 'Business and international affairs education hub',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'neoma-reims',
          name: 'NEOMA Business School (Reims)',
          description:
            "NEOMA’s Reims campus is known for international exposure and business curriculum, with double-degree options and a wide portfolio of Masters.",
          location: 'Reims',
          programs: [
            'Programme Grande École (Master in Management, PGE)',
            'MBA (Full-Time, Executive, Global EMBA)',
            'MSc in International Marketing & Brand Management',
            'MSc Corporate Finance',
            'MSc Supply Chain Management',
            'Global BBA',
            'Advanced Master in Marketing & Data Analytics',
            'MSc Digital Expertise for Marketing',
          ],
          website: 'https://www.neoma-bs.com/en/',
        },
        {
          id: 'sciencespo-reims',
          name: 'Sciences Po Campus Reims',
          description:
            "The Reims campus of Sciences Po is internationally ranked, hosting undergraduate programs in the Europe-North America and Europe-Africa tracks and a core part of the global Sciences Po network.",
          location: 'Reims',
          programs: [
            'Europe-North America Program',
            'Europe-Africa Program',
            'Undergraduate Exchange semesters',
            'Global Affairs specializations',
          ],
          website: 'https://www.sciencespo.fr/en/campus-reims/',
        },
        {
          id: 'reims-univ',
          name: 'Université de Reims Champagne-Ardenne',
          description:
            "A major regional public university with strengths in science, medicine, law, humanities, and technology, serving over 25,000 students.",
          location: 'Reims',
          programs: [
            'Bachelor of Law',
            'Bachelor of Science and Technology',
            'Master of Economics',
            'Master in Business and Law',
            'Master of Medicine',
            'Engineering (ESIEC and ESIR)',
            'Bachelor of Humanities'
          ],
          website: 'https://www.univ-reims.fr/',
        },
        {
          id: 'esiec',
          name: 'ESIEC Reims',
          description:
            "ESIEC is the engineering faculty of Reims University, with a focus on packaging, digital systems, and process engineering.",
          location: 'Reims',
          programs: [
            'Packaging Engineering',
            'Digital Systems Engineering',
            'Environmental Engineering',
            'Bachelor of Packaging',
            'Master of Electronics, Energy, and Automation'
          ],
          website: 'https://www.univ-reims.fr/esiec/menu-principal-esiec/',
        }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Get around Reims efficiently",
          tips: [
            "Citura buses and trams (€25/month student pass) via Citura app",
            "Walk or bike—Reims is compact",
            "FlixBus to Paris, Lyon, etc. (from €7) via FlixBus app",
            "SNCF TGV to Paris in 45 minutes via SNCF Connect app"
          ]
        },
        {
          title: "Champagne Culture",
          description: "Immerse in the heart of the Champagne region",
          tips: [
            "Visit champagne houses like Pommery for student tours (€10-15)",
            "Attend Jeanne d'Arc Festival (May 31, 2025) for parades",
            "Enjoy €10 meals at Place Drouet-d'Erlon brasseries",
            "Must-visit: Cathédrale Notre-Dame de Reims, Palais du Tau"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Thiolettes via university",
            "Parc de Champagne for informal cricket with expat groups",
            "Relax at Parc de la Patte d'Oie with green spaces",
            "Watch Stade de Reims matches—student tickets from €10"
          ]
        }
      ]
    },
    lille: {
      name: 'Lille',
      description: 'Northern hub for business and engineering education',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'lille-univ',
          name: 'Université de Lille',
          description:
            "One of France's largest multidisciplinary public universities, serving over 70,000 students with robust offerings in humanities, science, medicine, and engineering.",
          location: 'Lille',
          programs: [
            'Bachelor of Science and Technology',
            'Bachelor in Economics & Management',
            'Bachelor in Medicine',
            'Master in Law',
            'Master in History',
            'Master in Physics',
            'Master in Computer Science',
            'Bachelor of Humanities'
          ],
          website: 'https://www.univ-lille.fr/',
        },
        {
          id: 'edhec-lille',
          name: 'EDHEC Business School',
          description:
            "Globally ranked, EDHEC offers top business, finance, and management degrees, with a focus on innovation and employability.",
          location: 'Lille',
          programs: [
            'Global BBA',
            'Master in Management (Grande École)',
            'MSc in Finance',
            'MSc in Data Analytics & Artificial Intelligence',
            'MSc in Marketing Management',
            'Global MBA',
            'PhD in Finance'
          ],
          website: 'https://www.edhec.edu/en',
        },
        {
          id: 'centrale-lille',
          name: 'École Centrale de Lille',
          description:
            "An elite engineering grande école, Centrale Lille offers high-level training in general and digital engineering, with top research centers.",
          location: 'Lille',
          programs: [
            'Diplôme d\'Ingénieur (Master level)',
            'MSc in Engineering',
            'PhD in Applied Sciences',
            'Master in Data Science & Engineering',
            'General Engineering',
            'Bachelor in Engineering Basics'
          ],
          website: 'https://www.centralelille.fr/',
        },
        {
          id: 'ieseg',
          name: 'IESEG School of Management',
          description:
            "AACSB, EQUIS, and AMBA accredited, IESEG offers English-taught business programs, Grande École, MSc, and Bachelor in International Business.",
          location: 'Lille',
          programs: [
            'Programme Grande École (Master in Management)',
            'Bachelor in International Business',
            'MSc International Business',
            'MSc Financial Tech & Data Science',
            'MSc in Digital Marketing & CRM'
          ],
          website: 'https://www.ieseg.fr/en/',
        },
        {
          id: 'hei',
          name: 'HEI – Hautes Études d\'Ingénieur',
          description:
            "HEI Lille is part of the Yncréa Hauts-de-France group, offering undergraduate and graduate degrees in engineering with modern infrastructure.",
          location: 'Lille',
          programs: [
            '5-year Engineering Master (Diplôme d\'Ingénieur)',
            'Bachelor in Engineering',
            'Master in Civil Engineering',
            'Master in Digital Systems',
            'Executive Engineering programs'
          ],
          website: 'https://www.hei.fr/',
        }        
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Lille and beyond",
          tips: [
            "Transpole metro, trams, and buses (€35/month student pass) via Transpole app",
            "V’Lille bikes through the V’Lille app",
            "FlixBus to Paris, Lyon, etc. (from €7) via FlixBus app from Gare Lille Europe",
            "SNCF TGV to Paris in 1 hour via SNCF Connect app"
          ]
        },
        {
          title: "Culture & Events",
          description: "Experience Lille’s youthful vibe",
          tips: [
            "Visit Braderie de Lille (first weekend of September) for flea markets and music",
            "Enjoy €5-7 kebabs on Rue de Gand",
            "Le Macumba bar in Wazemmes has €2 drink nights",
            "Must-visit: Vieux-Lille, Palais des Beaux-Arts"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase des Bois Blancs via Anybuddy",
            "Parc de la Citadelle for informal cricket with expat groups",
            "Relax at Parc de la Citadelle with trails and a zoo",
            "Explore Lille Cathedral for a cultural outing"
          ]
        }
      ]
    },
    strasbourg: {
      name: 'Strasbourg',
      description: 'Prestigious academic and international region',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'strasbourg-univ',
          name: 'Université de Strasbourg',
          description:
            "A historic, multidisciplinary public university with excellence in sciences, medicine, law, and humanities and a member of the LERU group.",
          location: 'Strasbourg',
          programs: [
            'Bachelor in Life Sciences',
            'Bachelor in Physics',
            'Bachelor of Medicine',
            'Master in European Politics',
            'Master in Chemistry',
            'Master in Law'
          ],
          website: 'https://www.unistra.fr/',
        },
        {
          id: 'insa-strasbourg',
          name: 'INSA Strasbourg',
          description:
            "Renowned STEM engineering school, part of the INSA group, with a unique program in architecture and engineering.",
          location: 'Strasbourg',
          programs: [
            'Architecture & Engineering Dual Degree',
            'Mechanical Engineering',
            'Electrical Engineering',
            'Photonics & Optoelectronics',
            'Civil Engineering',
            'Mechatronics',
            'Plastics Engineering'
          ],
          website: 'https://www.insa-strasbourg.fr/en/',
        },
        {
          id: 'em-strasbourg',
          name: 'EM Strasbourg Business School',
          description:
            "The business school of the University of Strasbourg, renowned for its focus on international and intercultural management.",
          location: 'Strasbourg',
          programs: [
            'Programme Grande École (Master in Management)',
            'Bachelor in International Business',
            'MBA in International & European Business',
            'MSc in Supply Chain Management',
            'MSc in International Leadership'
          ],
          website: 'https://www.em-strasbourg.com/en',
        },
        {
          id: 'sciencespo-strasbourg',
          name: 'Sciences Po Strasbourg',
          description:
            "A prestigious campus with specializations in law, international affairs, public administration and European studies in the heart of Strasbourg.",
          location: 'Strasbourg',
          programs: [
            'Public Administration',
            'European Studies',
            'International Relations',
            'Law and Society Specializations'
          ],
          website: 'https://sciencespo-strasbourg.fr/',
        }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Strasbourg and beyond",
          tips: [
            "CTS trams and buses (€30/month student pass) via CTS app",
            "Vélhop bikes through the Vélhop app",
            "FlixBus to Paris, Lyon, etc. (from €18) via FlixBus app",
            "SNCF TGV to Paris in 2 hours via SNCF Connect app"
          ]
        },
        {
          title: "Culture & Events",
          description: "Experience Strasbourg’s French-German mix",
          tips: [
            "Visit Strasbourg Christmas Market (late November-December) for mulled wine",
            "Enjoy tarte flambée at Au Brasseur for €8-10",
            "La Kulture bar near the cathedral hosts student events",
            "Must-visit: Cathédrale Notre-Dame, La Petite France"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase des Deux Rives via Anybuddy",
            "Parc de l’Orangerie for informal cricket with expat groups",
            "Relax at Parc de l’Orangerie with a lake and storks",
            "Visit European Parliament for a unique experience"
          ]
        }
      ]
    },
    bordeaux: {
      name: 'Bordeaux',
      description: 'Southwest academic powerhouse in sciences and business',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'bordeaux-univ',
          name: 'Université de Bordeaux',
          description:
            "A major center for research and academia in southwestern France, with focus on health, science, engineering, and law.",
          location: 'Bordeaux',
          programs: [
            'Bachelor in Science',
            'Bachelor in Law',
            'Bachelor in Medicine',
            'Bachelor in Humanities',
            'Master in Computer Science',
            'Master in Biotechnology',
            'Master in Physics'
          ],
          website: 'https://www.u-bordeaux.com/',
        },
        {
          id: 'kedge-bordeaux',
          name: 'KEDGE Business School',
          description:
            "Globally recognized business school, known for MSc in Wine & Spirits Management, Supply Chain, and MBA.",
          location: 'Bordeaux',
          programs: [
            'Grande École (PGE, Master in Management)',
            'Global MBA',
            'MSc in Wine & Spirits Management',
            'MSc in Supply Chain Management',
            'MSc in Sustainable Finance',
            'MSc in Business Engineering',
          ],
          website: 'https://kedge.edu/',
        },
        {
          id: 'enseirb',
          name: 'ENSEIRB-MATMECA',
          description:
            "A top French engineering school with specializations in computer science, electronics, mathematics, and mechanics.",
          location: 'Bordeaux',
          programs: [
            'Diplôme d’Ingénieur (Master level)',
            'MSc in Telecommunications and Electronics',
            'MSc in Computer Science',
            'MSc in Mathematics & Mechanics',
            'Engineering in Embedded Systems'
          ],
          website: 'https://www.enseirb-matmeca.fr/en/',
        },
        {
          id: 'sciencespo-bordeaux',
          name: 'Sciences Po Bordeaux',
          description:
            "Prestigious political science and public affairs school with strong international exchange programs.",
          location: 'Bordeaux',
          programs: [
            'Political Science',
            'International Relations',
            'Public Administration',
            'European Affairs',
            'Development Studies'
          ],
          website: 'https://www.sciencespobordeaux.fr/en/',
        },
        {
          id: 'inpbordeaux',
          name: 'INP Bordeaux',
          description:
            "An engineering group including ENSEIRB-MATMECA, ENSCBP, and more, offering interdisciplinary STEM degrees.",
          location: 'Bordeaux',
          programs: [
            'Biotechnology',
            'Chemical Engineering',
            'Mathematics',
            'Physics',
            'Environmental Engineering',
            'Process Engineering'
          ],
          website: 'https://www.bordeaux-inp.fr/en',
        }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Get around Bordeaux with ease",
          tips: [
            "TBM trams, buses, and boats (€30/month student pass) via TBM MyCiti app",
            "VCub bikes through the VCub app",
            "FlixBus to Toulouse, Paris, etc. (from €9) via FlixBus app",
            "SNCF TGV to Paris in 2 hours via SNCF Connect app"
          ]
        },
        {
          title: "Wine Culture",
          description: "Immerse in Bordeaux’s wine heritage",
          tips: [
            "Visit La Cité du Vin to learn about wine culture",
            "Attend Fête du Vin (June, next in 2026) for tastings",
            "Hang out at Darwin Ecosystem for cheap food trucks",
            "Must-visit: Place de la Bourse, Grosse Cloche"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Thiers via Anybuddy",
            "Parc Bordelais for informal cricket with expat groups",
            "Relax at Jardin Public with green spaces",
            "Explore €5 sandwiches on Rue Sainte-Catherine"
          ]
        }
      ]
    },
    nice: {
      name: 'Nice',
      description: 'Côte d’Azur region with business and engineering strengths',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'uca',
          name: 'Université Côte d\'Azur',
          description:
            "A large, multi-institution university on the French Riviera, noted for interdisciplinary innovation in science, tech, and arts.",
          location: 'Nice',
          programs: [
            'Bachelor in Computer Science',
            'Bachelor in Law & Business',
            'Bachelor in Life Sciences',
            'Master in Information Technology',
            'Master in Health Science',
            'Master in Environmental Science'
          ],
          website: 'https://univ-cotedazur.eu/',
        },
        {
          id: 'skema-nice',
          name: 'SKEMA Business School (Sophia)',
          description:
            "A global business school with top MScs, founded in France and globally ranked for its business and digital marketing programs.",
          location: 'Sophia Antipolis',
          programs: [
            'Global BBA',
            'MSc International Business',
            'MSc Artificial Intelligence for Business',
            'MSc Corporate Financial Management',
            'MSc Digital Marketing',
            'Master in Management (Grande École)'
          ],
          website: 'https://www.skema.edu/campus/sophia-antipolis-campus',
        },
        {
          id: 'polytech-nice',
          name: 'Polytech Nice Sophia',
          description:
            "Engineer's faculty within UCA, offering undergraduate, graduate, and PhD-level programs in engineering fields.",
          location: 'Nice',
          programs: [
            'Computer Science Engineering',
            'Biological Engineering',
            'Civil Engineering',
            'Telecommunication Engineering',
            'Masters in Quantum Engineering'
          ],
          website: 'https://polytech.univ-cotedazur.fr/',
        },
        {
          id: 'edhec-nice',
          name: 'EDHEC Business School (Nice)',
          description:
            "EDHEC's Nice campus specializes in finance, business management, global MBA, and summer schools with international recognition.",
          location: 'Nice',
          programs: [
            'MSc in Finance',
            'MSc in Data Analytics & Artificial Intelligence',
            'Global MBA',
            'BBA',
            'Business Management',
            'Summer School Programs'
          ],
          website: 'https://www.edhec.edu/en/nice-campus',
        },
        {
          id: 'mines-sophia',
          name: 'Mines Paris – Sophia',
          description:
            "A major engineering research and graduate campus focusing on AI, systems engineering, robotics, and computer science.",
          location: 'Sophia Antipolis',
          programs: [
            'AI Systems',
            'Software Engineering',
            'Robotics',
            'Embedded Systems',
            'MSc in Data Science'
          ],
          website: 'https://www.minesparis.psl.eu/accueil/mines-paris-sophia-antipolis',
        }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Nice with ease",
          tips: [
            "Lignes d’Azur trams and buses (€25/month student pass) via Lignes d’Azur app",
            "Vélo Bleu bikes through the Vélo Bleu app",
            "FlixBus to Marseille, Paris, etc. (from €9) via FlixBus app",
            "SNCF trains to Marseille in 2.5 hours via SNCF Connect app"
          ]
        },
        {
          title: "Mediterranean Lifestyle",
          description: "Study with a view of the Mediterranean",
          tips: [
            "Enjoy Carnaval de Nice (February) with parades",
            "Grab socca in Vieux Nice for €3-5",
            "Relax on public beaches—bring your own towel",
            "Must-visit: Promenade des Anglais, Castle Hill"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Gymnase Pasteur via Anybuddy",
            "Parc Estienne d’Orves for informal cricket with expat groups",
            "Relax at Promenade du Paillon with fountains",
            "Visit Vieux Nice for a cultural outing"
          ]
        }
      ]
    },
    marseille: {
      name: 'Marseille',
      description: 'Mediterranean port city with large academic presence',
      emoji: '🇫🇷',
      schools: [
        {
          id: 'amu',
          name: 'Aix-Marseille Université',
          description:
            "France’s largest public university, offering courses in law, medical sciences, science, and humanities over several campuses.",
          location: 'Marseille',
          programs: [
            'Bachelor of Medical Science',
            'Bachelor in Law',
            'Bachelor in Engineering',
            'Master in Economics',
            'Master in Health Sciences',
            'Master in Literature'
          ],
          website: 'https://www.univ-amu.fr/en',
        },
        {
          id: 'kedge-marseille',
          name: 'KEDGE Business School (Marseille)',
          description:
            "KEDGE's Marseille campus features top MBA, business management, supply chain, and wine management programs for global careers.",
          location: 'Marseille',
          programs: [
            'Grande École (PGE, Master in Management)',
            'MBA',
            'MSc Wine & Spirits Management',
            'MSc International Logistics',
            'MSc in Corporate Finance'
          ],
          website: 'https://kedge.edu/',
        },
        {
          id: 'centrale-marseille',
          name: 'École Centrale de Marseille',
          description:
            "A leading grande école for engineering, offering pluridisciplinary programs and strong research opportunities.",
          location: 'Marseille',
          programs: [
            'General Engineering (Diplôme d\'Ingénieur)',
            'MSc in Mathematics',
            'Master in Mechanics & Electronics',
            'Master in Computer Science'
          ],
          website: 'https://www.centrale-marseille.fr/',
        },
        {
          id: 'polytech-marseille',
          name: 'Polytech Marseille',
          description:
            "The engineering school of Aix-Marseille Université, delivering degrees in civil, mechanical, biological, and telecommunications engineering.",
          location: 'Marseille',
          programs: [
            'Civil Engineering',
            'Biological Engineering',
            'Mechanical Engineering',
            'Telecommunication Engineering',
            'Materials Engineering'
          ],
          website: 'https://polytech.univ-amu.fr/',
        }
      ],
      localInsights: [
        {
          title: "Transportation",
          description: "Navigate Marseille with ease",
          tips: [
            "RTM metro, trams, and buses (€30/month student pass) via RTM app",
            "Ferries to Frioul islands (€5) via RTM",
            "FlixBus to Nice, Paris, etc. (from €9) via FlixBus app from Saint Charles",
            "SNCF trains to Paris in 3 hours via SNCF Connect app"
          ]
        },
        {
          title: "Cultural Diversity",
          description: "Experience Marseille’s multicultural vibe",
          tips: [
            "Enjoy Fête de la Saint-Jean (June 23-24) with bonfires",
            "Grab panisses in Le Panier for €3-5",
            "Hang out at Cours Julien for cheap bars and live music",
            "Must-visit: Vieux-Port, Notre-Dame de la Garde, Calanques"
          ]
        },
        {
          title: "Recreation & Sports",
          description: "Find spots for sports and relaxation",
          tips: [
            "Book badminton courts at Palais Omnisports Marseille Grand-Est via Anybuddy",
            "Parc Borély for informal cricket with expat groups",
            "Relax at Parc Borély with fields and trails",
            "Explore the diverse food scene with North African flavors"
          ]
        }
      ]
    }
  };

  // SCHOOL CONTACT INFORMATION DISPLAY – UPDATE (card in school detail view)
  // Replace this block in the "Detailed School View" section:
  // <p><span className="font-medium">📧</span> admissions@{selectedSchool.id}.edu</p>
  // <p><span className="font-medium">📱</span> +33 1 XX XX XX XX</p>
  // <p><span className="font-medium">🌐</span> www.{selectedSchool.id}.edu</p>
  // With proper contact info where available

  // Find the school currently displayed
  const findSchoolById = (id: string | undefined): School | undefined => {
    if (!id) return undefined;
    for (const cityKey of Object.keys(cities)) {
      const city = cities[cityKey];
      const sch = city.schools.find((s) => s.id === id);
      if (sch) return sch;
    }
    return undefined;
  };

  // Detailed School View
  if (selectedSchool) {
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

  // City-Specific View with Schools and Local Insights
  if (selectedCity && cities[selectedCity]) {
    const cityData = cities[selectedCity];
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setSelectedCity(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">🏫 {cityData.name} - School & Local Insights</h1>
            <p className="text-lg text-gray-600">{cityData.description}</p>
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

        {/* Schools Section */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Schools in {cityData.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityData.schools.map((school, index) => (
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

  // City Selection View
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(cities).map(([cityKey, city]) => (
          <Card key={cityKey} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedCity(cityKey)}>
            <CardHeader>
              <CardTitle className="text-lg">{city.name} {city.emoji}</CardTitle>
              <p className="text-sm text-gray-600">{city.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{city.schools.length} Schools</span>
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
