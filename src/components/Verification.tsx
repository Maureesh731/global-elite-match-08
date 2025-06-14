
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Shield, Users } from "lucide-react";

export const Verification = () => {
  const requirements = [
    {
      icon: FileText,
      title: "LinkedIn Verification",
      description: "Submit your professional LinkedIn profile for career verification and background check.",
      badge: "Required"
    },
    {
      icon: Shield,
      title: "Health Certification",
      description: "Provide recent medical documentation proving drug and disease-free status.",
      badge: "Required"
    },
    {
      icon: Users,
      title: "Vaccination Status",
      description: "Verification of COVID-19 unvaccinated status as per our community standards.",
      badge: "Required"
    }
  ];

  return (
    <section id="verification" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Rigorous Verification Process
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Our comprehensive screening ensures every member meets our high standards 
            for health, professionalism, and authenticity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {requirements.map((requirement, index) => (
            <Card key={index} className="border-slate-200 bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <requirement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex justify-center mb-2">
                  <Badge variant="destructive" className="bg-red-100 text-red-800">
                    {requirement.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-slate-900">{requirement.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  {requirement.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-900 to-slate-800 rounded-2xl p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">100% Verification Rate</h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Every single member on our platform has successfully completed our comprehensive 
            verification process. No exceptions, no compromises.
          </p>
        </div>
      </div>
    </section>
  );
};
