import { MessagingModal } from '@/components/MessagingModal';
import { Card } from '@/components/ui/card';
import { BackToHomeButton } from '@/components/BackToHomeButton';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function MessagesPage() {
  const { subscribed, loading } = useUserSubscription();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <BackToHomeButton />
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Loading Messages...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!subscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <BackToHomeButton />
          <div className="text-center py-20">
            <Lock className="w-16 h-16 mx-auto mb-6 text-gray-400" />
            <h2 className="text-3xl font-bold mb-4">Premium Feature</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Messaging is available exclusively for paid members. Upgrade your membership to connect with other members.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/subscription-setup')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <BackToHomeButton />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Messages</h1>
          <p className="text-gray-600 text-lg">
            Connect with other premium members through private messaging
          </p>
        </div>

        <Card className="p-6 shadow-xl">
          <MessagingModal 
            isOpen={true} 
            onClose={() => {}} 
          />
        </Card>
      </div>
    </div>
  );
}