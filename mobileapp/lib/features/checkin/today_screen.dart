import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class TodayScreen extends StatefulWidget {
  const TodayScreen({super.key});

  @override
  State<TodayScreen> createState() => _TodayScreenState();
}

class _TodayScreenState extends State<TodayScreen> {
  late int moodScore;
  late int energyScore;
  late int focusScore;
  final notesController = TextEditingController();

  final habits = [
    {'id': '1', 'name': 'Exercise', 'completed': false},
    {'id': '2', 'name': 'Meditation', 'completed': false},
    {'id': '3', 'name': 'Read', 'completed': false},
    {'id': '4', 'name': 'Study', 'completed': false},
  ];

  @override
  void initState() {
    super.initState();
    moodScore = 5;
    energyScore = 5;
    focusScore = 5;
  }

  @override
  void dispose() {
    notesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final today = DateFormat('EEEE, MMM d').format(DateTime.now());

    return Scaffold(
      appBar: AppBar(
        title: const Text('Today'),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              today,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.grey[600],
                  ),
            ),
            const SizedBox(height: 24),
            Text(
              'Habits',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 12),
            ...habits.map((habit) => CheckboxListTile(
              title: Text(habit['name'] as String),
              value: habit['completed'] as bool,
              onChanged: (value) {
                setState(() {
                  habit['completed'] = value ?? false;
                });
              },
            )),
            const SizedBox(height: 32),
            Text(
              'How do you feel today?',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            _buildScoreRow(context, 'Mood', moodScore, (value) {
              setState(() => moodScore = value);
            }),
            const SizedBox(height: 16),
            _buildScoreRow(context, 'Energy', energyScore, (value) {
              setState(() => energyScore = value);
            }),
            const SizedBox(height: 16),
            _buildScoreRow(context, 'Focus', focusScore, (value) {
              setState(() => focusScore = value);
            }),
            const SizedBox(height: 32),
            Text(
              'Notes (optional)',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 12),
            TextField(
              controller: notesController,
              decoration: InputDecoration(
                hintText: 'Add any notes about your day',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // TODO: Save check-in
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Check-in saved!')),
                  );
                },
                child: const Text('Save Check-In'),
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildScoreRow(
    BuildContext context,
    String label,
    int currentValue,
    Function(int) onChanged,
  ) {
    return Row(
      children: [
        SizedBox(
          width: 60,
          child: Text(label),
        ),
        Expanded(
          child: Slider(
            value: currentValue.toDouble(),
            min: 1,
            max: 10,
            divisions: 9,
            label: currentValue.toString(),
            onChanged: (value) => onChanged(value.toInt()),
          ),
        ),
        SizedBox(
          width: 40,
          child: Text(
            currentValue.toString(),
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.titleSmall,
          ),
        ),
      ],
    );
  }
}
