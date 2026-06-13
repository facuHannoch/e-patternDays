# PatternDays Mobile App

Flutter mobile app for PatternDays habit tracking.

## Setup

### Prerequisites

- Flutter SDK 3.12.1 or later
- Android SDK for Android development
- Xcode for iOS development (optional)

### Install Dependencies

```bash
cd mobileapp
flutter pub get
```

### Environment Configuration

Copy `.env.example` to `.env` and configure your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Supabase project credentials.

## Development

### Run on Android Emulator

```bash
flutter run
```

### Run on iOS Simulator

```bash
flutter run -d ios
```

### Run with Release Mode

```bash
flutter run --release
```

## Build

### Android APK

```bash
flutter build apk
```

### Android App Bundle (for Play Store)

```bash
flutter build appbundle
```

### iOS

```bash
flutter build ios
```

## Project Structure

```
lib/
  main.dart              - App entry point
  app/
    app.dart            - Main app widget and auth routing
  features/
    auth/              - Authentication screens and logic
    checkin/           - Today's check-in feature
    habits/            - Habit management
    history/           - History and past entries
    settings/          - User settings
  shared/
    services/          - Shared services (logger, etc.)
    models/            - Shared data models
    repositories/      - Data access layer
```

## Testing

Run tests with:

```bash
flutter test
```

## Deployment

See `docs/` in the repository root for deployment instructions.
