import 'package:flutter/material.dart';
import '../features/auth/login_screen.dart';
import 'main_navigation.dart';

class PatternDaysApp extends StatefulWidget {
  const PatternDaysApp({super.key});

  @override
  State<PatternDaysApp> createState() => _PatternDaysAppState();
}

class _PatternDaysAppState extends State<PatternDaysApp> {
  bool isLoggedIn = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PatternDays',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: isLoggedIn ? const MainNavigation() : _DemoLoginScreen(
        onLoginSuccess: () {
          setState(() {
            isLoggedIn = true;
          });
        },
      ),
    );
  }
}

class _DemoLoginScreen extends StatelessWidget {
  final VoidCallback onLoginSuccess;

  const _DemoLoginScreen({required this.onLoginSuccess});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'PatternDays',
                style: Theme.of(context).textTheme.displayMedium,
              ),
              const SizedBox(height: 16),
              Text(
                'Track your habits, notice the patterns',
                style: Theme.of(context).textTheme.bodyLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 48),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    // Demo: Just proceed to app for now
                    onLoginSuccess();
                  },
                  child: const Text('Sign In'),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: () {
                    // Demo: Just proceed to app for now
                    onLoginSuccess();
                  },
                  child: const Text('Sign Up'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
