import React from "react";

type ApplicationSuccessMessageProps = {
  isFreeApplication: boolean;
};

export const ApplicationSuccessMessage: React.FC<ApplicationSuccessMessageProps> = ({
  isFreeApplication
}) => (
  <div className="p-6 text-center">
    <div className="text-green-700 font-semibold mb-2">
      Application submitted!
    </div>
    <div className="text-xs text-gray-500 mb-2">
      <>Approvals usually take 24 hours for a decision. You can start building your profile now!</>
    </div>
    <div className="text-xs text-blue-600">
      Redirecting to profile builder...
    </div>
  </div>
);