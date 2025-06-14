
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const donations = [
  {
    title: "Donate Blood",
    summary: "Save lives by donating blood to local hospitals or blood banks.",
    how: [
      "Find a local blood drive or hospital accepting donations.",
      "Ensure you meet eligibility (age, health, recent travel).",
      "Bring a government ID and eat beforehand.",
    ],
    compensation: "Some locations may offer gift cards or small compensation (usually $20–$60 per donation)."
  },
  {
    title: "Donate Sperm",
    summary: "Help families grow by donating sperm at an approved clinic.",
    how: [
      "Apply to a sperm bank online or in person.",
      "Pass health screenings (age, medical, infectious diseases).",
      "Make regular donations as required by the clinic.",
    ],
    compensation: "You can earn $50–$150 per accepted donation from sperm banks."
  },
  {
    title: "Donate Eggs",
    summary: "Egg donation can make parenthood possible for others.",
    how: [
      "Apply with a licensed fertility clinic.",
      "Go through medical and psychological evaluation.",
      "Complete hormone treatments and a minor procedure for egg retrieval.",
    ],
    compensation: "Egg donors usually receive $5,000–$15,000 per cycle, depending on the clinic and region."
  },
];

export default function DonateCompensation() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold mb-8 text-center text-slate-900">Donate & Get Compensated</h1>
          <p className="mb-8 text-center text-lg text-slate-700">
            Discover how you can help others and get compensated for your generosity! Below are three common ways to make a difference—and receive compensation—by donating blood, sperm, or eggs.
          </p>
          <div className="space-y-8">
            {donations.map((d) => (
              <Card key={d.title}>
                <CardHeader>
                  <CardTitle>{d.title}</CardTitle>
                  <CardDescription>{d.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="font-semibold text-slate-800">How it works:</span>
                  <ul className="list-disc ml-6 mb-3 text-slate-700">
                    {d.how.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                  <span className="font-semibold text-slate-800">Compensation:</span>
                  <p className="text-slate-600">{d.compensation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-12 text-xs text-slate-500 text-center">
            * Information for educational purposes only. Always consult a medical professional and accredited clinic for eligibility and up-to-date compensation.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
