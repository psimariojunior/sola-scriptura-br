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
  String? _erro;

  Perfil? _perfil;
  List<Favorito> _favoritos = [];

  static const Color _bg = Color(0xFF0A0A14);
  static const Color _surface = Color(0xFF12121E);
  static const Color _card = Color(0xFF1A1A2E);
  static const Color _accent = Color(0xFFC9A96E);
  static const Color _error = Color(0xFFEF4444);

  @override
  void initState() {
    super.initState();
    _verificarSessao();
  }

  Future<void> _verificarSessao() async {
    if (_api.token != null) {
      setState(() => _logado = true);
      await _carregarPerfil();
      await _carregarFavoritos();
    }
  }

  Future<void> _carregarPerfil() async {
    try {
      final dados = await _api.getPerfil();
      setState(() => _perfil = dados);
    } catch (_) {}
  }

  Future<void> _carregarFavoritos() async {
    try {
      final dados = await _api.getFavoritos();
      setState(() => _favoritos = dados);
    } catch (_) {}
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
        _carregando = false;
        if (user != null) {
          _perfil = Perfil(
            nome: (user['nome'] ?? user['name'] ?? email).toString(),
            email: email,
          );
        }
      });
      await _carregarPerfil();
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
        _carregando = false;
        _perfil = Perfil(
          nome: user != null ? (user['nome'] ?? user['name'] ?? nome).toString() : nome,
          email: email,
        );
      });
      await _carregarPerfil();
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
      _perfil = null;
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
      backgroundColor: _bg,
      body: _logado ? _buildPerfil() : _buildAuth(),
    );
  }

  // ──────────────────────────── AUTH ────────────────────────────

  Widget _buildAuth() {
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          children: [
            const SizedBox(height: 60),
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: const LinearGradient(
                  colors: [_accent, Color(0xFFB8944F)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: [
                  BoxShadow(
                    color: _accent.withAlpha(60),
                    blurRadius: 24,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: const Icon(Icons.menu_book_rounded, size: 36, color: _bg),
            ),
            const SizedBox(height: 24),
            const Text(
              'Sola Scriptura',
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.w700,
                color: Colors.white,
                letterSpacing: 1.2,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              _cadastrando ? 'Crie sua conta' : 'Bem-vindo de volta',
              style: const TextStyle(fontSize: 15, color: Colors.white70),
            ),
            const SizedBox(height: 40),
            if (_cadastrando)
              _buildTextField(
                controller: _nomeController,
                label: 'Nome completo',
                icon: Icons.person_outline_rounded,
              ),
            if (_cadastrando) const SizedBox(height: 16),
            _buildTextField(
              controller: _emailController,
              label: 'E-mail',
              icon: Icons.email_outlined,
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 16),
            _buildTextField(
              controller: _senhaController,
              label: 'Senha',
              icon: Icons.lock_outline_rounded,
              obscure: true,
            ),
            if (_erro != null) ...[
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: _error.withAlpha(25),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: _error.withAlpha(80)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.error_outline, color: _error, size: 18),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        _erro!,
                        style: const TextStyle(color: _error, fontSize: 13),
                      ),
                    ),
                  ],
                ),
              ),
            ],
            const SizedBox(height: 28),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton(
                onPressed: _carregando ? null : (_cadastrando ? _cadastrar : _entrar),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _accent,
                  foregroundColor: _bg,
                  disabledBackgroundColor: _accent.withAlpha(120),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  elevation: 0,
                ),
                child: _carregando
                    ? const SizedBox(
                        width: 22,
                        height: 22,
                        child: CircularProgressIndicator(strokeWidth: 2.5, color: _bg),
                      )
                    : Text(
                        _cadastrando ? 'Criar conta' : 'Entrar',
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                      ),
              ),
            ),
            const SizedBox(height: 16),
            TextButton(
              onPressed: () => setState(() {
                _cadastrando = !_cadastrando;
                _erro = null;
              }),
              child: Text.rich(
                TextSpan(
                  text: _cadastrando ? 'Já tem conta? ' : 'Não tem conta? ',
                  style: const TextStyle(color: Colors.white54, fontSize: 14),
                  children: [
                    TextSpan(
                      text: _cadastrando ? 'Entrar' : 'Cadastre-se',
                      style: const TextStyle(color: _accent, fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    bool obscure = false,
    TextInputType? keyboardType,
  }) {
    return TextField(
      controller: controller,
      obscureText: obscure,
      keyboardType: keyboardType,
      style: const TextStyle(color: Colors.white),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: const TextStyle(color: Colors.white54),
        prefixIcon: Icon(icon, color: Colors.white38, size: 20),
        filled: true,
        fillColor: _surface,
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Colors.white10),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: _accent, width: 1.5),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      ),
    );
  }

  // ──────────────────────────── PROFILE ────────────────────────────

  Widget _buildPerfil() {
    final nome = _perfil?.nome ?? 'Usuário';
    final email = _perfil?.email ?? '';
    final iniciais = nome.isNotEmpty ? nome[0].toUpperCase() : 'U';

    return CustomScrollView(
      slivers: [
        // ── Profile Banner ──
        SliverToBoxAdapter(
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(24, 56, 24, 32),
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [_card, _surface, _bg],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
            child: Column(
              children: [
                Container(
                  width: 88,
                  height: 88,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: const LinearGradient(
                      colors: [_accent, Color(0xFFB8944F)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: _accent.withAlpha(70),
                        blurRadius: 20,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: _perfil?.avatarUrl != null
                      ? ClipOval(
                          child: Image.network(
                            _perfil!.avatarUrl!,
                            width: 88,
                            height: 88,
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) => Center(
                              child: Text(
                                iniciais,
                                style: const TextStyle(
                                  fontSize: 34,
                                  fontWeight: FontWeight.w700,
                                  color: _bg,
                                ),
                              ),
                            ),
                          ),
                        )
                      : Center(
                          child: Text(
                            iniciais,
                            style: const TextStyle(
                              fontSize: 34,
                              fontWeight: FontWeight.w700,
                              color: _bg,
                            ),
                          ),
                        ),
                ),
                const SizedBox(height: 16),
                Text(
                  nome,
                  style: const TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  email,
                  style: const TextStyle(fontSize: 14, color: Colors.white54),
                ),
                const SizedBox(height: 4),
                if (_perfil?.isPremium == true)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [_accent, Color(0xFFD4AF61)],
                      ),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      'PREMIUM',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: _bg,
                        letterSpacing: 1.5,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),

        // ── Stats ──
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 8, 20, 16),
            child: Row(
              children: [
                _buildStatCard(
                  icon: Icons.auto_stories_rounded,
                  value: '${_perfil?.totalEstudos ?? 0}',
                  label: 'Estudos',
                ),
                const SizedBox(width: 12),
                _buildStatCard(
                  icon: Icons.local_fire_department_rounded,
                  value: '${_perfil?.sequenciaDias ?? 0}',
                  label: 'Sequência',
                ),
                const SizedBox(width: 12),
                _buildStatCard(
                  icon: Icons.schedule_rounded,
                  value: '${(_perfil?.horasEstudo ?? 0).toStringAsFixed(1)}h',
                  label: 'Horas',
                ),
              ],
            ),
          ),
        ),

        // ── Premium CTA ──
        if (_perfil?.isPremium != true)
          SliverToBoxAdapter(
            child: _buildPremiumCTA(),
          ),

        // ── Settings Sections ──
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 24, 20, 8),
            child: _buildSectionHeader('Conta'),
          ),
        ),
        SliverToBoxAdapter(
          child: _buildSettingsGroup([
            _buildSettingTile(Icons.person_outline_rounded, 'Editar perfil', onTap: () {}),
            _buildSettingTile(Icons.lock_outline_rounded, 'Alterar senha', onTap: () {}),
            _buildSettingTile(Icons.credit_card_rounded, 'Assinatura', onTap: () {}),
          ]),
        ),

        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 24, 20, 8),
            child: _buildSectionHeader('Bíblia'),
          ),
        ),
        SliverToBoxAdapter(
          child: _buildSettingsGroup([
            _buildSettingTile(Icons.translate_rounded, 'Tradução padrão', trailing: const Text('NVI', style: TextStyle(color: Colors.white38, fontSize: 13)), onTap: () {}),
            _buildSettingTile(Icons.format_size_rounded, 'Tamanho da fonte', onTap: () {}),
            _buildSettingTile(Icons.dark_mode_outlined, 'Modo leitura', onTap: () {}),
            _buildSettingTile(Icons.bookmark_border_rounded, 'Favoritos', trailing: Text('${_favoritos.length}', style: const TextStyle(color: Colors.white38, fontSize: 13)), onTap: () {}),
          ]),
        ),

        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 24, 20, 8),
            child: _buildSectionHeader('Notificações'),
          ),
        ),
        SliverToBoxAdapter(
          child: _buildSettingsGroup([
            _buildSwitchTile(Icons.notifications_none_rounded, 'Notificações push', value: true, onChanged: (_) {}),
            _buildSwitchTile(Icons.wb_sunny_outlined, 'Lembrete diário', value: false, onChanged: (_) {}),
            _buildSwitchTile(Icons.calendar_today_rounded, 'Plano de leitura', value: true, onChanged: (_) {}),
          ]),
        ),

        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 24, 20, 8),
            child: _buildSectionHeader('Premium'),
          ),
        ),
        SliverToBoxAdapter(
          child: _buildSettingsGroup([
            _buildSettingTile(Icons.workspace_premium_rounded, 'Desbloquear tudo', accent: true, onTap: () {}),
            _buildSettingTile(Icons.auto_awesome_rounded, 'IA ilimitada', onTap: () {}),
            _buildSettingTile(Icons.offline_bolt_rounded, 'Modo offline', onTap: () {}),
            _buildSettingTile(Icons.cloud_download_outlined, 'Exportar dados', onTap: () {}),
          ]),
        ),

        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 24, 20, 8),
            child: _buildSectionHeader('Sobre'),
          ),
        ),
        SliverToBoxAdapter(
          child: _buildSettingsGroup([
            _buildSettingTile(Icons.info_outline_rounded, 'Sobre o app', onTap: () {}),
            _buildSettingTile(Icons.description_outlined, 'Termos de uso', onTap: () {}),
            _buildSettingTile(Icons.privacy_tip_outlined, 'Política de privacidade', onTap: () {}),
            _buildSettingTile(Icons.star_border_rounded, 'Avaliar o app', onTap: () {}),
            _buildSettingTile(Icons.share_rounded, 'Compartilhar', onTap: () {}),
          ]),
        ),

        // ── Logout ──
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 32, 20, 16),
            child: SizedBox(
              width: double.infinity,
              height: 52,
              child: OutlinedButton.icon(
                onPressed: _sair,
                icon: const Icon(Icons.logout_rounded, color: _error),
                label: const Text(
                  'Sair da conta',
                  style: TextStyle(color: _error, fontSize: 15, fontWeight: FontWeight.w600),
                ),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: _error, width: 1.2),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  backgroundColor: _error.withAlpha(15),
                ),
              ),
            ),
          ),
        ),

        // ── Version ──
        const SliverToBoxAdapter(
          child: Padding(
            padding: EdgeInsets.fromLTRB(20, 8, 20, 48),
            child: Column(
              children: [
                Text(
                  'Sola Scriptura',
                  style: TextStyle(fontSize: 13, color: Colors.white24, letterSpacing: 1),
                ),
                SizedBox(height: 2),
                Text(
                  'v1.0.0',
                  style: TextStyle(fontSize: 12, color: Colors.white18),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  // ──────────────────────────── BUILDERS ────────────────────────────

  Widget _buildStatCard({
    required IconData icon,
    required String value,
    required String label,
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: _surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.white.withAlpha(15)),
        ),
        child: Column(
          children: [
            Icon(icon, color: _accent, size: 22),
            const SizedBox(height: 8),
            Text(
              value,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w800,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: const TextStyle(fontSize: 11, color: Colors.white54),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPremiumCTA() {
    return Container(
      margin: const EdgeInsets.fromLTRB(20, 0, 20, 8),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF2A2215), Color(0xFF1E1A12)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: _accent.withAlpha(60), width: 1),
        boxShadow: [
          BoxShadow(
            color: _accent.withAlpha(25),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [_accent, Color(0xFFD4AF61)],
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(Icons.workspace_premium_rounded, color: _bg, size: 26),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Desbloquear Premium',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 3),
                const Text(
                  'IA ilimitada, mapas offline e mais',
                  style: TextStyle(fontSize: 13, color: Colors.white54),
                ),
              ],
            ),
          ),
          const Icon(Icons.arrow_forward_ios_rounded, size: 16, color: _accent),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Text(
      title.toUpperCase(),
      style: const TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w700,
        color: Colors.white38,
        letterSpacing: 1.5,
      ),
    );
  }

  Widget _buildSettingsGroup(List<Widget> children) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: _surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withAlpha(12)),
      ),
      child: Column(children: children),
    );
  }

  Widget _buildSettingTile(
    IconData icon,
    String title, {
    Widget? trailing,
    bool accent = false,
    required VoidCallback onTap,
  }) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              Icon(icon, size: 21, color: accent ? _accent : Colors.white54),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: accent ? _accent : Colors.white,
                  ),
                ),
              ),
              if (trailing != null) ...[trailing, const SizedBox(width: 8)],
              Icon(
                Icons.chevron_right_rounded,
                size: 18,
                color: Colors.white.withAlpha(50),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSwitchTile(
    IconData icon,
    String title, {
    required bool value,
    required ValueChanged<bool> onChanged,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Row(
        children: [
          Icon(icon, size: 21, color: Colors.white54),
          const SizedBox(width: 14),
          Expanded(
            child: Text(
              title,
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: Colors.white),
            ),
          ),
          Switch.adaptive(
            value: value,
            onChanged: onChanged,
            activeColor: _accent,
            activeTrackColor: _accent.withAlpha(80),
            inactiveThumbColor: Colors.white38,
            inactiveTrackColor: Colors.white12,
          ),
        ],
      ),
    );
  }
}
