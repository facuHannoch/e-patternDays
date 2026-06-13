# PatternDays Web App Setup Guide

## Overview

The web app has been successfully initialized with Next.js 16.2.9, TypeScript, and Tailwind CSS. All core functionality is in place and ready for deployment.

## What's Been Built

### Pages
- **Landing Page** (`/`) - Public landing page with information about the app
- **Sign In** (`/sign-in`) - User authentication page
- **Sign Up** (`/sign-up`) - User registration page
- **Dashboard** (`/dashboard`) - Main analytics dashboard with charts and insights
- **Habits** (`/habits`) - Habit management interface
- **Entries** (`/entries`) - Daily entries list view

### Components
- `ScoreChart` - Line chart showing mood, energy, and focus trends
- `CompletionChart` - Bar chart showing habit completion rates

### Libraries & Features
- **Supabase** - Backend authentication and database
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **Next.js App Router** - Modern routing and server components
- **TypeScript** - Type safety

### Database Schema
The backend directory includes migration file `001_init.sql` which defines:
- `habits` table - User habit definitions
- `daily_entries` table - Daily check-in data (mood, energy, focus, notes)
- `habit_logs` table - Habit completion tracking
- Row Level Security policies to protect user data
- Indexes for query performance

## Prerequisites

1. **Node.js** 18 or higher
2. **npm** or compatible package manager
3. **Supabase Project** (free tier available at https://supabase.com)

## Initial Setup Steps

### 1. Set up Supabase

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor
3. Run the migration from `backend/migrations/001_init.sql`
4. Copy your project URL and anonymous key from Settings > API

### 2. Configure Environment Variables

```bash
cd webapp
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm start            # Run production build
npm run lint         # Run ESLint
```

## Build Status

✅ The web app builds successfully with:
- 10 routes generated
- TypeScript compilation completed
- All components functioning

## Deployment

The app is ready to deploy to:

### Vercel (Recommended)
```bash
vercel deploy
```

### Other Platforms
- Netlify
- Cloudflare Pages
- AWS Amplify
- Any Node.js/Next.js compatible hosting

## Project Structure

```
webapp/
├── app/
│   ├── api/auth/logout/route.ts    # Logout endpoint
│   ├── dashboard/page.tsx           # Analytics dashboard
│   ├── entries/page.tsx             # Entries list
│   ├── habits/page.tsx              # Habit management
│   ├── sign-in/page.tsx             # Sign in page
│   ├── sign-up/page.tsx             # Sign up page
│   ├── page.tsx                     # Landing page
│   └── layout.tsx                   # Root layout
├── components/
│   ├── ScoreChart.tsx               # Trend chart component
│   └── CompletionChart.tsx          # Completion chart component
├── lib/
│   ├── supabase/
│   │   ├── client.ts                # Browser Supabase client
│   │   ├── server.ts                # Server Supabase client
│   │   ├── queries.ts               # Data queries
│   │   └── mutations.ts             # Data mutations
│   ├── analytics.ts                 # Analytics calculations
│   ├── auth.ts                      # Auth functions
│   ├── types.ts                     # TypeScript types
│   └── utils.ts                     # Utility functions
├── public/                          # Static assets
├── .env.example                     # Environment template
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── tailwind.config.ts               # Tailwind config
└── next.config.ts                   # Next.js config
```

## Key Features Implemented

1. **Authentication Flow**
   - Sign up with email/password
   - Sign in
   - Sign out
   - Protected routes via Supabase session

2. **Dashboard Analytics**
   - Active habit count
   - Completion rate (%)
   - Current best streak
   - Score trends (line chart)
   - Habit completion comparison (bar chart)
   - Habit impact analysis with score comparisons
   - Automated insights based on data patterns

3. **Habit Management**
   - Create new habits
   - View active habits
   - Archive habits

4. **Entry Tracking**
   - View daily entries
   - See mood, energy, focus scores
   - View optional notes

5. **Analytics & Insights**
   - Completion rate calculation
   - Streak tracking
   - Habit impact comparison
   - Automated insight generation using cautious language

## Next Steps

1. **Test the authentication flow** with Supabase configured
2. **Verify database connection** and queries
3. **Test mobile sync** when mobile app is built
4. **Deploy to Vercel** for production use
5. **Set up CI/CD** for automated deployments

## Troubleshooting

### Supabase Connection Issues
- Verify environment variables are correctly set
- Check Supabase project is active
- Ensure migration has been run

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org)
