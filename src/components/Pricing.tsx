
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
    <section id="pricing" className="py-24" style={{backgroundColor: '#1E1E1E'}}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Premium Membership
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Investment in your future with access to the most exclusive dating community 
            for verified professionals.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 relative overflow-hidden" style={{backgroundColor: '#121212', borderColor: '#4B1248'}}>
            <div className="absolute top-4 right-4">
              <Badge className="text-black px-3 py-1" style={{backgroundColor: '#D4AF37'}}>
                <Star className="w-4 h-4 mr-1" />
                Exclusive
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Untouchable Dating Membership
              </CardTitle>
              <CardDescription className="text-lg text-slate-300 mb-6">
                For serious professionals seeking meaningful connections
              </CardDescription>
              
              <div className="mb-4">
                <Badge className="text-white px-4 py-2 text-sm font-semibold" style={{backgroundColor: '#8B0000'}}>
                  🚀 Launch Special: 50% OFF First 30 Days!
                </Badge>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <div className="text-left">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl text-slate-400 line-through">$79.00</span>
                    <span className="text-5xl font-bold text-white">$39</span>
                    <div className="text-left">
                      <div className="text-xl font-semibold text-white">.50</div>
                      <div className="text-slate-300">first month</div>
                    </div>
                  </div>
                  <div className="text-center text-slate-300 mt-2">
                    Then $79.00/month
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{color: '#D4AF37'}} />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full py-6 text-lg font-semibold text-white border-0" style={{backgroundColor: '#C8102E', '&:hover': {backgroundColor: '#8B0000'}}}>
                Begin Application Process
              </Button>
              
              <p className="text-center text-sm text-slate-400 mt-4">
                *Membership requires successful completion of verification process
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
