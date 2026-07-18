import 'package:flutter/material.dart';

class CharacterAvatar extends StatelessWidget {
  final String initials;
  final String testamento;
  final double size;
  final VoidCallback? onTap;
  final bool showOnline;

  const CharacterAvatar({
    super.key,
    required this.initials,
    required this.testamento,
    this.size = 44,
    this.onTap,
    this.showOnline = false,
  });

  Color get _backgroundColor {
    switch (testamento) {
      case 'AT':
        return const Color(0xFF2E7D32);
      case 'NT':
        return const Color(0xFF1565C0);
      default:
        return const Color(0xFF6A1B9A);
    }
  }

  @override
  Widget build(BuildContext context) {
    final avatar = Stack(
      children: [
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            color: _backgroundColor,
            shape: BoxShape.circle,
          ),
          alignment: Alignment.center,
          child: Text(
            initials.toUpperCase(),
            style: TextStyle(
              color: Colors.white,
              fontSize: size * 0.36,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        if (showOnline)
          Positioned(
            right: 0,
            bottom: 0,
            child: Container(
              width: size * 0.28,
              height: size * 0.28,
              decoration: BoxDecoration(
                color: Colors.green,
                shape: BoxShape.circle,
                border: Border.all(
                  color: Theme.of(context).scaffoldBackgroundColor,
                  width: 2,
                ),
              ),
            ),
          ),
      ],
    );

    if (onTap != null) {
      return GestureDetector(onTap: onTap, child: avatar);
    }
    return avatar;
  }
}
