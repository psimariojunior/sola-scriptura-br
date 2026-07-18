import 'package:flutter/material.dart';

import '../../widgets/empty_state.dart';

class _Devocional {
  final String titulo;
  final String versiculo;
  final String textoVersiculo;
  final String reflexao;
  final String oracao;

  const _Devocional({
    required this.titulo,
    required this.versiculo,
    required this.textoVersiculo,
    required this.reflexao,
    required this.oracao,
  });
}

const _devocionalAtual = _Devocional(
  titulo: 'A Graça Suficiente',
  versiculo: '2 Coríntios 12:9',
  textoVersiculo: 'Mas ele me disse: "Minha graça é suficiente para você, porque o meu poder se aperfeiçoa na fraqueza." Portanto, vou gloriar-me muito mais nas minhas fraquezas, para que o poder de Cristo repouse sobre mim.',
  reflexao: 'Paulo clorou por um espinho na carne que não foi removido. Deus respondeu que Sua graça bastava. Quantas vezes pedimos a Deus que remova nossas dificuldades, quando Ele quer nos mostrar que Sua graça é suficiente nelas? A fraqueza humila nossa tendência ao orgulho e abre espaço para o poder de Cristo agir em nós.',
  oracao: 'Pai, ajuda-me a confiar na Tua graça suficiente. Quando enfrentar fraquezas e dificuldades, lembra-me de que Teu poder se aperfeiçoa nelas. Que eu não busque minha própria força, mas repouse no Teu poder. Em nome de Jesus, amém.',
);

class DevocionalScreen extends StatefulWidget {
  const DevocionalScreen({super.key});

  @override
  State<DevocionalScreen> createState() => _DevocionalScreenState();
}

class _DevocionalScreenState extends State<DevocionalScreen> {
  final _notaController = TextEditingController();
  bool _notaSalva = false;

  @override
  void dispose() {
    _notaController.dispose();
    super.dispose();
  }

  void _salvarNota() {
    if (_notaController.text.trim().isEmpty) return;
    setState(() => _notaSalva = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Nota salva com sucesso!')),
    );
  }

  void _compartilhar() {
    showModalBottomSheet(
      context: context,
      builder: (context) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Compartilhar', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              const SizedBox(height: 16),
              ListTile(
                leading: const Icon(Icons.share),
                title: const Text('Compartilhar versículo'),
                onTap: () => Navigator.pop(context),
              ),
              ListTile(
                leading: const Icon(Icons.copy),
                title: const Text('Copiar texto'),
                onTap: () => Navigator.pop(context),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final d = _devocionalAtual;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Devocional Diário'),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: _compartilhar,
            tooltip: 'Compartilhar',
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            d.titulo,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Card(
            color: Theme.of(context).colorScheme.primaryContainer.withOpacity(0.3),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    d.versiculo,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    d.textoVersiculo,
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(fontStyle: FontStyle.italic),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Reflexão',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
          ),
          const SizedBox(height: 8),
          Text(d.reflexao, style: Theme.of(context).textTheme.bodyLarge),
          const SizedBox(height: 24),
          const Text(
            'Oração',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
          ),
          const SizedBox(height: 8),
          Text(d.oracao, style: Theme.of(context).textTheme.bodyLarge),
          const SizedBox(height: 24),
          const Divider(),
          const SizedBox(height: 16),
          const Text(
            'Suas Anotações',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: _notaController,
            maxLines: 4,
            decoration: InputDecoration(
              hintText: 'Escreva suas reflexões pessoais...',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              filled: true,
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: _salvarNota,
              icon: Icon(_notaSalva ? Icons.check : Icons.save),
              label: Text(_notaSalva ? 'Salvo!' : 'Salvar anotação'),
            ),
          ),
        ],
      ),
    );
  }
}
