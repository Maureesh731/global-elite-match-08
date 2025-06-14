
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone, User } from "lucide-react";

type Promo = {
  id: number;
  name: string;
  business: string;
  description: string;
  email: string;
  phone: string;
};

export default function NetworkingPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [form, setForm] = useState({
    name: "",
    business: "",
    description: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Add new promo (simulate)
    setPromos(
      [
        {
          id: Date.now(),
          ...form,
        },
        ...promos,
      ]
    );
    setForm({
      name: "",
      business: "",
      description: "",
      email: "",
      phone: "",
    });
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-3 text-blue-900">Networking – Promote Yourself & Your Offering</h1>
      <p className="text-muted-foreground mb-8">Share your business, product, service, or yourself – and connect with other professionals through chat, email, or phone.</p>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Promote Yourself/Your Business</CardTitle>
          <CardDescription>Fill in your details, and your post will be added for others to discover.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
              />
            </div>
            <div>
              <Input
                name="business"
                placeholder="Business / Product / Service Name"
                value={form.business}
                onChange={handleChange}
                required
                minLength={2}
              />
            </div>
            <div>
              <Textarea
                name="description"
                placeholder="Brief Description"
                value={form.description}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={500}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                name="email"
                type="email"
                placeholder="Your Email (for contact)"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Input
                name="phone"
                type="tel"
                placeholder="Phone Number (optional)"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4 text-blue-900">People & Businesses Promoting Themselves</h2>
      {promos.length === 0 ? (
        <div className="text-slate-400 mb-12">No promotions yet. Be the first to add yours!</div>
      ) : (
        <div className="grid gap-6">
          {promos.map((promo) => (
            <Card key={promo.id}>
              <CardHeader className="flex flex-row gap-4 items-center">
                <User className="w-7 h-7 text-blue-700" />
                <div>
                  <CardTitle className="text-lg">{promo.name}</CardTitle>
                  <CardDescription>{promo.business}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">{promo.description}</div>
                <div className="flex gap-6 items-center">
                  {/* Contact by email */}
                  <a
                    href={`mailto:${promo.email}`}
                    className="flex items-center text-blue-800 hover:text-blue-600 gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="underline hidden md:inline">Email</span>
                  </a>
                  {/* "Chat" feature (placeholder) */}
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      alert('Chat coming soon! For now, please email or call.');
                    }}
                    className="flex items-center text-blue-800 hover:text-blue-600 gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="underline hidden md:inline">Chat</span>
                  </a>
                  {/* Contact by phone (if provided) */}
                  {promo.phone ? (
                    <a
                      href={`tel:${promo.phone}`}
                      className="flex items-center text-blue-800 hover:text-blue-600 gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="underline hidden md:inline">Call</span>
                    </a>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
