
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
                  <h1 className="text-3xl md:text-4xl font-bold">Our Partnership with Quest Diagnostics</h1>
                  <p className="text-blue-200 mt-2 text-lg">
                    Ensuring a Safe, Verified, and Health-Conscious Community
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Why We Partner with Quest Diagnostics</h2>
                <p className="text-slate-600 leading-relaxed">
                  At EliteMatch, our commitment to creating a trusted platform for genuine connections is paramount. We have partnered with Quest Diagnostics, a leader in diagnostic testing, to provide a reliable and confidential way for our members to complete mandatory health screenings. This verification process is a cornerstone of our community, ensuring all members are health-conscious and transparent, fostering a safer dating environment for everyone.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">The Screening Process</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  To become a verified member, applicants are required to complete a series of tests. This ensures that all profiles on EliteMatch meet our high standards for health and safety. The required screenings include:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">Comprehensive Drug Screening</h3>
                      <p className="text-slate-600">A standard panel that screens for common substances of abuse.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">STD Panel</h3>
                      <p className="text-slate-600">Screening for common sexually transmitted diseases to promote sexual health and transparency.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">General Disease Screening</h3>
                      <p className="text-slate-600">Basic tests to ensure general well-being, reinforcing our commitment to a community of healthy individuals.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">How to Get Tested</h2>
                <p className="text-slate-600 leading-relaxed">
                  After submitting your application to EliteMatch, you will receive detailed instructions on how to schedule your tests. The process is simple:
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-4 text-slate-600 pl-4">
                    <li>Complete your EliteMatch application.</li>
                    <li>Use our provided link to find a Quest Diagnostics lab near you.</li>
                    <li>Schedule an appointment at your convenience.</li>
                    <li>Visit the lab and complete the required screenings.</li>
                    <li>Your results will be securely and confidentially processed for verification.</li>
                </ol>
              </section>

              <div className="text-center bg-slate-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Ready to find a lab?</h3>
                <p className="text-slate-600 mb-4">
                  Click the button below to open the Quest Diagnostics lab locator and find a location near you.
                </p>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a
                    href="https://www.questdiagnostics.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    Find a Quest Diagnostics Lab
                  </a>
                </Button>
              </div>

              <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
                <p>Your privacy is important to us. All health information is handled with strict confidentiality in accordance with our Privacy Policy.</p>
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

