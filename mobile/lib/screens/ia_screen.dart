import 'package:flutter/material.dart';
import '../services/api_service.dart';

class IaScreen extends StatefulWidget {
  const IaScreen({super.key});

  @override
  State<IaScreen> createState() => _IaScreenState();
}

class _IaScreenState extends State<IaScreen> {
  final ApiService _api = apiService;
  final TextEditingController _perguntaController = TextEditingController();
  final TextEditingController _respostaController = TextEditingController();

  String _tradicao = 'reformada';
  bool _enviando = false;
  String? _resposta;
  String? _erro;

  static const List<String> _tradicoes = [
    'reformada',
    'catolica',
    'arminiana',
    'luterana',
    'anglicana',
    'ortodoxa',
    'neutra',
  ];

  Future<void> _enviar() async {
    final pergunta = _perguntaController.text.trim();
    if (pergunta.isEmpty) return;
    setState(() {
      _enviando = true;
      _erro = null;
      _resposta = null;
    });
    try {
      final data = await _api.getPerguntasIA(pergunta, tradicao: _tradicao);
      setState(() {
        _resposta = (data['resposta'] ?? data['texto'] ?? '').toString();
        if (_resposta!.isEmpty) {
          _resposta = data.toString();
        }
        _enviando = false;
      });
    } catch (e) {
      setState(() {
        _erro = e.toString();
        _enviando = false;
      });
    }
  }

  @override
  void dispose() {
    _perguntaController.dispose();
    _respostaController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Assistente IA')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: Row(
              children: [
                const Text('Tradicao: '),
                const SizedBox(width: 8),
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _tradicao,
                    decoration: const InputDecoration(
                      isDense: true,
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    ),
                    items: _tradicoes
                        .map((t) => DropdownMenuItem(value: t, child: Text(t)))
                        .toList(),
                    onChanged: (v) {
                      if (v != null) setState(() => _tradicao = v);
                    },
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: _buildResposta(),
          ),
          _buildCampoPergunta(),
        ],
      ),
    );
  }

  Widget _buildResposta() {
    if (_enviando) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_erro != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 40),
              const SizedBox(height: 12),
              Text(_erro!, textAlign: TextAlign.center),
              const SizedBox(height: 16),
              ElevatedButton(onPressed: _enviar, child: const Text('Reenviar')),
            ],
          ),
        ),
      );
    }
    if (_resposta == null) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.auto_awesome, size: 48, color: Colors.grey),
            SizedBox(height: 12),
            Text('Faca uma pergunta sobre a Biblia.'),
          ],
        ),
      );
    }
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Card(
        elevation: 1.5,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(Icons.auto_awesome, size: 18, color: Theme.of(context).primaryColor),
                  const SizedBox(width: 8),
                  const Text(
                    'Resposta',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                  ),
                ],
              ),
              const Divider(height: 16),
              SelectableText(
                _resposta!,
                style: const TextStyle(fontSize: 15, height: 1.5, fontFamily: 'serif'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCampoPergunta() {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: _perguntaController,
                minLines: 1,
                maxLines: 4,
                textInputAction: TextInputAction.send,
                onSubmitted: (_) => _enviar(),
                decoration: const InputDecoration(
                  hintText: 'Digite sua pergunta biblica...',
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                ),
              ),
            ),
            const SizedBox(width: 8),
            IconButton.filled(
              onPressed: _enviando ? null : _enviar,
              icon: const Icon(Icons.send),
              style: IconButton.styleFrom(
                padding: const EdgeInsets.all(14),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
