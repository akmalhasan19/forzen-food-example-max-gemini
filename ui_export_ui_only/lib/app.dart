import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gromuse/responsive_widgets.su.dart';
import 'package:gromuse/features/auth/presentation/presentation.dart';
import 'package:gromuse/features/onboarding/presentation/pages/onboarding_page.dart';
import 'package:gromuse/layout/layout.dart';

import 'config/config.dart';

class GromuseApp extends StatelessWidget {
  const GromuseApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      responsiveWidgets: responsiveWidgets,
      ensureScreenSize: true,
      builder: (_, child) => MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: GTheme.light,
        darkTheme: GTheme.dark,
        themeMode: ThemeMode.light,
        initialRoute: UIRoutes.onboarding,
        routes: {
          UIRoutes.onboarding: (_) => const OnboardingPage(),
          UIRoutes.login: (_) => const LoginPage(),
          UIRoutes.register: (_) => const RegisterPage(),
          UIRoutes.main: (_) => const LayoutPage(),
        },
        builder: (context, child) => MediaQuery(
          data: MediaQuery.of(context).copyWith(
            textScaler: TextScaler.linear(1.r),
          ),
          child: child!,
        ),
      ),
    );
  }
}
