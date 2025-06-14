import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star } from "lucide-react";

export const Pricing = () => {
  const features = [
    "Unlimited messaging with verified members",
    "Advanced matching algorithm",
    "Profile verification badge",
    "Priority customer support",
    "Monthly exclusive events",
    "Relationship coaching sessions"
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Premium Membership
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Investment in your future with access to the most exclusive dating community 
            for verified professionals.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <Star className="w-4 h-4 mr-1" />
                Exclusive
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
                Elite Membership
              </CardTitle>
              <CardDescription className="text-lg text-slate-600 mb-6">
                For serious professionals seeking meaningful connections
              </CardDescription>
              
              <div className="flex items-center justify-center space-x-2">
                <span className="text-5xl font-bold text-slate-900">$49</span>
                <div className="text-left">
                  <div className="text-xl font-semibold text-slate-900">.95</div>
                  <div className="text-slate-600">per month</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-900 to-slate-800 hover:from-blue-800 hover:to-slate-700 text-white py-6 text-lg font-semibold">
                Begin Application Process
              </Button>
              
              <p className="text-center text-sm text-slate-500 mt-4">
                *Membership requires successful completion of verification process
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
