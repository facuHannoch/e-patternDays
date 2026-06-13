# Smart Habit Coach — UI Design

## 1. Design Direction

Smart Habit Coach should feel calm, private, and analytical.

The app is not a motivational habit game. It is a lightweight personal analytics tool for tracking habits, mood, energy, and focus. The interface should help users complete a quick daily check-in and later understand patterns in their behavior.

The design should feel closer to a clean personal dashboard than to a gamified productivity app.

## 2. Product Feeling

The app should feel like:

* A quiet personal analytics tool.
* A simple daily check-in ritual.
* A private quantified-self dashboard.
* A calm place to observe patterns.

The app should not feel like:

* A game.
* A social habit app.
* A loud motivational coach.
* A complex productivity system.
* A corporate admin dashboard.

## 3. Visual Style

The visual style should be minimal, readable, and restrained.

Use:

* Soft neutral backgrounds.
* White or near-white cards.
* Gentle borders.
* Clear typography.
* Muted accent colors.
* Simple charts.
* Comfortable spacing.
* Minimal decoration.

Avoid:

* Loud gradients.
* Neon colors.
* Confetti.
* Mascots.
* Heavy gamification.
* Dense dashboards.
* Excessive shadows.
* Too many competing colors.

## 4. Color Palette

Use a mostly neutral palette with one primary accent color.

Recommended direction:

```txt
Background: warm off-white or very light gray
Surface/cards: white
Primary text: near-black or dark slate
Secondary text: muted gray
Borders: light gray
Primary accent: muted teal
Positive: muted green
Warning: soft amber
Negative: muted red
```

The default accent should be muted teal because it feels calm, clear, and slightly health/data-oriented without feeling medical or corporate.

Habit colors may exist, but they should be muted. The interface should not become visually noisy when several habits are shown together.

## 5. Typography

Use a clean sans-serif typeface.

Good options:

* Inter
* Geist
* System font stack
* IBM Plex Sans

Typography should prioritize readability, especially for dashboard numbers and small labels.

For web dashboards, numeric values should use tabular numbers when possible.

Example CSS direction:

```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
font-feature-settings: "tnum";
```

Headings should be clear but not oversized. The app should avoid dramatic hero typography except on the landing page.

## 6. Layout Principles

The UI should use a card-based structure with clear hierarchy.

General layout principles:

* Keep primary actions obvious.
* Keep screens focused on one main task.
* Use generous spacing.
* Use section titles to reduce cognitive load.
* Prefer short, direct labels.
* Avoid hiding important actions behind menus.
* Use empty states to explain what the user should do next.

## 7. Tone of Voice

The app’s writing should be calm, direct, and observational.

Use language like:

```txt
Your focus tends to be higher on days you complete Deep Work.
You have checked in 5 days this week.
Complete a few more check-ins to see patterns.
No habits yet. Create one or two habits you want to observe.
```

Avoid language like:

```txt
Amazing job!
You crushed it!
Become unstoppable!
Keep grinding!
Level up your life!
```

The app should not pretend to know more than the data supports. Insights should be phrased carefully.

Good:

```txt
Your average focus is higher on days you complete Reading.
```

Avoid:

```txt
Reading makes you more focused.
```

## 8. Mobile App UI

The mobile app should be optimized for fast daily use.

The default post-login screen should be the Today screen. The user should be able to complete the daily check-in in under one minute.

### 8.1 Mobile Navigation

Use a simple bottom navigation with a small number of tabs:

```txt
Today | Habits | History | Settings
```

The Today screen is the primary screen.

### 8.2 Today Screen

Purpose:

The main daily check-in surface.

Suggested structure:

```txt
Today
Tuesday, June 13

Habits
[✓] Morning walk
[ ] Deep work
[✓] Reading

How was the day?
Mood    7
Energy  6
Focus   8

Note
[Optional short note...]

[Save check-in]
```

Design principles:

* Date should be visible.
* Habit toggles should be large and easy to tap.
* Mood, energy, and focus inputs should be simple.
* The note field should be optional and visually secondary.
* Save state should be clear.
* If the check-in has already been saved, the screen should show the saved values and allow editing.

### 8.3 Habit Toggles

Habit toggles should feel simple and lightweight.

Possible designs:

* Checkbox rows.
* Toggle rows.
* Pill buttons with selected state.

Each habit row should include:

* Habit name.
* Completion state.
* Optional muted color indicator.

Avoid making each habit row too visually heavy.

### 8.4 Rating Inputs

Mood, energy, and focus should be rated from 1 to 10.

Recommended UI options:

* Horizontal segmented control.
* Slider with numeric value.
* Plus/minus stepper with a large number.

The selected value should be obvious. The control should be easy to use with one hand.

### 8.5 History Screen

The History screen should provide a quick recent overview.

Each row/card should show:

