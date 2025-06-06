
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Users, Star, ExternalLink, Phone, Mail, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface School {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  rating: number;
  studentsCount: string;
  programs: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  image: string;
}

interface City {
  id: string;
  name: string;
  description: string;
  schools: School[];
  image: string;
}

const School = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const cities: City[] = [
    {
      id: 'paris',
      name: 'Paris',
      description: 'The capital city with numerous prestigious institutions',
      image: 'photo-1502602898536-47ad22581b52',
      schools: [
        {
          id: 'sorbonne',
          name: 'Sorbonne University',
          type: 'Public University',
          description: 'One of the most prestigious universities in France, known for its excellence in humanities, sciences, and medicine.',
          location: 'Latin Quarter, Paris',
          rating: 4.8,
          studentsCount: '55,000+',
          programs: ['Literature', 'Science', 'Medicine', 'Engineering'],
          contact: {
            phone: '+33 1 40 46 22 11',
            email: 'international@sorbonne-universite.fr',
            website: 'www.sorbonne-universite.fr'
          },
          image: 'photo-1523050854058-8df90110c9f1'
        },
        {
          id: 'hec',
          name: 'HEC Paris',
          type: 'Business School',
          description: 'Leading European business school, consistently ranked among the top business schools worldwide.',
          location: 'Jouy-en-Josas, near Paris',
          rating: 4.9,
          studentsCount: '4,000+',
          programs: ['MBA', 'Master in Management', 'Executive Education', 'PhD'],
          contact: {
            phone: '+33 1 39 67 70 00',
            email: 'info@hec.fr',
            website: 'www.hec.edu'
          },
          image: 'photo-1507003211169-0a1dd7228f2d'
        }
      ]
    },
    {
      id: 'lyon',
      name: 'Lyon',
      description: 'France\'s third-largest city with excellent universities',
      image: 'photo-1499856871958-5b9627545d1a',
      schools: [
        {
          id: 'emlyon',
          name: 'EMLYON Business School',
          type: 'Business School',
          description: 'A leading international business school with a strong focus on entrepreneurship and innovation.',
          location: 'Écully, Lyon',
          rating: 4.6,
          studentsCount: '9,000+',
          programs: ['MBA', 'Master in Management', 'MSc Programs', 'Executive Education'],
          contact: {
            phone: '+33 4 78 33 70 00',
            email: 'admissions@emlyon.com',
            website: 'www.emlyon.com'
          },
          image: 'photo-1523050854058-8df90110c9f1'
        }
      ]
    },
    {
      id: 'reims',
      name: 'Reims',
      description: 'Historic city known for its champagne and business schools',
      image: 'photo-1449824913935-59a10b8d2000',
      schools: [
        {
          id: 'neoma',
          name: 'NEOMA Business School',
          type: 'Business School',
          description: 'A top-tier business school formed by the merger of Reims Management School and Rouen Business School. Known for its international programs and strong industry connections.',
          location: 'Reims & Rouen campuses',
          rating: 4.5,
          studentsCount: '8,500+',
          programs: ['MBA', 'Master in Management', 'MSc in International Business', 'Executive Education', 'Bachelor Programs'],
          contact: {
            phone: '+33 3 26 77 47 47',
            email: 'admissions@neoma-bs.fr',
            website: 'www.neoma-bs.fr'
          },
          image: 'photo-1507003211169-0a1dd7228f2d'
        },
        {
          id: 'sciences-po-reims',
          name: 'Sciences Po Reims',
          type: 'Political Science Institute',
          description: 'Campus of Sciences Po specializing in European and North American studies.',
          location: 'Reims',
          rating: 4.7,
          studentsCount: '1,200+',
          programs: ['European & North American Studies', 'International Relations', 'Public Policy'],
          contact: {
            phone: '+33 3 26 36 87 00',
            email: 'reims@sciencespo.fr',
            website: 'www.sciencespo.fr/college/reims'
          },
          image: 'photo-1523050854058-8df90110c9f1'
        }
      ]
    }
  ];

  const handleBackToMain = () => {
    if (selectedSchool) {
      setSelectedSchool(null);
    } else if (selectedCity) {
      setSelectedCity(null);
    } else {
      navigate('/');
    }
  };

  const renderCityView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <Card 
            key={city.id}
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setSelectedCity(city)}
          >
            <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
              <img 
                src={`https://images.unsplash.com/${city.image}?auto=format&fit=crop&w=400&h=192`}
                alt={city.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin size={20} className="text-blue-500" />
                <span>{city.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{city.description}</p>
              <Badge variant="secondary">
                {city.schools.length} school{city.schools.length !== 1 ? 's' : ''}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSchoolsList = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{selectedCity?.name}</h2>
        <p className="text-gray-600">{selectedCity?.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedCity?.schools.map((school) => (
          <Card 
            key={school.id}
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setSelectedSchool(school)}
          >
            <div className="h-32 bg-gray-200 rounded-t-lg overflow-hidden">
              <img 
                src={`https://images.unsplash.com/${school.image}?auto=format&fit=crop&w=400&h=128`}
                alt={school.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{school.name}</CardTitle>
              <Badge variant="outline">{school.type}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3 text-sm line-clamp-2">{school.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span>{school.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span>{school.studentsCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSchoolDetails = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="h-64 bg-gray-200 overflow-hidden">
          <img 
            src={`https://images.unsplash.com/${selectedSchool?.image}?auto=format&fit=crop&w=800&h=256`}
            alt={selectedSchool?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedSchool?.name}</h1>
              <Badge variant="outline" className="mb-2">{selectedSchool?.type}</Badge>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{selectedSchool?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span>{selectedSchool?.rating}/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span>{selectedSchool?.studentsCount} students</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">{selectedSchool?.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Programs Offered</h3>
              <div className="space-y-2">
                {selectedSchool?.programs.map((program, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {program}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3">
                {selectedSchool?.contact.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-sm">{selectedSchool.contact.phone}</span>
                  </div>
                )}
                {selectedSchool?.contact.email && (
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-sm">{selectedSchool.contact.email}</span>
                  </div>
                )}
                {selectedSchool?.contact.website && (
                  <div className="flex items-center space-x-2">
                    <Globe size={16} className="text-gray-500" />
                    <a 
                      href={`https://${selectedSchool.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      <span>{selectedSchool.contact.website}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={handleBackToMain}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
            <h1 className="ml-4 text-xl font-bold text-gray-900">
              {selectedSchool ? selectedSchool.name : selectedCity ? `Schools in ${selectedCity.name}` : 'Schools & Cities'}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedSchool ? renderSchoolDetails() : selectedCity ? renderSchoolsList() : renderCityView()}
      </main>
    </div>
  );
};

export default School;
