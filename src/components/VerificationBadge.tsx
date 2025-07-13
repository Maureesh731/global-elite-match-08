import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface VerificationBadgeProps {
  hasBloodTest: boolean;
  size?: "sm" | "default" | "lg";
  showText?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  hasBloodTest,
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

  if (hasBloodTest) {
    return (
      <div className="flex items-center gap-2">
        <CheckCircle className={`${sizeClasses[size]} text-blue-600 animate-scale-in`} />
        {showText && (
          <span className={`${textSizeClasses[size]} text-blue-600 font-medium`}>
            Quest Labs Verified
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <XCircle className={`${sizeClasses[size]} text-red-500 animate-scale-in`} />
      {showText && (
        <span className={`${textSizeClasses[size]} text-red-500 font-medium`}>
          No Blood Test Submitted
        </span>
      )}
    </div>
  );
};