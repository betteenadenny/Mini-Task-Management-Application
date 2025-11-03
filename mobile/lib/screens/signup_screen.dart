// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import '../providers/auth_provider.dart';
// import 'login_screen.dart';

// class SignupScreen extends StatefulWidget {
//   const SignupScreen({super.key});

//   @override
//   State<SignupScreen> createState() => _SignupScreenState();
// }

// class _SignupScreenState extends State<SignupScreen> {
//   final _formKey = GlobalKey<FormState>();
//   String name = '', email = '', password = '', confirm = '';
//   bool loading = false;
//   String? message;

//   void _submit() async {
//     if (!_formKey.currentState!.validate()) return;

//     setState(() {
//       loading = true;
//       message = null;
//     });

//     final auth = Provider.of<AuthProvider>(context, listen: false);
//     final error = await auth.signup(name, email, password, confirm);

//     setState(() => loading = false);

//     if (error == null) {
//       // ✅ Signup successful → navigate to Login screen
//       ScaffoldMessenger.of(context).showSnackBar(
//         const SnackBar(
//           content: Text('Account created successfully! Please login.'),
//           backgroundColor: Colors.green,
//         ),
//       );
//       Future.delayed(const Duration(seconds: 1), () {
//         Navigator.pushReplacement(
//           context,
//           MaterialPageRoute(builder: (_) => const LoginScreen()),
//         );
//       });
//     } else {
//       // ❌ Show backend error message
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(
//           content: Text(error),
//           backgroundColor: Colors.red,
//         ),
//       );
//       setState(() => message = error);
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: const Text('Sign Up')),
//       body: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Form(
//           key: _formKey,
//           child: ListView(
//             children: [
//               TextFormField(
//                 decoration: const InputDecoration(labelText: 'Name'),
//                 onChanged: (v) => name = v,
//                 validator: (v) => v != null && v.isNotEmpty ? null : 'Required',
//               ),
//               TextFormField(
//                 decoration: const InputDecoration(labelText: 'Email'),
//                 onChanged: (v) => email = v,
//                 validator: (v) =>
//                     v != null && v.contains('@') ? null : 'Enter valid email',
//               ),
//               TextFormField(
//                 decoration: const InputDecoration(labelText: 'Password'),
//                 obscureText: true,
//                 onChanged: (v) => password = v,
//                 validator: (v) =>
//                     v != null && v.length >= 6 ? null : 'Min 6 characters',
//               ),
//               TextFormField(
//                 decoration:
//                     const InputDecoration(labelText: 'Confirm Password'),
//                 obscureText: true,
//                 onChanged: (v) => confirm = v,
//                 validator: (v) =>
//                     v == password ? null : 'Passwords do not match',
//               ),
//               const SizedBox(height: 16),
//               ElevatedButton(
//                 onPressed: loading ? null : _submit,
//                 child: loading
//                     ? const SizedBox(
//                         width: 20,
//                         height: 20,
//                         child: CircularProgressIndicator(strokeWidth: 2),
//                       )
//                     : const Text('Sign Up'),
//               ),
//               const SizedBox(height: 8),
//               TextButton(
//                 onPressed: () {
//                   Navigator.pushReplacement(
//                     context,
//                     MaterialPageRoute(builder: (_) => const LoginScreen()),
//                   );
//                 },
//                 child: const Text('Already have an account? Login'),
//               ),
//               if (message != null)
//                 Padding(
//                   padding: const EdgeInsets.only(top: 12),
//                   child: Text(
//                     message!,
//                     style: const TextStyle(color: Colors.red),
//                     textAlign: TextAlign.center,
//                   ),
//                 ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import 'login_screen.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  String name = '', email = '', password = '', confirm = '';
  bool loading = false;
  String? message; // inline message under button

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      loading = true;
      message = null;
    });

    final auth = Provider.of<AuthProvider>(context, listen: false);
    final error = await auth.signup(name, email, password, confirm);

    setState(() => loading = false);

    if (error == null) {
      // ✅ Signup success — show inline success message
      setState(() {
        message = '✅ Account created successfully! Please login.';
      });

      // ⏳ Redirect after short delay
      Future.delayed(const Duration(seconds: 1), () {
        if (mounted) {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (_) => const LoginScreen()),
          );
        }
      });
    } else {
      // ❌ Show backend error inline
      setState(() {
        message = '⚠️ $error';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sign Up')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                decoration: const InputDecoration(labelText: 'Name'),
                onChanged: (v) => name = v,
                validator: (v) => v != null && v.isNotEmpty ? null : 'Required',
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Email'),
                onChanged: (v) => email = v,
                validator: (v) =>
                    v != null && v.contains('@') ? null : 'Enter valid email',
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
                onChanged: (v) => password = v,
                validator: (v) =>
                    v != null && v.length >= 6 ? null : 'Min 6 characters',
              ),
              TextFormField(
                decoration:
                    const InputDecoration(labelText: 'Confirm Password'),
                obscureText: true,
                onChanged: (v) => confirm = v,
                validator: (v) =>
                    v == password ? null : 'Passwords do not match',
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: loading ? null : _submit,
                child: loading
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Sign Up'),
              ),
              const SizedBox(height: 8),
              TextButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (_) => const LoginScreen()),
                  );
                },
                child: const Text('Already have an account? Login'),
              ),

              // 🔹 Inline feedback message (success or error)
              if (message != null)
                Padding(
                  padding: const EdgeInsets.only(top: 12),
                  child: Text(
                    message!,
                    style: TextStyle(
                      color: message!.contains('✅') ? Colors.green : Colors.red,
                      fontWeight: FontWeight.w500,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
