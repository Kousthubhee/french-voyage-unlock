import { ChecklistModule } from '@/components/ChecklistModule';
import { QAPage } from '@/components/QAPage';
import { HubPage } from '@/components/HubPage';
import { NewsPage } from '@/components/NewsPage';
import { AffiliationPage } from '@/components/AffiliationPage';
import { LanguagePage } from '@/components/LanguagePage';
import { TranslatePage } from '@/components/TranslatePage';
import { ContactPage } from '@/components/ContactPage';
import { ProfilePage } from '@/components/ProfilePage';
import { NotificationPage } from '@/components/NotificationPage';
import { SchoolDetails } from '@/components/SchoolDetails';
import { FrenchIntegrationPage } from '@/components/FrenchIntegrationPage';
import { DocumentsPage } from '@/components/DocumentsPage';
import { SchoolInsightsPage } from './SchoolInsightsPage';
import { PreArrival1Page } from './PreArrival1Page';
import { PreArrival2Page } from './PreArrival2Page';
import { PostArrivalPage } from './PostArrivalPage';
import { FinanceTrackingPage } from './FinanceTrackingPage';

interface MainRouterProps {
  currentPage: string;
  setCurrentPage: (p: string) => void;
  userProfile: any;
  userProgress: any;
  setUserProgress: (prog: any) => void;
  selectedSchool: any;
  setSelectedSchool: (school: any) => void;
  handleProgressUpdate: (prog: any) => void;
}

const checklistModules = [
  {
    id: 'school',
    title: 'School & Local Insights',
    description: 'Explore French schools and get local insights for each city',
    icon: '🏫',
    color: 'from-blue-500 to-cyan-500',
    type: 'school'
  },
  {
    id: 'pre-arrival-1',
    title: 'Pre-Arrival Checklist (Part 1)',
    description: 'Campus France, VFS, and essential preparations',
    icon: '✈️',
    color: 'from-green-500 to-emerald-500',
    type: 'checklist'
  },
  {
    id: 'pre-arrival-2',
    title: 'Pre-Arrival Checklist (Part 2)',
    description: 'Food, clothes, and cultural preparation',
    icon: '🎒',
    color: 'from-orange-500 to-red-500',
    type: 'checklist'
  },
  {
    id: 'post-arrival',
    title: 'Post-Arrival Checklist',
    description: 'Bank account, SSN, insurance, CAF, and more',
    icon: '🏠',
    color: 'from-indigo-500 to-purple-500',
    type: 'checklist',
    keysRequired: 2
  },
  {
    id: 'integration',
    title: 'French Integration',
    description: 'Cultural adaptation and social integration',
    icon: '🤝',
    color: 'from-rose-500 to-pink-500',
    type: 'integration',
    keysRequired: 3
  },
  {
    id: 'finance',
    title: 'Tracking your Finances',
    description: 'Important paperwork and renewal processes',
    icon: '📄',
    color: 'from-teal-500 to-blue-500',
    type: 'documents',
    keysRequired: 1
  },
];

export function MainRouter({
  currentPage,
  setCurrentPage,
  userProfile,
  userProgress,
  setUserProgress,
  selectedSchool,
  setSelectedSchool,
  handleProgressUpdate,
}: MainRouterProps) {
  if (selectedSchool) {
    return (
      <SchoolDetails 
        school={selectedSchool} 
        onBack={() => setSelectedSchool(null)}
      />
    );
  }
  switch (currentPage) {
    case 'checklist':
      return (
        <ChecklistModule 
          modules={checklistModules}
          userProgress={userProgress}
          setUserProgress={handleProgressUpdate}
          onSchoolSelect={setSelectedSchool}
          currentPage={currentPage}
        />
      );
    case 'school-insights':
      return <SchoolInsightsPage onBack={() => setCurrentPage('checklist')} />;
    case 'pre-arrival-1':
      return (
        <PreArrival1Page 
          onBack={() => setCurrentPage('checklist')} 
          onComplete={() => {
            const newProgress = {
              ...userProgress,
              completedModules: [...userProgress.completedModules, 'pre-arrival-1'],
              keys: userProgress.keys + 1
            };
            handleProgressUpdate(newProgress);
            setCurrentPage('checklist');
          }}
          isCompleted={userProgress.completedModules.includes('pre-arrival-1')}
        />
      );
    case 'pre-arrival-2':
      return (
        <PreArrival2Page 
          onBack={() => setCurrentPage('checklist')} 
          onComplete={() => {
            const newProgress = {
              ...userProgress,
              completedModules: [...userProgress.completedModules, 'pre-arrival-2'],
              keys: userProgress.keys + 1
            };
            handleProgressUpdate(newProgress);
            setCurrentPage('checklist');
          }}
          isCompleted={userProgress.completedModules.includes('pre-arrival-2')}
        />
      );
    case 'post-arrival':
      return (
        <PostArrivalPage 
          onBack={() => setCurrentPage('checklist')} 
          onComplete={() => {
            const newProgress = {
              ...userProgress,
              completedModules: [...userProgress.completedModules, 'post-arrival'],
              keys: userProgress.keys + 1
            };
            handleProgressUpdate(newProgress);
            setCurrentPage('checklist');
          }}
          isCompleted={userProgress.completedModules.includes('post-arrival')}
        />
      );
    case 'finance-tracking':
      return (
        <FinanceTrackingPage 
          onBack={() => setCurrentPage('checklist')} 
          onComplete={() => {
            const newProgress = {
              ...userProgress,
              completedModules: [...userProgress.completedModules, 'finance'],
              keys: userProgress.keys + 1
            };
            handleProgressUpdate(newProgress);
            setCurrentPage('checklist');
          }}
          isCompleted={userProgress.completedModules.includes('finance')}
        />
      );
    case 'qa':
      return <QAPage />;
    case 'hub':
      return <HubPage />;
    case 'news':
      return <NewsPage />;
    case 'affiliation':
      return <AffiliationPage />;
    case 'language':
      return <LanguagePage />;
    case 'translate':
      return <TranslatePage />;
    case 'contact':
      return <ContactPage />;
    case 'profile':
      return <ProfilePage />;
    case 'notifications':
      return <NotificationPage />;
    case 'integration':
      return <FrenchIntegrationPage />;
    case 'documents':
      return <DocumentsPage />;
    default:
      return (
        <ChecklistModule 
          modules={checklistModules}
          userProgress={userProgress}
          setUserProgress={handleProgressUpdate}
          onSchoolSelect={setSelectedSchool}
          currentPage={currentPage}
        />
      );
  }
}
