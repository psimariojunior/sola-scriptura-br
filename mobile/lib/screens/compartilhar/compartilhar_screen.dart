import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../widgets/empty_state.dart';

class CompartilharScreen extends StatefulWidget {
  const CompartilharScreen({super.key});

  @override
  State<CompartilharScreen> createState() => _CompartilharScreenState();
}

class _CompartilharScreenState extends State<CompartilharScreen> {
  String _tipo = 'versiculo';
  final _mensagemController = TextEditingController();
  bool _gerarImagem = false;

  @override
  void dispose() {
    _mensagemController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Compartilhar')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text(
            'Tipo de conteúdo',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _tipoCard(
                  icon: Icons.menu_book,
                  titulo: 'Versículo',
                  selecionado: _tipo == 'versiculo',
                  onTap: () => setState(() => _tipo = 'versiculo'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _tipoCard(
                  icon: Icons.article,
                  titulo: 'Estudo',
                  selecionado: _tipo == 'estudo',
                  onTap: () => setState(() => _tipo = 'estudo'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          const Text(
            'Pré-visualização',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          const SizedBox(height: 12),
          Card(
            elevation: 2,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Theme.of(context).colorScheme.primaryContainer,
                          Theme.of(context).colorScheme.primaryContainer.withOpacity(0.5),
                        ],
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        Text(
                          _tipo == 'versiculo'
                              ? 'João 3:16'
                              : 'Estudo sobre Gênesis',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          _tipo == 'versiculo'
                              ? 'Porque Deus tanto amou o mundo que deu o seu Filho unigênito, para que todo o que crer nele não pereça, mas tenha a vida eterna.'
                              : 'Estudo sobre a criação do mundo em Gênesis 1-2. Deus criou tudo com propósito e ordem.',
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontStyle: FontStyle.italic, fontSize: 15),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          'Sola Scriptura BR',
                          style: TextStyle(
                            fontSize: 11,
                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Mensagem personalizada',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _mensagemController,
            maxLines: 3,
            decoration: InputDecoration(
              hintText: 'Adicione uma mensagem...',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              filled: true,
            ),
          ),
          const SizedBox(height: 16),
          SwitchListTile(
            title: const Text('Gerar imagem para compartilhar'),
            subtitle: const Text('Cria uma imagem estilizada com o versículo'),
            value: _gerarImagem,
            onChanged: (v) => setState(() => _gerarImagem = v),
          ),
          const SizedBox(height: 24),
          const Text(
            'Compartilhar via',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _botaoSocial(
                context,
                icon: Icons.message,
                label: 'WhatsApp',
                cor: const Color(0xFF25D366),
                onTap: () => _compartilhar('WhatsApp'),
              ),
              _botaoSocial(
                context,
                icon: Icons.camera_alt,
                label: 'Instagram',
                cor: const Color(0xFFE1306C),
                onTap: () => _compartilhar('Instagram'),
              ),
              _botaoSocial(
                context,
                icon: Icons.copy,
                label: 'Copiar',
                cor: Colors.grey,
                onTap: () => _copiar(),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _tipoCard({
    required IconData icon,
    required String titulo,
    required bool selecionado,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: selecionado ? 3 : 1,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: selecionado
                  ? Theme.of(context).colorScheme.primary
                  : Colors.transparent,
              width: 2,
            ),
          ),
          child: Column(
            children: [
              Icon(icon, size: 32, color: Theme.of(context).colorScheme.primary),
              const SizedBox(height: 8),
              Text(titulo, style: const TextStyle(fontWeight: FontWeight.bold)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _botaoSocial(
    BuildContext context, {
    required IconData icon,
    required String label,
    required Color cor,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(color: cor, shape: BoxShape.circle),
            child: Icon(icon, color: Colors.white, size: 28),
          ),
          const SizedBox(height: 6),
          Text(label, style: const TextStyle(fontSize: 12)),
        ],
      ),
    );
  }

  String _textoCompartilhar() {
    final msg = _mensagemController.text.trim();
    if (_tipo == 'versiculo') {
      return '📖 João 3:16\n\nPorque Deus tanto amou o mundo que deu o seu Filho unigênito, para que todo o que crer nele não pereça, mas tenha a vida eterna.\n\n${msg.isNotEmpty ? '$msg\n\n' : ''}📱 Sola Scriptura BR';
    }
    return '📚 Estudo Bíblico\n\nGênesis 1-2: A Criação do Mundo\n\n${msg.isNotEmpty ? '$msg\n\n' : ''}📱 Sola Scriptura BR';
  }

  void _copiar() {
    Clipboard.setData(ClipboardData(text: _textoCompartilhar()));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Texto copiado!')),
    );
  }

  void _compartilhar(String plataforma) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Compartilhando via $plataforma...')),
    );
  }
}
