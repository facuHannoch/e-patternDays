# DESIGN.md — PatternDays

## 1. Basic Information

* **App name:** PatternDays
* **Domain:** Habit tracking, personal analytics, quantified self
* **Company / publisher:** Qlairos Labs
* **Project code-name:** pattern-days
* **Project ID:** patterndays
* **Fallback Project ID:** patterndays-fad2
* **Package name:** com.qlairoslabs.patterndays
* **Repository name:** a-patterndays
* **One-line description:** A mobile habit check-in app with a web analytics dashboard for seeing how habits relate to mood, energy, and focus.
* **Primary platforms:** Mobile app and web app
* **Primary user input surface:** Mobile app
* **Primary analytics surface:** Web app
* **Backend provider:** Supabase
* **Product status:** Initial design
* **Document created:** 2026-06-13 12:57 America/Argentina/Buenos_Aires
* **Document last updated:** 2026-06-13 12:57 America/Argentina/Buenos_Aires

## 2. Idea

PatternDays is a simple habit tracking app that combines daily mobile check-ins with a web analytics dashboard.

The mobile app is used to quickly record what happened today:

* Which habits were completed.
* Mood score.
* Energy score.
* Focus score.
* Optional note.

The web app is used to review the collected data:

* Habit completion rates.
* Streaks.
* Mood, energy, and focus trends.
* Simple insight cards comparing days when habits were completed vs missed.
* Recent daily entries.

The core idea is to make habit tracking slightly more useful than a basic checklist by connecting habits with how the user felt and performed during the day.

## 3. Rationale

Most habit trackers focus on whether a habit was completed. That is useful, but incomplete.

A user may know that they completed or missed a habit, but not whether the habit seems related to better days. PatternDays adds lightweight subjective signals — mood, energy, and focus — so the user can see simple relationships over time.

The app does not need complex artificial intelligence or advanced statistics to feel useful. Even basic comparisons can provide value:

* Average focus on days when a habit was completed.
* Average energy on days when no habits were completed.
* Most consistent habit this week.
* Recent completion trend.

This makes the product feel like a small personal analytics system while keeping the implementation simple.

## 4. Story

This app idea came from the need to build a simple but realistic product that exercises the full process from idea to deployment.

A basic todo app was considered too generic. The chosen direction was a habit tracking app with web analytics because it remains easy to implement while still touching common production concerns: mobile app, web app, authentication, database, charts, deployment, and app build process.

The app is intentionally scoped as a practical process-training project. It should be useful enough to feel real, but not complex enough to distract from improving the build, deployment, publishing, and sharing workflow.

## 5. Problem It Solves

People often try to build habits but have limited visibility into how those habits relate to their actual day-to-day experience.

A simple checklist can answer:

> Did I do the habit?

But it does not answer:

> Are my days better when I do this habit?

PatternDays helps solve this by giving users a lightweight way to record both habit completion and daily subjective scores.

The specific problems are:

* Habit data is often too isolated from the user’s actual daily state.
* Users may keep streaks without knowing whether those habits are meaningful.
* Tracking systems can become too complex and difficult to maintain.
* Personal analytics often require spreadsheets or manual effort.
* Mobile habit input and web analytics are rarely separated cleanly in simple apps.

## 6. How It Solves the Problem

PatternDays separates the product into two focused surfaces.

The mobile app is optimized for fast input. The user opens the app, marks today’s habits, rates mood, energy, and focus, optionally adds a note, and saves the check-in.

The web app is optimized for review. The user opens the dashboard and sees habit trends, score trends, streaks, and simple insight cards.

The app uses simple deterministic analytics, not complex prediction. It compares completed vs missed habit days and presents the result in plain language.

Example:

> Your average focus is higher on days you complete Deep Work.

This makes the app feel useful while keeping the logic understandable, debuggable, and easy to build.

## 7. Core Product Scope

### 7.1 Mobile App

The mobile app includes:

* Sign in and sign up.
* Today check-in screen.
* Habit management.
* Recent history.
* Settings.

The main screen is the Today screen.

The Today screen lets the user:

* View today’s date.
* Mark active habits as completed or missed.
* Rate mood from 1 to 10.
* Rate energy from 1 to 10.
* Rate focus from 1 to 10.
* Add an optional note.
* Save or update today’s check-in.

### 7.2 Web App

The web app includes:

* Landing page.
* Sign in and sign up.
* Dashboard.
* Habits page.
* Entries page.

The dashboard shows:

* Active habits count.
* Today’s completed habits.
* Current best streak.
* Average completion rate.
* Mood, energy, and focus trends.
* Completion rate by habit.
* Insight cards.
* Recent entries.

### 7.3 Backend

The backend stores:

* User accounts.
* Habits.
* Daily entries.
* Habit completion logs.

