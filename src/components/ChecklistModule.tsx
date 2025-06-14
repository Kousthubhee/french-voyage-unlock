
import { useState, useEffect } from 'react';
import { SchoolSelector } from './SchoolSelector';
import { ModuleContent } from './ModuleContent';
import { ChecklistHeader } from './ChecklistHeader';
import ModuleCard from './ModuleCard';
import { ProgressSection } from './ProgressSection';
import { useToast } from '@/hooks/use-toast';
import { CityGuidesTab } from "@/components/CityGuidesTab";

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: string;
  keysRequired?: number;
}

interface ChecklistModuleProps {
  modules: Module[];
  userProgress: any;
  setUserProgress: (progress: any) => void;
  onSchoolSelect: (school: any) => void;
  currentPage: string;
}

export const ChecklistModule = ({
  modules,
  userProgress,
  setUserProgress,
  onSchoolSelect,
  currentPage
}: ChecklistModuleProps) => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const { toast } = useToast();

  // Reset selected module when navigating back to checklist page
  useEffect(() => {
    if (currentPage === 'checklist' && selectedModule) {
      setSelectedModule(null);
    }
  }, [currentPage]);

  // Initialize with some modules unlocked and others requiring keys
  useEffect(() => {
    if (!userProgress.unlockedModules) {
      setUserProgress({
        ...userProgress,
        unlockedModules: ['school', 'pre-arrival-1', 'pre-arrival-2']
      });
    }
  }, [modules, userProgress, setUserProgress]);

  const handleModuleClick = (module: Module) => {
    const isUnlocked = userProgress.unlockedModules.includes(module.id);

    // If module is locked and requires keys, check if user has enough keys
    if (!isUnlocked && module.keysRequired) {
      if (userProgress.keys < module.keysRequired) {
        toast({
          title: "Not Enough Keys",
          description: `You need ${module.keysRequired} key${module.keysRequired > 1 ? 's' : ''} to unlock this module.`,
          variant: "destructive",
        });
        return;
      }

      // Unlock the module by spending keys
      const newProgress = {
        ...userProgress,
        keys: userProgress.keys - module.keysRequired,
        unlockedModules: [...userProgress.unlockedModules, module.id]
      };
      setUserProgress(newProgress);
      toast({
        title: "New Module Unlocked",
        description: `You've unlocked "${module.title}" by spending ${module.keysRequired} key${module.keysRequired > 1 ? 's' : ''}!`,
        variant: "default",
      });
    }

    if (!isUnlocked && !module.keysRequired) return;

    // Handle navigation to specific pages
    const pageMapping: { [key: string]: string } = {
      'school': 'school-insights',
      'pre-arrival-1': 'pre-arrival-1',
      'pre-arrival-2': 'pre-arrival-2',
      'post-arrival': 'post-arrival',
      'integration': 'integration',
      'finance': 'finance-tracking',
      'suggestions': 'suggestions', // <--- ADDED THIS LINE
    };

    if (pageMapping[module.id]) {
      setUserProgress({
        ...userProgress,
        currentPage: pageMapping[module.id]
      });
      return;
    }

    setSelectedModule(module);
  };

  const handleModuleComplete = (moduleId: string) => {
    if (userProgress.completedModules.includes(moduleId)) return;
    const newProgress = {
      ...userProgress,
      completedModules: [...userProgress.completedModules, moduleId],
      keys: userProgress.keys + 1, // Earn 1 key per completed module
    };

    setUserProgress(newProgress);

    toast({
      title: "Module Completed!",
      description: "You earned a key for completing this module.",
      variant: "default",
    });
  };

  // Central handler to show toast from child components if needed
  const handleToast = (options: { title: string; description?: string; variant?: "default" | "destructive" }) => {
    toast(options);
  };

  if (selectedModule) {
    if (selectedModule.type === "school") {
      return (
        <div>
          <SchoolSelector
            onBack={() => setSelectedModule(null)}
            onSchoolSelect={onSchoolSelect}
          />
          <CityGuidesTab />
        </div>
      );
    } else {
      return (
        <ModuleContent
          module={selectedModule}
          onBack={() => setSelectedModule(null)}
          onComplete={handleModuleComplete}
          isCompleted={userProgress.completedModules.includes(selectedModule.id)}
          onToast={handleToast}
        />
      );
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <ChecklistHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isCompleted = userProgress.completedModules.includes(module.id);
          const isUnlocked = userProgress.unlockedModules.includes(module.id);

          return (
            <ModuleCard
              key={module.id}
              module={module}
              isCompleted={isCompleted}
              isUnlocked={isUnlocked}
              onModuleClick={handleModuleClick}
              userKeys={userProgress.keys}
            />
          );
        })}
      </div>

      <ProgressSection 
        modules={modules}
        completedModulesCount={userProgress.completedModules.length}
        keys={userProgress.keys}
      />
    </div>
  );
};
