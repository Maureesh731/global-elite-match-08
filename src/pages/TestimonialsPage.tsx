import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { BackToHomeButton } from "@/components/BackToHomeButton";

const TestimonialsPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
    <Header />
    <main className="flex-1">
      <div className="max-w-3xl mx-auto px-2 mb-4">
        <BackToHomeButton />
      </div>
      <Testimonials />
    </main>
    <Footer />
  </div>
);

export default TestimonialsPage;
