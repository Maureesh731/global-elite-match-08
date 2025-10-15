import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Mail, Check, X, Eye, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: string;
  member_profile_name: string;
  bio: string;
  linkedin: string;
  status: string;
  created_at: string;
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
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  age: string;
  gender: string;
  bio: string | null;
  health_status: string | null;
  photo_urls: string[] | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Application | Profile | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailRecipient, setEmailRecipient] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        navigate('/admin/login');
        return;
      }

      fetchData();
    };

    checkAdminAccess();
  }, [navigate]);

  const fetchData = async () => {
    try {
      // Fetch applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (applicationsError) throw applicationsError;
      setApplications(applicationsData || []);

      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;
      setProfiles(profilesData || []);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationAction = async (applicationId: string, action: 'approved' | 'denied') => {
    try {
      // Find the application to get applicant details
      const application = applications.find(app => app.id === applicationId);
      if (!application) {
        toast.error('Application not found');
        return;
      }

      // Call server-side edge function to update application with admin verification
      const { error: approveError } = await supabase.functions.invoke('admin-approve-application', {
        body: {
          applicationId,
          action
        }
      });

      if (approveError) throw approveError;

      // Send application response email
      const { error: emailError } = await supabase.functions.invoke('send-application-response', {
        body: {
          applicationId,
          status: action,
          message: action === 'approved' 
            ? 'Congratulations! Your application has been approved. Welcome to our community!'
            : 'Thank you for your application. After careful review, we have decided not to move forward at this time.',
          applicantName: `${application.first_name} ${application.last_name}`,
          applicantEmail: application.email
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Continue even if email fails
      }
      
      toast.success(`Application ${action} successfully`);
      fetchData();
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application');
    }
  };

  const handleProfileAction = async (profileId: string, action: 'approved' | 'denied') => {
    try {
      // Call server-side edge function with admin verification
      const { error } = await supabase.functions.invoke('admin-update-profile', {
        body: {
          profileId,
          status: action
        }
      });

      if (error) throw error;
      
      toast.success(`Profile ${action} successfully`);
      fetchData();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const sendEmail = async () => {
    if (!emailRecipient || !emailSubject || !emailMessage) {
      toast.error('Please fill in all email fields');
      return;
    }

    setSendingEmail(true);
    try {
      const { error } = await supabase.functions.invoke('send-admin-email', {
        body: {
          to: emailRecipient,
          subject: emailSubject,
          message: emailMessage
        }
      });

      if (error) throw error;
      
      toast.success('Email sent successfully');
      setEmailSubject('');
      setEmailMessage('');
      setEmailRecipient('');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      approved: 'default',
      denied: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Button onClick={handleLogout} variant="outline" className="border-gray-700">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="applications">Applications ({applications.length})</TabsTrigger>
            <TabsTrigger value="profiles">Profiles ({profiles.length})</TabsTrigger>
            <TabsTrigger value="email">Send Email</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <div className="grid gap-4">
              {applications.map((application) => (
                <Card key={application.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">
                          {application.first_name} {application.last_name}
                        </CardTitle>
                        <p className="text-gray-400">{application.email} • {application.member_profile_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        Age: {application.age} • Applied: {new Date(application.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-gray-600">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-white">
                                Application Details - {application.first_name} {application.last_name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 text-white">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p><strong>Email:</strong> {application.email}</p>
                                  <p><strong>Phone:</strong> {application.phone}</p>
                                  <p><strong>Age:</strong> {application.age}</p>
                                  <p><strong>Profile Name:</strong> {application.member_profile_name}</p>
                                </div>
                                <div>
                                  <p><strong>LinkedIn:</strong> {application.linkedin || 'Not provided'}</p>
                                  <p><strong>Status:</strong> {getStatusBadge(application.status)}</p>
                                </div>
                              </div>
                              <div>
                                <p><strong>Bio:</strong></p>
                                <p className="text-gray-300">{application.bio}</p>
                              </div>
                              <div className="border-t border-gray-700 pt-4">
                                <h4 className="font-semibold mb-2">Health Disclosure:</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <p>Herpes: {application.has_herpes}</p>
                                  <p>HIV: {application.has_hiv}</p>
                                  <p>HPV: {application.has_hpv}</p>
                                  <p>Other STDs: {application.has_other_stds}</p>
                                  <p>Chronic Diseases: {application.has_chronic_diseases}</p>
                                  <p>COVID Vaccinated: {application.covid_vaccinated}</p>
                                  <p>Uses Alcohol: {application.uses_alcohol}</p>
                                  <p>Uses Drugs: {application.uses_drugs}</p>
                                  <p>Uses Marijuana: {application.uses_marijuana}</p>
                                  <p>Smokes: {application.smokes_cigarettes}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {application.status === 'pending' && (
                          <>
                            <Button
                              onClick={() => handleApplicationAction(application.id, 'approved')}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleApplicationAction(application.id, 'denied')}
                              size="sm"
                              variant="destructive"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Deny
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profiles" className="space-y-4">
            <div className="grid gap-4">
              {profiles.map((profile) => (
                <Card key={profile.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{profile.full_name}</CardTitle>
                        <p className="text-gray-400">{profile.gender} • Age {profile.age}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(profile.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        Created: {new Date(profile.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-gray-600">
                              <Eye className="w-4 h-4 mr-1" />
                              View Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-white">
                                Profile Details - {profile.full_name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 text-white">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p><strong>Age:</strong> {profile.age}</p>
                                  <p><strong>Gender:</strong> {profile.gender}</p>
                                </div>
                                <div>
                                  <p><strong>Health Status:</strong> {profile.health_status || 'Not provided'}</p>
                                  <p><strong>Status:</strong> {getStatusBadge(profile.status)}</p>
                                </div>
                              </div>
                              {profile.bio && (
                                <div>
                                  <p><strong>Bio:</strong></p>
                                  <p className="text-gray-300">{profile.bio}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        {profile.status === 'pending_approval' && (
                          <>
                            <Button
                              onClick={() => handleProfileAction(profile.id, 'approved')}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleProfileAction(profile.id, 'denied')}
                              size="sm"
                              variant="destructive"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Deny
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white mb-2 block">Recipient Email</label>
                  <Input
                    type="email"
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    placeholder="Enter recipient email"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-white mb-2 block">Subject</label>
                  <Input
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-white mb-2 block">Message</label>
                  <Textarea
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Enter your message"
                    rows={6}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button
                  onClick={sendEmail}
                  disabled={sendingEmail}
                  className="bg-gradient-to-r from-red-600 to-purple-700 hover:from-red-500 hover:to-purple-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sendingEmail ? 'Sending...' : 'Send Email'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;