import React from "react";
import { AlertTriangle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HealthDisclosureProps {
  healthData: {
    has_herpes: string;
    has_hiv: string;
    has_hpv: string;
    has_other_stds: string;
    has_chronic_diseases: string;
    covid_vaccinated: string;
    uses_alcohol: string;
    uses_drugs: string;
    uses_marijuana: string;
    smokes_cigarettes: string;
    uses_prescription_drugs: string;
    disclosure_authorization: string;
  };
}

export const HealthDisclosure: React.FC<HealthDisclosureProps> = ({ healthData }) => {
  // Only show if user has authorized disclosure
  if (healthData.disclosure_authorization !== "yes") {
    return null;
  }

  const disclosures = [];

  // STD Disclosures
  if (healthData.has_herpes === "yes") {
    disclosures.push({
      type: "health",
      label: "HSV (Herpes) Positive",
      severity: "high"
    });
  }

  if (healthData.has_hiv === "yes") {
    disclosures.push({
      type: "health", 
      label: "HIV Positive",
      severity: "high"
    });
  }

  if (healthData.has_hpv === "yes") {
    disclosures.push({
      type: "health",
      label: "HPV Positive", 
      severity: "medium"
    });
  }

  if (healthData.has_other_stds === "yes") {
    disclosures.push({
      type: "health",
      label: "Other STD Positive",
      severity: "high"
    });
  }

  if (healthData.has_chronic_diseases === "yes") {
    disclosures.push({
      type: "health",
      label: "Has Chronic Disease(s)",
      severity: "medium"
    });
  }

  // Substance Use Disclosures
  if (healthData.uses_alcohol === "yes") {
    disclosures.push({
      type: "substance",
      label: "Regular Alcohol Use",
      severity: "low"
    });
  }

  if (healthData.uses_drugs === "yes") {
    disclosures.push({
      type: "substance",
      label: "Recreational Drug Use",
      severity: "high"
    });
  }

  if (healthData.uses_marijuana === "yes") {
    disclosures.push({
      type: "substance",
      label: "Marijuana Use",
      severity: "medium"
    });
  }

  if (healthData.smokes_cigarettes === "yes") {
    disclosures.push({
      type: "substance",
      label: "Cigarette Smoker",
      severity: "medium"
    });
  }

  if (healthData.uses_prescription_drugs === "yes") {
    disclosures.push({
      type: "substance",
      label: "Prescription Drug Use",
      severity: "low"
    });
  }

  // COVID Vaccination Status
  const covidStatus = {
    type: "health",
    label: healthData.covid_vaccinated === "yes" ? "COVID-19 Vaccinated" : "COVID-19 Unvaccinated",
    severity: healthData.covid_vaccinated === "yes" ? "low" : "medium"
  };

  const allDisclosures = [...disclosures, covidStatus];

  // Don't render if no positive disclosures (except COVID status which we always show)
  if (disclosures.length === 0 && !covidStatus) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />;
      case "medium":
      case "low":
        return <Activity className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700">
          <AlertTriangle className="w-5 h-5" />
          Health & Lifestyle Disclosures
        </CardTitle>
        <p className="text-sm text-gray-600">
          This member has voluntarily disclosed the following information for transparency and health safety.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {allDisclosures.map((disclosure, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`${getSeverityColor(disclosure.severity)} flex items-center gap-1`}
            >
              {getSeverityIcon(disclosure.severity)}
              {disclosure.label}
            </Badge>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> All health information is self-reported and voluntarily disclosed. 
            Members with verification badges have completed optional lab testing through our lab partner.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};