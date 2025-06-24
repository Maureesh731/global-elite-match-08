
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export const LabPartnerAction = () => {
  return (
    <div className="text-center bg-slate-100 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        Time to Conquer the Lab!
      </h3>
      <p className="text-slate-600 mb-4">
        Visit Quest Health's online shop to browse all available tests and get detailed pricing. 10% to 20% savings possible when using this link below.
      </p>
      <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
        <a
          href="https://www.questhealth.com/shop"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin className="mr-2 h-5 w-5" />
          Shop Quest Health Tests
        </a>
      </Button>
    </div>
  );
};
