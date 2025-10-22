import React from "react";

type ApplicationSuccessMessageProps = {
  isFreeApplication: boolean;
};

export const ApplicationSuccessMessage: React.FC<ApplicationSuccessMessageProps> = ({
  isFreeApplication
}) => (
  <div className="p-6 text-center">
    <div className="text-green-700 font-semibold mb-4 text-xl">
      ✓ Application Submitted Successfully!
    </div>
    <div className="text-sm text-gray-600 mb-3">
      Your application is now under review. Our team will review it within 24-48 hours.
    </div>
    <div className="text-sm text-gray-600 mb-2">
      You'll receive an email notification once your application is approved.
    </div>
    <div className="text-sm text-blue-600 font-medium">
      Redirecting to welcome page...
    </div>
  </div>
);