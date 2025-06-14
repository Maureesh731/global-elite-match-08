
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useState } from "react";

export default function ReferralProgram() {
  const [form, setForm] = useState({ yourName: "", yourEmail: "", friendEmail: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder for backend integration. For now, just log.
    console.log("Referral submitted:", form);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-lg mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6 text-blue-900">Referral Program</h1>
          <p className="text-lg text-center mb-6 text-slate-700">
            Refer a friend to EliteMatch! When they join and activate a membership, <span className="font-semibold">you BOTH get a 2nd month absolutely FREE.</span>
          </p>
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Share the love! Invite your friends and both of you enjoy an extra month of membership at no cost once your friend signs up using your referral.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal ml-6 mb-4 text-slate-700 space-y-2">
                <li>Submit the referral form below with your info and your friend's email.</li>
                <li>Your friend will receive an invitation to join EliteMatch.</li>
                <li>After your friend subscribes, you both receive the 2nd month of membership free!</li>
              </ol>
              <div className="bg-blue-50 p-3 rounded text-blue-900 text-sm mb-5">
                <span className="font-semibold">Note:</span> You can refer as many friends as you like!
              </div>
              {submitted ? (
                <div className="text-green-700 font-semibold py-4 text-center">
                  Thank you for your referral! We'll be in touch soon.
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="yourName" className="block font-medium text-slate-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      required
                      id="yourName"
                      name="yourName"
                      type="text"
                      placeholder="Enter your name"
                      value={form.yourName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="yourEmail" className="block font-medium text-slate-700 mb-1">
                      Your Email
                    </label>
                    <Input
                      required
                      id="yourEmail"
                      name="yourEmail"
                      type="email"
                      placeholder="you@email.com"
                      value={form.yourEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="friendEmail" className="block font-medium text-slate-700 mb-1">
                      Friend's Email
                    </label>
                    <Input
                      required
                      id="friendEmail"
                      name="friendEmail"
                      type="email"
                      placeholder="friend@email.com"
                      value={form.friendEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold">
                    Send Referral
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
