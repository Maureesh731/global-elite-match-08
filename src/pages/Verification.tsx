import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { CheckCircle2, ShieldCheck, Linkedin, Upload, FileText, Loader2, Crown } from "lucide-react";
import { toast } from "sonner";

const linkedinSchema = z
  .string()
  .trim()
  .url({ message: "Must be a valid URL" })
  .max(255)
  .refine((v) => /linkedin\.com\//i.test(v), { message: "Must be a LinkedIn URL" });

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const statusLabel: Record<string, { label: string; color: string }> = {
  none: { label: "Not submitted", color: "bg-gray-700 text-gray-200" },
  pending_standard: { label: "Standard – pending review", color: "bg-yellow-600/80 text-white" },
  standard: { label: "Standard verified", color: "bg-green-600/80 text-white" },
  pending_blue: { label: "Blue check – pending review", color: "bg-blue-600/80 text-white" },
  blue: { label: "Blue check verified", color: "bg-blue-500 text-white" },
  rejected: { label: "Rejected", color: "bg-red-600/80 text-white" },
};

const Verification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [linkedin, setLinkedin] = useState("");
  const [docs, setDocs] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("none");
  const [uploading, setUploading] = useState(false);
  const [savingLinkedin, setSavingLinkedin] = useState(false);
  const [submittingBlue, setSubmittingBlue] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }
      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("linkedin_url, verification_status, verification_documents")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile) {
        setLinkedin(profile.linkedin_url ?? "");
        setStatus(profile.verification_status ?? "none");
        setDocs(profile.verification_documents ?? []);
      }
      setLoading(false);
    })();
  }, [navigate]);

  const submitLinkedIn = async () => {
    const parsed = linkedinSchema.safeParse(linkedin);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSavingLinkedin(true);
    try {
      const newStatus = status === "blue" || status === "pending_blue" ? status : "pending_standard";
      const { error } = await supabase
        .from("profiles")
        .update({
          linkedin_url: parsed.data,
          verification_status: newStatus,
          verification_submitted_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
      if (error) throw error;
      setStatus(newStatus);
      toast.success("LinkedIn submitted for review");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to submit");
    } finally {
      setSavingLinkedin(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only PDF, JPG, PNG, or WEBP files are allowed");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File must be under 10MB");
      return;
    }
    setUploading(true);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${userId}/${Date.now()}_${safeName}`;
      const { error: upErr } = await supabase.storage
        .from("verification-documents")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;

      const newDocs = [...docs, path];
      const { error: profErr } = await supabase
        .from("profiles")
        .update({ verification_documents: newDocs })
        .eq("user_id", userId);
      if (profErr) throw profErr;

      setDocs(newDocs);
      toast.success("Document uploaded");
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const submitForBlueCheck = async () => {
    if (docs.length === 0) {
      toast.error("Please upload at least one lab/test document");
      return;
    }
    if (!linkedin) {
      toast.error("Please submit your LinkedIn URL first");
      return;
    }
    setSubmittingBlue(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          verification_status: "pending_blue",
          verification_submitted_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
      if (error) throw error;
      setStatus("pending_blue");
      toast.success("Submitted for blue check review");
    } catch (err: any) {
      toast.error(err.message ?? "Submission failed");
    } finally {
      setSubmittingBlue(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
      </div>
    );
  }

  const meta = statusLabel[status] ?? statusLabel.none;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <BackToHomeButton />

        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ShieldCheck className="w-6 h-6 text-purple-400" /> Verification
              </CardTitle>
              <Badge className={`${meta.color} border-0`}>{meta.label}</Badge>
            </div>
            <CardDescription className="text-gray-400">
              Verified profiles get more visibility, trust, and the ability to be featured.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Standard verification */}
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Linkedin className="w-5 h-5 text-blue-400" /> Standard verification (required)
            </CardTitle>
            <CardDescription className="text-gray-400">
              Submit your LinkedIn URL. Your profile cannot be approved without this.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Label htmlFor="li" className="text-gray-300">LinkedIn profile URL</Label>
            <Input
              id="li"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://www.linkedin.com/in/your-handle"
              className="bg-gray-900 border-gray-700"
              maxLength={255}
            />
            <Button onClick={submitLinkedIn} disabled={savingLinkedin} className="w-full">
              {savingLinkedin ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
              Submit for review
            </Button>
          </CardContent>
        </Card>

        {/* Blue check */}
        <Card className="bg-gradient-to-br from-blue-900/30 to-gray-900/60 border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Crown className="w-5 h-5 text-blue-400" /> Blue check verification (optional)
            </CardTitle>
            <CardDescription className="text-gray-300">
              Upload a recent lab report (STD panel + drug test). Documents are private and only visible to admins for review.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="doc" className="text-gray-300">Upload lab report (PDF, JPG, PNG, WEBP – max 10MB)</Label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  id="doc"
                  type="file"
                  accept=".pdf,image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="bg-gray-900 border-gray-700 file:text-white file:bg-purple-600 file:border-0 file:rounded file:px-3 file:py-1"
                />
                {uploading && <Loader2 className="w-5 h-5 animate-spin text-purple-400" />}
              </div>
            </div>

            {docs.length > 0 && (
              <>
                <Separator className="bg-gray-700" />
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Uploaded documents ({docs.length})</p>
                  {docs.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-200">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="truncate">{d.split("/").pop()}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <Button
              onClick={submitForBlueCheck}
              disabled={submittingBlue || docs.length === 0 || !linkedin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            >
              {submittingBlue ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
              Submit for blue check review
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Verification;
