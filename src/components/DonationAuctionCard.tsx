import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DonationAuction } from '@/hooks/useDonationAuctions';
import { BiddingModal } from './BiddingModal';
import { Clock, DollarSign, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DonationAuctionCardProps {
  auction: DonationAuction;
  onBidPlaced?: () => void;
}

export const DonationAuctionCard = ({ auction, onBidPlaced }: DonationAuctionCardProps) => {
  const [showBiddingModal, setShowBiddingModal] = useState(false);

  const getDonationTypeColor = (type: string) => {
    switch (type) {
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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  const handleBidSuccess = () => {
    setShowBiddingModal(false);
    onBidPlaced?.();
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={auction.photo_url} alt={auction.donor_name} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{auction.donor_name}</CardTitle>
                <Badge className={getDonationTypeColor(auction.donation_type)}>
                  {auction.donation_type.charAt(0).toUpperCase() + auction.donation_type.slice(1)} Donation
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                {formatDistanceToNow(new Date(auction.created_at), { addSuffix: true })}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700 line-clamp-3">{auction.bio}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Starting Bid:</span>
                <span className="font-semibold">{formatAmount(auction.starting_bid_amount)}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600">Current Highest:</span>
                <span className="font-semibold text-blue-600">{formatAmount(auction.current_highest_bid)}</span>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowBiddingModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Place Bid
            </Button>
          </div>
        </CardContent>
      </Card>

      <BiddingModal
        auction={auction}
        open={showBiddingModal}
        onOpenChange={setShowBiddingModal}
        onBidSuccess={handleBidSuccess}
      />
    </>
  );
};