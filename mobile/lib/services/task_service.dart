import 'package:dio/dio.dart';
import '../utils/api_service.dart';
import '../models/task.dart';

class TaskService {
  final ApiService _api = ApiService();

  // 🔹 Fetch all tasks
  // Future<List<Task>> fetchTasks() async {
  //   try {
  //     final res = await _api.get('/tasks');

  //     if (res.data is Map && res.data['tasks'] is List) {
  //     final list = res.data['tasks'] as List;
  //     return list.map((t) => Task.fromJson(t)).toList();
  //   }  else {
  //     print('! Unexpected response format.');
  //     return [];
  //   }
  //   } on DioException catch (e) {
  //     print('❌ Error fetching tasks: ${e.response?.data}');
  //     rethrow;
  //   }
  // }
  Future<List<Task>> fetchTasks() async {
  try {
    final res = await _api.get('/tasks');
    print('✅ Response data: ${res.data}');

    if (res.data is Map && res.data['tasks'] is List) {
      final list = res.data['tasks'] as List;
      return list.map((t) => Task.fromJson(t)).toList();
    } else if (res.data is List) {
      // fallback
      return (res.data as List).map((t) => Task.fromJson(t)).toList();
    } else {
      print('⚠️ Unexpected format: ${res.data.runtimeType}');
      return [];
    }
  } on DioException catch (e) {
    print('❌ Error fetching tasks: ${e.response?.statusCode} - ${e.response?.data}');
    return [];
  } catch (e) {
    print('❌ General error fetching tasks: $e');
    return [];
  }
}

  // 🔹 Add new task
  Future<Task?> addTask(Task task) async {
    try {
      final res = await _api.post('/tasks', task.toJson());
      return Task.fromJson(res.data);
    } on DioException catch (e) {
      final msg = e.response?.data?['message'] ?? 'Failed to add task.';
    print('❌ Error adding task: $msg');
    throw Exception(msg);
    }
  }

  // 🔹 Update existing task
  // Future<Task?> updateTask(Task task) async {
  //   try {
  //     final res = await _api.put('/tasks/${task.id}', task.toJson());
  //     return Task.fromJson(res.data);
  //   } on DioException catch (e) {
  //     print('❌ Error updating task: ${e.response?.data}');
  //     return null;
  //   }
  // }

  Future<bool> updateTask(Task task) async {
  try {
    final res = await _api.put('/tasks/${task.id}', task.toJson());
    print('✅ Update Task Response: ${res.data}');
    return true;
  } on DioException catch (e) {
    final msg = e.response?.data?['message'] ?? 'Failed to update task.';
    print('❌ Error updating task: $msg');
    throw Exception(msg);
  }
}


  // 🔹 Delete task
  Future<bool> deleteTask(String id) async {
    try {
      await _api.delete('/tasks/$id');
      return true;
    } on DioException catch (e) {
      print('❌ Error deleting task: ${e.response?.data}');
      return false;
    }
  }
}
