import 'package:flutter/material.dart';
import '../config/theme.dart';

class ErrorScreen extends StatelessWidget {
  final String? title;
  final String? message;
  final VoidCallback? onRetry;

  const ErrorScreen({
    super.key,
    this.title,
    this.message,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppTheme.bgDark,
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Icon
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  color: AppTheme.goldSubtle,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Icon(
                  Icons.cloud_off_rounded,
                  size: 32,
                  color: AppTheme.gold,
                ),
              ),
              const SizedBox(height: 24),

              // Title
              Text(
                title ?? 'Não foi possível conectar',
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontFamily: 'serif',
                  fontSize: 22,
                  fontWeight: FontWeight.w300,
                  color: AppTheme.textPrimary,
                  height: 1.3,
                ),
              ),
              const SizedBox(height: 12),

              // Message
              Text(
                message ?? 'Verifique sua conexão com a internet e tente novamente.',
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 14,
                  color: AppTheme.textSecondary,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 32),

              // Retry button
              if (onRetry != null)
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: onRetry,
                    icon: const Icon(Icons.refresh_rounded, size: 18),
                    label: const Text('Tentar novamente'),
                  ),
                ),
              const SizedBox(height: 16),

              // Offline mode hint
              const Text(
                'Alguns recursos podem estar disponíveis offline',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 12,
                  color: AppTheme.textMuted,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
