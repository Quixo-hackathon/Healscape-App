# Supabase Setup Guide for HealScape

This guide will walk you through setting up Supabase for the HealScape application.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in.
2. Create a new project from the dashboard.
3. Choose a name for your project and set a secure database password.
4. Select your region (choose one closest to your users for better performance).
5. Wait for your project to be created (this may take a few minutes).

## 2. Set Up Database Schema

1. Once your project is created, navigate to the SQL Editor in the Supabase dashboard.
2. Copy the contents of the `supabase/schema.sql` file from this repository.
3. Paste the SQL into the SQL Editor and run it to create the necessary tables and set up Row Level Security.

## 3. Configure Authentication

1. In the Supabase dashboard, go to Authentication > Settings.
2. Under Email Auth, make sure "Enable Email Signup" is turned on.
3. Optionally, configure additional authentication providers as needed (Google, GitHub, etc.).

## 4. Get API Keys

1. In the Supabase dashboard, go to Settings > API.
2. You'll find your project URL and anon key (public API key).
3. Copy these values as you'll need them for the next step.

## 5. Configure Environment Variables

1. In your project directory, locate the `.env` file (or create one if it doesn't exist).
2. Add the following environment variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values you copied in the previous step.

## 6. Test the Connection

1. Start your development server with `npm run dev`.
2. Try to sign up and log in to verify that the Supabase connection is working correctly.

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)