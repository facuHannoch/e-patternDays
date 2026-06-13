import 'package:flutter/material.dart';
import 'app/app.dart';
import 'shared/services/logger.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    // Supabase initialization is deferred to app.dart to allow testing without env vars
  } catch (e) {
    Logger.error('Failed to initialize app: $e');
  }

  runApp(const PatternDaysApp());
}
