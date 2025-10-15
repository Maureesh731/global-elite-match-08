import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters")
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: validation.data
      });

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-red-600 rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Our team will get back to you as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gray-800/50 border-purple-900/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mb-2">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Email Us</CardTitle>
                <CardDescription className="text-gray-400">
                  Send us an email anytime
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:ceo@maureesh.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                  ceo@maureesh.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-900/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center mb-2">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Support</CardTitle>
                <CardDescription className="text-gray-400">
                  We're here to help
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  24/7 customer support available
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-900/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center mb-2">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Quick Response</CardTitle>
                <CardDescription className="text-gray-400">
                  Fast turnaround time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Usually within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-gray-800/50 border-purple-900/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Send us a message</CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below and we'll get back to you shortly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="John Doe"
                    required
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.subject ? 'border-red-500' : ''}`}
                    placeholder="How can we help you?"
                    required
                  />
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[150px] ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white font-bold py-3 text-lg"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