* Date.
* Number of completed habits.
* Mood score.
* Energy score.
* Focus score.
* Optional note preview.

The screen should not attempt to be a full analytics dashboard. That is the role of the web app.

### 8.6 Habits Screen

The Habits screen should be simple.

It should include:

* Active habits list.
* Add habit button.
* Edit habit action.
* Archive habit action.

The design should make habit management feel low-friction.

### 8.7 Settings Screen

The Settings screen should be minimal.

It should include:

* Signed-in user email.
* Sign out button.
* App version.

## 9. Web App UI

The web app should feel like a clean personal analytics dashboard.

It should make the user’s data understandable without overwhelming them.

### 9.1 Web Navigation

Recommended structure:

```txt
Dashboard | Habits | Entries
```

The dashboard should be the default authenticated page.

### 9.2 Landing Page

The landing page should be simple and direct.

It should explain:

* What the app does.
* Why mobile check-ins matter.
* What the web dashboard provides.

Suggested headline direction:

```txt
Track your habits. Notice the patterns.
```

Suggested value proposition:

```txt
A simple daily check-in app that helps you see how your habits relate to mood, energy, and focus.
```

The landing page should have one primary call to action.

### 9.3 Dashboard Page

The dashboard should be organized into clear sections:

```txt
Greeting / summary

Overview cards
- Active habits
- Today’s completed habits
- Best streak
- Average completion rate

Trends
- Mood trend
- Energy trend
- Focus trend

Habits
- Completion rate by habit

Insights
- Simple habit comparison cards

Recent Entries
- Small table or list
```

The dashboard should not feel dense. It is better to show fewer metrics clearly than many metrics poorly.

### 9.4 Overview Cards

Overview cards should be compact and readable.

Each card should include:

* Short label.
* Main number.
* Small supporting text if useful.

Example:

```txt
Average Focus
7.2
Last 7 check-ins
```

### 9.5 Charts

Charts should be simple and understated.

Use:

* Thin lines.
* Minimal grid lines.
* Clear labels.
* Muted colors.
* Short explanations near the chart.

Avoid:

* Overly bright chart colors.
* Too many series in one chart.
* Complex legends.
* Unnecessary chart types.

Charts should answer practical questions:

* Are my scores improving?
* Which habits am I completing?
* Which habits seem associated with better days?

### 9.6 Insight Cards

Insight cards should translate simple analytics into plain language.

Examples:

```txt
Your focus tends to be higher on days you complete Deep Work.
Your most consistent habit this week is Reading.
Your average energy is highest on days with at least 3 completed habits.
```

If there is not enough data, show an empty state:

```txt
Complete a few daily check-ins to unlock habit insights.
```

### 9.7 Entries Page

The Entries page should show daily check-ins in a table or list.

Columns/content:

* Date.
* Completed habits.
* Mood.
* Energy.
* Focus.
* Note preview.

The page should be easy to scan.

### 9.8 Habits Page

The Habits page should allow basic habit management.

Content:

* Active habits table/list.
* Create habit form.
* Edit action.
* Archive action.

The page should not feel like a complex admin panel.

## 10. Empty States

Empty states should be calm and instructive.

Examples:

### No habits

```txt
No habits yet

Create one or two habits you want to observe. You can change them later.
```

### No check-ins

```txt
No check-ins yet

Complete today’s check-in to start building your personal dashboard.
```

### No insights

```txt
No insights yet

Complete a few daily check-ins to compare habits with mood, energy, and focus.
```

## 11. Interaction Principles

The app should feel responsive and predictable.

Interaction principles:

* Saving should provide immediate feedback.
* Loading states should be visible but subtle.
* Errors should be clear and recoverable.
* Inputs should preserve user progress when possible.
* The user should not lose a partially written note accidentally.
* Destructive actions, such as archiving a habit, should require confirmation or provide undo.

## 12. Accessibility

The UI should be usable with good contrast, clear labels, and large touch targets.

Requirements:

* Text should have sufficient contrast.
* Interactive elements should have visible focus states.
* Mobile tap targets should be comfortable.
* Charts should not rely only on color.
* Form inputs should have labels.
* Error messages should be associated with the relevant input.

## 13. Responsive Behavior

The web app should work on desktop and mobile browsers, but the primary web dashboard experience is desktop/tablet.

Responsive expectations:

* Dashboard cards should wrap on smaller screens.
* Tables should become stacked lists or horizontally scrollable.
* Charts should remain readable.
* Navigation should collapse cleanly when needed.

## 14. Design Summary

```txt
Style: calm quantified-self dashboard
Personality: observant, private, precise
Colors: warm neutral + muted teal
Typography: clean sans-serif with readable numbers
Mobile: fast daily check-in ritual
Web: clean personal analytics dashboard
Avoid: gamification, hype, clutter, bright colors
```
