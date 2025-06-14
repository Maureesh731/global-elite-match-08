
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";

const TestimonialsPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
    <Header />
    <main className="flex-1">
      <Testimonials />
    </main>
    <Footer />
  </div>
);

export default TestimonialsPage;
