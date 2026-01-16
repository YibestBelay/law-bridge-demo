-- ============================================
-- LawBridge Ethiopia - Complete Database Schema
-- ============================================

-- ============================================
-- 1. PROFILES TABLE (Already exists, keeping for reference)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('user', 'lawyer')) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Lawyers can view all profiles" ON profiles;

-- Create policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Public profiles are viewable by everyone (for lawyer directory)
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- ============================================
-- 2. LAWYERS TABLE (Extended profile for lawyers)
-- ============================================
CREATE TABLE IF NOT EXISTS lawyers (
  id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  title TEXT,
  bio TEXT,
  specialization TEXT[] DEFAULT '{}',
  location TEXT,
  experience INTEGER DEFAULT 0,
  hourly_rate DECIMAL(10, 2),
  consultation_fee DECIMAL(10, 2),
  license_number TEXT,
  languages TEXT[] DEFAULT '{}',
  education JSONB DEFAULT '[]'::jsonb,
  availability_status TEXT CHECK (availability_status IN ('now', 'week', 'any')) DEFAULT 'any',
  response_time TEXT,
  cases_handled INTEGER DEFAULT 0,
  success_rate DECIMAL(5, 2) DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;

-- Lawyers can view all lawyer profiles (for directory)
CREATE POLICY "Lawyers are viewable by everyone"
  ON lawyers FOR SELECT
  USING (true);

-- Lawyers can update their own profile
CREATE POLICY "Lawyers can update own profile"
  ON lawyers FOR UPDATE
  USING (auth.uid() = id);

-- Lawyers can insert their own profile
CREATE POLICY "Lawyers can insert own profile"
  ON lawyers FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 3. CASES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lawyer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  case_number TEXT UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK (status IN ('draft', 'submitted', 'pending_review', 'in_progress', 'completed', 'cancelled')) DEFAULT 'draft',
  urgency TEXT CHECK (urgency IN ('low', 'moderate', 'urgent', 'flexible')) DEFAULT 'moderate',
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  payment_preference TEXT CHECK (payment_preference IN ('fixed', 'hourly', 'flexible')) DEFAULT 'flexible',
  location_preference TEXT,
  preferred_language TEXT,
  issue_start_date DATE,
  legal_action_taken BOOLEAN DEFAULT false,
  case_number_existing TEXT,
  other_parties TEXT,
  additional_notes TEXT,
  lawyer_preferences TEXT[] DEFAULT '{}',
  additional_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Clients can view their own cases
CREATE POLICY "Clients can view own cases"
  ON cases FOR SELECT
  USING (auth.uid() = client_id);

-- Lawyers can view cases assigned to them
CREATE POLICY "Lawyers can view assigned cases"
  ON cases FOR SELECT
  USING (auth.uid() = lawyer_id);

-- Clients can create their own cases
CREATE POLICY "Clients can create own cases"
  ON cases FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- Clients can update their own cases (if not in progress)
CREATE POLICY "Clients can update own cases"
  ON cases FOR UPDATE
  USING (auth.uid() = client_id AND status IN ('draft', 'submitted', 'pending_review'));

-- Lawyers can update cases assigned to them
CREATE POLICY "Lawyers can update assigned cases"
  ON cases FOR UPDATE
  USING (auth.uid() = lawyer_id);

-- ============================================
-- 4. CASE DOCUMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS case_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE case_documents ENABLE ROW LEVEL SECURITY;

-- Users can view documents for cases they have access to
CREATE POLICY "Users can view case documents"
  ON case_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = case_documents.case_id
      AND (cases.client_id = auth.uid() OR cases.lawyer_id = auth.uid())
    )
  );

-- Users can upload documents to their own cases
CREATE POLICY "Users can upload to own cases"
  ON case_documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = case_documents.case_id
      AND cases.client_id = auth.uid()
    )
  );

-- Lawyers can upload documents to assigned cases
CREATE POLICY "Lawyers can upload to assigned cases"
  ON case_documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = case_documents.case_id
      AND cases.lawyer_id = auth.uid()
    )
  );

-- ============================================
-- 5. CONVERSATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lawyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  last_message_at TIMESTAMP WITH TIME ZONE,
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(client_id, lawyer_id, case_id)
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Users can view conversations they're part of
CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = client_id OR auth.uid() = lawyer_id);

-- Users can create conversations
CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = client_id OR auth.uid() = lawyer_id);

-- Users can update conversations they're part of
CREATE POLICY "Users can update own conversations"
  ON conversations FOR UPDATE
  USING (auth.uid() = client_id OR auth.uid() = lawyer_id);

-- ============================================
-- 6. MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages in conversations they're part of
CREATE POLICY "Users can view conversation messages"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (conversations.client_id = auth.uid() OR conversations.lawyer_id = auth.uid())
    )
  );

-- Users can send messages in conversations they're part of
CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (conversations.client_id = auth.uid() OR conversations.lawyer_id = auth.uid())
    )
  );

-- Users can update read status of messages in their conversations
CREATE POLICY "Users can update message read status"
  ON messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (conversations.client_id = auth.uid() OR conversations.lawyer_id = auth.uid())
    )
  );

-- ============================================
-- 7. CONSULTATIONS/APPOINTMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lawyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  meeting_link TEXT,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Users can view consultations they're part of
CREATE POLICY "Users can view own consultations"
  ON consultations FOR SELECT
  USING (auth.uid() = client_id OR auth.uid() = lawyer_id);

-- Clients can create consultations
CREATE POLICY "Clients can create consultations"
  ON consultations FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- Users can update consultations they're part of
CREATE POLICY "Users can update own consultations"
  ON consultations FOR UPDATE
  USING (auth.uid() = client_id OR auth.uid() = lawyer_id);

