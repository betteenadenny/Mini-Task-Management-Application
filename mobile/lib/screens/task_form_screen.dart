import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/task.dart';
import '../providers/task_provider.dart';

class TaskFormScreen extends StatefulWidget {
  final Task? task;
  const TaskFormScreen({this.task, super.key});

  @override
  State<TaskFormScreen> createState() => _TaskFormScreenState();
}

class _TaskFormScreenState extends State<TaskFormScreen> {
  final _formKey = GlobalKey<FormState>();
  late String title, description, status;
  DateTime? deadline;
  bool loading = false;

  @override
  void initState() {
    super.initState();
    final t = widget.task;
    title = t?.title ?? '';
    description = t?.description ?? '';
    status = t?.status ?? 'pending';
    deadline = t?.deadline;
  }

  // Future<void> _save() async {
  //   if (!_formKey.currentState!.validate()) return;
  //   setState(() => loading = true);

  //   final prov = Provider.of<TaskProvider>(context, listen: false);

  //   if (widget.task == null) {
  //     // Add new task
  //     final newTask = Task(
  //       id: '',
  //       title: title,
  //       description: description,
  //       status: status,
  //       deadline: deadline,
  //     );
  //     final ok = await prov.addTask(newTask);
  //     if (ok) Navigator.of(context).pop();
  //   } else {
  //     // Update existing task
  //     final updated = widget.task!;
  //     updated.title = title;
  //     updated.description = description;
  //     updated.status = status;
  //     updated.deadline = deadline;
  //     final ok = await prov.updateTask(updated);
  //     if (ok) Navigator.of(context).pop();
  //   }

  //   setState(() => loading = false);
  // }

  Future<void> _save() async {
  if (!_formKey.currentState!.validate()) return;

  setState(() => loading = true);
  final prov = Provider.of<TaskProvider>(context, listen: false);

  String? error;
  if (widget.task == null) {
    error = await prov.addTask(
      Task(id: '', title: title, description: description, status: status, deadline: deadline),
    );
  } else {
    final updated = widget.task!;
    updated.title = title;
    updated.description = description;
    updated.status = status;
    updated.deadline = deadline;
    error = await prov.updateTask(updated);
  }

  setState(() => loading = false);

  if (error == null) {
    if (context.mounted) Navigator.pop(context);
  } else {
    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
    }
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:
          AppBar(title: Text(widget.task == null ? 'Add Task' : 'Edit Task')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                initialValue: title,
                decoration: const InputDecoration(labelText: 'Title'),
                onChanged: (v) => title = v,
                validator: (v) => v != null && v.isNotEmpty ? null : 'Required',
              ),
              TextFormField(
                initialValue: description,
                decoration: const InputDecoration(labelText: 'Description'),
                onChanged: (v) => description = v,
              ),
              DropdownButtonFormField<String>(
                value: status,
                items: ['pending', 'in-progress', 'done']
                    .map((s) =>
                        DropdownMenuItem(value: s, child: Text(s)))
                    .toList(),
                onChanged: (v) => status = v ?? status,
                decoration: const InputDecoration(labelText: 'Status'),
              ),
              ListTile(
                contentPadding: EdgeInsets.zero,
                title: Text(
                  deadline == null
                      ? 'No deadline'
                      : 'Deadline: ${deadline!.toLocal().toIso8601String().split('T').first}',
                ),
                trailing: IconButton(
                  icon: const Icon(Icons.calendar_today),
                  onPressed: () async {
                    final picked = await showDatePicker(
                      context: context,
                      initialDate: deadline ?? DateTime.now(),
                      firstDate: DateTime.now()
                          .subtract(const Duration(days: 365)),
                      lastDate:
                          DateTime.now().add(const Duration(days: 365 * 5)),
                    );
                    if (picked != null) setState(() => deadline = picked);
                  },
                ),
              ),
              const SizedBox(height: 12),
              ElevatedButton(
                onPressed: loading ? null : _save,
                child: loading
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(strokeWidth: 2))
                    : Text(widget.task == null ? 'Add' : 'Save'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
