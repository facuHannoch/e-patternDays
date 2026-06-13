# PatternDays Web App

The web analytics dashboard for PatternDays, built with Next.js and TypeScript.

## Features

- User authentication with Supabase
- Dashboard with habit analytics and insights
- Score trend visualization (mood, energy, focus)
- Habit completion tracking
- Habit impact analysis
- Daily entries review

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase project

### Setup

1. Copy environment variables:
```bash
cp .env.example .env.local
```

2. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

The app will be available at http://localhost:3000

## Database Setup

Run the migration in `backend/migrations/001_init.sql` in your Supabase SQL editor to set up the schema.

## Project Structure

```
webapp/
  app/
    api/              # API routes
    dashboard/        # Analytics dashboard
    entries/          # Entries list page
    habits/           # Habits management
    sign-in/          # Authentication
    sign-up/
    page.tsx          # Landing page
    layout.tsx        # Root layout
  components/         # Reusable components
  lib/
    supabase/         # Supabase client and server config
    analytics.ts      # Analytics calculations
    auth.ts           # Auth functions
    types.ts          # TypeScript types
    utils.ts          # Utility functions
```

## Building

```bash
npm run build
```

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Or any other Next.js-compatible hosting platform.
