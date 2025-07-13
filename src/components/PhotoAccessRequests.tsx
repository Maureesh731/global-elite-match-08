import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePhotoAccess } from '@/hooks/usePhotoAccess';
import { Check, X, Clock } from 'lucide-react';

interface PhotoAccessRequestsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoAccessRequests({ isOpen, onClose }: PhotoAccessRequestsProps) {
  const { pendingRequests, handlePhotoRequest, loading } = usePhotoAccess();
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Photo Access Requests</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Button 
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('pending')}
          >
            Pending ({pendingRequests.length})
          </Button>
          <Button 
            variant={activeTab === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('all')}
          >
            All Requests
          </Button>
        </div>

        <ScrollArea className="flex-1">
          {pendingRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No pending photo access requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {request.requester_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{request.requester_name}</p>
                        <p className="text-xs text-muted-foreground">
                          Photo #{request.photo_index + 1}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {formatTime(request.created_at)}
                    </Badge>
                  </div>

                  {request.message && (
                    <p className="text-sm text-muted-foreground mb-3 p-2 bg-muted rounded">
                      "{request.message}"
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handlePhotoRequest(request.id, 'approved')}
                      disabled={loading}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handlePhotoRequest(request.id, 'denied')}
                      disabled={loading}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Deny
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}