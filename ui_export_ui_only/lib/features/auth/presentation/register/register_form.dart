import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gromuse/common/common.dart';
import 'package:gromuse/config/config.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class RegisterForm extends StatelessWidget {
  const RegisterForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const _Name(),
        20.verticalSpace,
        const _Email(),
        20.verticalSpace,
        const _Password(),
        30.verticalSpace,
        const _RegisterButton(),
      ],
    );
  }
}

class _Name extends StatelessWidget {
  const _Name();

  @override
  Widget build(BuildContext context) {
    return GTextFormField(
      label: 'Name',
      hint: 'Name',
      prefixIcon: PhosphorIconsBold.user,
    );
  }
}

class _Email extends StatelessWidget {
  const _Email();

  @override
  Widget build(BuildContext context) {
    return GTextFormField(
      label: 'Email',
      hint: 'Email',
      keyboardType: TextInputType.emailAddress,
      prefixIcon: PhosphorIconsBold.at,
    );
  }
}

class _RegisterButton extends StatelessWidget {
  const _RegisterButton();

  @override
  Widget build(BuildContext context) {
    return PrimaryButton(
      label: 'Register',
      onPressed: () => Navigator.pushReplacementNamed(context, UIRoutes.main),
    );
  }
}

class _Password extends StatelessWidget {
  const _Password();

  @override
  Widget build(BuildContext context) {
    return GTextFormField(
      label: 'Password',
      hint: 'Password',
      isPassword: true,
      prefixIcon: PhosphorIconsBold.lock,
    );
  }
}
