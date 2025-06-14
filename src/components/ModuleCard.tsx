
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModuleCardProps {
  title: string;
  preview: string;
  details: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, preview, details }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        tabIndex={0}
        role="button"
        className="bg-white border rounded-lg shadow hover:shadow-md hover:border-indigo-500 p-4 cursor-pointer flex flex-col justify-between min-h-[130px] transition focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === "Enter") setOpen(true); }}
      >
        <div>
          <div className="font-semibold text-base">{title}</div>
          <div className="text-gray-600 text-sm mt-1">{preview}</div>
        </div>
        <div className="mt-4 text-xs text-indigo-600 font-medium underline">View details</div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="text-gray-700 text-sm py-2">{details}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModuleCard;
