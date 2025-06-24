
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { LabPartnerHeader } from "@/components/LabPartner/LabPartnerHeader";
import { LabTestCard } from "@/components/LabPartner/LabTestCard";
import { PricingTotals } from "@/components/LabPartner/PricingTotals";
import { LabPartnerAction } from "@/components/LabPartner/LabPartnerAction";
import { labTests } from "@/data/labTests";

const LabPartnerPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <BackToHomeButton />
          <Card className="overflow-hidden shadow-lg border border-slate-200">
            <LabPartnerHeader />
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  Why Are We Dragging You to the Lab? (Spoiler: Not for Vampires)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  At Untouchable Match, honesty is the best policy—unless you're talking about your taste in reality TV, then we totally get it. But when it comes to health and wellness, we don't trust anything that rhymes with "Dr. Google." That's why we've partnered with Quest Diagnostics as our official lab partner, the scientists who actually passed chemistry. Together, we keep your love life cleaner than a germaphobe's sock drawer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                  Required Lab Tests & Pricing
                </h2>
                <div className="grid gap-6">
                  {labTests.map((test, index) => (
                    <LabTestCard key={index} test={test} />
                  ))}
                </div>

                <PricingTotals />
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  How to Get Verified (No PhD Required)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Getting the "Verified & Vetted" badge is easier than trying to assemble Swedish furniture (bonus: zero Allen wrenches required):
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-4 text-slate-600 pl-4">
                  <li>Smash that "Apply" button on Untouchable Match like it's a piñata at a birthday party.</li>
                  <li>
                    Hit our Quest Diagnostics link below and channel your inner Sherlock to find the nearest lab. Deerstalker hat: optional but encouraged.
                  </li>
                  <li>
                    Book any time slot—yes, even the one before you've had coffee. We believe in you.
                  </li>
                  <li>
                    Turn up, flash your most charming awkward smile at the phlebotomist, and bravely offer your bodily fluids in the name of romance.
                  </li>
                  <li>
                    Wait for your "Verified & Vetted" badge while basking in the warm glow of your own adulting prowess.
                  </li>
                </ol>
              </section>

              <LabPartnerAction />

              <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
                <p>
                  We treat your secret lab results like sacred pizza—never shared, always protected. For more boring (but important) details, see our Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LabPartnerPage;
