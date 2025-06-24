
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, DollarSign } from "lucide-react";
import { LabTest } from "@/data/labTests";

interface LabTestCardProps {
  test: LabTest;
}

export const LabTestCard = ({ test }: LabTestCardProps) => {
  return (
    <Card className="border border-slate-200 hover:border-blue-300 transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-slate-800">{test.name}</h3>
              {test.womenOnly && (
                <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                  Women Only
                </Badge>
              )}
            </div>
            <p className="text-slate-600 leading-relaxed mb-3">{test.description}</p>
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">{test.included}</span>
            </div>
          </div>
          <div className="ml-6 text-right">
            <div className="flex items-center gap-1 text-2xl font-bold text-blue-600">
              <DollarSign className="w-6 h-6" />
              {test.price.replace('$', '')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
