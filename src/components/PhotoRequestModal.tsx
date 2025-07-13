import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { usePhotoAccess } from '@/hooks/usePhotoAccess';

interface PhotoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  profileName: string;
  photoIndex: number;
}

export function PhotoRequestModal({ 
  isOpen, 
  onClose, 
  profileId, 
  profileName, 
  photoIndex 
}: PhotoRequestModalProps) {
  const [message, setMessage] = useState('');
  const { requestPhotoAccess, loading } = usePhotoAccess();

  const handleSubmit = async () => {
    await requestPhotoAccess(profileId, profileName, photoIndex, message);
    setMessage('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Photo Access</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You're requesting access to photo #{photoIndex + 1} from {profileName}.
          </p>

          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message to your request..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}