
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
    <section id="features" className="py-24" style={{backgroundColor: '#1E1E1E'}}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Untouchable Dating?
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Our platform is designed exclusively for high-achieving individuals who value quality, 
            authenticity, and meaningful connections.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow duration-300" style={{backgroundColor: '#121212', borderColor: '#4B1248'}}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#4B1248'}}>
                  <feature.icon className="w-6 h-6" style={{color: '#D4AF37'}} />
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-base leading-relaxed">
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
