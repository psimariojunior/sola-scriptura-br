import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../models/study_note.dart';
import '../services/biblia_service.dart';
import '../services/notes_service.dart';
import '../widgets/empty_state.dart';
import '../widgets/loading_shimmer.dart';
import '../widgets/note_editor.dart';

class NotesScreen extends StatefulWidget {
  const NotesScreen({super.key});

  @override
  State<NotesScreen> createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {
  final NotesService _service = NotesService();
  List<StudyNote> _all = [];
  List<StudyNote> _filtradas = [];
  bool _carregando = true;
  final _buscaController = TextEditingController();
  final _dateFormat = DateFormat("dd/MM/yyyy");

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  @override
  void dispose() {
    _buscaController.dispose();
    super.dispose();
  }

  Future<void> _carregar() async {
    setState(() => _carregando = true);
    final list = await _service.getAll();
    if (!mounted) return;
    setState(() {
      _all = list;
      _filtradas = list;
      _carregando = false;
    });
  }

  void _filtrar(String query) {
    setState(() {
      if (query.isEmpty) {
        _filtradas = _all;
      } else {
        final q = query.toLowerCase();
        _filtradas = _all.where((n) {
          return n.texto.toLowerCase().contains(q) ||
              n.referencia.toLowerCase().contains(q);
        }).toList();
      }
    });
  }

  String _nomeLivro(String abrev) {
    for (final l in BibliaService.livros) {
      if (l.abreviacao == abrev) return l.nome;
    }
    return abrev;
  }

  Future<void> _abrirNota(StudyNote note) async {
    await showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (ctx) => NoteViewer(
        note: note,
        livroNome: _nomeLivro(note.livro),
        onEdit: () {
          Navigator.of(ctx).pop();
          _editarNota(note);
        },
        onDelete: () async {
          Navigator.of(ctx).pop();
          await _confirmarExclusao(note);
        },
      ),
    );
  }

  Future<void> _editarNota(StudyNote note) async {
    final novoTexto = await showNoteEditor(
      context,
      livro: note.livro,
      capitulo: note.capitulo,
      versiculo: note.versiculo,
      livroNome: _nomeLivro(note.livro),
      existing: note,
      traducao: note.traducao,
    );
    if (novoTexto == null || novoTexto.isEmpty) return;
    await _service.update(note.id!, novoTexto);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Nota atualizada')),
    );
    _carregar();
  }

  Future<void> _confirmarExclusao(StudyNote note) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Excluir nota?'),
        content: Text(
          'Tem certeza que deseja excluir a nota de ${_nomeLivro(note.livro)} ${note.capitulo}:${note.versiculo}?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Cancelar'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: Theme.of(ctx).colorScheme.error,
            ),
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Excluir'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    await _service.delete(note.id!);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Nota excluida')),
    );
    _carregar();
  }

  void _abrirVersiculo(StudyNote note) {
    context.push('/biblia/${note.livro}/${note.capitulo}');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notas'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Atualizar',
            onPressed: _carregar,
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: TextField(
              controller: _buscaController,
              onChanged: _filtrar,
              decoration: InputDecoration(
                hintText: 'Buscar nas suas notas...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _buscaController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _buscaController.clear();
                          _filtrar('');
                        },
                      )
                    : null,
              ),
            ),
          ),
          if (!_carregando)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 0),
              child: Row(
                children: [
                  Text(
                    '${_filtradas.length} ${_filtradas.length == 1 ? 'nota' : 'notas'}',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
          Expanded(child: _buildBody()),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          CardShimmer(count: 5, height: 80),
        ],
      );
    }

    if (_all.isEmpty) {
      return const EmptyState(
        icon: Icons.note_alt_outlined,
        title: 'Nenhuma nota ainda',
        message:
            'Suas anotacoes pessoais aparecerao aqui. Use o botao de nota na leitura da Biblia para criar uma.',
      );
    }

    if (_filtradas.isEmpty) {
      return EmptyState(
        icon: Icons.search_off,
        title: 'Nenhum resultado',
        message: 'Nenhuma nota encontrada para "${_buscaController.text}".',
      );
    }

    return RefreshIndicator(
      onRefresh: _carregar,
      child: ListView.builder(
        padding: const EdgeInsets.fromLTRB(12, 8, 12, 16),
        itemCount: _filtradas.length,
        itemBuilder: (context, idx) {
          final note = _filtradas[idx];
          return _buildNoteTile(note);
        },
      ),
    );
  }

  Widget _buildNoteTile(StudyNote note) {
    final theme = Theme.of(context);
    final dataStr =
        _dateFormat.format(DateTime.fromMillisecondsSinceEpoch(note.updatedAt));
    final livroNome = _nomeLivro(note.livro);

    return Dismissible(
      key: ValueKey('note-${note.id}'),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 24),
        margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
        decoration: BoxDecoration(
          color: theme.colorScheme.error,
          borderRadius: BorderRadius.circular(14),
        ),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      onDismissed: (_) => _confirmarExclusao(note),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
        child: Material(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(14),
          child: InkWell(
            onTap: () => _abrirNota(note),
            borderRadius: BorderRadius.circular(14),
            child: Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: theme.colorScheme.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: theme.colorScheme.outline.withValues(alpha: 0.25),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(
                        Icons.note,
                        size: 16,
                        color: theme.colorScheme.primary,
                      ),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          '$livroNome ${note.capitulo}:${note.versiculo}',
                          style: theme.textTheme.titleSmall?.copyWith(
                            color: theme.colorScheme.primary,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      Text(
                        dataStr,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    note.texto,
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.bodyMedium?.copyWith(height: 1.5),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton.icon(
                        onPressed: () => _abrirVersiculo(note),
                        icon: const Icon(Icons.menu_book, size: 16),
                        label: const Text('Abrir'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
