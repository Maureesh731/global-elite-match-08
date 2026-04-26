import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, FileText, Check, X, ShieldCheck, Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface VerificationProfile {
  id: string;
  user_id: string;
  full_name: string;
  linkedin_url: string | null;
  verification_status: string;
  verification_documents: string[] | null;
  verification_submitted_at: string | null;
  verification_review_notes: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending_standard: "bg-yellow-600",
  pending_blue: "bg-blue-600",
  standard: "bg-green-600",
  blue: "bg-blue-500",
  rejected: "bg-red-600",
  none: "bg-gray-600",
};

export const AdminVerificationReview: React.FC = () => {
  const [profiles, setProfiles] = useState<VerificationProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [actioningId, setActioningId] = useState<string | null>(null);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, user_id, full_name, linkedin_url, verification_status, verification_documents, verification_submitted_at, verification_review_notes")
      .in("verification_status", ["pending_standard", "pending_blue", "standard", "blue", "rejected"])
      .order("verification_submitted_at", { ascending: false });
    if (error) {
      toast.error("Failed to load verifications");
    } else {
      setProfiles((data ?? []) as VerificationProfile[]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProfiles(); }, []);

  const openDoc = async (path: string) => {
    const { data, error } = await supabase.storage
      .from("verification-documents")
      .createSignedUrl(path, 60 * 5);
    if (error || !data) { toast.error("Could not open document"); return; }
    window.open(data.signedUrl, "_blank");
  };

  const setStatus = async (profile: VerificationProfile, newStatus: string) => {
    setActioningId(profile.id);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          verification_status: newStatus,
          verification_review_notes: notes[profile.id] ?? profile.verification_review_notes ?? null,
        })
        .eq("id", profile.id);
      if (error) throw error;
      toast.success(`Verification updated: ${newStatus}`);
      fetchProfiles();
    } catch (err: any) {
      toast.error(err.message ?? "Update failed");
    } finally {
      setActioningId(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-10"><Loader2 className="w-6 h-6 animate-spin text-purple-400" /></div>;
  }

  if (profiles.length === 0) {
    return <p className="text-gray-400 text-sm">No verification submissions yet.</p>;
  }

  return (
    <div className="grid gap-4">
      {profiles.map((p) => {
        const isPending = p.verification_status.startsWith("pending_");
        const isBlue = p.verification_status === "pending_blue" || p.verification_status === "blue";
        return (
          <Card key={p.id} className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    {isBlue ? <Crown className="w-4 h-4 text-blue-400" /> : <ShieldCheck className="w-4 h-4 text-purple-400" />}
                    {p.full_name}
                  </CardTitle>
                  <p className="text-xs text-gray-400 mt-1">
                    Submitted: {p.verification_submitted_at ? new Date(p.verification_submitted_at).toLocaleString() : "—"}
                  </p>
                </div>
                <Badge className={`${STATUS_COLORS[p.verification_status] ?? "bg-gray-600"} text-white border-0`}>
                  {p.verification_status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {p.linkedin_url && (
                <a href={p.linkedin_url} target="_blank" rel="noreferrer noopener"
                   className="flex items-center gap-2 text-blue-400 hover:underline text-sm">
                  <Linkedin className="w-4 h-4" /> {p.linkedin_url}
                </a>
              )}

              {p.verification_documents && p.verification_documents.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-400">Documents</p>
                  {p.verification_documents.map((doc, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => openDoc(doc)}
                      className="border-gray-700 text-left justify-start w-full"
                    >
                      <FileText className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="truncate">{doc.split("/").pop()}</span>
                    </Button>
                  ))}
                </div>
              )}

              <Textarea
                placeholder="Review notes (optional)"
                value={notes[p.id] ?? p.verification_review_notes ?? ""}
                onChange={(e) => setNotes({ ...notes, [p.id]: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white text-sm"
                rows={2}
              />

              {isPending && (
                <div className="flex flex-wrap gap-2">
                  {p.verification_status === "pending_standard" && (
                    <Button
                      onClick={() => setStatus(p, "standard")}
                      disabled={actioningId === p.id}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-1" /> Approve standard
                    </Button>
                  )}
                  {p.verification_status === "pending_blue" && (
                    <Button
                      onClick={() => setStatus(p, "blue")}
                      disabled={actioningId === p.id}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Check className="w-4 h-4 mr-1" /> Approve blue check
                    </Button>
                  )}
                  <Button
                    onClick={() => setStatus(p, "rejected")}
                    disabled={actioningId === p.id}
                    size="sm"
                    variant="destructive"
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
