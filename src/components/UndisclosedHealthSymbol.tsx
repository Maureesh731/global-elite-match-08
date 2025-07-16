import React from "react";
import { Shield, Eye, EyeOff } from "lucide-react";

interface UndisclosedHealthSymbolProps {
  size?: "sm" | "default" | "lg";
  showText?: boolean;
}

export const UndisclosedHealthSymbol: React.FC<UndisclosedHealthSymbolProps> = ({
  size = "default",
  showText = true
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  const textSizeClasses = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-base"
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Shield className={`${sizeClasses[size]} text-amber-600`} />
        <EyeOff className={`absolute -top-1 -right-1 w-3 h-3 text-amber-800 bg-white rounded-full`} />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} text-amber-600 font-medium`}>
          Undisclosed Health Information
        </span>
      )}
    </div>
  );
};