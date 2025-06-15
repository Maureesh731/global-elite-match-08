
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
                    Quest Diagnostics: Our Lab Partner (Because Tinder Doesn’t Swab)
                  </h1>
                  <p className="text-blue-200 mt-2 text-lg">
                    The only blind date where blood gets drawn—and not because you wore Crocs.
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  Why Are We Doing This, Besides the Meme Value?
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Here at EliteMatch, we believe there’s nothing sexier than honesty, transparency, and maybe… a negative test result. That’s why we teamed up with Quest Diagnostics—
                  a company that's obsessed with accuracy, even if you aren’t. Together, we keep our community cleaner than your grandma’s favorite kitchen sponge.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  Our Not-So-Secret Lab Menu
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  We check more boxes than your latest dating app. Presenting the Quest triple-threat experience:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">Comprehensive Drug Screening</h3>
                      <p className="text-slate-600">
                        Caffeine doesn't count (otherwise we'd all fail). Quest tests for the real stuff—because “high on life” is the only buzz allowed here.
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
                        Keep your love life spicy, not risky. We test for more acronyms than the SAT—so you can flirt (mostly) worry-free!
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
                        Are pirates real? Are there still plagues? Probably not, but just to be sure—we check. Arrr you healthy, matey?
                      </p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  Becoming Verified: An Epic Saga (Sort Of)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Getting verified is easier than assembling IKEA furniture (and far less likely to result in leftover screws):
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-4 text-slate-600 pl-4">
                  <li>Apply on EliteMatch (don’t worry, we don’t ask you to recall 10th grade math).</li>
                  <li>
                    Use our Quest Diagnostics link below to hunt down your nearest lab—magnifying glass and dramatic music optional.
                  </li>
                  <li>
                    Book any appointment—yes, even at that time you swore you’d “start the gym.”
                  </li>
                  <li>
                    Arrive, smile awkwardly at the phlebotomist, and donate your bodily fluids for the cause. (So romantic.)
                  </li>
                  <li>
                    Kick back and await your mighty “Verified & Vetted” badge, perfect for showing off in group chats.
                  </li>
                </ol>
              </section>

              <div className="text-center bg-slate-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Find a Lab, Win at Life!
                </h3>
                <p className="text-slate-600 mb-4">
                  Hit the button, march into Quest like you own the place, and get one step closer to dating glory (and a free sticker, probably).
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
                  Science is serious, but your secrets are safe: We guard your medical data like we guard our last slice of pizza. See our Privacy Policy for painfully boring legal stuff.
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
