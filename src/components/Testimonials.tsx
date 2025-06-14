
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      title: "Investment Banker, London",
      content: "Finally found a platform that understands what I'm looking for. The verification process gave me confidence that everyone here is serious about finding a life partner.",
      rating: 5
    },
    {
      name: "David K.",
      title: "Tech Executive, San Francisco",
      content: "The quality of connections here is unmatched. I met my fiancée within the first month. Worth every penny for serious professionals.",
      rating: 5
    },
    {
      name: "Maria L.",
      title: "Medical Doctor, Madrid",
      content: "As someone who values health and authenticity, this platform aligned perfectly with my values. The screening process ensures genuine connections.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Hear from our members who found their perfect match through EliteMatch.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-slate-600 text-sm">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
