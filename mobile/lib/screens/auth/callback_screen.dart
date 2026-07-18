import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';

class CallbackScreen extends StatefulWidget {
  const CallbackScreen({super.key});

  @override
  State<CallbackScreen> createState() => _CallbackScreenState();
}

class _CallbackScreenState extends State<CallbackScreen> {
  bool _processando = true;
  String? _erro;

  @override
  void initState() {
    super.initState();
    _processarCallback();
  }

  Future<void> _processarCallback() async {
    try {
      final auth = Provider.of<AuthProvider>(context, listen: false);

      await Future.delayed(const Duration(seconds: 1));

      if (!mounted) return;

      if (auth.isAuthenticated) {
        context.go('/');
      } else {
        setState(() {
          _processando = false;
          _erro = 'Falha na autenticacao. Tente novamente.';
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _processando = false;
        _erro = 'Erro ao processar autenticacao: ${e.toString()}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (_processando) ...[
                SizedBox(
                  width: 48,
                  height: 48,
                  child: CircularProgressIndicator(
                    strokeWidth: 3,
                    color: theme.colorScheme.primary,
                  ),
                ),
                const SizedBox(height: 24),
                Text(
                  'Processando autenticacao...',
                  style: theme.textTheme.bodyLarge,
                ),
              ] else if (_erro != null) ...[
                Icon(
                  Icons.error_outline,
                  size: 64,
                  color: theme.colorScheme.error,
                ),
                const SizedBox(height: 16),
                Text(
                  'Erro',
                  style: theme.textTheme.headlineSmall,
                ),
                const SizedBox(height: 8),
                Text(
                  _erro!,
                  textAlign: TextAlign.center,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 24),
                ElevatedButton.icon(
                  onPressed: () => context.go('/login'),
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('Voltar ao login'),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
