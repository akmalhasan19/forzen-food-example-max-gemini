import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gromuse/common/common.dart';
import 'package:gromuse/common/widgets/widgets.dart';
import 'package:gromuse/config/config.dart';

import '../widgets/widgets.dart';
import 'login_form.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const AuthTitleContainer(
              title: 'Welcome back!',
              subtitle:
                  'We\'ve missed you. You can login with your credentials.',
            ),
            GClippedContainer(
              contentPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16).r,
              child: Column(
                children: [
                  const DragHandle(),
                  30.verticalSpace,
                  const LoginForm(),
                  16.verticalSpace,
                  const OrDivider(),
                  20.verticalSpace,
                  const GoogleButton(),
                  20.verticalSpace,
                  RedirectionTextButton(
                    title: 'Don\'t have an account yet?',
                    buttonLabel: 'Register now',
                    onTap:
                        () => Navigator.pushNamed(context, UIRoutes.register),
                  ),
                  30.verticalSpace,
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
