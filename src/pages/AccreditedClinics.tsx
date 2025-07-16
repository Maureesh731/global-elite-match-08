import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BackToHomeButton } from '@/components/BackToHomeButton';
import { clinicsByCountry, ClinicInfo } from '@/data/accreditedClinics';
import { Search, MapPin, Phone, Globe, Shield, Droplets, Dna, Heart, ExternalLink } from 'lucide-react';

export default function AccreditedClinics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedService, setSelectedService] = useState('all');

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'blood':
        return <Droplets className="h-4 w-4 text-red-600" />;
      case 'sperm':
        return <Dna className="h-4 w-4 text-blue-600" />;
      case 'eggs':
        return <Heart className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'blood':
        return 'bg-red-100 text-red-800';
      case 'sperm':
        return 'bg-blue-100 text-blue-800';
      case 'eggs':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClinics = Object.entries(clinicsByCountry)
    .filter(([country]) => selectedCountry === 'all' || country === selectedCountry)
    .map(([country, clinics]) => [
      country,
      clinics.filter((clinic: ClinicInfo) => {
        const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            clinic.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesService = selectedService === 'all' || clinic.services.includes(selectedService as 'blood' | 'sperm' | 'eggs');
        return matchesSearch && matchesService;
      })
    ])
    .filter(([, clinics]) => (clinics as ClinicInfo[]).length > 0);

  const allCountries = Object.keys(clinicsByCountry).sort();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <BackToHomeButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Accredited Clinics & Agencies</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find verified medical facilities and agencies worldwide that can handle blood, sperm, and egg donation procedures. 
              All listed facilities are accredited by their respective national health authorities.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search clinics or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {allCountries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="blood">Blood Donation</SelectItem>
                  <SelectItem value="sperm">Sperm Donation</SelectItem>
                  <SelectItem value="eggs">Egg Donation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Service Legend */}
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-red-600" />
                <span className="text-sm">Blood Donation</span>
              </div>
              <div className="flex items-center gap-2">
                <Dna className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Sperm Donation</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Egg Donation</span>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredClinics.reduce((total, [, clinics]) => total + (clinics as ClinicInfo[]).length, 0)} clinics 
              {selectedCountry !== 'all' && ` in ${selectedCountry}`}
              {selectedService !== 'all' && ` for ${selectedService} donation`}
            </p>
          </div>

          {/* Clinics by Country */}
          <div className="space-y-8">
            {filteredClinics.map(([country, clinics]) => {
              const countryName = country as string;
              const clinicList = clinics as ClinicInfo[];
              
              return (
                <div key={countryName} className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    {countryName}
                    <Badge variant="outline" className="ml-2">
                      {clinicList.length} {clinicList.length === 1 ? 'clinic' : 'clinics'}
                    </Badge>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clinicList.map((clinic, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow hover-scale">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-start justify-between">
                            <span className="flex-1">{clinic.name}</span>
                            <div className="flex gap-1 flex-wrap">
                              {clinic.services.map(service => (
                                <div key={service} className="flex items-center">
                                  {getServiceIcon(service)}
                                </div>
                              ))}
                            </div>
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {clinic.location}
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {clinic.services.map(service => (
                              <Badge key={service} className={getServiceColor(service)}>
                                {service.charAt(0).toUpperCase() + service.slice(1)} Donation
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Shield className="h-4 w-4 text-green-600" />
                              <span className="font-medium">Accreditation:</span>
                              <span className="text-gray-600">{clinic.accreditation}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">Contact:</span>
                              <span className="text-gray-600">{clinic.contact}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                              <Globe className="h-4 w-4 text-purple-600" />
                              <a 
                                href={`https://${clinic.website}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1"
                              >
                                {clinic.website}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => window.open(`https://${clinic.website}`, '_blank')}
                          >
                            Visit Website
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredClinics.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                No clinics found matching your criteria
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCountry('all');
                  setSelectedService('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Important Notice */}
          <Card className="mt-12 bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-yellow-600" />
                <h3 className="font-semibold text-yellow-900">Important Notice</h3>
              </div>
              <ul className="text-sm text-yellow-800 space-y-2">
                <li>• All listed clinics are accredited by their respective national health authorities</li>
                <li>• Contact clinics directly to verify current services and requirements</li>
                <li>• Donation procedures must comply with local laws and regulations</li>
                <li>• Medical evaluation and screening are required at all facilities</li>
                <li>• Untouchable Dating does not endorse or guarantee services from these clinics</li>
                <li>• Always verify clinic credentials before proceeding with any procedures</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}