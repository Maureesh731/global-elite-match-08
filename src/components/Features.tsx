
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Briefcase, GraduationCap, Shield, Heart, Users } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with verified professionals from around the world seeking meaningful relationships."
    },
    {
      icon: Briefcase,
      title: "Career Focused",
      description: "Members are successful professionals with established careers and ambitious goals."
    },
    {
      icon: GraduationCap,
      title: "Educated Elite",
      description: "All members are college graduates with verified educational backgrounds."
    },
    {
      icon: Shield,
      title: "Health Verified",
      description: "Comprehensive health screening ensures all members meet our strict health standards."
    },
    {
      icon: Heart,
      title: "Marriage Minded",
      description: "Serious individuals looking for long-term commitment and marriage, not casual dating."
    },
    {
      icon: Users,
      title: "Exclusive Community",
      description: "Small, curated membership ensures quality over quantity in every connection."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-900 via-charcoal-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose 
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"> Untouchable Dating</span>?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our platform is designed exclusively for high-achieving individuals who value quality, 
            authenticity, and meaningful connections.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group bg-gradient-to-br from-black to-gray-900 border-2 border-purple-800/50 hover:border-yellow-400/70 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 transform hover:scale-105">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-xl flex items-center justify-center mb-4 group-hover:from-yellow-400 group-hover:to-yellow-500 transition-all duration-500 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white group-hover:text-black transition-colors duration-500" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-yellow-400 transition-colors duration-300">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
