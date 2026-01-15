# Authentication Setup Guide

This guide will help you set up Supabase authentication for LawBridge Ethiopia.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Setup Steps

### 1. Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in your project details and create the project
4. Wait for the project to be fully set up

### 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 3. Set Up Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### 4. Set Up the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to execute the SQL

This will create:
- A `profiles` table to store user information
- Row Level Security (RLS) policies
- A trigger to automatically create profiles when users sign up
- A trigger to update the `updated_at` timestamp

### 5. Configure Email Authentication

1. In Supabase, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure your email settings:
   - Go to **Authentication** → **Email Templates**
   - Customize the confirmation email template if needed
   - Set up SMTP settings (optional, for custom email sending)

### 6. Configure Google OAuth (Optional but Recommended)

1. In Supabase, go to **Authentication** → **Providers**
2. Click on **Google** provider
3. Enable Google provider
4. You'll need to set up OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Add authorized redirect URI: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - Copy the **Client ID** and **Client Secret**
   - Paste them into Supabase Google provider settings
5. Save the configuration

**Note:** For local development, you may need to add `http://localhost:3000/api/auth/google` as a redirect URI in Google Cloud Console.

### 6. Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your app and try:
   - Creating a new account
   - Signing in with existing credentials
   - Signing out

## Features Implemented

### Sign Up
- Email and password registration
- Full name and phone number collection
- Role selection (User or Lawyer)
- **Email verification required** - Users must verify their email before signing in
- Clear messaging about email verification
- Automatic profile creation

### Sign In
- Email and password authentication
- **Email verification check** - Unverified users cannot sign in
- Google OAuth authentication (one-click sign in)
- Remember me functionality
- Session management
- Automatic profile loading

### Security
- Row Level Security (RLS) enabled
- Users can only access their own profile
- Password validation (minimum 6 characters)
- Email format validation

## API Routes

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/signin` - Sign in an existing user
- `POST /api/auth/signout` - Sign out the current user
- `GET /api/auth/user` - Get the current user's information

## Using Authentication in Components

```tsx
import { useAuth } from '@/lib/auth-context'

function MyComponent() {
  const { user, profile, loading, signIn, signUp, signOut } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>

  return (
    <div>
      <p>Welcome, {profile?.full_name}!</p>
      <p>Role: {profile?.role}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

## Troubleshooting

### "Invalid API key" error
- Make sure your `.env.local` file has the correct values
- Restart your development server after changing environment variables

### "Profile not found" error
- Make sure you've run the SQL schema in Supabase
- Check that the trigger function was created successfully

### Email verification not working
- Check your Supabase email settings
- Make sure SMTP is configured if using custom email
- Check spam folder for verification emails

### Session not persisting
- Make sure middleware is set up correctly
- Check browser cookies are enabled
- Verify Supabase URL and keys are correct

## Email Verification

The system requires users to verify their email addresses before they can sign in. When a user signs up:

1. They receive a verification email from Supabase
2. They must click the verification link in the email
3. Only after verification can they sign in
4. If they try to sign in before verification, they'll see a clear error message

**Important:** Make sure email verification is enabled in your Supabase project settings.

## Google OAuth

Google sign-in is fully functional. Users can:
- Click "Continue with Google" button
- Be redirected to Google for authentication
- Automatically create an account or sign in
- Have their profile automatically created

## Next Steps

- Add password reset functionality
- Add more social authentication providers (Facebook, etc.)
- Add profile editing
- Add role-based access control for different pages
- Add email resend functionality
