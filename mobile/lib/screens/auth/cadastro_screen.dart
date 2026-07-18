import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';
import '../../utils/validators.dart';
import '../../widgets/sola_button.dart';
import '../../widgets/sola_text_field.dart';

class CadastroScreen extends StatefulWidget {
  const CadastroScreen({super.key});

  @override
  State<CadastroScreen> createState() => _CadastroScreenState();
}

class _CadastroScreenState extends State<CadastroScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nomeController = TextEditingController();
  final _emailController = TextEditingController();
  final _senhaController = TextEditingController();
  final _confirmarSenhaController = TextEditingController();
  bool _senhaVisivel = false;
  bool _aceitouTermos = false;

  @override
  void dispose() {
    _nomeController.dispose();
    _emailController.dispose();
    _senhaController.dispose();
    _confirmarSenhaController.dispose();
    super.dispose();
  }

  Future<void> _cadastrar() async {
    if (!(_formKey.currentState?.validate() ?? false)) return;

    if (!_aceitouTermos) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Aceite os termos de uso para continuar'),
          backgroundColor: Theme.of(context).colorScheme.error,
        ),
      );
      return;
    }

    final auth = Provider.of<AuthProvider>(context, listen: false);
    final sucesso = await auth.register(
      _nomeController.text.trim(),
      _emailController.text.trim(),
      _senhaController.text,
    );

    if (!mounted) return;

    if (sucesso) {
      context.go('/');
    } else if (auth.error != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(auth.error!),
          backgroundColor: Theme.of(context).colorScheme.error,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final auth = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Criar Conta'),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.person_add_rounded,
                    size: 40,
                    color: theme.colorScheme.primary,
                  ),
                ),
                const SizedBox(height: 24),
                Text(
                  'Crie sua conta',
                  style: theme.textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Comece a estudar a Palavra',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 40),
                SolaTextField(
                  controller: _nomeController,
                  label: 'Nome completo',
                  prefixIcon: Icons.person_outline,
                  validator: (v) => Validators.required(v, 'Nome'),
                ),
                const SizedBox(height: 16),
                SolaTextField(
                  controller: _emailController,
                  label: 'Email',
                  hint: 'seu@email.com',
                  prefixIcon: Icons.email_outlined,
                  keyboardType: TextInputType.emailAddress,
                  validator: Validators.email,
                ),
                const SizedBox(height: 16),
                SolaTextField(
                  controller: _senhaController,
                  label: 'Senha',
                  obscureText: !_senhaVisivel,
                  prefixIcon: Icons.lock_outline,
                  suffixIcon: IconButton(
                    icon: Icon(
                      _senhaVisivel
                          ? Icons.visibility_off
                          : Icons.visibility,
                    ),
                    onPressed: () {
                      setState(() => _senhaVisivel = !_senhaVisivel);
                    },
                  ),
                  validator: Validators.password,
                ),
                const SizedBox(height: 16),
                SolaTextField(
                  controller: _confirmarSenhaController,
                  label: 'Confirmar senha',
                  obscureText: !_senhaVisivel,
                  prefixIcon: Icons.lock_outline,
                  validator: (v) =>
                      Validators.confirmPassword(v, _senhaController.text),
                  onSubmitted: (_) => _cadastrar(),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Checkbox(
                      value: _aceitouTermos,
                      onChanged: (v) {
                        setState(() => _aceitouTermos = v ?? false);
                      },
                    ),
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          setState(() => _aceitouTermos = !_aceitouTermos);
                        },
                        child: Text.rich(
                          TextSpan(
                            text: 'Aceito os ',
                            children: [
                              TextSpan(
                                text: 'termos de uso',
                                style: TextStyle(
                                  color: theme.colorScheme.primary,
                                  decoration: TextDecoration.underline,
                                ),
                              ),
                              const TextSpan(text: ' e a '),
                              TextSpan(
                                text: 'politica de privacidade',
                                style: TextStyle(
                                  color: theme.colorScheme.primary,
                                  decoration: TextDecoration.underline,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                SolaButton(
                  label: 'Criar conta',
                  icon: Icons.person_add,
                  isLoading: auth.isLoading,
                  onPressed: _cadastrar,
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text('Ja tem conta? '),
                    TextButton(
                      onPressed: () => context.go('/login'),
                      child: const Text('Fazer login'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