Each user can only access their own data.

## 8. Tech Stack

### 8.1 Web App

* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI components:** shadcn/ui or simple custom components
* **Charts:** Recharts
* **Authentication:** Supabase Auth
* **Database access:** Supabase client
* **Deployment target:** Vercel or Cloudflare Pages

### 8.2 Mobile App

* **Framework:** Flutter
* **Language:** Dart
* **Authentication:** Supabase Auth
* **Database access:** Supabase Flutter client
* **Target initial build:** Android
* **Package name:** com.qlairoslabs.patterndays

### 8.3 Backend

* **Provider:** Supabase
* **Database:** Postgres
* **Auth:** Supabase Auth
* **Authorization:** Row Level Security
* **Migrations:** SQL files committed in repository

### 8.4 Tooling

* **Package manager for web:** pnpm
* **Version control:** Git
* **CI:** GitHub Actions
* **Environment examples:** `.env.example` files for web and mobile
* **Documentation:** Markdown files in repository

## 9. Project Structure

Recommended repository structure:

```txt
a-patterndays/
  DESIGN.md
  UI_DESIGN.md
  README.md
  .gitignore

  docs/
    decisions.md
    launch-checklist.md
    app-store-notes.md

  webapp/
    package.json
    pnpm-lock.yaml
    next.config.ts
    src/
      app/
      components/
      lib/
      features/
      styles/

  mobileapp/
    pubspec.yaml
    lib/
      main.dart
      app/
      features/
      shared/

  backend/
    supabase/
      migrations/
      seed.sql
```

The repository root represents the full product. The web app and mobile app are separate subprojects inside the same repository.

This keeps the system easy to understand while allowing each platform to use its own tooling.

## 10. Suggested Web App Routes

### Public Routes

```txt
/
```

Landing page.

```txt
/sign-in
```

Sign in page.

```txt
/sign-up
```

Sign up page.

### Authenticated Routes

```txt
/dashboard
```

Main analytics dashboard.

```txt
/habits
```

Habit management page.

```txt
/entries
```

Daily entries list.

```txt
/entries/[date]
```

Optional daily entry detail page.

## 11. Suggested Mobile App Screens

```txt
SignInScreen
SignUpScreen
TodayScreen
HabitsScreen
HistoryScreen
SettingsScreen
```

Suggested bottom navigation:

```txt
Today | Habits | History | Settings
```

The default authenticated screen should be `TodayScreen`.

## 12. Data Model

### 12.1 users

Managed by Supabase Auth.

Fields used by the app:

```txt
id
email
created_at
```

### 12.2 habits

Represents a habit created by the user.

```txt
id uuid primary key
user_id uuid references auth.users(id)
name text not null
archived boolean not null default false
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

Rules:

* Habits belong to one user.
* Habit names are required.
* Archived habits do not appear in the daily check-in list.
* Archived habits are preserved for historical analytics.

### 12.3 daily_entries

Represents one daily check-in by a user.

```txt
id uuid primary key
user_id uuid references auth.users(id)
date date not null
mood integer not null
energy integer not null
focus integer not null
notes text
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

Rules:

* One daily entry per user per date.
* Mood, energy, and focus are integers from 1 to 10.
* Notes are optional.

Unique constraint:

```txt
unique(user_id, date)
```

### 12.4 habit_logs

Represents whether a habit was completed on a specific date.

```txt
id uuid primary key
user_id uuid references auth.users(id)
habit_id uuid references habits(id)
date date not null
completed boolean not null default false
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

Rules:

* One habit log per user, habit, and date.
* Habit logs are used for completion rates, streaks, and habit comparison insights.

Unique constraint:

```txt
unique(user_id, habit_id, date)
```

## 13. API / Data Access Approach

The app should avoid a custom backend server in the initial version.

The web app and mobile app should access Supabase directly through the Supabase clients.

Supabase is responsible for:

* Authentication.
* Database persistence.
* Row Level Security.
* User-scoped access control.

Application-specific data access should be wrapped in local service/repository modules in both apps.

Suggested web structure:

```txt
webapp/src/lib/supabase/
  client.ts
  server.ts

webapp/src/features/habits/
  queries.ts
  mutations.ts
  types.ts

webapp/src/features/entries/
  queries.ts
  mutations.ts
  analytics.ts
  types.ts
```

Suggested mobile structure:

```txt
mobileapp/lib/features/habits/
  habit_model.dart
  habit_repository.dart
  habit_screen.dart

mobileapp/lib/features/checkin/
  checkin_model.dart
  checkin_repository.dart
  today_screen.dart

mobileapp/lib/features/history/
  history_screen.dart
