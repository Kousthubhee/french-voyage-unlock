
export type FrenchIntegrationCategory = 'social' | 'food' | 'practical' | 'news';

export interface ModuleContent {
  title: string;
  icon?: React.ReactNode;
  preview: string;
  details: React.ReactNode;
}

export const frenchIntegrationCategories: {
  [K in FrenchIntegrationCategory]: { label: string; modules: ModuleContent[] }
} = {
  social: {
    label: 'Social Integration',
    modules: [
      {
        title: "🗣️ Language & Communication",
        preview: "Survival French, communication scenarios, gestures.",
        details: (
          <div>
            <b>Daily French Phrases</b>
            <ul className="list-disc pl-6">
              <li><b>Bonjour</b> (Good morning/afternoon)</li>
              <li><b>Bonsoir</b> (Good evening)</li>
              <li><b>Salut</b> (Hi/Bye, informal)</li>
            </ul>
            <b className="block mt-3">Emergencies</b>
            <ul className="list-disc pl-6">
              <li><b>Aidez-moi !</b> (Help me!)</li>
              <li><b>Appelez une ambulance !</b> (Call an ambulance!)</li>
              <li>...and more</li>
            </ul>
            {/* ...abbreviated, more content as in your data */}
          </div>
        ),
      },
      {
        title: "🤝 Cultural Etiquette",
        preview: "Social & dining norms, tips for greetings and public settings.",
        details: (
          <div>
            <b>Social Norms</b>
            <ul className="list-disc pl-6">
              <li>Arrive on time for meetings</li>
              <li>Personal space: arm's length</li>
              <li>Directness is common</li>
            </ul>
            {/* ...more as per your list */}
          </div>
        ),
      },
      {
        title: "🎉 Festivals & Events",
        preview: "French holidays and ways to join social life/events.",
        details: (
          <div>
            <b>Public Holidays (2025)</b>
            <ul className="list-disc pl-6">
              <li>New Year’s Day (Jan 1)</li>
              <li>Bastille Day (Jul 14)</li>
              <li>Christmas (Dec 25)</li>
              {/* ...and more */}
            </ul>
            {/* ...more content if needed */}
          </div>
        ),
      },
    ],
  },
  food: {
    label: 'Food & Groceries',
    modules: [
      {
        title: "🍽️ French Eating Habits",
        preview: "Meal times, eating out, French portion sizes.",
        details: (
          <div>
            <ul className="list-disc pl-6">
              <li>Lunch at 12–2 PM, dinner at 7–9 PM</li>
              <li>Cold food common</li>
              <li>Multiple courses, smaller portions</li>
            </ul>
          </div>
        ),
      },
      {
        title: "🔖 Dietary Needs & Shopping",
        preview: "How to find vegetarian, halal & allergy-friendly food.",
        details: (
          <div>
            <ul className="list-disc pl-6">
              <li>"végétarien" for veggie food</li>
              <li>"halal" labeled clearly</li>
              <li>"sans porc" = without pork</li>
            </ul>
          </div>
        ),
      },
      // ...add more as needed from original data
    ],
  },
  practical: {
    label: 'Practical Living',
    modules: [
      {
        title: "🏠 Student Life Integration",
        preview: "Housing rules, etiquette, recycling and neighbor tips.",
        details: (
          <div>
            <b>Noise Limits</b>
            <ul><li>Quiet hours: 10pm-7am/8am</li></ul>
            <b>Recycling Rules</b>
            <ul><li>Yellow: plastic/metal, Blue: paper, Green: glass</li></ul>
            <b>Greeting Neighbors</b>
            <ul><li>Introduce yourself on moving in</li></ul>
          </div>
        ),
      },
      {
        title: "📄 Bureaucracy Made Simple",
        preview: "Polite phrases + templates for French administration.",
        details: (
          <div>
            <b>Polite Phrases</b>
            <ul className="list-disc pl-6">
              <li>Bonjour, je suis ici pour...</li>
              <li>Pourriez-vous m’aider ?</li>
            </ul>
            <b>Template Email</b>
            <pre>Subject: Suivi de ma demande{"\n"}Bonjour Madame/Monsieur, ...</pre>
          </div>
        ),
      },
      {
        title: "🧠 Mental Health & Adjustment",
        preview: "Tips, support groups, and mindfulness resources.",
        details: (
          <div>
            <ul className="list-disc pl-6">
              <li>Keep a routine</li>
              <li>Connect with international students</li>
              <li>Apps: Headspace, YouTube, local yoga</li>
            </ul>
          </div>
        ),
      },
      // ...add more as needed for practical section
    ],
  },
  news: {
    label: 'News & Media',
    modules: [
      {
        title: "📰 French News Sources",
        preview: "Where to find French news for students.",
        details: (
          <div>
            <ul className="list-disc pl-6">
              <li>Le Petit Journal (simple French news)</li>
              <li>Piece of French (YouTube)</li>
              <li>Coffee Break French (podcast)</li>
              <li>Duolingo French Podcast</li>
            </ul>
          </div>
        ),
      },
      // ...add more as needed for news/media
    ],
  },
};
