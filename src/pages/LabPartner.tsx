
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FlaskConical, MapPin } from "lucide-react";

const LabPartnerPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-lg border border-slate-200">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 md:p-12 text-white">
              <div className="flex items-center gap-4">
                <FlaskConical className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Our Lab Partner: Quest Diagnostics <span className="text-blue-300">(Because Cupid Can’t Read Bloodwork)</span>
                  </h1>
                  <p className="text-blue-200 mt-2 text-lg">
                    Swiping right is cool, but swabbing right? Now that’s hot.
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  Why Are We Dragging You to the Lab? (Spoiler: Not for Vampires)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  At EliteMatch, honesty is the best policy—unless you’re talking about your taste in reality TV, then we totally get it. But when it comes to health and wellness, we don’t trust anything that rhymes with “Dr. Google.” That’s why we’ve teamed up with Quest Diagnostics, the scientists who actually passed chemistry. Together, we keep your love life cleaner than a germaphobe’s sock drawer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  The EliteMatch Quest: What’s on the Menu?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Our lab menu has more variety than your last ten Tinder matches. Get ready for the triple scoop of grown-up responsibility:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">Comprehensive Drug Screening</h3>
                      <p className="text-slate-600">
                        Don’t worry, caffeine is NOT included. If it was, none of us would make the cut. Quest checks for the hard stuff, so we can all be high on life (and maybe kombucha).
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">STD Panel</h3>
                      <p className="text-slate-600">
                        Acronyms are for tests, not for conversations. Let’s keep the only thing you catch on EliteMatch those sweet, sweet butterflies in your stomach.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">General Disease Screening</h3>
                      <p className="text-slate-600">
                        Is scurvy still a thing? No idea, but we check anyway. Because nothing says “I’m a catch!” like being plague-free since 2025.
                      </p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  How to Get Verified (No PhD Required)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Getting the "Verified & Vetted" badge is easier than trying to assemble Swedish furniture (bonus: zero Allen wrenches required):
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-4 text-slate-600 pl-4">
                  <li>Smash that “Apply” button on EliteMatch like it’s a piñata at a birthday party.</li>
                  <li>
                    Hit our Quest Diagnostics link below and channel your inner Sherlock to find the nearest lab. Deerstalker hat: optional but encouraged.
                  </li>
                  <li>
                    Book any time slot—yes, even the one before you’ve had coffee. We believe in you.
                  </li>
                  <li>
                    Turn up, flash your most charming awkward smile at the phlebotomist, and bravely offer your bodily fluids in the name of romance.
                  </li>
                  <li>
                    Wait for your “Verified & Vetted” badge while basking in the warm glow of your own adulting prowess.
                  </li>
                </ol>
              </section>

              <div className="text-center bg-slate-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Time to Conquer the Lab!
                </h3>
                <p className="text-slate-600 mb-4">
                  Hit the green button below, strut into Quest Diagnostics like you just solved world peace, and snag your ticket to romantic infamy. Free sticker may or may not actually exist.
                </p>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a
                    href="https://www.questdiagnostics.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    Take Me To The Lab!
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
