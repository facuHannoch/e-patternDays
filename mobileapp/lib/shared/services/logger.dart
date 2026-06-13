import 'dart:developer' as developer;

class Logger {
  static void info(String message) {
    developer.log(message, name: 'PatternDays');
  }

  static void error(String message, [Object? error, StackTrace? stackTrace]) {
    developer.log(
      message,
      name: 'PatternDays',
      error: error,
      stackTrace: stackTrace,
    );
  }

  static void debug(String message) {
    developer.log(message, name: 'PatternDays.debug');
  }
}
