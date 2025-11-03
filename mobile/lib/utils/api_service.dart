import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config.dart';

class ApiService {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: Config.apiUrl,
    headers: {'Content-Type': 'application/json'},
  ));

  final _storage = const FlutterSecureStorage();

  // 🔹 Attach token before any request
  Future<void> _setAuthHeader() async {
    final token = await _storage.read(key: 'token');
    if (token != null) {
      _dio.options.headers['Authorization'] = 'Bearer $token';
    }
  }

  Future<Response> get(String path) async {
    await _setAuthHeader();
    return _dio.get(path);
  }

  Future<Response> post(String path, dynamic data) async {
    await _setAuthHeader();
    return _dio.post(path, data: data);
  }

  Future<Response> put(String path, dynamic data) async {
    await _setAuthHeader();
    return _dio.put(path, data: data);
  }

  Future<Response> delete(String path) async {
    await _setAuthHeader();
    return _dio.delete(path);
  }
}
