import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DonationAuction, useAuctionBids } from '@/hooks/useDonationAuctions';
import { DollarSign, User, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BiddingModalProps {
  auction: DonationAuction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBidSuccess?: () => void;
}

export const BiddingModal = ({ auction, open, onOpenChange, onBidSuccess }: BiddingModalProps) => {
  const [bidAmount, setBidAmount] = useState(0);
  const [bidMessage, setBidMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bids, loading, placeBid } = useAuctionBids(auction.id);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bidAmount <= auction.current_highest_bid / 100) {
      return;
    }

    setIsSubmitting(true);
    
    const success = await placeBid(bidAmount * 100, bidMessage);
    
    if (success) {
      setBidAmount(0);
      setBidMessage('');
      onBidSuccess?.();
    }
    
    setIsSubmitting(false);
  };

  const getMinimumBid = () => {
    const currentBid = auction.current_highest_bid / 100;
    const increment = currentBid >= 1000 ? 500 : 100;
    return currentBid + increment;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Place Your Bid</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Auction Details */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={auction.photo_url} alt={auction.donor_name} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{auction.donor_name}</h3>
                  <Badge className={getDonationTypeColor(auction.donation_type)}>
                    {auction.donation_type.charAt(0).toUpperCase() + auction.donation_type.slice(1)} Donation
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Starting Bid:</span>
                  <span className="font-semibold">{formatAmount(auction.starting_bid_amount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Current Highest:</span>
                  <span className="font-semibold text-blue-600">{formatAmount(auction.current_highest_bid)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bidding Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bid_amount">Your Bid Amount (USD)</Label>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <Input
                  id="bid_amount"
                  type="number"
                  min={getMinimumBid()}
                  step="100"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(parseInt(e.target.value))}
                  placeholder={getMinimumBid().toString()}
                  required
                />
              </div>
              <p className="text-sm text-gray-600">
                Minimum bid: ${getMinimumBid().toLocaleString()} (${auction.current_highest_bid >= 100000 ? '500' : '100'} increments)
              </p>
              
              {/* Fee Breakdown */}
              {bidAmount > 0 && (
                <Card className="bg-yellow-50 border-yellow-200 mt-3">
                  <CardContent className="p-3">
                    <h5 className="font-medium text-yellow-900 mb-2">If you win this auction:</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Your bid:</span>
                        <span className="font-semibold">${bidAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Platform fee (10%):</span>
                        <span>-${Math.round(bidAmount * 0.10).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600 font-semibold border-t pt-1">
                        <span>Donor receives:</span>
                        <span>${(bidAmount - Math.round(bidAmount * 0.10)).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bid_message">Message to Donor (Optional)</Label>
              <Textarea
                id="bid_message"
                value={bidMessage}
                onChange={(e) => setBidMessage(e.target.value)}
                placeholder="Introduce yourself and explain why you need this donation..."
                className="min-h-[80px]"
                maxLength={500}
              />
            </div>

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || bidAmount <= auction.current_highest_bid / 100}
                className="flex-1"
              >
                {isSubmitting ? 'Placing Bid...' : 'Place Bid'}
              </Button>
            </div>
          </form>

          {/* Recent Bids */}
          <div className="space-y-3">
            <h4 className="font-semibold">Recent Bids</h4>
            {loading ? (
              <p className="text-sm text-gray-500">Loading bids...</p>
            ) : bids.length === 0 ? (
              <p className="text-sm text-gray-500">No bids yet. Be the first to bid!</p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {bids.slice(0, 5).map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{bid.bidder_name}</span>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(bid.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <span className="font-semibold text-blue-600">{formatAmount(bid.bid_amount)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};