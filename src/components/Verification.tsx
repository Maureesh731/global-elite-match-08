
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Shield, Users, Heart, Search } from "lucide-react";

export const Verification = () => {
  const benefits = [
    {
      icon: Search,
      title: "Enhanced Search Visibility",
      description: "Get priority placement in search results and increased profile visibility to potential matches.",
      badge: "Optional"
    },
    {
      icon: Heart,
      title: "Marriage & Family Ready",
      description: "Show you're serious about finding someone for marriage and children with verified health status.",
      badge: "Optional"
    },
    {
      icon: Shield,
      title: "Complete Health Verification",
      description: "Verify you are COVID-19 unvaccinated and drug/disease-free through Quest Diagnostics testing.",
      badge: "Optional"
    }
  ];

  return (
    <section id="verification" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Get Blue Check Verified
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            After becoming a member, you can optionally undergo testing to verify that you are COVID-19 unvaccinated 
            and drug/disease-free. Getting verified improves your search activity, results, and chances for finding 
            someone seeking marriage and children.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-slate-200 bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex justify-center mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {benefit.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-slate-900">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-900 to-slate-800 rounded-2xl p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Quest Diagnostics Lab Partner</h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-4">
            Ready to get verified? Visit our Quest Diagnostics Lab Partner page to see the required tests 
            and submit your verification documentation for your blue check status.
          </p>
          <p className="text-blue-200 text-sm">
            Tests include: STD Screening Panel, Basic Metabolic Panel, Complete Blood Count, 
            Lipid Panel, Thyroid Function, and Liver Function tests.
          </p>
        </div>
      </div>
    </section>
  );
};
