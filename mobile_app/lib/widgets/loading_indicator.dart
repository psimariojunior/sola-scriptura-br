import 'package:flutter/material.dart';
import '../config/theme.dart';

class LoadingIndicator extends StatelessWidget {
  final double? progress;
  final bool showProgress;

  const LoadingIndicator({
    super.key,
    this.progress,
    this.showProgress = true,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (showProgress) ...[
          SizedBox(
            width: 200,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: progress,
                backgroundColor: AppTheme.goldSubtle,
                valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.gold),
                minHeight: 2,
              ),
            ),
          ),
          const SizedBox(height: 12),
        ],
        const Text(
          'Carregando...',
          style: TextStyle(
            fontSize: 12,
            color: AppTheme.textMuted,
            letterSpacing: 0.5,
          ),
        ),
      ],
    );
  }
}

class LoadingOverlay extends StatelessWidget {
  final bool isLoading;
  final Widget child;

  const LoadingOverlay({
    super.key,
    required this.isLoading,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        child,
        if (isLoading)
          const Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: SizedBox(
              height: 2,
              child: LinearProgressIndicator(
                backgroundColor: Colors.transparent,
                valueColor: AlwaysStoppedAnimation<Color>(AppTheme.gold),
              ),
            ),
          ),
      ],
    );
  }
}
