
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
  modules: Module[] | undefined;
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

  // DIAGNOSTIC LOGGING
  console.log("ChecklistModule: modules", modules);
  console.log("ChecklistModule: userProgress", userProgress);

  // Defensive setup for expected array values
  const unlockedModules = userProgress?.unlockedModules ?? [];
  const completedModules = userProgress?.completedModules ?? [];

  // Reset selected module when navigating back to checklist page
  useEffect(() => {
    if (currentPage === 'checklist' && selectedModule) {
      setSelectedModule(null);
    }
  }, [currentPage, selectedModule]);

  // Initialize with some modules unlocked and others requiring keys
  useEffect(() => {
    // Defensive fallback defaults to avoid crash
    if (userProgress && (!userProgress.unlockedModules || !Array.isArray(userProgress.unlockedModules))) {
      setUserProgress({
        ...userProgress,
        unlockedModules: ['school', 'pre-arrival-1', 'pre-arrival-2']
      });
    }
    if (userProgress && (!userProgress.completedModules || !Array.isArray(userProgress.completedModules))) {
      setUserProgress({
        ...userProgress,
        completedModules: []
      });
    }
  }, [modules, userProgress, setUserProgress]);

  const handleModuleClick = (module: Module) => {
    console.log('Module clicked:', module);
    const isUnlocked = unlockedModules.includes(module.id);

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
        unlockedModules: [...unlockedModules, module.id]
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
      'suggestions': 'suggestions',
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
    if (completedModules.includes(moduleId)) return;
    const newProgress = {
      ...userProgress,
      completedModules: [...completedModules, moduleId],
      keys: userProgress.keys + 1,
    };

    setUserProgress(newProgress);

    toast({
      title: "Module Completed!",
      description: "You earned a key for completing this module.",
      variant: "default",
    });
  };

  const handleToast = (options: { title: string; description?: string; variant?: "default" | "destructive" }) => {
    toast(options);
  };

  // Early error rendering for missing or invalid props
  if (!modules || !Array.isArray(modules)) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <ChecklistHeader />
        <div className="text-red-600 font-bold text-center">❌ Error: Checklist modules failed to load.</div>
      </div>
    );
  }
  if (!userProgress || typeof userProgress !== "object") {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <ChecklistHeader />
        <div className="text-red-600 font-bold text-center">❌ Error: User progress state is missing or corrupt.</div>
      </div>
    );
  }

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
          isCompleted={completedModules.includes(selectedModule.id)}
          onToast={handleToast}
        />
      );
    }
  }

  // Fallback for no modules found (empty array)
  if (modules.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <ChecklistHeader />
        <div className="text-gray-500 text-center my-8">No modules found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <ChecklistHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          // Defensive: each module
          if (!module || !module.id) return null;
          const isCompleted = completedModules.includes(module.id);
          const isUnlocked = unlockedModules.includes(module.id);

          return (
            <div key={module.id} onClick={() => handleModuleClick(module)}>
              <ModuleCard
                title={module.title}
                preview={module.description}
                details={
                  <div>
                    <span className="text-3xl mr-2">{module.icon}</span>
                    <div>{module.description}</div>
                  </div>
                }
              />
            </div>
          );
        })}
      </div>
      <ProgressSection 
        modules={modules}
        completedModulesCount={completedModules.length}
        keys={userProgress.keys}
      />
    </div>
  );
};
