-- ============================================
-- LawBridge Ethiopia - Storage Buckets Setup
-- ============================================
-- Run this in Supabase SQL Editor after creating the main schema
-- ============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  (
    'case-documents',
    'case-documents',
    false,
    10485760, -- 10MB limit
    ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  ),
  (
    'lawyer-photos',
    'lawyer-photos',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  ),
  (
    'message-attachments',
    'message-attachments',
    false,
    10485760, -- 10MB limit
    ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Storage Policies for case-documents
-- ============================================

-- Users can upload case documents to their own folder
CREATE POLICY "Users can upload case documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'case-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can view case documents they have access to
CREATE POLICY "Users can view case documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'case-documents'
    AND (
      -- Own documents
      auth.uid()::text = (storage.foldername(name))[1]
      OR
      -- Documents from cases they're involved in
      EXISTS (
        SELECT 1 FROM case_documents cd
        JOIN cases c ON c.id = cd.case_id
        WHERE cd.file_url LIKE '%' || storage.objects.name
        AND (c.client_id = auth.uid() OR c.lawyer_id = auth.uid())
      )
    )
  );

-- Users can delete their own case documents
CREATE POLICY "Users can delete own case documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'case-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- Storage Policies for lawyer-photos
-- ============================================

-- Lawyer photos are publicly viewable
CREATE POLICY "Lawyer photos are public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'lawyer-photos');

-- Lawyers can upload their own photos
CREATE POLICY "Lawyers can upload own photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'lawyer-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'lawyer'
    )
  );

-- Lawyers can update their own photos
CREATE POLICY "Lawyers can update own photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'lawyer-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Lawyers can delete their own photos
CREATE POLICY "Lawyers can delete own photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'lawyer-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- Storage Policies for message-attachments
-- ============================================

-- Users can upload message attachments
CREATE POLICY "Users can upload message attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'message-attachments'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can view message attachments from their conversations
CREATE POLICY "Users can view message attachments"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'message-attachments'
    AND (
      -- Own attachments
      auth.uid()::text = (storage.foldername(name))[1]
      OR
      -- Attachments from conversations they're part of
      EXISTS (
        SELECT 1 FROM messages m
        JOIN conversations c ON c.id = m.conversation_id
        WHERE m.attachments::text LIKE '%' || storage.objects.name || '%'
        AND (c.client_id = auth.uid() OR c.lawyer_id = auth.uid())
      )
    )
  );

-- Users can delete their own message attachments
CREATE POLICY "Users can delete own message attachments"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'message-attachments'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
