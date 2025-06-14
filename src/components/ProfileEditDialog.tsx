
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image } from 'lucide-react';
import { ProfileEditExtra } from './ProfileEditExtra';

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

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  profile: ProfileType;
  onSave: (profile: ProfileType) => void;
}

const defaultProfilePhoto = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80";

export function ProfileEditDialog({ open, onOpenChange, profile, onSave }: ProfileEditDialogProps) {
  const [editingProfile, setEditingProfile] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset editing fields when dialog is reopened
  React.useEffect(() => {
    if (open) setEditingProfile(profile);
  }, [open, profile]);

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

  const handleSave = () => {
    onSave(editingProfile);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <ProfileEditExtra
            age={editingProfile.age}
            prevEducation={editingProfile.prevEducation}
            workExperience={editingProfile.workExperience}
            onChange={fields => setEditingProfile(prev => ({ ...prev, ...fields }))}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
