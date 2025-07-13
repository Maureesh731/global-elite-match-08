import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Application {
  id: string;
  full_name: string;
  member_profile_name: string;
  age: string;
  email: string;
  phone: string;
  linkedin: string | null;
  bio: string | null;
  has_herpes: string;
  has_hiv: string;
  has_hpv: string;
  has_other_stds: string;
  has_chronic_diseases: string;
  covid_vaccinated: string;
  uses_alcohol: string;
  uses_drugs: string;
  uses_marijuana: string;
  smokes_cigarettes: string;
  uses_prescription_drugs: string;
  disclosure_authorization: string;
  wants_optional_testing: string;
  status: 'pending' | 'approved' | 'denied';
  review_notes: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export const ApplicationReview: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications((data as Application[]) || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (status: 'approved' | 'denied') => {
    if (!selectedApp || !responseMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a response message",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const { error } = await supabase.functions.invoke('send-application-response', {
        body: {
          applicationId: selectedApp.id,
          status: status,
          message: responseMessage,
          applicantName: selectedApp.full_name,
          applicantEmail: selectedApp.email
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Application ${status} and email sent to applicant`,
      });

      // Refresh applications and reset state
      await fetchApplications();
      setSelectedApp(null);
      setResponseMessage('');
    } catch (error) {
      console.error('Error sending response:', error);
      toast({
        title: "Error",
        description: "Failed to send response",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'denied':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Denied</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading applications...</div>
        </div>
      </div>
    );
  }

  if (selectedApp) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Button
          variant="outline"
          onClick={() => setSelectedApp(null)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Applications
        </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedApp.full_name}</CardTitle>
                <p className="text-muted-foreground">Applied on {new Date(selectedApp.created_at).toLocaleDateString()}</p>
              </div>
              {getStatusBadge(selectedApp.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Basic Information</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Profile Name:</strong> {selectedApp.member_profile_name}</p>
                  <p><strong>Age:</strong> {selectedApp.age}</p>
                  <p><strong>Email:</strong> {selectedApp.email}</p>
                  <p><strong>Phone:</strong> {selectedApp.phone}</p>
                  {selectedApp.linkedin && <p><strong>LinkedIn:</strong> {selectedApp.linkedin}</p>}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Health Disclosure</h3>
                <div className="space-y-1 text-sm">
                  <p>Herpes: {selectedApp.has_herpes}</p>
                  <p>HIV: {selectedApp.has_hiv}</p>
                  <p>HPV: {selectedApp.has_hpv}</p>
                  <p>Other STDs: {selectedApp.has_other_stds}</p>
                  <p>Chronic Diseases: {selectedApp.has_chronic_diseases}</p>
                  <p>COVID Vaccinated: {selectedApp.covid_vaccinated}</p>
                </div>
              </div>
            </div>

            {selectedApp.bio && (
              <div>
                <h3 className="font-semibold mb-2">Bio</h3>
                <p className="text-sm bg-gray-50 p-3 rounded">{selectedApp.bio}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-2">Substance Use</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>Alcohol: {selectedApp.uses_alcohol}</p>
                <p>Drugs: {selectedApp.uses_drugs}</p>
                <p>Marijuana: {selectedApp.uses_marijuana}</p>
                <p>Cigarettes: {selectedApp.smokes_cigarettes}</p>
                <p>Prescription Drugs: {selectedApp.uses_prescription_drugs}</p>
              </div>
            </div>

            {selectedApp.status === 'pending' && (
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Send Response</h3>
                <Textarea
                  placeholder="Enter your message to the applicant..."
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  className="mb-4"
                  rows={4}
                />
                <div className="flex space-x-4">
                  <Button
                    onClick={() => handleResponse('approved')}
                    disabled={processing || !responseMessage.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Application
                  </Button>
                  <Button
                    onClick={() => handleResponse('denied')}
                    disabled={processing || !responseMessage.trim()}
                    variant="destructive"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Deny Application
                  </Button>
                </div>
              </div>
            )}

            {selectedApp.review_notes && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Review Notes</h3>
                <p className="text-sm bg-gray-50 p-3 rounded">{selectedApp.review_notes}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Reviewed on {selectedApp.reviewed_at ? new Date(selectedApp.reviewed_at).toLocaleString() : 'Unknown'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Application Review</h1>
          <p className="text-muted-foreground">Review and manage member applications</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="grid gap-4">
        {applications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No applications found</p>
            </CardContent>
          </Card>
        ) : (
          applications.map((app) => (
            <Card key={app.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1" onClick={() => setSelectedApp(app)}>
                    <h3 className="text-lg font-semibold">{app.full_name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Profile: {app.member_profile_name} • Age: {app.age}
                    </p>
                    <p className="text-sm">{app.email}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Applied on {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4">
                    {getStatusBadge(app.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};