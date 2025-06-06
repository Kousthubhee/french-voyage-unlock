
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, CreditCard, Shield, Home, FileText, Filter, ChefHat, Cloud, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PostArrivalPageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const PostArrivalPage = ({ onBack, onComplete, isCompleted }: PostArrivalPageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const cities = ['all', 'Paris', 'Lyon', 'Toulouse', 'Rouen', 'Reims', 'Lille', 'Strasbourg', 'Bordeaux', 'Nice', 'Marseille', 'Grenoble', 'Nantes', 'La Rochelle'];

  const cityData = {
    'Paris': {
      food: {
        available: "Diverse range including French, Italian, Asian, and Middle Eastern cuisines. Indian restaurants are plentiful in areas like La Chapelle.",
        supermarkets: "Carrefour, Monoprix, Franprix, Leclerc",
        indianItems: "Spices (turmeric, cumin), lentils, and basmati rice available at Indian stores like VT Cash & Carry. Bring specialty items like specific masalas or pickles if preferred.",
        mustBring: "Regional spices (e.g., garam masala), pressure cooker for quick dal/rice cooking"
      },
      weather: {
        climate: "Cold winters (0–7°C), mild summers (15–25°C), frequent rain",
        clothing: "Warm coat, waterproof boots, scarf, gloves for winter; light jackets and breathable fabrics for summer; umbrella or raincoat essential"
      },
      culture: {
        vibe: "Fast-paced, cosmopolitan, formal etiquette. Greet with \"bonjour\" before conversations",
        traditions: "Bastille Day (July 14), Paris Fashion Week, Christmas markets",
        tips: "Be punctual, respect personal space, learn basic French phrases for daily interactions"
      }
    },
    'Lyon': {
      food: {
        available: "Known for gastronomy; French, Italian, North African cuisines. Some Indian restaurants in Vieux Lyon.",
        supermarkets: "Carrefour, Super U, Casino",
        indianItems: "Basic spices and lentils at Asian markets like Bahadourian. Specialty snacks may be limited.",
        mustBring: "Homemade spice mixes, specific snacks like chakli or thepla"
      },
      weather: {
        climate: "Cold winters (0–5°C), hot summers (20–30°C), occasional rain",
        clothing: "Heavy winter coat, sweaters, waterproof shoes; light clothing for summer; umbrella recommended"
      },
      culture: {
        vibe: "Food-centric, friendly but reserved. Greetings are formal.",
        traditions: "Fête des Lumières (December), Lyon Film Festival",
        tips: "Engage in food culture, try local bouchons, use \"merci\" frequently"
      }
    },
    'Toulouse': {
      food: {
        available: "French, Spanish influences, limited Indian restaurants.",
        supermarkets: "Leclerc, Auchan, Intermarché",
        indianItems: "Basic spices at hypermarkets; Indian stores less common, so stock up in bigger cities.",
        mustBring: "Specialty spices, instant mixes for dosa/idli"
      },
      weather: {
        climate: "Mild winters (5–10°C), hot summers (25–35°C), less rain",
        clothing: "Light winter jacket, t-shirts, shorts for summer; sunglasses and hat for sun protection"
      },
      culture: {
        vibe: "Relaxed, student-friendly, vibrant nightlife.",
        traditions: "Violet Festival (February), rugby culture",
        tips: "Join student clubs, respect local pace, learn basic French for markets"
      }
    },
    'Rouen': {
      food: {
        available: "Traditional French, limited ethnic options.",
        supermarkets: "Carrefour, Monoprix",
        indianItems: "Basic spices at larger stores; Indian shops scarce, order online.",
        mustBring: "Key spices, small cooking tools like a tawa"
      },
      weather: {
        climate: "Cool, rainy winters (2–8°C), mild summers (15–22°C)",
        clothing: "Waterproof jacket, warm layers, sturdy shoes; umbrella essential"
      },
      culture: {
        vibe: "Historical, quieter, formal interactions.",
        traditions: "Joan of Arc Festival (May), Christmas markets",
        tips: "Respect historical sites, use polite greetings, visit local cathedrals"
      }
    },
    'Reims': {
      food: {
        available: "French cuisine, champagne-focused, few Indian options.",
        supermarkets: "Carrefour, Leclerc",
        indianItems: "Limited; basic spices at hypermarkets, order specialty items online.",
        mustBring: "Indian snacks, spice blends"
      },
      weather: {
        climate: "Cold winters (0–5°C), mild summers (15–25°C), rainy",
        clothing: "Heavy coat, scarf, waterproof boots; light layers for summer; umbrella needed"
      },
      culture: {
        vibe: "Elegant, champagne culture, reserved locals.",
        traditions: "Champagne festivals, Reims Cathedral events",
        tips: "Learn about champagne culture, use formal greetings, explore historical sites"
      }
    },
    'Lille': {
      food: {
        available: "French, Belgian influences, some Indian restaurants.",
        supermarkets: "Carrefour, Auchan, Match",
        indianItems: "Spices, lentils at ethnic stores in Wazemmes market.",
        mustBring: "Specific masalas, regional snacks"
      },
      weather: {
        climate: "Cold, wet winters (0–6°C), mild summers (15–22°C)",
        clothing: "Warm jacket, gloves, waterproof shoes; umbrella or raincoat critical"
      },
      culture: {
        vibe: "Friendly, student-heavy, multicultural.",
        traditions: "Braderie de Lille (September), Christmas markets",
        tips: "Engage in markets, learn basic French, respect queue etiquette"
      }
    },
    'Strasbourg': {
      food: {
        available: "French-German fusion, limited Indian options.",
        supermarkets: "Leclerc, Super U, Coop",
        indianItems: "Basic spices at larger stores; Indian shops rare.",
        mustBring: "Specialty spices, instant mixes"
      },
      weather: {
        climate: "Cold winters (-2–5°C), warm summers (18–28°C), frequent rain",
        clothing: "Heavy coat, scarf, boots for winter; light clothing for summer; umbrella essential"
      },
      culture: {
        vibe: "Multicultural, formal, European vibe.",
        traditions: "Christmas markets (December), European Parliament events",
        tips: "Learn about EU culture, use polite French/German greetings, visit Petite France"
      }
    },
    'Bordeaux': {
      food: {
        available: "French, wine-focused, some Asian cuisine.",
        supermarkets: "Carrefour, Leclerc, Intermarché",
        indianItems: "Basic spices at hypermarkets; Indian stores limited.",
        mustBring: "Regional spices, small cookware"
      },
      weather: {
        climate: "Mild winters (5–10°C), warm summers (20–30°C), rainy",
        clothing: "Light winter jacket, waterproof shoes; breathable fabrics for summer; umbrella needed"
      },
      culture: {
        vibe: "Relaxed, wine-centric, friendly.",
        traditions: "Bordeaux Wine Festival (June), local markets",
        tips: "Engage in wine culture, use \"bonjour,\" explore vineyards"
      }
    },
    'Nice': {
      food: {
        available: "Mediterranean, French, Italian influences, some Indian restaurants.",
        supermarkets: "Carrefour, Monoprix, Casino",
        indianItems: "Spices, lentils at ethnic stores in city center.",
        mustBring: "Specialty snacks, specific masalas"
      },
      weather: {
        climate: "Mild winters (8–14°C), hot summers (20–30°C), sunny",
        clothing: "Light jacket for winter, t-shirts, shorts for summer; sunglasses, hat for sun"
      },
      culture: {
        vibe: "Relaxed, tourist-friendly, Mediterranean vibe.",
        traditions: "Nice Carnival (February), Promenade des Anglais events",
        tips: "Learn basic French, respect beach etiquette, join local festivals"
      }
    },
    'Marseille': {
      food: {
        available: "Mediterranean, North African, some Indian options.",
        supermarkets: "Carrefour, Leclerc, Super U",
        indianItems: "Spices, lentils at ethnic markets in Noailles.",
        mustBring: "Regional snacks, spice blends"
      },
      weather: {
        climate: "Mild winters (5–12°C), hot summers (20–32°C), sunny",
        clothing: "Light jacket, breathable fabrics; sunglasses, hat for summer"
      },
      culture: {
        vibe: "Diverse, lively, port-city vibe.",
        traditions: "La Fête du Panier (June), bouillabaisse culture",
        tips: "Embrace diversity, learn basic French, explore markets"
      }
    },
    'Grenoble': {
      food: {
        available: "French, Alpine cuisine, limited Indian options.",
        supermarkets: "Carrefour, Casino",
        indianItems: "Basic spices at hypermarkets; Indian stores rare.",
        mustBring: "Specialty spices, instant mixes"
      },
      weather: {
        climate: "Cold winters (-2–5°C), warm summers (18–28°C), snowy in winter",
        clothing: "Heavy coat, thermal wear, snow boots; light clothing for summer"
      },
      culture: {
        vibe: "Academic, outdoor-focused, friendly.",
        traditions: "Grenoble Jazz Festival (March), mountain festivals",
        tips: "Join outdoor activities, use polite greetings, learn basic French"
      }
    },
    'Nantes': {
      food: {
        available: "French, seafood-heavy, limited Indian restaurants.",
        supermarkets: "Leclerc, Super U, Intermarché",
        indianItems: "Basic spices at larger stores; Indian shops scarce.",
        mustBring: "Specialty spices, snacks like murukku"
      },
      weather: {
        climate: "Mild winters (5–10°C), warm summers (18–25°C), rainy",
        clothing: "Waterproof jacket, warm layers; light clothing for summer; umbrella essential"
      },
      culture: {
        vibe: "Creative, student-friendly, maritime heritage.",
        traditions: "Les Machines de l'Île events, La Folle Journée (February)",
        tips: "Engage in art scene, use \"bonjour,\" explore local history"
      }
    },
    'La Rochelle': {
      food: {
        available: "Seafood, French cuisine, very few Indian options.",
        supermarkets: "Carrefour, Leclerc",
        indianItems: "Limited; basic spices at hypermarkets, order online.",
        mustBring: "Key spices, small cookware like a pressure cooker"
      },
      weather: {
        climate: "Mild winters (5–12°C), warm summers (20–28°C), windy",
        clothing: "Light jacket, windproof clothing; breathable fabrics for summer; umbrella for rain"
      },
      culture: {
        vibe: "Coastal, relaxed, student-friendly.",
        traditions: "Francofolies Festival (July), maritime events",
        tips: "Learn basic French, respect beach culture, join local festivals"
      }
    }
  };

  const urgentTasks = [
    {
      id: 'bank-account',
      title: "Open Bank Account",
      description: "Required for rent, CAF, and daily transactions",
      icon: CreditCard,
      timeline: "Within first week",
      priority: "urgent",
      cityInfo: {
        "Paris": "Visit BNP Paribas or Société Générale branches near universities",
        "Lyon": "Crédit Agricole has good student packages in Lyon",
        "Marseille": "LCL offers special rates for international students",
        "all": "Bring passport, student certificate, and proof of address"
      }
    },
    {
      id: 'social-security',
      title: "Apply for Social Security Number (Numéro de Sécurité Sociale)",
      description: "Essential for healthcare and official procedures",
      icon: Shield,
      timeline: "Within first 2 weeks",
      priority: "urgent",
      cityInfo: {
        "Paris": "Visit CPAM office in your arrondissement",
        "Lyon": "CPAM office at 26 Place Tobie Robatel",
        "Toulouse": "CPAM at 2 Rue Georges Vivent",
        "all": "Book appointment online at ameli.fr"
      }
    },
    {
      id: 'health-insurance',
      title: "Register for Health Insurance",
      description: "Student health insurance (LMDE or SMERRA)",
      icon: Shield,
      timeline: "Within first month",
      priority: "high",
      cityInfo: {
        "Paris": "Multiple LMDE offices across Paris",
        "Lyon": "SMERRA office at 7 Rue Jean-Marie Leclair",
        "all": "Choose between LMDE and SMERRA based on your university"
      }
    },
    {
      id: 'caf',
      title: "Apply for CAF (Housing Allowance)",
      description: "Financial assistance for accommodation costs",
      icon: Home,
      timeline: "After securing accommodation",
      priority: "high",
      cityInfo: {
        "Paris": "Visit CAF office in your arrondissement or apply online",
        "Lyon": "CAF Métropole de Lyon office",
        "all": "Apply online at caf.fr with accommodation contract"
      }
    }
  ];

  const documents = [
    "Passport with valid visa",
    "University acceptance letter",
    "Proof of accommodation",
    "Birth certificate (translated)",
    "Bank statements",
    "Passport photos",
    "European Health Insurance Card (if applicable)"
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const allStepsCompleted = completedSteps.length >= urgentTasks.length;

  const renderCityInfo = () => {
    if (selectedCity === 'all') return null;
    
    const cityInfo = cityData[selectedCity as keyof typeof cityData];
    if (!cityInfo) return null;

    return (
      <div className="mb-8 space-y-6">
        <h2 className="text-xl font-semibold mb-4">🏙️ {selectedCity} City Guide</h2>
        
        {/* Food Preparation */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChefHat className="h-6 w-6 mr-3 text-orange-600" />
              Food Preparation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900">Available Food:</h4>
              <p className="text-gray-600 text-sm">{cityInfo.food.available}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Major Supermarkets:</h4>
              <p className="text-gray-600 text-sm">{cityInfo.food.supermarkets}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Indian Items:</h4>
              <p className="text-gray-600 text-sm">{cityInfo.food.indianItems}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Must Bring:</h4>
              <p className="text-blue-600 text-sm bg-blue-50 p-2 rounded">{cityInfo.food.mustBring}</p>
            </div>
          </CardContent>
        </Card>

        {/* Clothing & Weather */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cloud className="h-6 w-6 mr-3 text-blue-600" />
              Clothing & Weather
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900">Weather:</h4>
              <p className="text-gray-600 text-sm">{cityInfo.weather.climate}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Clothing:</h4>
              <p className="text-blue-600 text-sm bg-blue-50 p-2 rounded">{cityInfo.weather.clothing}</p>
            </div>
          </CardContent>
        </Card>

        {/* Cultural Preparation */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-3 text-purple-600" />
              Cultural Preparation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900">Culture:</h4>
              <p className="text-gray-600 text-sm">{cityInfo.culture.vibe}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Local Traditions:</h4>
              <p className="text-gray-600 text-sm">{cityInfo.culture.traditions}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Important Tips:</h4>
              <p className="text-purple-600 text-sm bg-purple-50 p-2 rounded">{cityInfo.culture.tips}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🏠 Post-Arrival Checklist
          </h1>
          <p className="text-lg text-gray-600">
            Bank account, SSN, insurance, CAF, and more
          </p>
          {isCompleted && (
            <div className="mt-4 bg-green-100 p-3 rounded-lg">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-800 font-medium">Module Completed! You earned a key 🗝️</span>
              </div>
            </div>
          )}
        </div>

        {/* City Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Select Your City:</span>
          </div>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Choose a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities (General Info)</SelectItem>
              {cities.slice(1).map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {renderCityInfo()}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">🚨 Urgent Tasks (First Month)</h2>
        <div className="space-y-4">
          {urgentTasks.map((task, index) => {
            const Icon = task.icon;
            const isStepCompleted = completedSteps.includes(task.id);
            const citySpecificInfo = selectedCity === 'all' 
              ? task.cityInfo.all 
              : task.cityInfo[selectedCity as keyof typeof task.cityInfo] || task.cityInfo.all;
            
            return (
              <Card key={index} className={`border-l-4 ${
                task.priority === 'urgent' 
                  ? 'border-l-red-500' 
                  : 'border-l-orange-500'
              } ${isStepCompleted ? 'ring-2 ring-green-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <Icon className="h-6 w-6 mr-3 text-blue-600 mt-1" />
                      <div>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{task.description}</p>
                        {citySpecificInfo && (
                          <p className="text-sm text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                            💡 {citySpecificInfo}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'urgent' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Timeline: {task.timeline}</p>
                    {!isStepCompleted && (
                      <Button 
                        size="sm"
                        onClick={() => handleStepComplete(task.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                    {isStepCompleted && (
                      <span className="text-green-600 text-sm font-medium">Completed</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {allStepsCompleted && !isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              All Tasks Completed!
            </h3>
            <p className="text-green-700 mb-4">
              Great job! You've finished all urgent tasks.
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Module & Earn Key 🗝️
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-6 w-6 mr-3 text-green-600" />
            Required Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Keep these documents with you at all times during your first months in France:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 Important Reminders</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Always carry original documents + photocopies</li>
            <li>• Some processes may take several weeks - start early</li>
            <li>• Ask your university's international office for guidance</li>
            <li>• Keep receipts and confirmation numbers for all applications</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        Progress: {completedSteps.length} of {urgentTasks.length} tasks completed
      </div>
    </div>
  );
};
