
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BackToHomeButton } from "@/components/BackToHomeButton";

export default function DonateCompensation() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <BackToHomeButton />
          <h1 className="text-4xl font-bold mb-8 text-center text-slate-900">
            Donate, Bid, and Get Compensated
          </h1>
          <p className="mb-8 text-center text-lg text-slate-700">
            Untouchable Dating connects generous donors and recipients for blood, sperm, and egg donations. 
            Members can offer their donation services and receive bids. All payments are handled directly between members; Untouchable Dating simply facilitates the auction and takes a 10% fee.{" "}
            All physical donations must be performed at a registered 3rd-party clinic or service.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>How Does the Donation Auction Work?</CardTitle>
              <CardDescription>
                An open, member-driven auction for donation opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc ml-7 text-slate-700 space-y-2">
                <li>
                  Members who wish to donate blood, sperm, or eggs can <span className="font-semibold">create an auction listing</span> describing their offer and setting a starting price.
                </li>
                <li>
                  Interested members <span className="font-semibold">place bids</span> on listings. The highest bid at auction close wins.
                </li>
                <li>
                  <span className="font-semibold">Winning bidders pay the auctioned amount directly to the donor member.</span>
                </li>
                <li>
                  <span className="font-semibold">Untouchable Dating charges a 10% auction fee</span> from each successful sale.
                </li>
                <li>
                  All actual donation services (blood, sperm, egg) are arranged and completed by <span className="font-semibold">3rd-party accredited clinics or agencies</span>. Untouchable Dating <span className="text-red-700 font-semibold">does not handle the medical process</span>.
                </li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-2 text-slate-800 text-sm">
                <span className="font-semibold">Example:</span> Jane lists an egg donation with a starting bid of $5000. The auction ends at $8500. The buyer pays Jane $8500 directly. Untouchable Dating invoices Jane for a 10% fee ($850). Then, Jane and the buyer arrange an egg donation at an approved clinic.
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Important Disclaimers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-7 text-slate-700 space-y-2">
                <li>Untouchable Dating is <span className="font-semibold">not a medical provider</span> and does not perform or facilitate actual donations.</li>
                <li>Donors and recipients are solely responsible for arranging appointments at 3rd-party clinics.</li>
                <li>Untouchable Dating's role is to enable member-to-member auction and take a standard 10% fee per sale.</li>
                <li>It is the responsibility of both parties to verify all legal, medical, and eligibility requirements with the relevant donation clinic/agency prior to proceeding.</li>
              </ul>
            </CardContent>
          </Card>
          <p className="mt-12 text-xs text-slate-500 text-center">
            * All information is for educational purposes. Always consult a medical professional and use accredited donation services.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
