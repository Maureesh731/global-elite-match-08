-- Approve the lady test application and profile
UPDATE public.applications SET status = 'approved' WHERE username = 'testlady2026';
UPDATE public.profiles SET status = 'approved' WHERE user_id = '8fa052ee-8ffa-41f5-b134-1df2c0071057';

-- Update message restrictions for paid lady (can send messages)
INSERT INTO public.message_restrictions (user_id, can_send_messages)
VALUES ('8fa052ee-8ffa-41f5-b134-1df2c0071057', true)
ON CONFLICT (user_id) DO UPDATE SET can_send_messages = true;