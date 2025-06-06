import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle, Circle, Book, MapPin, FileText, MessageCircle, Users, Newspaper, Link, Languages, Mic, Bell, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Unit {
  id: number;
  title: string;
  description: string;
  icon: any;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  route: string;
}

const Index = () => {
  const navigate = useNavigate();
  
  const [units, setUnits] = useState<Unit[]>([
    {
      id: 1,
      title: 'School',
      description: 'Explore cities and schools in France',
      icon: Book,
      isUnlocked: true,
      isCompleted: false,
      progress: 0,
      route: '/school'
    },
    {
      id: 2,
      title: 'Pre-Arrival Checklist (Section 1)',
      description: 'Campus France, VFS, and essential preparations',
      icon: FileText,
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      route: '/pre-arrival-1'
    },
    {
      id: 3,
      title: 'Pre-Arrival Checklist (Section 2)',
      description: 'Food, clothes, and practical preparations',
      icon: FileText,
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      route: '/pre-arrival-2'
    },
    {
      id: 4,
      title: 'Post-Arrival Checklist',
      description: 'Bank account, SSN, insurance, CAF, documents',
      icon: CheckCircle,
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      route: '/post-arrival'
    },
    {
      id: 5,
      title: 'City Insights',
      description: 'Local insights and city-specific information',
      icon: MapPin,
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      route: '/city-insights'
    },
    {
      id: 6,
      title: 'Documents & Renewals',
      description: 'Document management and renewal processes',
      icon: FileText,
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      route: '/documents'
    },
    {
      id: 7,
      title: 'Student Life Guide',
      description: 'Tips for adapting to student life in France',
      icon: Users,
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      route: '/student-life'
    }
  ]);

  const handleUnitClick = (unit: Unit) => {
    if (unit.isUnlocked) {
      navigate(unit.route);
    }
  };

  const renderUnitCard = (unit: Unit) => {
    const IconComponent = unit.icon;
    
    return (
      <Card 
        key={unit.id}
        className={`relative transition-all duration-300 hover:scale-105 cursor-pointer ${
          unit.isUnlocked 
            ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200 hover:shadow-lg' 
            : 'bg-gray-50 border-gray-200 opacity-60'
        }`}
        onClick={() => handleUnitClick(unit)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                unit.isUnlocked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                <IconComponent size={24} />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-800">
                  {unit.title}
                </CardTitle>
                <Badge variant={unit.isUnlocked ? "default" : "secondary"} className="text-xs">
                  {unit.isCompleted ? 'Completed' : unit.isUnlocked ? 'Available' : 'Locked'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center">
              {!unit.isUnlocked && <Lock className="text-gray-400" size={20} />}
              {unit.isCompleted && <CheckCircle className="text-green-500" size={20} />}
              {unit.isUnlocked && !unit.isCompleted && <Circle className="text-blue-500" size={20} />}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">{unit.description}</p>
          {unit.isUnlocked && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>{unit.progress}%</span>
              </div>
              <Progress value={unit.progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Book className="text-white" size={16} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FrenchStudent Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/notifications')}
                className="relative"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
              >
                <User size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Journey to France 🇫🇷
          </h2>
          <p className="text-lg text-gray-600">
            Complete each unit to unlock the next step in your French adventure
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {units.map(renderUnitCard)}
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => navigate('/qa')}
            >
              <MessageCircle size={24} className="mb-2" />
              <span className="text-xs">Q&A</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => navigate('/hub')}
            >
              <Users size={24} className="mb-2" />
              <span className="text-xs">Hub</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => navigate('/news')}
            >
              <Newspaper size={24} className="mb-2" />
              <span className="text-xs">News</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => navigate('/affiliations')}
            >
              <Link size={24} className="mb-2" />
              <span className="text-xs">Affiliations</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => navigate('/language')}
            >
              <Languages size={24} className="mb-2" />
              <span className="text-xs">Language</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => navigate('/translate')}
            >
              <Mic size={24} className="mb-2" />
              <span className="text-xs">Translate</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => navigate('/contact')}
            >
              <Phone size={24} className="mb-2" />
              <span className="text-xs">Contact</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">© Kousthubhee & Srivatsava</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
