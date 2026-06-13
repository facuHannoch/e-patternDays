import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  final entries = [
    {
      'date': DateTime.now(),
      'mood': 7,
      'energy': 6,
      'focus': 8,
      'completedHabits': 3,
      'totalHabits': 4,
      'notes': 'Great day at work',
    },
    {
      'date': DateTime.now().subtract(const Duration(days: 1)),
      'mood': 6,
      'energy': 5,
      'focus': 6,
      'completedHabits': 2,
      'totalHabits': 4,
      'notes': 'Busy with meetings',
    },
    {
      'date': DateTime.now().subtract(const Duration(days: 2)),
      'mood': 8,
      'energy': 7,
      'focus': 9,
      'completedHabits': 4,
      'totalHabits': 4,
      'notes': 'Productive day',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('History'),
        elevation: 0,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: entries.length,
        itemBuilder: (context, index) {
          final entry = entries[index] as Map<String, dynamic>;
          final date = DateFormat('MMM d, yyyy').format(entry['date'] as DateTime);
          final completedHabits = entry['completedHabits'] as int;
          final totalHabits = entry['totalHabits'] as int;

          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              title: Text(date),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      _buildScoreChip('Mood', entry['mood'] as int),
                      const SizedBox(width: 8),
                      _buildScoreChip('Energy', entry['energy'] as int),
                      const SizedBox(width: 8),
                      _buildScoreChip('Focus', entry['focus'] as int),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Habits: $completedHabits/$totalHabits completed',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                  if ((entry['notes'] as String?).isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.only(top: 8),
                      child: Text(
                        entry['notes'] as String,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          fontStyle: FontStyle.italic,
                          color: Colors.grey[600],
                        ),
                      ),
                    ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildScoreChip(String label, int score) {
    final color = _getScoreColor(score);
    return Chip(
      label: Text('$label: $score'),
      backgroundColor: color.withOpacity(0.2),
      labelStyle: TextStyle(color: color),
    );
  }

  Color _getScoreColor(int score) {
    if (score >= 7) return Colors.green;
    if (score >= 5) return Colors.orange;
    return Colors.red;
  }
}
