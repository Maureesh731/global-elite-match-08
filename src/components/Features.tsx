
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Briefcase, GraduationCap, Shield, Heart, Users } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with verified professionals from around the world seeking meaningful relationships.",
      gradient: "from-purple-600 to-purple-800"
    },
    {
      icon: Briefcase,
      title: "Career Focused",
      description: "Members are successful professionals with established careers and ambitious goals.",
      gradient: "from-red-600 to-red-800"
    },
    {
      icon: GraduationCap,
      title: "Educated Elite",
      description: "All members are college graduates with verified educational backgrounds.",
      gradient: "from-purple-700 to-red-700"
    },
    {
      icon: Shield,
      title: "Health Verified",
      description: "Comprehensive health screening ensures all members meet our strict health standards.",
      gradient: "from-red-700 to-purple-700"
    },
    {
      icon: Heart,
      title: "Marriage Minded",
      description: "Serious individuals looking for long-term commitment and marriage, not casual dating.",
      gradient: "from-purple-800 to-red-600"
    },
    {
      icon: Users,
      title: "Exclusive Community",
      description: "Small, curated membership ensures quality over quantity in every connection.",
      gradient: "from-red-800 to-purple-600"
    }
  ];

  return (
    <section id="features" className="py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-purple-200 to-red-200 bg-clip-text text-transparent">
              Why Choose
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Untouchable Dating?
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our platform is designed exclusively for high-achieving individuals who value quality, 
            authenticity, and meaningful connections in the most luxurious setting.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-purple-500/20 hover:border-red-500/30 transition-all duration-500 hover:scale-105 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/20">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-purple-500/20`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-300 text-base leading-relaxed">
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
