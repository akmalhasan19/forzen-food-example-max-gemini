import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gromuse/common/common.dart';
import 'package:gromuse/config/config.dart';

import '../widgets/widgets.dart';
import 'register_form.dart';

class RegisterPage extends StatelessWidget {
  const RegisterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const AuthTitleContainer(
              title: 'Create a new Account',
              subtitle:
                  'You can create a new account on Gromuse with your name, email and password.',
            ),
            GClippedContainer(
              contentPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16).r,
              child: Column(
                children: [
                  const DragHandle(),
                  30.verticalSpace,
                  const RegisterForm(),
                  16.verticalSpace,
                  const OrDivider(),
                  20.verticalSpace,
                  const GoogleButton(isRegister: true),
                  20.verticalSpace,
                  RedirectionTextButton(
                    title: 'Already have an account?',
                    buttonLabel: 'Login now',
                    onTap: () => Navigator.pushReplacementNamed(
                      context,
                      UIRoutes.login,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
