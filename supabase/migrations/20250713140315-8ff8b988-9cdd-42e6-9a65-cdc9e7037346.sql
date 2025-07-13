-- Create photo access requests table
CREATE TABLE public.photo_access_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID NOT NULL,
  requester_name TEXT NOT NULL,
  profile_owner_id UUID NOT NULL,
  profile_owner_name TEXT NOT NULL,
  photo_index INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(requester_id, profile_owner_id, photo_index)
);

-- Enable Row Level Security
ALTER TABLE public.photo_access_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for photo access requests
CREATE POLICY "Users can view their own requests and received requests" 
ON public.photo_access_requests 
FOR SELECT 
USING (auth.uid()::text = requester_id::text OR auth.uid()::text = profile_owner_id::text);

CREATE POLICY "Users can create photo access requests" 
ON public.photo_access_requests 
FOR INSERT 
WITH CHECK (auth.uid()::text = requester_id::text);

CREATE POLICY "Profile owners can update requests for their photos" 
ON public.photo_access_requests 
FOR UPDATE 
USING (auth.uid()::text = profile_owner_id::text);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_photo_access_requests_updated_at
BEFORE UPDATE ON public.photo_access_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();