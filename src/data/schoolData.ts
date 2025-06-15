export interface School {
  id: string;
  name: string;
  city: string;
  description: string;
  levels: string[];
  subjects: string[];
  website: string;
}

export const schools = [
  {
    id: "escp-business-school",
    name: "ESCP Business School",
    city: "Paris",
    description:
      "Oldest business school in the world, multi-campus (Paris, London, Berlin, Madrid, Turin, Warsaw).",
    levels: ["Bachelor", "Master", "MBA", "PhD", "Executive Education"],
    subjects: ["Business", "Management", "Finance", "Marketing"],
    website: "https://www.escp.eu/",
  },
  {
    id: "hec-paris",
    name: "HEC Paris",
    city: "Paris",
    description: "Top global business school.",
    levels: ["Grande École – MiM", "MBA", "Executive MBA", "Trium EMBA", "MSc (various)", "PhD"],
    subjects: ["Business", "Management", "Finance", "Economics"],
    website: "https://www.hec.edu/",
  },
  {
    id: "insead",
    name: "INSEAD",
    city: "Fontainebleau",
    description:
      "Leading international business school with campuses in Europe, Asia, and the Middle East.",
    levels: ["MBA", "Executive MBA", "Master in Finance", "PhD"],
    subjects: ["Business", "Management", "Finance", "Strategy"],
    website: "https://www.insead.edu/",
  },
  {
    id: "emlyon-business-school",
    name: "emlyon business school",
    city: "Lyon",
    description:
      "European business school focused on entrepreneurship and international management.",
    levels: ["Bachelor", "Master", "MBA", "Executive MBA", "PhD"],
    subjects: ["Business", "Management", "Marketing", "Finance"],
    website: "https://www.em-lyon.com/",
  },
  {
    id: "essec-business-school",
    name: "ESSEC Business School",
    city: "Cergy",
    description:
      "French business school known for its Master in Management program and strong corporate connections.",
    levels: ["Bachelor", "Master", "MBA", "PhD", "Executive Education"],
    subjects: ["Business", "Management", "Finance", "Marketing"],
    website: "https://www.essec.edu/",
  },
  {
    id: "edhec-business-school",
    name: "EDHEC Business School",
    city: "Lille",
    description:
      "French business school specializing in finance and business innovation.",
    levels: ["Bachelor", "Master", "MBA", "PhD", "Executive Education"],
    subjects: ["Finance", "Business", "Management", "Marketing"],
    website: "https://www.edhec.edu/",
  },
  {
    id: "skema-business-school",
    name: "SKEMA Business School",
    city: "Lille",
    description:
      "Global business school with campuses in France, China, and the US.",
    levels: ["Bachelor", "Master", "MBA", "PhD", "Executive Education"],
    subjects: ["Business", "Management", "Finance", "Marketing"],
    website: "https://www.skema.edu/",
  },
  {
    id: "audencia-business-school",
    name: "Audencia Business School",
    city: "Nantes",
    description:
      "French business school focused on responsible management and innovation.",
    levels: ["Bachelor", "Master", "MBA", "Executive MBA", "PhD"],
    subjects: ["Business", "Management", "Finance", "Marketing"],
    website: "https://www.audencia.com/",
  },
  {
    id: "neoma-business-school",
    name: "NEOMA Business School",
    city: "Reims",
    description:
      "French business school resulting from the merger of Reims Management School and Rouen Business School.",
    levels: ["Bachelor", "Master", "MBA", "Executive MBA", "PhD"],
    subjects: ["Business", "Management", "Finance", "Marketing"],
    website: "https://www.neoma-bs.com/",
  },
  {
    id: "kedge-business-school",
    name: "KEDGE Business School",
    city: "Marseille",
    description:
      "French business school created by the merger of two leading French business schools: Bordeaux Business School and Euromed Management.",
    levels: ["Bachelor", "Master", "MBA", "Executive MBA", "PhD"],
    subjects: ["Business", "Management", "Finance", "Marketing"],
    website: "https://www.kedge.edu/",
  },
  {
    id: "sciences-po-paris",
    name: "Sciences Po Paris",
    city: "Paris",
    description:
      "Political science, international affairs. Highly selective Bachelor’s & Master’s programs; Paris and international campuses.",
    levels: ["Bachelor’s (College Universitaire)", "Master’s (multiple schools)", "One-Year Master’s", "PhD"],
    subjects: ["Political Science", "International Affairs", "Economics", "Law", "Sociology"],
    website: "https://www.sciencespo.fr/",
  },
  {
    id: "paris-dauphine-university",
    name: "Paris Dauphine University",
    city: "Paris",
    description:
      "Public research university specializing in management, finance, law, and political science.",
    levels: ["Bachelor", "Master", "PhD"],
    subjects: ["Economics", "Finance", "Management", "Law", "Political Science"],
    website: "https://www.dauphine.fr/",
  },
  {
    id: "sorbonne-university",
    name: "Sorbonne University",
    city: "Paris",
    description:
      "One of the most prestigious universities in France, offering a wide range of disciplines.",
    levels: ["Bachelor", "Master", "PhD"],
    subjects: ["Humanities", "Sciences", "Medicine"],
    website: "https://www.sorbonne-universite.fr/",
  },
  {
    id: "universite-paris-saclay",
    name: "Université Paris-Saclay",
    city: "Paris-Saclay",
    description:
      "Research-intensive university focused on science and technology, located in the Paris-Saclay area.",
    levels: ["Bachelor", "Master", "PhD"],
    subjects: ["Sciences", "Engineering", "Mathematics", "Physics"],
    website: "https://www.universite-paris-saclay.fr/",
  },
];
