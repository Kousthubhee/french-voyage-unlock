
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { ProfileEditDialog } from './ProfileEditDialog';
import { AchievementsSection } from './AchievementsSection';

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
    <div className="max-w-xl mx-auto mt-8">
      <ProfileEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
        onSave={setProfile}
      />

      <Card>
        <CardContent className="p-8 flex flex-col items-center">
          <img
            src={profile.photo || defaultProfilePhoto}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-400 mb-4"
            alt="Profile"
          />
          <h2 className="text-2xl font-semibold text-gray-900">{profile.name}</h2>
          <p className="text-gray-600">{profile.about}</p>
          <div className="text-sm text-gray-500 mt-1">
            Member since {profile.memberSince}
          </div>
          <div className="text-sm text-gray-500">{profile.email}</div>
          {profile.age && (
            <div className="text-sm mt-2 text-gray-700">Age: {profile.age}</div>
          )}
          {profile.prevEducation && (
            <div className="text-sm mt-1 text-gray-700">Previous Education: {profile.prevEducation}</div>
          )}
          {profile.workExperience && (
            <div className="text-sm mt-1 text-gray-700">Work Experience: {profile.workExperience}</div>
          )}
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setEditOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <AchievementsSection achievements={achievements} />
    </div>
  );
};