```

## 14. Analytics Logic

Analytics should be deterministic and simple.

### 14.1 Completion Rate

For a given date range:

```txt
completed habit logs / total possible habit logs
```

### 14.2 Streaks

A habit streak is the number of consecutive days where that habit was completed.

The dashboard should show the best current streak across active habits.

### 14.3 Score Trends

The app should show recent trends for:

* Mood.
* Energy.
* Focus.

These are based on `daily_entries`.

### 14.4 Habit Impact Comparison

For each habit, compare average scores between:

* Days where the habit was completed.
* Days where the habit was missed.

Example:

```txt
Deep Work

Completed days:
- Average mood: 7.1
- Average energy: 6.8
- Average focus: 7.9

Missed days:
- Average mood: 6.3
- Average energy: 6.2
- Average focus: 6.4
```

### 14.5 Insight Cards

Insight cards should use cautious language.

Good:

```txt
Your average focus is higher on days you complete Deep Work.
```

Avoid:

```txt
Deep Work makes you focused.
```

The app should describe observed patterns, not claim causality.

## 15. Important Architectural Decisions

### 15.1 One Repository for the Full Product

The web app, mobile app, backend migrations, and documentation should live in one repository.

Rationale:

* The product is small.
* The apps are part of the same system.
* Keeping everything together reduces process overhead.
* Shared context is easier for humans and agents to understand.

### 15.2 Separate Web and Mobile Subprojects

The repository should keep `webapp/` and `mobileapp/` separate.

Rationale:

* Each platform has different tooling.
* Next.js and Flutter should not be mixed in the same app directory.
* CI and deployment can target each subproject independently.

### 15.3 Supabase as Backend

Supabase should be used for authentication and persistence.

Rationale:

* It reduces backend implementation work.
* It supports both web and mobile clients.
* Postgres is enough for the data model.
* Row Level Security can enforce user-owned data.

### 15.4 No Custom API Server Initially

The app should not include a custom API server in the initial version.

Rationale:

* The app is simple CRUD plus analytics.
* Supabase clients are enough.
* Avoiding an extra server keeps deployment simpler.
* Analytics can be calculated in application code from Supabase data.

### 15.5 Mobile as Primary Input Surface

The mobile app is the main place where users complete daily check-ins.

Rationale:

* Habit tracking is most useful when input is fast.
* A mobile app is better suited for quick daily use.
* The web app can focus on review and analytics instead of daily entry.

### 15.6 Web as Primary Analytics Surface

The web app is the main place where users review patterns.

Rationale:

* Charts and tables are easier to read on larger screens.
* The dashboard can provide a more complete view.
* This creates a clear distinction between mobile and web responsibilities.

### 15.7 Deterministic Insights

Insights should be generated from simple rules and aggregate calculations.

Rationale:

* The app should remain understandable.
* The first version does not need complex modeling.
* Simple comparisons are enough for the product concept.

## 16. Basic Marketing Strategy

PatternDays should use a relaxed long-term strategy, not an intensive launch strategy.

The app is suitable as a simple publishable product and process-training project. It can be shared as a clean example of a mobile + web personal analytics system.

General direction:

* Publish the web app with a clear landing page.
* Publish the mobile app when the Android build is stable.
* Share short demos showing the daily mobile check-in and web dashboard.
* Use a calm, practical positioning around habit tracking and personal analytics.
* Let SEO compound slowly through a basic landing page and app-related content.
* Do not depend on heavy content production or aggressive growth tactics.

The marketing angle should be:

```txt
Track your habits. Notice the patterns.
```

The app should not be positioned as a life-changing productivity system. It should be positioned as a simple private dashboard for understanding daily habits.

## 17. Dates

* **Document created:** 2026-06-13 12:57 America/Argentina/Buenos_Aires
* **Document last updated:** 2026-06-13 12:57 America/Argentina/Buenos_Aires
* **Idea selected:** 2026-06-13
* **UI direction drafted:** 2026-06-13
* **Initial target platform decision:** Android mobile build first, web dashboard deployable first
* **Declared company/publisher:** Qlairos Labs
* **Declared package namespace:** com.qlairoslabs

## 18. Definition of Done

The initial version is complete when:

* The repository contains `webapp/`, `mobileapp/`, `backend/`, and project documentation.
* A user can sign up and sign in.
* A user can create habits.
* A user can complete today’s check-in from the mobile app.
* A user can update today’s check-in.
* A user can view recent history in the mobile app.
* A user can open the web dashboard.
* The web dashboard shows completion rate, streaks, score trends, habit comparisons, insight cards, and recent entries.
* The web app includes a landing page.
* Supabase migrations define the database schema.
* Row Level Security protects user-owned data.
* Environment variables are documented.
* Setup instructions exist for web, mobile, and backend.
* The web app can be deployed.
* The mobile app can be built for Android.
