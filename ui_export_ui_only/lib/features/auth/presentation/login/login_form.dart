import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gromuse/common/common.dart';
import 'package:gromuse/config/config.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class LoginForm extends StatelessWidget {
  const LoginForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const _Email(),
        20.verticalSpace,
        const _Password(),
        Align(
          alignment: Alignment.centerRight,
          child: TextButton(
            onPressed: () {},
            child: const Text('Forgot Password?'),
          ),
        ),
        30.verticalSpace,
        const _LoginButton(),
      ],
    );
  }
}

class _Email extends StatelessWidget {
  const _Email();

  @override
  Widget build(BuildContext context) {
    return GTextFormField(
      keyboardType: TextInputType.emailAddress,
      label: 'Email',
      hint: 'Email',
      prefixIcon: PhosphorIconsBold.at,
    );
  }
}

class _LoginButton extends StatelessWidget {
  const _LoginButton();

  @override
  Widget build(BuildContext context) {
    return PrimaryButton(
      label: 'Login',
      onPressed: () => Navigator.pushReplacementNamed(context, UIRoutes.main),
    );
  }
}

class _Password extends StatelessWidget {
  const _Password();

  @override
  Widget build(BuildContext context) {
    return GTextFormField(
      isPassword: true,
      label: 'Password',
      hint: 'Password',
      prefixIcon: PhosphorIconsBold.lock,
    );
  }
}
