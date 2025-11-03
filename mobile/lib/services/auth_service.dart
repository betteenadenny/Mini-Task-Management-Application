// import 'package:dio/dio.dart';
// import 'package:flutter_secure_storage/flutter_secure_storage.dart';
// import '../utils/api_service.dart';
// // import '../config.dart';

// class AuthService {
//   final ApiService _api = ApiService();
//   final _storage = const FlutterSecureStorage();

//   // 🔹 Signup user
//   Future<Map<String, dynamic>> signup(
//       String name, String email, String password, String confirmPassword) async {
//     try {
//       final res = await _api.post('/auth/signup', {
//         'name': name,
//         'email': email,
//         'password': password,
//         'confirm_password': confirmPassword,
//       });
//       return res.data;
//     } on DioException catch (e) {
//       final msg = e.response?.data?['message'] ?? 'Signup failed';
//       print('❌ Signup error: $msg');
//       return {'error': msg};
//     }
//   }

//   // 🔹 Login user
//   Future<Map<String, dynamic>> login(String email, String password) async {
//     try {
//       final res = await _api.post('/auth/login', {
//         'email': email,
//         'password': password,
//       });

//       // ✅ Save token securely
//       final token = res.data['token'];
//       if (token != null) {
//         await _storage.write(key: 'token', value: token);
//       }

//       return res.data;
//     } on DioException catch (e) {
//       final msg = e.response?.data?['message'] ?? 'Login failed';
//       print('❌ Login error: $msg');
//       return {'error': msg};
//     }
//   }

//   // 🔹 Logout
//   Future<void> logout() async {
//     await _storage.delete(key: 'token');
//   }

//   // 🔹 Get saved token
//   Future<String?> getToken() async {
//     return await _storage.read(key: 'token');
//   }
// }

import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../utils/api_service.dart';

class AuthService {
  final ApiService _api = ApiService();
  final _storage = const FlutterSecureStorage();

  // 🔹 Signup user
  Future<Map<String, dynamic>> signup(
      String name, String email, String password, String confirmPassword) async {
    try {
      final res = await _api.post('/auth/signup', {
        'name': name,
        'email': email,
        'password': password,
        'confirm_password': confirmPassword,
      });
      return res.data;
    } on DioException catch (e) {
      final msg = e.response?.data?['message'] ?? 'Signup failed.';
      print('❌ Signup error: $msg');
      throw Exception(msg); // 🔥 Throwing instead of returning a map
    } catch (e) {
      throw Exception('Unexpected signup error: $e');
    }
  }

  // 🔹 Login user
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final res = await _api.post('/auth/login', {
        'email': email,
        'password': password,
      });

      // ✅ Save token securely
      final token = res.data['token'];
      if (token != null) {
        await _storage.write(key: 'token', value: token);
      }

      return res.data;
    } on DioException catch (e) {
      final msg = e.response?.data?['message'] ?? 'Login failed.';
      print('❌ Login error: $msg');
      throw Exception(msg); // 🔥 Throwing instead of returning a map
    } catch (e) {
      throw Exception('Unexpected login error: $e');
    }
  }

  // 🔹 Logout
  Future<void> logout() async {
    await _storage.delete(key: 'token');
  }

  // 🔹 Get saved token
  Future<String?> getToken() async {
    return await _storage.read(key: 'token');
  }
}
