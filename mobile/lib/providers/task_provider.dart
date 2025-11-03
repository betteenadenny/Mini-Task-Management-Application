import 'package:flutter/material.dart';
import '../services/task_service.dart';
import '../models/task.dart';

class TaskProvider extends ChangeNotifier {
  final TaskService _taskService = TaskService();

  List<Task> tasks = [];
  bool isLoading = false;

  // 🔹 Fetch all tasks
  // Future<void> fetchTasks() async {
  //   print('🔹 Starting fetchTasks...');
  //   isLoading = true;
  //   notifyListeners();

  //   try {
  //     final fetchedTasks = await _taskService.fetchTasks();
  //     tasks = fetchedTasks;
  //     print('✅ Tasks fetched: ${tasks.length}');
  //   } catch (e) {
  //     print('❌ Error fetching tasks: $e');
  //   } finally {
  //     isLoading = false;
  //     notifyListeners();
  //   }
  // }

  Future<void> fetchTasks() async {
  try {
    isLoading = true;
    notifyListeners();

    tasks = await _taskService.fetchTasks();
    print('✅ Tasks fetched: ${tasks.length}');
  } catch (e) {
    print('❌ Error fetching tasks in provider: $e');
  } finally {
    isLoading = false;
    notifyListeners();
  }
}

  // 🔹 Add a new task
  // Future<bool> addTask(Task task) async {
  //   final newTask = await _taskService.addTask(task);
  //   if (newTask != null) {
  //     tasks.add(newTask);
  //     notifyListeners();

  //     await fetchTasks();
  //     return true;
  //   }
  //   return false;
  // }

  Future<String?> addTask(Task task) async {
  try {
    final newTask = await _taskService.addTask(task);
    if (newTask != null) {
      tasks.add(newTask);
      notifyListeners();
      fetchTasks(); // background refresh
      return null; // ✅ null = success
    }
    return 'Unknown error occurred.';
  } catch (e) {
    print('❌ Provider error: $e');
    return e.toString().replaceFirst('Exception: ', '');
  }
}

  // 🔹 Update an existing task
  // Future<bool> updateTask(Task task) async {
  //   final updated = await _taskService.updateTask(task);
  //   if (updated != null) {
  //     final index = tasks.indexWhere((t) => t.id == task.id);
  //     if (index != -1) {
  //       tasks[index] = updated;
  //       notifyListeners();
  //     }
  //     await fetchTasks();
  //     return true;
  //   }
  //   return false;   
  // }

  Future<String?> updateTask(Task task) async {
  try {
    final success = await _taskService.updateTask(task);
    if (success) {
      await fetchTasks();
      return null; // ✅ null = success
    } else {
      return 'Failed to update task.';
    }
  } catch (e) {
    print('❌ Provider error: $e');
    return e.toString().replaceFirst('Exception: ', '');
  }
}


  // 🔹 Delete a task
  Future<bool> deleteTask(String id) async {
    print('🗑️ Deleting task: $id');
    final ok = await _taskService.deleteTask(id);
    if (ok) {
      tasks.removeWhere((t) => t.id == id);
      notifyListeners();
      return true;
    }
    return false;
  }
}
