import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Settings, Award, Calendar, BookOpen, Target, Image, Edit } from 'lucide-react';

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

  // Stats and achievements remain the same
  const userStats = [
    { label: 'Modules Completed', value: '3/7', icon: Target },
    { label: 'Keys Earned', value: '3', icon: Award },
    { label: 'Days Active', value: '15', icon: Calendar },
    { label: 'Lessons Learned', value: '12', icon: BookOpen }
  ];

  const achievements = [
    { title: 'First Steps', description: 'Completed your first module', icon: '🎯', earned: true },
    { title: 'Key Collector', description: 'Earned 5 keys', icon: '🗝️', earned: false },
    { title: 'French Speaker', description: 'Completed 10 language lessons', icon: '🇫🇷', earned: false },
    { title: 'Community Helper', description: 'Helped 5 fellow students', icon: '🤝', earned: false }
  ];

  const recentActivity = [
    { action: 'Completed School module', time: '2 hours ago', type: 'completion' },
    { action: 'Earned a key 🗝️', time: '2 hours ago', type: 'achievement' },
    { action: 'Started Pre-Arrival Checklist (Part 1)', time: '1 day ago', type: 'start' },
    { action: 'Joined Community Hub', time: '3 days ago', type: 'join' }
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
    <div className="max-w-6xl mx-auto">
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

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <User className="h-8 w-8 mr-3 text-blue-600" />
          Profile
        </h1>
        <p className="text-lg text-gray-600">
          Track your progress and manage your learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-400 bg-gray-100 flex items-center justify-center">
                    <img
                      src={profile.photo || defaultProfilePhoto}
                      className="w-16 h-16 object-cover"
                      alt="Profile"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-600">{profile.about}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      Member since {profile.memberSince}
                    </div>
                    <div className="text-sm text-gray-500">
                      {profile.email}
                    </div>
                  </div>
                </div>
                <Button variant="outline" onClick={() => { setEditOpen(true); setEditingProfile(profile); }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center bg-gray-50 p-4 rounded-lg">
                      <Icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-4 ${
                      activity.type === 'completion' ? 'bg-green-500' :
                      activity.type === 'achievement' ? 'bg-yellow-500' :
                      activity.type === 'start' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <div className="text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Overall Progress</span>
                    <span className="text-gray-600">43%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '43%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">French Language</span>
                    <span className="text-gray-600">20%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Bureaucracy Knowledge</span>
                    <span className="text-gray-600">60%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
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

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-900">Complete Local Insights</div>
                  <div className="text-sm text-blue-700">Learn about your destination city</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-medium text-purple-900">Join Community Discussions</div>
                  <div className="text-sm text-purple-700">Connect with fellow students</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-green-900">Practice French Daily</div>
                  <div className="text-sm text-green-700">Improve your language skills</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📧 Email Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🔔 Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🌍 Language & Region
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📱 Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
