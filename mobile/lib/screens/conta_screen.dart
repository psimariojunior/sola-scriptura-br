import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../providers/tema_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/sola_button.dart';
import '../widgets/sola_text_field.dart';

class ContaScreen extends StatefulWidget {
  const ContaScreen({super.key});

  @override
  State<ContaScreen> createState() => _ContaScreenState();
}

class _ContaScreenState extends State<ContaScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nomeController;
  late TextEditingController _emailController;
  bool _editando = false;

  @override
  void initState() {
    super.initState();
    final auth = Provider.of<AuthProvider>(context, listen: false);
    _nomeController = TextEditingController(text: auth.currentUser?.nome ?? '');
    _emailController =
        TextEditingController(text: auth.currentUser?.email ?? '');
  }

  @override
  void dispose() {
    _nomeController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _salvarPerfil() async {
    if (!(_formKey.currentState?.validate() ?? false)) return;

    final auth = Provider.of<AuthProvider>(context, listen: false);
    try {
      await auth.updateProfile(nome: _nomeController.text.trim());
      if (mounted) {
        setState(() => _editando = false);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Perfil atualizado com sucesso')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao atualizar: $e'),
            backgroundColor: Theme.of(context).colorScheme.error,
          ),
        );
      }
    }
  }

  void _confirmarExclusao() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Excluir conta'),
        content: const Text(
          'Esta acao e irreversivel. Todos os seus dados serao permanentemente excluidos.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content:
                      Text('Funcionalidade em breve. Entre em contato pelo suporte.'),
                ),
              );
            },
            child: const Text('Excluir'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final auth = Provider.of<AuthProvider>(context);
    final tema = Provider.of<TemaProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Minha Conta'),
        actions: [
          if (!_editando)
            IconButton(
              icon: const Icon(Icons.edit),
              onPressed: () => setState(() => _editando = true),
            ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Center(
            child: CircleAvatar(
              radius: 40,
              backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
              backgroundImage: auth.currentUser?.avatar != null
                  ? NetworkImage(auth.currentUser!.avatar!)
                  : null,
              child: auth.currentUser?.avatar == null
                  ? Icon(
                      Icons.person,
                      size: 40,
                      color: theme.colorScheme.primary,
                    )
                  : null,
            ),
          ),
          const SizedBox(height: 24),
          Form(
            key: _formKey,
            child: Column(
              children: [
                SolaTextField(
                  controller: _nomeController,
                  label: 'Nome',
                  prefixIcon: Icons.person_outline,
                  enabled: _editando,
                  validator: (v) {
                    if (v == null || v.trim().isEmpty) {
                      return 'Nome obrigatorio';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                SolaTextField(
                  controller: _emailController,
                  label: 'Email',
                  prefixIcon: Icons.email_outlined,
                  enabled: false,
                  keyboardType: TextInputType.emailAddress,
                ),
              ],
            ),
          ),
          if (_editando) ...[
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: SolaButton(
                    label: 'Salvar',
                    icon: Icons.save,
                    onPressed: _salvarPerfil,
                  ),
                ),
                const SizedBox(width: 12),
                SolaButton.outlined(
                  label: 'Cancelar',
                  onPressed: () {
                    setState(() {
                      _editando = false;
                      _nomeController.text = auth.currentUser?.nome ?? '';
                    });
                  },
                ),
              ],
            ),
          ],
          const SizedBox(height: 32),
          const Divider(),
          const SizedBox(height: 8),
          Text(
            'Preferencias',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          _PreferenciaItem(
            icon: Icons.palette,
            title: 'Tema',
            trailing: DropdownButton<String>(
              value: tema.tema,
              underline: const SizedBox(),
              items: const [
                DropdownMenuItem(value: AppTheme.light, child: Text('Claro')),
                DropdownMenuItem(value: AppTheme.dark, child: Text('Escuro')),
                DropdownMenuItem(value: AppTheme.sepia, child: Text('Sepia')),
                DropdownMenuItem(
                    value: AppTheme.noturno, child: Text('Noturno')),
              ],
              onChanged: (v) {
                if (v != null) tema.setTema(v);
              },
            ),
          ),
          const SizedBox(height: 8),
          _PreferenciaItem(
            icon: Icons.text_fields,
            title: 'Tamanho da fonte',
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: const Icon(Icons.remove),
                  onPressed: tema.fontSize > 14
                      ? () => tema.setFontSize(tema.fontSize - 2)
                      : null,
                ),
                Text('${tema.fontSize.round()}'),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: tema.fontSize < 28
                      ? () => tema.setFontSize(tema.fontSize + 2)
                      : null,
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          const Divider(),
          const SizedBox(height: 8),
          Text(
            'Conta',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colorScheme.error,
            ),
          ),
          const SizedBox(height: 16),
          ListTile(
            leading: Icon(Icons.delete_outline, color: theme.colorScheme.error),
            title: Text(
              'Excluir conta',
              style: TextStyle(color: theme.colorScheme.error),
            ),
            subtitle: const Text('Acao irreversivel'),
            onTap: _confirmarExclusao,
          ),
        ],
      ),
    );
  }
}

class _PreferenciaItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final Widget trailing;

  const _PreferenciaItem({
    required this.icon,
    required this.title,
    required this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      trailing: trailing,
    );
  }
}
