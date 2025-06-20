
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
    <section id="pricing" className="py-24 bg-gradient-to-br from-untouchable-pearl to-untouchable-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-untouchable-charcoal mb-6">
            Premium Membership
          </h2>
          <p className="text-xl text-untouchable-shadow leading-relaxed">
            Investment in your future with access to the most exclusive dating community 
            for verified professionals.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-untouchable-plum/20 bg-gradient-to-br from-untouchable-cream to-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-6 right-6">
              <Badge className="bg-untouchable-gradient-luxury text-untouchable-charcoal font-semibold px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Exclusive
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-3xl font-bold text-untouchable-charcoal mb-2">
                Untouchable Membership
              </CardTitle>
              <CardDescription className="text-lg text-untouchable-shadow mb-8">
                For serious professionals seeking meaningful connections
              </CardDescription>
              
              <div className="flex items-center justify-center space-x-2">
                <span className="text-6xl font-bold bg-gradient-to-r from-untouchable-plum to-untouchable-aubergine bg-clip-text text-transparent">$49</span>
                <div className="text-left">
                  <div className="text-2xl font-bold text-untouchable-charcoal">.95</div>
                  <div className="text-untouchable-shadow font-medium">per month</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-untouchable-crimson flex-shrink-0" />
                    <span className="text-untouchable-charcoal font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-untouchable-gradient-accent hover:shadow-xl text-untouchable-cream py-6 text-lg font-bold transition-all transform hover:scale-105">
                Begin Application Process
              </Button>
              
              <p className="text-center text-sm text-untouchable-shadow mt-6 font-medium">
                *Membership requires successful completion of verification process
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
