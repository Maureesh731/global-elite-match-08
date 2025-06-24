
import { FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const LabPartnerHeader = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 md:p-12 text-white">
      <div className="flex items-center gap-4">
        <FlaskConical className="w-12 h-12 flex-shrink-0" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Our Referral Partner: Quest Diagnostics <span className="text-blue-300">(Because Cupid Can't Read Bloodwork)</span>
          </h1>
          <p className="text-blue-200 mt-2 text-lg">
            Swiping right is cool, but swabbing right? Now that's hot.
          </p>
          <Badge className="bg-yellow-500 text-black font-bold mt-4">
            Referral Partner - Special EliteMatch Pricing
          </Badge>
        </div>
      </div>
    </div>
  );
};
