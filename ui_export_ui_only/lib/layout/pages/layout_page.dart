import 'package:flutter/material.dart';
import 'package:gromuse/features/delivery/delivery.dart';
import 'package:gromuse/features/favorite/favorite.dart';
import 'package:gromuse/features/product/product.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

import '../widgets/widgets.dart';

class LayoutPage extends StatefulWidget {
  const LayoutPage({super.key});

  @override
  State<LayoutPage> createState() => _LayoutPageState();
}

class _LayoutPageState extends State<LayoutPage> {
  int currentIndex = 0;

  static const List<Widget> _pages = [
    HomePage(),
    CategoryPage(),
    FavoritePage(),
    DeliveryPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBranchContainer(currentIndex: currentIndex, children: _pages),
      bottomNavigationBar: GBottomNavigationBar(
        currentIndex: currentIndex,
        onTap: _onTap,
        items: const [
          BottomNavigationBarItem(
            icon: PhosphorIcon(PhosphorIconsRegular.houseSimple),
            activeIcon: PhosphorIcon(
              PhosphorIconsDuotone.houseSimple,
              duotoneSecondaryOpacity: 0.8,
            ),
          ),
          BottomNavigationBarItem(
            icon: PhosphorIcon(PhosphorIconsRegular.list),
            activeIcon: PhosphorIcon(
              PhosphorIconsDuotone.list,
              duotoneSecondaryOpacity: 0.8,
            ),
          ),
          BottomNavigationBarItem(
            icon: PhosphorIcon(PhosphorIconsRegular.heart),
            activeIcon: PhosphorIcon(
              PhosphorIconsDuotone.heart,
              duotoneSecondaryOpacity: 0.8,
            ),
          ),
          BottomNavigationBarItem(
            icon: PhosphorIcon(PhosphorIconsRegular.truck),
            activeIcon: PhosphorIcon(
              PhosphorIconsDuotone.truck,
              duotoneSecondaryOpacity: 0.8,
            ),
          ),
        ],
      ),
    );
  }

  void _onTap(int index) {
    setState(() => currentIndex = index);
  }
}
