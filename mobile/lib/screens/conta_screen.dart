import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../models/biblia_models.dart';

class ContaScreen extends StatefulWidget {
  const ContaScreen({super.key});

  @override
  State<ContaScreen> createState() => _ContaScreenState();
}

class _ContaScreenState extends State<ContaScreen> {
  final ApiService _api = apiService;
  final _emailController = TextEditingController();
  final _senhaController = TextEditingController();
  final _nomeController = TextEditingController();

  bool _logado = false;
  bool _cadastrando = false;
  bool _carregando = false;
  String? _nomeUsuario;
  String? _erro;
  List<Favorito> _favoritos = [];

  @override
  void initState() {
    super.initState();
    _verificarSessao();
  }

  Future<void> _verificarSessao() async {
    if (_api.token != null) {
      setState(() => _logado = true);
      await _carregarFavoritos();
    }
  }

  Future<void> _carregarFavoritos() async {
    try {
      final dados = await _api.getFavoritos();
      setState(() => _favoritos = dados);
    } catch (e) {
      // favoritos podem exigir autenticacao; ignora silenciosamente
    }
  }

  Future<void> _entrar() async {
    final email = _emailController.text.trim();
    final senha = _senhaController.text;
    if (email.isEmpty || senha.isEmpty) return;
    setState(() {
      _carregando = true;
      _erro = null;
    });
    try {
      final data = await _api.login(email, senha);
      final user = data['usuario'] ?? data['user'];
      setState(() {
        _logado = true;
        _nomeUsuario = user != null ? (user['nome'] ?? user['name'])?.toString() : email;
        _carregando = false;
      });
      await _carregarFavoritos();
    } catch (e) {
      setState(() {
        _erro = e.toString();
        _carregando = false;
      });
    }
  }

  Future<void> _cadastrar() async {
    final nome = _nomeController.text.trim();
    final email = _emailController.text.trim();
    final senha = _senhaController.text;
    if (nome.isEmpty || email.isEmpty || senha.isEmpty) return;
    setState(() {
      _carregando = true;
      _erro = null;
    });
    try {
      final data = await _api.cadastrar(nome, email, senha);
      final user = data['usuario'] ?? data['user'];
      setState(() {
        _logado = true;
        _nomeUsuario = user != null ? (user['nome'] ?? user['name'])?.toString() : nome;
        _carregando = false;
      });
      await _carregarFavoritos();
    } catch (e) {
      setState(() {
        _erro = e.toString();
        _carregando = false;
      });
    }
  }

  void _sair() {
    _api.setToken(null);
    setState(() {
      _logado = false;
      _nomeUsuario = null;
      _favoritos = [];
      _emailController.clear();
      _senhaController.clear();
      _nomeController.clear();
    });
  }

  @override
  void dispose() {
    _emailController.dispose();
    _senhaController.dispose();
    _nomeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Conta')),
      body: _logado ? _buildPerfil() : _buildAuth(),
    );
  }

  Widget _buildAuth() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 16),
          Icon(
            Icons.menu_book,
            size: 56,
            color: Theme.of(context).primaryColor,
          ),
          const SizedBox(height: 12),
          Text(
            _cadastrando ? 'Criar conta' : 'Entrar',
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 22, fontFamily: 'serif', fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 24),
          if (_cadastrando)
            TextField(
              controller: _nomeController,
              decoration: const InputDecoration(
                labelText: 'Nome',
                border: OutlineInputBorder(),
              ),
            ),
          if (_cadastrando) const SizedBox(height: 12),
          TextField(
            controller: _emailController,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(
              labelText: 'E-mail',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _senhaController,
            obscureText: true,
            decoration: const InputDecoration(
              labelText: 'Senha',
              border: OutlineInputBorder(),
            ),
          ),
          if (_erro != null) ...[
            const SizedBox(height: 12),
            Text(_erro!, style: const TextStyle(color: Colors.red, fontSize: 13)),
          ],
          const SizedBox(height: 20),
          _carregando
              ? const Center(child: CircularProgressIndicator())
              : ElevatedButton(
                  onPressed: _cadastrando ? _cadastrar : _entrar,
                  child: Text(_cadastrando ? 'Cadastrar' : 'Entrar'),
                ),
          TextButton(
            onPressed: () => setState(() {
              _cadastrando = !_cadastrando;
              _erro = null;
            }),
            child: Text(_cadastrando
                ? 'Ja tem conta? Entrar'
                : 'Nao tem conta? Cadastre-se'),
          ),
        ],
      ),
    );
  }

  Widget _buildPerfil() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          elevation: 1.5,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).primaryColor,
              child: const Icon(Icons.person, color: Colors.white),
            ),
            title: Text(_nomeUsuario ?? 'Usuario'),
            subtitle: const Text('Conta ativa'),
            trailing: TextButton(onPressed: _sair, child: const Text('Sair')),
          ),
        ),
        const SizedBox(height: 16),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 8),
          child: Text('Favoritos', style: TextStyle(fontSize: 18, fontFamily: 'serif', fontWeight: FontWeight.w600)),
        ),
        const SizedBox(height: 8),
        if (_favoritos.isEmpty)
          const Padding(
            padding: EdgeInsets.all(24),
            child: Center(child: Text('Nenhum favorito ainda.')),
          ),
        ..._favoritos.map((f) => Card(
              margin: const EdgeInsets.symmetric(vertical: 4),
              child: ListTile(
                title: Text(f.referencia, style: const TextStyle(fontWeight: FontWeight.w600)),
                subtitle: Text(
                  f.texto,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(fontFamily: 'serif'),
                ),
                trailing: f.nota != null && f.nota!.isNotEmpty
                    ? const Icon(Icons.note, size: 20)
                    : null,
              ),
            )),
        const SizedBox(height: 16),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 8),
          child: Text('Minhas notas', style: TextStyle(fontSize: 18, fontFamily: 'serif', fontWeight: FontWeight.w600)),
        ),
        const SizedBox(height: 8),
        ..._favoritos
            .where((f) => f.nota != null && f.nota!.isNotEmpty)
            .map((f) => Card(
                  margin: const EdgeInsets.symmetric(vertical: 4),
                  child: ListTile(
                    title: Text(f.referencia),
                    subtitle: Text(f.nota!, style: const TextStyle(fontStyle: FontStyle.italic)),
                  ),
                )),
      ],
    );
  }
}
