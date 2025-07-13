import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useMessages } from '@/hooks/useMessages';
import { ArrowLeft, Send } from 'lucide-react';

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
    
    await sendMessage(selectedUserId, selectedUserName, messageContent);
    setMessageContent('');
  };

  const handleBackToConversations = () => {
    setView('conversations');
    setSelectedUserId('');
    setSelectedUserName('');
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
                          <p className="text-sm">{message.content}</p>
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
    </Dialog>
  );
}