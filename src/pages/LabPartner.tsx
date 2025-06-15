
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
                  <h1 className="text-3xl md:text-4xl font-bold">Quest Diagnostics: Our Lab Partner in (Comedic) Science</h1>
                  <p className="text-blue-200 mt-2 text-lg">
                    Because “Trust, but verify” isn’t just for secret agents.
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Why Team Up with Quest Diagnostics?</h2>
                <p className="text-slate-600 leading-relaxed">
                  At EliteMatch, we’re on a mission: eliminate catfish, tall tales, and suspicious lab results. That’s why we shook hands (with gloves on, obviously) with Quest Diagnostics, the real MVPs of testing. Together, we guarantee that you’re chatting with health-conscious singles, not someone whose idea of a “clean bill of health” is washing their hands once a week.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">The Screening (Not the Hollywood Kind)</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Before you can say “first date jitters,” you get to be truly verified. Here’s what’s on the menu at Quest—no need to fast (except when told to):
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">Comprehensive Drug Screening</h3>
                      <p className="text-slate-600">No, this doesn’t mean “the caffeine count in your espresso.” This is the real deal. Approval: doctor, and maybe your mom.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">STD Panel</h3>
                      <p className="text-slate-600">Because it’s good to know who’s bringing what to the table—besides dessert.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">General Disease Screening</h3>
                      <p className="text-slate-600">Just to make sure you’re not secretly a 17th-century pirate. Or at least not contagious.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">How Does This Magical Science Happen?</h2>
                <p className="text-slate-600 leading-relaxed">
                  Becoming verified is easier than trying to explain to your grandma what a “swipe left” is:
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-4 text-slate-600 pl-4">
                  <li>Complete your EliteMatch application (pinky promise: no trick questions).</li>
                  <li>Use our handy Quest Diagnostics link to find a lab near you (bonus points if you put on your Sherlock Holmes hat).</li>
                  <li>Pick any appointment time—even 7:00am if you’re feeling dangerous.</li>
                  <li>Show up at the lab, try to look calm and collected, and bravely submit your samples like the hero you are.</li>
                  <li>Sit back, relax, and wait for your health badge, delivered with high-security digital wizardry. (Maybe not a real wizard, but pretty close!)</li>
                </ol>
              </section>

              <div className="text-center bg-slate-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Step Right Up, Find Your Lab!</h3>
                <p className="text-slate-600 mb-4">
                  Click below and prepare for weirdly polite lab technicians, free bandaids, and the glory of being EliteMatch-certified.
                </p>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a
                    href="https://www.questdiagnostics.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    I Want the Quest Quest!
                  </a>
                </Button>
              </div>

              <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
                <p>
                  Your privacy is sacred. Your medical details are locked down tighter than your high school diary. Read all the fine print in our Privacy Policy before you even panic.
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
