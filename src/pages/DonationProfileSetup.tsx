import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BackToHomeButton } from '@/components/BackToHomeButton';
import { useAuth } from '@/contexts/AuthContext';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { toast } from 'sonner';
import { User, Shield, Heart, Droplets, Dna, CheckCircle } from 'lucide-react';

export default function DonationProfileSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed } = useUserSubscription();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    full_name: '',
    age: '',
    location: '',
    phone: '',
    email: user?.email || '',
    bio: '',
    interests: [] as string[],
    looking_for: [] as string[],
    medical_verified: false,
    background_checked: false
  });

  const handleInputChange = (field: string, value: string | string[] | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleLookingForToggle = (type: string) => {
    setProfileData(prev => ({
      ...prev,
      looking_for: prev.looking_for.includes(type)
        ? prev.looking_for.filter(t => t !== type)
        : [...prev.looking_for, type]
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!subscribed) {
      toast.error('Premium subscription required to access donation auctions');
      return;
    }

    // Save profile data (this would normally go to a database)
    localStorage.setItem('donationProfile', JSON.stringify(profileData));
    toast.success('Profile created successfully!');
    navigate('/donation-auctions');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return profileData.full_name && profileData.age && profileData.location && profileData.phone;
      case 2:
        return profileData.bio.length >= 100;
      case 3:
        return profileData.interests.length > 0 && profileData.looking_for.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <BackToHomeButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Create Your Donation Profile</h1>
            <p className="text-gray-600">
              Set up your profile to access the donation auction platform
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <span className="font-medium">Basic Info</span>
              </div>
              <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                </div>
                <span className="font-medium">Profile</span>
              </div>
              <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="font-medium">Preferences</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {step === 1 && 'Basic Information'}
                {step === 2 && 'Profile Details'}
                {step === 3 && 'Preferences & Interests'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profileData.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="65"
                        value={profileData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="Enter your age"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, State"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={!!user?.email}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bio">About You ({profileData.bio.length}/1000)</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself, your health, lifestyle, and what motivates you to be part of the donation community. This helps others understand who you are and builds trust."
                      className="min-h-[150px]"
                      maxLength={1000}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Minimum 100 characters required
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Medical Verification</span>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={profileData.medical_verified}
                            onChange={(e) => handleInputChange('medical_verified', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm">I agree to medical verification</span>
                        </label>
                        <p className="text-xs text-gray-500">
                          Required for all donation participants
                        </p>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Background Check</span>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={profileData.background_checked}
                            onChange={(e) => handleInputChange('background_checked', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm">I agree to background check</span>
                        </label>
                        <p className="text-xs text-gray-500">
                          Optional but recommended
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium mb-3 block">What are you interested in?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { id: 'donating', label: 'Donating', icon: Heart },
                        { id: 'receiving', label: 'Receiving Donations', icon: User },
                        { id: 'both', label: 'Both', icon: CheckCircle }
                      ].map((interest) => (
                        <Card
                          key={interest.id}
                          className={`p-4 cursor-pointer transition-all ${
                            profileData.interests.includes(interest.id)
                              ? 'bg-blue-50 border-blue-500'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => handleInterestToggle(interest.id)}
                        >
                          <div className="flex items-center gap-2">
                            <interest.icon className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">{interest.label}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">What types of donations are you interested in?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { id: 'blood', label: 'Blood Donation', icon: Droplets, color: 'text-red-600' },
                        { id: 'sperm', label: 'Sperm Donation', icon: Dna, color: 'text-blue-600' },
                        { id: 'eggs', label: 'Egg Donation', icon: Heart, color: 'text-purple-600' }
                      ].map((type) => (
                        <Card
                          key={type.id}
                          className={`p-4 cursor-pointer transition-all ${
                            profileData.looking_for.includes(type.id)
                              ? 'bg-blue-50 border-blue-500'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => handleLookingForToggle(type.id)}
                        >
                          <div className="flex items-center gap-2">
                            <type.icon className={`h-5 w-5 ${type.color}`} />
                            <span className="font-medium">{type.label}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>
                
                {step < 3 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Complete Profile & Access Auctions
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {!subscribed && (
            <Card className="mt-8 bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-900">Premium Subscription Required</h3>
                </div>
                <p className="text-yellow-800 mb-4">
                  Access to donation auctions requires a premium subscription. Complete your profile setup and 
                  upgrade to access the full platform.
                </p>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}