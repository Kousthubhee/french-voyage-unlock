
import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Image, Edit } from 'lucide-react';

const defaultProfilePhoto = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80";

export const ProfilePage = () => {
  // Profile state
  const [profile, setProfile] = useState({
    name: "Student Name",
    email: "student@example.com",
    about: "Future student in France",
    memberSince: "December 2024",
    photo: defaultProfilePhoto,
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Only achievements are shown
  const achievements = [
    { title: 'First Steps', description: 'Completed your first module', icon: '🎯', earned: true },
    { title: 'Key Collector', description: 'Earned 5 keys', icon: '🗝️', earned: false },
    { title: 'French Speaker', description: 'Completed 10 language lessons', icon: '🇫🇷', earned: false },
    { title: 'Community Helper', description: 'Helped 5 fellow students', icon: '🤝', earned: false }
  ];

  // Handle photo selection (local preview only)
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditingProfile(prev => ({
          ...prev,
          photo: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Save changes to profile
  const handleSave = () => {
    setProfile(editingProfile);
    setEditOpen(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <img
                  src={editingProfile.photo || defaultProfilePhoto}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute right-0 bottom-0 bg-white hover:bg-gray-100 border shadow"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Change photo"
                >
                  <Image className="w-4 h-4 text-blue-600" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editingProfile.name}
                onChange={e => setEditingProfile({ ...editingProfile, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                value={editingProfile.email}
                onChange={e => setEditingProfile({ ...editingProfile, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-about">About</Label>
              <Input
                id="edit-about"
                value={editingProfile.about}
                onChange={e => setEditingProfile({ ...editingProfile, about: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditOpen(false); setEditingProfile(profile); }}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => { setEditOpen(true); setEditingProfile(profile); }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Achievements</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center p-3 rounded-lg ${
                achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
              }`}>
                <div className="text-2xl mr-3">{achievement.icon}</div>
                <div>
                  <div className={`font-medium ${
                    achievement.earned ? 'text-green-900' : 'text-gray-700'
                  }`}>
                    {achievement.title}
                  </div>
                  <div className={`text-sm ${
                    achievement.earned ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
