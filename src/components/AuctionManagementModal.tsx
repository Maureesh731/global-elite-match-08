import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DonationAuction, AuctionBid, useDonationAuctions } from '@/hooks/useDonationAuctions';
import { useAuctionBids } from '@/hooks/useDonationAuctions';
import { useAuth } from '@/contexts/AuthContext';
import { DollarSign, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AuctionManagementModalProps {
  auction: DonationAuction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuctionCompleted?: () => void;
}

export const AuctionManagementModal = ({ auction, open, onOpenChange, onAuctionCompleted }: AuctionManagementModalProps) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const { bids, loading } = useAuctionBids(auction.id);
  const { completeAuction } = useDonationAuctions();
  const { user } = useAuth();

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

  const calculateFees = (bidAmount: number) => {
    const platformFee = Math.round(bidAmount * 0.10);
    const donorPayout = bidAmount - platformFee;
    return { platformFee, donorPayout };
  };

  const handleCompleteAuction = async (winningBidId: string) => {
    setIsCompleting(true);
    
    const result = await completeAuction(auction.id, winningBidId);
    
    if (result) {
      onAuctionCompleted?.();
      onOpenChange(false);
    }
    
    setIsCompleting(false);
  };

  const sortedBids = [...bids].sort((a, b) => b.bid_amount - a.bid_amount);
  const highestBid = sortedBids[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Manage Auction</DialogTitle>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {highestBid && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700">Fee Breakdown (if accepted):</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Winning Bid:</span>
                        <span className="font-semibold">{formatAmount(highestBid.bid_amount)}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Platform Fee (10%):</span>
                        <span>-{formatAmount(calculateFees(highestBid.bid_amount).platformFee)}</span>
                      </div>
                      <div className="flex justify-between text-green-600 font-semibold border-t pt-1">
                        <span>You Receive:</span>
                        <span>{formatAmount(calculateFees(highestBid.bid_amount).donorPayout)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bids List */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              All Bids ({bids.length})
            </h4>
            
            {loading ? (
              <p className="text-sm text-gray-500">Loading bids...</p>
            ) : bids.length === 0 ? (
              <p className="text-sm text-gray-500">No bids yet.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {sortedBids.map((bid, index) => (
                  <Card key={bid.id} className={`p-4 ${index === 0 ? 'border-green-500 bg-green-50' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{bid.bidder_name}</span>
                            {index === 0 && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Highest Bid
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(bid.created_at), { addSuffix: true })}
                          </div>
                          {bid.message && (
                            <div className="text-sm text-gray-700 mt-1 italic">
                              "{bid.message}"
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-lg text-blue-600">
                          {formatAmount(bid.bid_amount)}
                        </div>
                        {index === 0 && user?.id === auction.user_id && (
                          <Button
                            onClick={() => handleCompleteAuction(bid.id)}
                            disabled={isCompleting}
                            className="mt-2 bg-green-600 hover:bg-green-700"
                            size="sm"
                          >
                            {isCompleting ? 'Completing...' : 'Accept Bid'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Fee Information */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Fee Information</h4>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Untouchable Dating charges a 10% platform fee on completed auctions</li>
                <li>• The fee is automatically deducted from the winning bid amount</li>
                <li>• You receive 90% of the winning bid directly</li>
                <li>• Payment processing occurs when you accept a bid</li>
                <li>• All transactions are tracked for your records</li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-8"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};