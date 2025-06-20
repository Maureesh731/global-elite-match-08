
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
    <section id="pricing" className="py-24 bg-untouchable-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-untouchable-charcoal mb-6">
            Premium Membership
          </h2>
          <p className="text-xl text-untouchable-steel leading-relaxed">
            Investment in your future with access to the most exclusive dating community 
            for verified professionals.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-untouchable-plum bg-gradient-to-br from-untouchable-cream to-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-untouchable-gold to-untouchable-bronze text-untouchable-charcoal">
                <Star className="w-4 h-4 mr-1" />
                Exclusive
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-untouchable-charcoal mb-2">
                Untouchable Membership
              </CardTitle>
              <CardDescription className="text-lg text-untouchable-steel mb-6">
                For serious professionals seeking meaningful connections
              </CardDescription>
              
              <div className="flex items-center justify-center space-x-2">
                <span className="text-5xl font-bold text-untouchable-charcoal">$49</span>
                <div className="text-left">
                  <div className="text-xl font-semibold text-untouchable-charcoal">.95</div>
                  <div className="text-untouchable-steel">per month</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-untouchable-crimson flex-shrink-0" />
                    <span className="text-untouchable-charcoal">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-gradient-to-r from-untouchable-crimson to-untouchable-ruby hover:from-untouchable-ruby hover:to-untouchable-crimson text-untouchable-cream py-6 text-lg font-semibold">
                Begin Application Process
              </Button>
              
              <p className="text-center text-sm text-untouchable-steel mt-4">
                *Membership requires successful completion of verification process
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

