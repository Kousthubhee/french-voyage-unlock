import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { ProfileEditDialog } from './ProfileEditDialog';
import { AchievementsSection } from './AchievementsSection';
import { PageTitle } from './PageTitle';

const defaultProfilePhoto = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80";

interface ProfileType {
  name: string;
  email: string;
  about: string;
  memberSince: string;
  photo: string;
  age: string;
  prevEducation: string;
  workExperience: string;
}

interface ProfilePageProps {
  profile: ProfileType;
  setProfile: (p: ProfileType) => void;
}

export const ProfilePage = ({ profile, setProfile }: ProfilePageProps) => {
  const [editOpen, setEditOpen] = useState(false);

  // Achievements section
  const achievements = [
    { title: 'First Steps', description: 'Completed your first module', icon: '🎯', earned: true },
    { title: 'Key Collector', description: 'Earned 5 keys', icon: '🗝️', earned: false },
    { title: 'French Speaker', description: 'Completed 10 language lessons', icon: '🇫🇷', earned: false },
    { title: 'Community Helper', description: 'Helped 5 fellow students', icon: '🤝', earned: false }
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 mb-10">
      <ProfileEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
        onSave={setProfile}
      />

      <Card className="w-full shadow-lg rounded-xl animate-fade-in">
        <CardContent className="p-8 flex flex-col items-center">
          <img
            src={profile.photo || defaultProfilePhoto}
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-400 mb-6 shadow-md"
            alt="Profile"
          />
          <PageTitle className="mb-1">{profile.name}</PageTitle>
          <p className="text-gray-600 text-base mb-2 font-calibri">{profile.about}</p>
          <div className="text-sm text-gray-500 mt-1 mb-1 font-medium font-calibri">
            Member since {profile.memberSince}
          </div>
          <div className="text-sm text-gray-500 font-calibri">{profile.email}</div>
          <div className="flex flex-wrap gap-4 mt-4 w-full justify-center">
            {profile.age && (
              <div className="text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-800 border border-blue-200">Age: {profile.age}</div>
            )}
            {profile.prevEducation && (
              <div className="text-sm bg-green-50 px-3 py-1 rounded-full text-green-800 border border-green-200">Prev. Education: {profile.prevEducation}</div>
            )}
            {profile.workExperience && (
              <div className="text-sm bg-purple-50 px-3 py-1 rounded-full text-purple-700 border border-purple-200">Work Exp: {profile.workExperience}</div>
            )}
          </div>
          <Button
            variant="outline"
            className="mt-7 shadow hover:scale-105 transition-transform font-semibold"
            onClick={() => setEditOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <div className="mt-9 animate-fade-in">
        <div className="mb-4 text-xl font-bold text-gray-900 font-calibri">Achievements</div>
        <AchievementsSection achievements={achievements} />
      </div>
    </div>
  );
};
