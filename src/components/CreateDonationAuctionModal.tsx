import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useDonationAuctions } from '@/hooks/useDonationAuctions';
import { Upload, DollarSign } from 'lucide-react';

interface CreateDonationAuctionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateDonationAuctionModal = ({ open, onOpenChange }: CreateDonationAuctionModalProps) => {
  const [formData, setFormData] = useState({
    donor_name: '',
    donation_type: '' as 'blood' | 'sperm' | 'eggs' | '',
    bio: '',
    photo_url: '',
    starting_bid_amount: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createAuction } = useDonationAuctions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.donor_name || !formData.donation_type || !formData.bio || formData.starting_bid_amount <= 0) {
      return;
    }

    setIsSubmitting(true);
    
    const success = await createAuction({
      ...formData,
      starting_bid_amount: formData.starting_bid_amount * 100, // Convert to cents
      donation_type: formData.donation_type as 'blood' | 'sperm' | 'eggs'
    });

    if (success) {
      setFormData({
        donor_name: '',
        donation_type: '',
        bio: '',
        photo_url: '',
        starting_bid_amount: 0
      });
      onOpenChange(false);
    }
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create Donation Auction</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="donor_name">Donor Name</Label>
            <Input
              id="donor_name"
              value={formData.donor_name}
              onChange={(e) => handleInputChange('donor_name', e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donation_type">Donation Type</Label>
            <Select value={formData.donation_type} onValueChange={(value) => handleInputChange('donation_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select donation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood">Blood Donation</SelectItem>
                <SelectItem value="sperm">Sperm Donation</SelectItem>
                <SelectItem value="eggs">Egg Donation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio ({formData.bio.length}/1500)</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell potential recipients about yourself, your health, background, and motivation for donating..."
              className="min-h-[120px]"
              maxLength={1500}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo_url">Photo URL (Optional)</Label>
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-gray-500" />
              <Input
                id="photo_url"
                type="url"
                value={formData.photo_url}
                onChange={(e) => handleInputChange('photo_url', e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="starting_bid">Starting Bid Amount (USD)</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <Input
                id="starting_bid"
                type="number"
                min="100"
                step="100"
                value={formData.starting_bid_amount}
                onChange={(e) => handleInputChange('starting_bid_amount', parseInt(e.target.value))}
                placeholder="1000"
                required
              />
            </div>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All donations must be completed at licensed medical facilities</li>
                <li>• Untouchable Dating takes a 10% fee from completed auctions</li>
                <li>• Auctions remain active until you accept a bid</li>
                <li>• You can communicate with bidders through the platform</li>
              </ul>
            </CardContent>
          </Card>

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
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Creating...' : 'Create Auction'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};