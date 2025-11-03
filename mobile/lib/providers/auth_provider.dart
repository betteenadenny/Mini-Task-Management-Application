// import 'package:flutter/material.dart';
// import '../services/auth_service.dart';
// import '../models/user.dart';

// class AuthProvider extends ChangeNotifier {
//   final AuthService _authService = AuthService();

//   bool isAuthenticated = false;
//   User? user;

//   // 🔹 Try auto-login using saved token
//   Future<bool> tryAutoLogin() async {
//     final token = await _authService.getToken();
//     if (token != null) {
//       isAuthenticated = true;
//       notifyListeners();
//       return true;
//     }
//     return false;
//   }

//   // 🔹 Login user
//   Future<String?> login(String email, String password) async {
//     final res = await _authService.login(email, password);

//     if (res['token'] != null) {
//       user = User(
//         id: res['id']?.toString() ?? '',
//         name: res['name'] ?? '',
//         email: email,
//       );
//       isAuthenticated = true;
//       notifyListeners();
//       return null; // success
//     }
//     return res['error'] ?? 'Login failed';
//   }

//   // 🔹 Signup user
//   Future<String?> signup(String name, String email, String password, String confirmPassword) async {
//     final res = await _authService.signup(name, email, password, confirmPassword);
//     if (res['message'] != null && res['message'].toString().toLowerCase().contains('success')) {
//       return null; // success
//     }
//     return res['error'] ?? 'Signup failed';
//   }

//   // 🔹 Logout user
//   Future<void> logout() async {
//     await _authService.logout();
//     isAuthenticated = false;
//     user = null;
//     notifyListeners();
//   }
// }

import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../models/user.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService = AuthService();

  bool isAuthenticated = false;
  User? user;

  // 🔹 Try auto-login using saved token
  Future<bool> tryAutoLogin() async {
    final token = await _authService.getToken();
    if (token != null) {
      isAuthenticated = true;
      notifyListeners();
      return true;
    }
    return false;
  }

  // 🔹 Login user (returns null on success, error message on failure)
  Future<String?> login(String email, String password) async {
    try {
      final res = await _authService.login(email, password);
      final token = res['token'];

      if (token != null) {
        user = User(
          id: res['id']?.toString() ?? '',
          name: res['name'] ?? '',
          email: email,
        );
        isAuthenticated = true;
        notifyListeners();
        return null; // ✅ success
      }

      return res['message'] ?? 'Login failed.';
    } catch (e) {
      // 🧠 This catches Exception(msg) from AuthService
      return e.toString().replaceFirst('Exception: ', '');
    }
  }

  // 🔹 Signup user (returns null on success, error message on failure)
  Future<String?> signup(
      String name, String email, String password, String confirmPassword) async {
    try {
      final res = await _authService.signup(name, email, password, confirmPassword);
      if (res['message']?.toString().toLowerCase().contains('success') ?? false) {
        return null; // ✅ success
      }
      return res['message'] ?? 'Signup failed.';
    } catch (e) {
      // 🧠 This catches Exception(msg) from AuthService
      return e.toString().replaceFirst('Exception: ', '');
    }
  }

  // 🔹 Logout user
  Future<void> logout() async {
    await _authService.logout();
    isAuthenticated = false;
    user = null;
    notifyListeners();
  }
}

