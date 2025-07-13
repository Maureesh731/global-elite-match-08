import { MessagingModal } from '@/components/MessagingModal';
import { Card } from '@/components/ui/card';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages</h1>
          <p className="text-gray-600">
            Connect with other members through private messaging
          </p>
        </div>

        <Card className="p-8">
          <MessagingModal 
            isOpen={true} 
            onClose={() => {}} 
          />
        </Card>
      </div>
    </div>
  );
}