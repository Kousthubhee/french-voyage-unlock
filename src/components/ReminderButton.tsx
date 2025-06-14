
import { useState } from "react";
import { AlarmClock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ReminderButtonProps {
  onSet: (date: string) => void;
  date?: string;
}

export const ReminderButton = ({ onSet, date }: ReminderButtonProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(date || "");
  return (
    <>
      <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setOpen(true)}>
        <Bell className="h-4 w-4" />
        {date ? "View/Edit Reminder" : "Set Reminder"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set a Reminder</DialogTitle>
          </DialogHeader>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="reminder-date">Remind me by</label>
            <Input
              id="reminder-date"
              type="date"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              size="sm"
              onClick={() => {
                if (value) onSet(value);
                setOpen(false);
              }}
              disabled={!value}
            >
              Save Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
