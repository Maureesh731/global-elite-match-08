
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

export default function DonateCompensation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <BackToHomeButton />
          <h1 className="text-4xl font-bold mb-8 text-center text-slate-900">
            Donate, Bid, and Get Compensated
            </h1>
            <p className="mb-6 text-center text-lg text-slate-700">
              Untouchable Dating connects generous donors and recipients for blood, sperm, and egg donations. 
              Members can offer their donation services and receive bids. Payment is handled directly between members with a 10% platform fee automatically deducted from the winning bid amount.{" "}
              All physical donations must be performed at a registered 3rd-party clinic or service.
            </p>
            
            <div className="text-center mb-8">
              <Link to="/donation-profile-setup">
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Apply Now to Join Auction Platform
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
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
                  <span className="font-semibold">Winning bidders pay the full auctioned amount directly to the donor.</span>
                </li>
                <li>
                  <span className="font-semibold">Untouchable Dating automatically deducts a 10% platform fee</span> from the winning bid amount (e.g., if the winning bid is $5,000, the donor receives $4,500 and Untouchable Dating receives $500).
                </li>
                <li>
                  All actual donation services (blood, sperm, egg) are arranged and completed by <span className="font-semibold">3rd-party accredited clinics or agencies</span>. Untouchable Dating <span className="text-red-700 font-semibold">does not handle the medical process</span>. <Link to="/accredited-clinics" className="text-blue-600 hover:underline">View accredited clinics worldwide</Link>.
                </li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-2 text-slate-800 text-sm">
                <span className="font-semibold">Example:</span> Jane lists an egg donation with a starting bid of $5,000. The auction ends with a winning bid of $8,500. The winner pays $8,500 directly. Untouchable Dating automatically deducts $850 (10% platform fee), so Jane receives $7,650. Then, Jane and the buyer arrange the egg donation at an approved clinic.
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
                <li>Untouchable Dating's role is to facilitate member-to-member auctions and automatically collect a 10% platform fee from winning bid amounts.</li>
                <li>The platform fee is transparently deducted from the total bid amount before payout to the donor.</li>
                <li>It is the responsibility of both parties to verify all legal, medical, and eligibility requirements with the relevant donation clinic/agency prior to proceeding.</li>
              </ul>
            </CardContent>
          </Card>
          <p className="mt-12 text-xs text-slate-500 text-center">
            * All information is for educational purposes. Always consult a medical professional and use accredited donation services.
            <br />
            <Link to="/accredited-clinics" className="text-blue-600 hover:underline">
              View verified clinics worldwide →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
