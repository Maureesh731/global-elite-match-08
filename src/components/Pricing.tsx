
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Crown } from "lucide-react";

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
    <section id="pricing" className="py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Premium
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Membership
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Investment in your future with access to the most exclusive dating community 
            for verified professionals worldwide.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 border-2 border-yellow-500/30 backdrop-blur-sm relative overflow-hidden shadow-2xl shadow-yellow-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-bl-full"></div>
            <div className="absolute top-6 right-6">
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-4 py-2 shadow-lg">
                <Crown className="w-4 h-4 mr-2" />
                Exclusive
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-4xl font-bold text-white mb-4">
                Untouchable Dating Membership
              </CardTitle>
              <CardDescription className="text-lg text-gray-300 mb-8">
                For serious professionals seeking meaningful connections
              </CardDescription>
              
              <div className="mb-6">
                <Badge className="bg-gradient-to-r from-red-600 to-purple-600 text-white px-6 py-3 text-base font-bold shadow-lg shadow-red-500/30">
                  🚀 Launch Special: 50% OFF First 30 Days!
                </Badge>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-center">
                  <div className="flex items-baseline justify-center space-x-2">
                     <span className="text-3xl text-gray-500 line-through">$49.99</span>
                     <span className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">$24</span>
                     <div className="text-left">
                       <div className="text-2xl font-bold text-yellow-500">.50</div>
                       <div className="text-gray-400 text-sm">first month</div>
                     </div>
                   </div>
                   <div className="text-center text-gray-400 mt-3 text-lg">
                     Then $49.99/month
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800/30 border border-purple-500/20">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white py-8 text-xl font-bold shadow-2xl shadow-red-500/30 border border-red-500/50 transform hover:scale-105 transition-all duration-300">
                Begin Application Process
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-6">
                *Membership requires successful completion of verification process
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
