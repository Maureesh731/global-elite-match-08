
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export const FullApplicationModalHeader: React.FC<Props> = ({ onClose }) => (
  <div className="relative">
    <button
      aria-label="Close"
      onClick={onClose}
      className="absolute top-4 right-4 z-10 rounded-full bg-white/90 hover:bg-slate-100 border border-slate-200 p-2 shadow transition-all"
      type="button"
    >
      <X className="w-5 h-5 text-slate-600" />
    </button>
    <DialogHeader className="pt-8 px-6">
      <DialogTitle className="text-xl mb-2">
        Untouchable Dating: Full Application
      </DialogTitle>
    </DialogHeader>
  </div>
);
