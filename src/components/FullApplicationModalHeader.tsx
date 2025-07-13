
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export const FullApplicationModalHeader: React.FC<Props> = ({ onClose }) => (
  <div className="relative bg-gray-900">
    <button
      aria-label="Close"
      onClick={onClose}
      className="absolute top-4 right-4 z-10 rounded-full bg-gray-700 hover:bg-gray-600 border border-gray-600 p-2 shadow transition-all"
      type="button"
    >
      <X className="w-5 h-5 text-gray-300" />
    </button>
    <DialogHeader className="pt-8 px-6 pb-4 bg-gray-900">
      <DialogTitle className="text-xl mb-2 text-purple-600 font-bold">
        Untouchable Dating: Full Application
      </DialogTitle>
    </DialogHeader>
  </div>
);
