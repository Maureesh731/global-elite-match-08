
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const members = [
  {
    name: "Dr. Evelyn Reed",
    title: "Neuroscientist & Marathon Runner",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop",
  },
  {
    name: "Marcus Thorne",
    title: "Venture Capitalist",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
  },
  {
    name: "Isabella Chen",
    title: "AI Ethicist & Yoga Instructor",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
  },
  {
    name: "Javier 'Javi' Cruz",
    title: "Architect & Ironman Competitor",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Dr. Anya Sharma",
    title: "Quantum Physicist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
  },
  {
    name: "Liam O'Connell",
    title: "Startup Founder & Rock Climber",
    image: "https://images.unsplash.com/photo-1517836357463-d257692634c2?q=80&w=2070&auto=format&fit=crop",
  },
];

export const FeaturedMembers = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-slate-200 px-3 py-1 text-sm text-slate-700">
            Meet Our Members
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900">
            A Glimpse into the Elite
          </h2>
          <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our community is comprised of accomplished, ambitious, and authentic individuals from around the globe.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {members.map((member, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden group rounded-lg shadow-md">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={member.image}
                          alt={`Photo of ${member.name}`}
                          width={400}
                          height={500}
                          className="object-cover w-full h-[500px] transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                          <h3 className="text-2xl font-bold">{member.name}</h3>
                          <p className="text-sm text-slate-200">{member.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white bg-black/30 hover:bg-black/50 border-none -left-4 sm:-left-10" />
          <CarouselNext className="text-white bg-black/30 hover:bg-black/50 border-none -right-4 sm:-right-10" />
        </Carousel>
      </div>
    </section>
  );
};
