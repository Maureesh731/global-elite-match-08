import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateDonationAuctionModal } from '@/components/CreateDonationAuctionModal';
import { DonationAuctionCard } from '@/components/DonationAuctionCard';
import { useDonationAuctions } from '@/hooks/useDonationAuctions';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { useAuth } from '@/contexts/AuthContext';
import { BackToHomeButton } from '@/components/BackToHomeButton';
import { Plus, Heart, Droplets, Dna } from 'lucide-react';

export default function DonationAuctions() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const { auctions, loading, refetchAuctions } = useDonationAuctions();
  const { subscribed } = useUserSubscription();
  const { user } = useAuth();

  const getFilteredAuctions = () => {
    if (selectedType === 'all') return auctions;
    return auctions.filter(auction => auction.donation_type === selectedType);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blood':
        return <Droplets className="h-4 w-4" />;
      case 'sperm':
        return <Dna className="h-4 w-4" />;
      case 'eggs':
        return <Heart className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeStats = (type: string) => {
    return auctions.filter(auction => auction.donation_type === type).length;
  };

  if (!subscribed) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto max-w-2xl px-4 text-center">
            <BackToHomeButton />
            <Card className="mt-8">
              <CardContent className="p-8">
                <h1 className="text-3xl font-bold mb-4">Donation Auctions</h1>
                <p className="text-gray-600 mb-6">
                  Access to donation auctions is available to premium subscribers only.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <BackToHomeButton />
              <h1 className="text-4xl font-bold mb-2 mt-4">Donation Auctions</h1>
              <p className="text-gray-600">
                Browse donation opportunities and place bids on blood, sperm, and egg donations
              </p>
            </div>
            
            {user && (
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Auction
              </Button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{auctions.length}</div>
                <div className="text-sm text-gray-600">Total Auctions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Droplets className="h-4 w-4 text-red-600" />
                  <div className="text-2xl font-bold text-red-600">{getTypeStats('blood')}</div>
                </div>
                <div className="text-sm text-gray-600">Blood Donations</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Dna className="h-4 w-4 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-600">{getTypeStats('sperm')}</div>
                </div>
                <div className="text-sm text-gray-600">Sperm Donations</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Heart className="h-4 w-4 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-600">{getTypeStats('eggs')}</div>
                </div>
                <div className="text-sm text-gray-600">Egg Donations</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Tabs */}
          <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Donations</TabsTrigger>
              <TabsTrigger value="blood" className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Blood
              </TabsTrigger>
              <TabsTrigger value="sperm" className="flex items-center gap-2">
                <Dna className="h-4 w-4" />
                Sperm
              </TabsTrigger>
              <TabsTrigger value="eggs" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Eggs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedType} className="mt-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-lg text-gray-600">Loading auctions...</div>
                </div>
              ) : getFilteredAuctions().length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-lg text-gray-600 mb-4">
                    No {selectedType === 'all' ? '' : selectedType} auctions available
                  </div>
                  <p className="text-gray-500">
                    {selectedType === 'all' 
                      ? 'Be the first to create a donation auction!' 
                      : `No ${selectedType} donation auctions at the moment.`
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredAuctions().map((auction) => (
                    <DonationAuctionCard
                      key={auction.id}
                      auction={auction}
                      onBidPlaced={refetchAuctions}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Information Card */}
          <Card className="bg-blue-50 border-blue-200 mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Important Information</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• All donations must be completed at licensed medical facilities</li>
                <li>• Untouchable Dating facilitates auctions but does not handle medical procedures</li>
                <li>• <strong>10% platform fee is automatically deducted from winning bid amounts</strong></li>
                <li>• Example: $5,000 winning bid = $4,500 to donor + $500 platform fee</li>
                <li>• Bidding increments: $100 for bids under $1,000, $500 for higher amounts</li>
                <li>• Auctions remain active until the donor accepts a bid</li>
                <li>• Always verify legal and medical requirements before proceeding</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      
      <CreateDonationAuctionModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
}