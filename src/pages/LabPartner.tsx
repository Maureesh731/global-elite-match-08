
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FlaskConical, MapPin, DollarSign } from "lucide-react";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { Badge } from "@/components/ui/badge";

const LabPartnerPage = () => {
  const labTests = [
    {
      name: "STD Screening Test Panel — Expanded",
      description: "Screen for seven of the most common sexually transmitted infections and diseases, including chlamydia, gonorrhea, hepatitis B, hepatitis C, trichomoniasis, syphilis, HIV-1, and HIV-2. Take control of your sexual health with comprehensive testing.",
      price: "$149",
      included: "Independent physician consultation for abnormal results included"
    },
    {
      name: "Herpes (HSV) 1 & 2 Test",
      description: "This herpes test detects both types of the herpes simplex virus (HSV), a sexually transmitted infection, in your blood.",
      price: "$79",
      included: "Blood test with rapid results"
    },
    {
      name: "HIV 1 & 2 Test with Confirmation",
      description: "Check for the human immunodeficiency virus (HIV), a sexually transmitted viral infection that may progress to acquired immunodeficiency syndrome (AIDS).",
      price: "$89",
      included: "Independent physician consultation for abnormal results included"
    },
    {
      name: "HPV Test for Cervical Cancer Risk (Self-Swab Collection)",
      description: "This high-risk HPV test detects high-risk Human Papillomavirus (HPV) types to assess the risk for cervical precancer and cancer. Self-collection vaginal swab in healthcare setting.",
      price: "$119",
      included: "Self-swab collection kit and risk assessment",
      womenOnly: true
    },
    {
      name: "Autoimmune Screening Test (ANA with Reflex)",
      description: "Detect autoantibodies in your blood related to various autoimmune diseases to help you and your healthcare provider determine next steps.",
      price: "$99",
      included: "Comprehensive autoantibody panel"
    },
    {
      name: "COVID-19 Antibody Test",
      description: "Detect COVID-19 antibodies from a previous infection or vaccination.",
      price: "$59",
      included: "Antibody detection and immunity status"
    },
    {
      name: "Drug Screening Test Panel — Expanded",
      description: "Evaluate your urine for eleven different drugs/drug classes to ensure a clean health profile.",
      price: "$129",
      included: "11-panel comprehensive drug screening"
    }
  ];

  const totalPricing = {
    men: labTests.filter(test => !test.womenOnly).reduce((sum, test) => sum + parseInt(test.price.replace('$', '')), 0),
    women: labTests.reduce((sum, test) => sum + parseInt(test.price.replace('$', '')), 0)
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <BackToHomeButton />
          <Card className="overflow-hidden shadow-lg border border-slate-200">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 md:p-12 text-white">
              <div className="flex items-center gap-4">
                <FlaskConical className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Our Referral Partner: Quest Diagnostics <span className="text-blue-300">(Because Cupid Can't Read Bloodwork)</span>
                  </h1>
                  <p className="text-blue-200 mt-2 text-lg">
                    Swiping right is cool, but swabbing right? Now that's hot.
                  </p>
                  <Badge className="bg-yellow-500 text-black font-bold mt-4">
                    Referral Partner - Special EliteMatch Pricing
                  </Badge>
                </div>
              </div>
            </div>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  Why Are We Dragging You to the Lab? (Spoiler: Not for Vampires)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  At EliteMatch, honesty is the best policy—unless you're talking about your taste in reality TV, then we totally get it. But when it comes to health and wellness, we don't trust anything that rhymes with "Dr. Google." That's why we've partnered with Quest Diagnostics as our official referral partner, the scientists who actually passed chemistry. Together, we keep your love life cleaner than a germaphobe's sock drawer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                  Required Lab Tests & Pricing
                </h2>
                <div className="grid gap-6">
                  {labTests.map((test, index) => (
                    <Card key={index} className="border border-slate-200 hover:border-blue-300 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-slate-800">{test.name}</h3>
                              {test.womenOnly && (
                                <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                                  Women Only
                                </Badge>
                              )}
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-3">{test.description}</p>
                            <div className="flex items-center gap-2 text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm">{test.included}</span>
                            </div>
                          </div>
                          <div className="ml-6 text-right">
                            <div className="flex items-center gap-1 text-2xl font-bold text-blue-600">
                              <DollarSign className="w-6 h-6" />
                              {test.price.replace('$', '')}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Total Package Pricing</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                      <h4 className="font-semibold text-slate-700 mb-2">Gentlemen's Package</h4>
                      <div className="text-3xl font-bold text-blue-600">${totalPricing.men}</div>
                      <p className="text-sm text-slate-500 mt-1">6 Essential Tests</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                      <h4 className="font-semibold text-slate-700 mb-2">Ladies' Package</h4>
                      <div className="text-3xl font-bold text-purple-600">${totalPricing.women}</div>
                      <p className="text-sm text-slate-500 mt-1">7 Comprehensive Tests</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  How to Get Verified (No PhD Required)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Getting the "Verified & Vetted" badge is easier than trying to assemble Swedish furniture (bonus: zero Allen wrenches required):
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-4 text-slate-600 pl-4">
                  <li>Smash that "Apply" button on EliteMatch like it's a piñata at a birthday party.</li>
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

              <div className="text-center bg-slate-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Time to Conquer the Lab!
                </h3>
                <p className="text-slate-600 mb-4">
                  Visit Quest Health's online shop to browse all available tests, get detailed pricing, and book your appointment. As our referral partner, you'll get the best rates available.
                </p>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a
                    href="https://www.questhealth.com/shop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    Shop Quest Health Tests
                  </a>
                </Button>
              </div>

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
