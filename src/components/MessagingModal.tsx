import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useMessages } from '@/hooks/useMessages';
import { useMessageTranslation } from '@/hooks/useMessageTranslation';
import { useMessagingGate } from '@/hooks/useMessagingGate';
import { PaymentGateModal } from '@/components/PaymentGateModal';
import { ArrowLeft, Send, Languages, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientId?: string;
  recipientName?: string;
}

export function MessagingModal({ isOpen, onClose, recipientId, recipientName }: MessagingModalProps) {
  const [view, setView] = useState<'conversations' | 'chat'>('conversations');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [messageContent, setMessageContent] = useState('');
  const [showTranslations, setShowTranslations] = useState<{[key: string]: boolean}>({});
  const [translatedMessages, setTranslatedMessages] = useState<{[key: string]: string}>({});
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  
  const { i18n } = useTranslation();
  const { translateMessage, getLanguageFlag, isTranslating } = useMessageTranslation();
  const { canSendMessages, loading: permissionsLoading } = useMessagingGate();
  
  const { 
    conversations, 
    currentConversation, 
    loading, 
    fetchConversationMessages, 
    sendMessage 
  } = useMessages();

  // If recipient is provided, go directly to chat
  useEffect(() => {
    if (recipientId && recipientName) {
      setSelectedUserId(recipientId);
      setSelectedUserName(recipientName);
      setView('chat');
      fetchConversationMessages(recipientId);
    }
  }, [recipientId, recipientName, fetchConversationMessages]);

  const handleConversationSelect = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setView('chat');
    fetchConversationMessages(userId);
  };

  const handleSendMessage = async () => {
    if (!messageContent.trim() || !selectedUserId) return;
    
    // Check if user can send messages
    if (!canSendMessages) {
      setShowPaymentGate(true);
      return;
    }
    
    await sendMessage(selectedUserId, selectedUserName, messageContent);
    setMessageContent('');
  };

  const handleBackToConversations = () => {
    setView('conversations');
    setSelectedUserId('');
    setSelectedUserName('');
  };

  const handleTranslateMessage = async (messageId: string, content: string) => {
    if (translatedMessages[messageId]) {
      // Toggle translation view
      setShowTranslations(prev => ({
        ...prev,
        [messageId]: !prev[messageId]
      }));
    } else {
      // Translate message
      const translated = await translateMessage(content);
      setTranslatedMessages(prev => ({
        ...prev,
        [messageId]: translated
      }));
      setShowTranslations(prev => ({
        ...prev,
        [messageId]: true
      }));
    }
  };

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
          <DialogTitle className="flex items-center gap-2">
            {view === 'chat' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToConversations}
                className="p-1"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {view === 'conversations' ? 'Messages' : selectedUserName}
          </DialogTitle>
        </DialogHeader>

        {view === 'conversations' ? (
          <ScrollArea className="flex-1">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="text-muted-foreground">Loading conversations...</div>
              </div>
            ) : conversations.length === 0 ? (
              <div className="flex justify-center py-8">
                <div className="text-muted-foreground">No conversations yet</div>
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.otherUserId}
                    className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer"
                    onClick={() => handleConversationSelect(conversation.otherUserId, conversation.otherUserName)}
                  >
                    <Avatar>
                      <AvatarFallback>
                        {conversation.otherUserName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.otherUserName}</p>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.lastMessageAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4 border rounded-lg">
              {currentConversation.length === 0 ? (
                <div className="flex justify-center py-8">
                  <div className="text-muted-foreground">No messages yet</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentConversation.map((message) => {
                    const isCurrentUser = message.sender_id !== selectedUserId;
                    const messageId = message.id;
                    const showTranslation = showTranslations[messageId];
                    const hasTranslation = translatedMessages[messageId];
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            isCurrentUser
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm">
                                {showTranslation && hasTranslation 
                                  ? translatedMessages[messageId] 
                                  : message.content}
                              </p>
                              {showTranslation && hasTranslation && (
                                <p className="text-xs opacity-60 mt-1 italic border-t border-current/20 pt-1">
                                  Original: {message.content}
                                </p>
                              )}
                            </div>
                            {!isCurrentUser && i18n.language !== 'en' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`p-1 h-6 w-6 ${
                                  isCurrentUser 
                                    ? 'text-primary-foreground/70 hover:text-primary-foreground' 
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                                onClick={() => handleTranslateMessage(messageId, message.content)}
                                disabled={isTranslating}
                              >
                                {hasTranslation ? (
                                  showTranslation ? <Globe className="h-3 w-3" /> : <Languages className="h-3 w-3" />
                                ) : (
                                  <Languages className="h-3 w-3" />
                                )}
                              </Button>
                            )}
                          </div>
                          <p className="text-xs opacity-70 mt-1">
                            {formatTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>

            <div className="flex gap-2 mt-4">
              <Textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[40px] max-h-[100px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageContent.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </DialogContent>
      
      <PaymentGateModal
        open={showPaymentGate}
        onOpenChange={setShowPaymentGate}
        feature="messaging"
      />
    </Dialog>
  );
}