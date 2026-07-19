import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/study_note.dart';

class NoteEditor extends StatefulWidget {
  final String livro;
  final int capitulo;
  final int versiculo;
  final String? livroNome;
  final StudyNote? existing;
  final String traducao;

  const NoteEditor({
    super.key,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
    this.livroNome,
    this.existing,
    this.traducao = 'arc',
  });

  @override
  State<NoteEditor> createState() => _NoteEditorState();
}

class _NoteEditorState extends State<NoteEditor> {
  late final TextEditingController _controller;
  final FocusNode _focusNode = FocusNode();
  final _dateFormat = DateFormat("dd/MM/yyyy 'as' HH:mm");

  bool get _isEditing => widget.existing != null;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(
      text: widget.existing?.texto ?? '',
    );
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _focusNode.requestFocus();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _save() {
    final texto = _controller.text.trim();
    if (texto.isEmpty) {
      Navigator.of(context).pop(null);
      return;
    }
    Navigator.of(context).pop(texto);
  }

  void _cancel() {
    Navigator.of(context).pop(null);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final ref = widget.livroNome != null
        ? '${widget.livroNome} ${widget.capitulo}:${widget.versiculo}'
        : '${widget.livro} ${widget.capitulo}:${widget.versiculo}';

    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  margin: const EdgeInsets.only(bottom: 14),
                  decoration: BoxDecoration(
                    color:
                        theme.colorScheme.outline.withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              Row(
                children: [
                  Icon(
                    _isEditing ? Icons.edit_note : Icons.note_add,
                    color: theme.colorScheme.primary,
                    size: 22,
                  ),
                  const SizedBox(width: 10),
                  Text(
                    _isEditing ? 'Editar nota' : 'Nova nota',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                ref,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
              if (_isEditing) ...[
                const SizedBox(height: 4),
                Text(
                  'Atualizada em ${_dateFormat.format(DateTime.fromMillisecondsSinceEpoch(widget.existing!.updatedAt))}',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
              const SizedBox(height: 16),
              TextField(
                controller: _controller,
                focusNode: _focusNode,
                maxLines: 8,
                minLines: 5,
                textCapitalization: TextCapitalization.sentences,
                decoration: InputDecoration(
                  hintText: 'Escreva sua reflexao, estudo ou oracao...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: _cancel,
                      child: const Text('Cancelar'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: FilledButton.icon(
                      onPressed: _save,
                      icon: const Icon(Icons.save_outlined, size: 18),
                      label: Text(_isEditing ? 'Atualizar' : 'Salvar'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class NoteViewer extends StatelessWidget {
  final StudyNote note;
  final String? livroNome;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;

  const NoteViewer({
    super.key,
    required this.note,
    this.livroNome,
    this.onEdit,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final ref = livroNome != null
        ? '$livroNome ${note.capitulo}:${note.versiculo}'
        : note.referencia;
    final dateFormat = DateFormat("dd/MM/yyyy 'as' HH:mm");

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: 14),
              decoration: BoxDecoration(
                color: theme.colorScheme.outline.withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          Row(
            children: [
              Icon(
                Icons.note,
                color: theme.colorScheme.primary,
                size: 22,
              ),
              const SizedBox(width: 10),
              Text(
                'Nota',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            ref,
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.primary,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Atualizada em ${dateFormat.format(DateTime.fromMillisecondsSinceEpoch(note.updatedAt))}',
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
          const SizedBox(height: 16),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceContainerHighest
                  .withValues(alpha: 0.5),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              note.texto,
              style: theme.textTheme.bodyLarge?.copyWith(height: 1.55),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              if (onDelete != null)
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: onDelete,
                    icon: const Icon(Icons.delete_outline, size: 18),
                    label: const Text('Excluir'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: theme.colorScheme.error,
                      side: BorderSide(color: theme.colorScheme.error),
                    ),
                  ),
                ),
              if (onDelete != null && onEdit != null)
                const SizedBox(width: 12),
              if (onEdit != null)
                Expanded(
                  child: FilledButton.icon(
                    onPressed: onEdit,
                    icon: const Icon(Icons.edit_outlined, size: 18),
                    label: const Text('Editar'),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

Future<String?> showNoteEditor(
  BuildContext context, {
  required String livro,
  required int capitulo,
  required int versiculo,
  String? livroNome,
  StudyNote? existing,
  String traducao = 'arc',
}) {
  return showModalBottomSheet<String>(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (ctx) => NoteEditor(
      livro: livro,
      capitulo: capitulo,
      versiculo: versiculo,
      livroNome: livroNome,
      existing: existing,
      traducao: traducao,
    ),
  );
}
