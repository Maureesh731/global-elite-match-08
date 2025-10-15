import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const messageSchema = z.object({
  content: z.string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message must be less than 5000 characters')
});

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  sender_name: string;
  recipient_name: string;
  content: string;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Conversation {
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export function useMessages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by conversation
      const conversationMap = new Map<string, Conversation>();
      
      messages?.forEach((message) => {
        const otherUserId = message.sender_id === user.id ? message.recipient_id : message.sender_id;
        const otherUserName = message.sender_id === user.id ? message.recipient_name : message.sender_name;
        
        if (!conversationMap.has(otherUserId)) {
          conversationMap.set(otherUserId, {
            otherUserId,
            otherUserName,
            lastMessage: message.content,
            lastMessageAt: message.created_at,
            unreadCount: 0
          });
        }

        // Count unread messages
        if (message.recipient_id === user.id && !message.read_at) {
          const conv = conversationMap.get(otherUserId)!;
          conv.unreadCount += 1;
        }
      });

      setConversations(Array.from(conversationMap.values()));
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchConversationMessages = async (otherUserId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setCurrentConversation(messages || []);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('sender_id', otherUserId)
        .eq('recipient_id', user.id)
        .is('read_at', null);

    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const sendMessage = async (recipientId: string, recipientName: string, content: string) => {
    try {
      // Validate message content
      const validation = messageSchema.safeParse({ content });
      if (!validation.success) {
        toast({
          title: "Validation Error",
          description: validation.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // For demo purposes, using a default sender name
      // In a real app, this would come from user profile
      const senderName = 'Current User';

      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: recipientId,
          sender_name: senderName,
          recipient_name: recipientName,
          content: validation.data.content
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message sent successfully",
      });

      // Refresh conversations and current conversation
      await fetchConversations();
      await fetchConversationMessages(recipientId);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return {
    conversations,
    currentConversation,
    loading,
    fetchConversations,
    fetchConversationMessages,
    sendMessage
  };
}