-- ============================================
-- 8. REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(lawyer_id, client_id, case_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Everyone can view reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

-- Clients can create reviews for their cases
CREATE POLICY "Clients can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = client_id
    AND EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = reviews.case_id
      AND cases.client_id = auth.uid()
      AND cases.lawyer_id = reviews.lawyer_id
    )
  );

-- Clients can update their own reviews
CREATE POLICY "Clients can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = client_id);

-- ============================================
-- 9. PAYMENTS TABLE (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lawyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'ETB',
  status TEXT CHECK (status IN ('pending', 'completed', 'refunded', 'failed')) DEFAULT 'pending',
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can view payments they're part of
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = client_id OR auth.uid() = lawyer_id);

-- Clients can create payments
CREATE POLICY "Clients can create payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- ============================================
-- 10. FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update conversation last_message_at
CREATE OR REPLACE FUNCTION public.update_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET last_message_at = NEW.created_at,
      updated_at = TIMEZONE('utc'::text, NOW())
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update lawyer stats from reviews
CREATE OR REPLACE FUNCTION public.update_lawyer_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE lawyers
  SET 
    rating = (
      SELECT COALESCE(AVG(rating)::DECIMAL(3,2), 0)
      FROM reviews
      WHERE reviews.lawyer_id = NEW.lawyer_id
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE reviews.lawyer_id = NEW.lawyer_id
    )
  WHERE id = NEW.lawyer_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_profile_updated ON profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_lawyer_updated ON lawyers;
CREATE TRIGGER on_lawyer_updated
  BEFORE UPDATE ON lawyers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_case_updated ON cases;
CREATE TRIGGER on_case_updated
  BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_conversation_updated ON conversations;
CREATE TRIGGER on_conversation_updated
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_message_created ON messages;
CREATE TRIGGER on_message_created
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION public.update_conversation_timestamp();

DROP TRIGGER IF EXISTS on_consultation_updated ON consultations;
CREATE TRIGGER on_consultation_updated
  BEFORE UPDATE ON consultations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_review_created ON reviews;
CREATE TRIGGER on_review_created
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_lawyer_stats();

DROP TRIGGER IF EXISTS on_review_updated ON reviews;
CREATE TRIGGER on_review_updated
  AFTER UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_lawyer_stats();

DROP TRIGGER IF EXISTS on_payment_updated ON payments;
CREATE TRIGGER on_payment_updated
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 11. INDEXES FOR PERFORMANCE
-- ============================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Lawyers indexes
CREATE INDEX IF NOT EXISTS idx_lawyers_location ON lawyers(location);
CREATE INDEX IF NOT EXISTS idx_lawyers_specialization ON lawyers USING GIN(specialization);
CREATE INDEX IF NOT EXISTS idx_lawyers_rating ON lawyers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_lawyers_verified ON lawyers(verified);

-- Cases indexes
CREATE INDEX IF NOT EXISTS idx_cases_client_id ON cases(client_id);
CREATE INDEX IF NOT EXISTS idx_cases_lawyer_id ON cases(lawyer_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_category ON cases(category);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at DESC);

-- Case documents indexes
CREATE INDEX IF NOT EXISTS idx_case_documents_case_id ON case_documents(case_id);

-- Conversations indexes
CREATE INDEX IF NOT EXISTS idx_conversations_client_id ON conversations(client_id);
CREATE INDEX IF NOT EXISTS idx_conversations_lawyer_id ON conversations(lawyer_id);
CREATE INDEX IF NOT EXISTS idx_conversations_case_id ON conversations(case_id);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message_at ON conversations(last_message_at DESC);

-- Messages indexes
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read) WHERE read = false;

-- Consultations indexes
CREATE INDEX IF NOT EXISTS idx_consultations_client_id ON consultations(client_id);
CREATE INDEX IF NOT EXISTS idx_consultations_lawyer_id ON consultations(lawyer_id);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduled_at ON consultations(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_lawyer_id ON reviews(lawyer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_client_id ON reviews(client_id);
CREATE INDEX IF NOT EXISTS idx_reviews_case_id ON reviews(case_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Payments indexes
CREATE INDEX IF NOT EXISTS idx_payments_client_id ON payments(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_lawyer_id ON payments(lawyer_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- ============================================
-- 12. STORAGE BUCKETS SETUP (Run in Supabase Dashboard)
-- ============================================
-- Note: Storage buckets need to be created via Supabase Dashboard or API
-- Buckets needed:
-- 1. 'case-documents' - for case files (private)
-- 2. 'lawyer-photos' - for lawyer profile photos (public)
-- 3. 'message-attachments' - for message attachments (private)

-- Example SQL for creating buckets (run in Supabase SQL Editor):
/*
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('case-documents', 'case-documents', false),
  ('lawyer-photos', 'lawyer-photos', true),
  ('message-attachments', 'message-attachments', false);

-- Storage policies for case-documents
CREATE POLICY "Users can upload case documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'case-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view case documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'case-documents'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR EXISTS (
        SELECT 1 FROM case_documents cd
        JOIN cases c ON c.id = cd.case_id
        WHERE cd.file_url LIKE '%' || storage.objects.name
        AND (c.client_id = auth.uid() OR c.lawyer_id = auth.uid())
      )
    )
  );

-- Storage policies for lawyer-photos
CREATE POLICY "Lawyer photos are public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'lawyer-photos');

CREATE POLICY "Lawyers can upload own photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'lawyer-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for message-attachments
CREATE POLICY "Users can upload message attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'message-attachments'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
*/

-- ============================================
-- END OF SCHEMA
-- ============================================
