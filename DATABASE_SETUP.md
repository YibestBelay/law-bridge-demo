# Database Setup Guide

This guide will help you set up the complete database schema for LawBridge Ethiopia.

## Prerequisites

1. A Supabase project created
2. Access to Supabase SQL Editor
3. Environment variables configured (`.env.local`)

## Setup Steps

### Step 1: Run the Main Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the entire contents of `supabase/schema.sql`
5. Click **Run** to execute

This will create:
- All database tables (profiles, lawyers, cases, messages, etc.)
- Row Level Security (RLS) policies
- Functions and triggers
- Indexes for performance

**Expected Result**: All tables should be created successfully. Check the **Table Editor** to verify.

### Step 2: Set Up Storage Buckets

1. In Supabase dashboard, go to **Storage**
2. Click **New Bucket** and create these buckets:

   **Bucket 1: `case-documents`**
   - Public: **No** (Private)
   - File size limit: 10MB
   - Allowed MIME types: PDF, DOC, DOCX, JPG, PNG

   **Bucket 2: `lawyer-photos`**
   - Public: **Yes** (Public)
   - File size limit: 5MB
   - Allowed MIME types: JPG, PNG, WEBP

   **Bucket 3: `message-attachments`**
   - Public: **No** (Private)
   - File size limit: 10MB
   - Allowed MIME types: PDF, DOC, DOCX, JPG, PNG

3. Alternatively, run `supabase/storage-setup.sql` in SQL Editor to create buckets and policies automatically

### Step 3: Verify Setup

#### Check Tables
Go to **Table Editor** and verify these tables exist:
- ✅ profiles
- ✅ lawyers
- ✅ cases
- ✅ case_documents
- ✅ conversations
- ✅ messages
- ✅ consultations
- ✅ reviews
- ✅ payments

#### Check RLS Policies
Go to **Authentication** → **Policies** and verify policies are created for each table.

#### Check Storage
Go to **Storage** and verify three buckets are created.

## Testing the Setup

### Test Profile Creation
1. Sign up a new user through your app
2. Check the `profiles` table - a new row should be created automatically

### Test Lawyer Profile
1. Sign up as a lawyer (role: 'lawyer')
2. The profile should be created
3. You can manually insert into `lawyers` table or create an API endpoint

### Test RLS Policies
Try querying tables with different user roles to ensure RLS is working correctly.

## Common Issues

### Issue: "Policy already exists"
**Solution**: The schema uses `DROP POLICY IF EXISTS` to handle this. If you still get errors, manually drop the policy first.

### Issue: "Trigger already exists"
**Solution**: The schema uses `DROP TRIGGER IF EXISTS` to handle this. Re-run the schema if needed.

### Issue: "Bucket already exists"
**Solution**: Use `ON CONFLICT DO NOTHING` in the storage setup SQL, or manually create buckets in the dashboard.

### Issue: "Permission denied"
**Solution**: Make sure you're running the SQL as a database admin. Some operations require elevated privileges.

## Next Steps

After database setup is complete:
1. ✅ Create API routes for data access
2. ✅ Connect frontend components to APIs
3. ✅ Implement file upload functionality
4. ✅ Test all CRUD operations

## Schema Overview

### Core Tables
- **profiles**: User and lawyer basic info
- **lawyers**: Extended lawyer profile information
- **cases**: Legal cases submitted by clients
- **case_documents**: Files attached to cases
- **conversations**: Chat conversations between clients and lawyers
- **messages**: Individual messages in conversations
- **consultations**: Scheduled appointments
- **reviews**: Client reviews of lawyers
- **payments**: Payment transactions (optional)

### Key Features
- ✅ Automatic profile creation on signup
- ✅ Automatic timestamp updates
- ✅ Automatic lawyer stats calculation from reviews
- ✅ Row Level Security for data protection
- ✅ Optimized indexes for fast queries

## Support

If you encounter issues:
1. Check Supabase logs in the dashboard
2. Verify environment variables are set correctly
3. Ensure you have the correct permissions
4. Review the error messages in SQL Editor
