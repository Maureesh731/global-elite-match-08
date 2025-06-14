
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackToHomeButton({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      onClick={() => navigate("/")}
      className={`flex items-center gap-2 text-slate-600 hover:text-blue-900 mb-6 ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Home
    </Button>
  );
}
