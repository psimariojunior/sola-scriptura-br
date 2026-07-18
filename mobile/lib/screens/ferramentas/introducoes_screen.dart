import 'package:flutter/material.dart';

import '../../models/livro.dart';
import '../../services/biblia_service.dart';
import '../../widgets/book_selector.dart';
import '../../widgets/empty_state.dart';

class _SecaoIntro {
  final String titulo;
  final String conteudo;

  const _SecaoIntro({required this.titulo, required this.conteudo});
}

class _IntroLivro {
  final String titulo;
  final String descricao;
  final List<_SecaoIntro> secoes;

  const _IntroLivro({required this.titulo, required this.descricao, required this.secoes});
}

final Map<String, _IntroLivro> _introducoes = {
  'gn': const _IntroLivro(
    titulo: 'Introdução ao Gênesis',
    descricao: 'O livro dos começos — criação, queda e aliança.',
    secoes: [
      _SecaoIntro(titulo: 'Autoria', conteudo: 'Tradicionalmente atribuído a Moisés, que escreveu sob inspiração divina, conforme testemunho de Jesus (João 5:46) e tradição judaica.'),
      _SecaoIntro(titulo: 'Data', conteudo: 'Escrito durante a peregrinação no deserto, entre 1446-1406 a.C.'),
      _SecaoIntro(titulo: 'Propósito', conteudo: 'Registrar a origem de tudo o que existe, a queda do homem, o julgamento divino e o início da história da redenção através da aliança abraâmica.'),
      _SecaoIntro(titulo: 'Público-alvo', conteudo: 'O povo de Israel, que precisava conhecer suas origens e a féidelidade de Deus em suas promessas.'),
      _SecaoIntro(titulo: 'Estrutura', conteudo: '1. Criação (1-2)\n2. Queda e consequências (3-4)\n3. Genealogias (5-11)\n4. Abraão e a aliança (12-25)\n5. Isaque e Jacó (25-36)\n6. José no Egito (37-50)'),
      _SecaoIntro(titulo: 'Temas Principais', conteudo: 'Aliança, criação, pecado e redenção, promessa, descendência, soberania de Deus.'),
    ],
  ),
  'rm': const _IntroLivro(
    titulo: 'Introdução aos Romanos',
    descricao: 'A mais completa exposição da doutrina da justificação pela fé.',
    secoes: [
      _SecaoIntro(titulo: 'Autoria', conteudo: 'Escrito pelo apóstolo Paulo, de acordo com a tradição unânime da igreja primitiva.'),
      _SecaoIntro(titulo: 'Data', conteudo: 'Por volta de 57 d.C., durante a terceira viagem missionária de Paulo.'),
      _SecaoIntro(titulo: 'Propósito', conteudo: 'Apresentar o evangelho da justificação pela fé e explicar as implicações práticas da vida cristã.'),
      _SecaoIntro(titulo: 'Público-alvo', conteudo: 'A igreja em Roma, composta por judeus e gentios convertidos.'),
      _SecaoIntro(titulo: 'Estrutura', conteudo: '1. Pecado universal (1-3)\n2. Justificação pela fé (3-5)\n3. Santificação (6-8)\n4. Israel e os gentios (9-11)\n5. Vida prática (12-16)'),
      _SecaoIntro(titulo: 'Temas Principais', conteudo: 'Justificação pela fé, graça, pecado, santificação, soberania de Deus, ministério aIsrael.'),
    ],
  ),
  'mt': const _IntroLivro(
    titulo: 'Introdução a Mateus',
    descricao: 'O evangelho que apresenta Jesus como o Messias prometido.',
    secoes: [
      _SecaoIntro(titulo: 'Autoria', conteudo: 'Escrito pelo apóstolo Mateus (Levi), ex-coletor de impostos, testemunha ocular dos fatos.'),
      _SecaoIntro(titulo: 'Data', conteudo: 'Entre 50-70 d.C., provavelmente antes da destruição de Jerusalém.'),
      _SecaoIntro(titulo: 'Propósito', conteudo: 'Demonstrar que Jesus é o Messias prometido no Antigo Testamento e o cumprimento das profecias.'),
      _SecaoIntro(titulo: 'Público-alvo', conteudo: 'Principalmente judeus cristãos, mas também todos que buscam entender Jesus como Messias.'),
      _SecaoIntro(titulo: 'Estrutura', conteudo: '1. Infância e preparação (1-2)\n2. Ministério na Galileia (3-18)\n3. Ministério na Judeia (19-25)\n4. Paixão e ressurreição (26-28)'),
      _SecaoIntro(titulo: 'Temas Principais', conteudo: 'O Reino dos Céus, messianismo, cumprimento profético, discipulado, ética do Reino.'),
    ],
  ),
};

class IntroducoesScreen extends StatefulWidget {
  const IntroducoesScreen({super.key});

  @override
  State<IntroducoesScreen> createState() => _IntroducoesScreenState();
}

class _IntroducoesScreenState extends State<IntroducoesScreen> {
  Livro? _livro;

  @override
  void initState() {
    super.initState();
    _livro = BibliaService.livros.first;
  }

  void _abrirLivros() async {
    final resultado = await Navigator.of(context).push<Livro>(
      MaterialPageRoute(
        builder: (_) => BookSelector(
          livroSelecionado: _livro?.abreviacao,
          onSelecionado: (l) => Navigator.of(context).pop(l),
        ),
      ),
    );
    if (resultado != null && mounted) {
      setState(() => _livro = resultado);
    }
  }

  @override
  Widget build(BuildContext context) {
    final intro = _livro != null ? _introducoes[_livro!.abreviacao] : null;

    return Scaffold(
      appBar: AppBar(title: const Text('Introduções')),
      body: Column(
        children: [
          InkWell(
            onTap: _abrirLivros,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              color: Theme.of(context).colorScheme.primaryContainer.withOpacity(0.3),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.menu_book, size: 18),
                  const SizedBox(width: 8),
                  Text(
                    _livro?.nome ?? 'Selecionar livro',
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  const Icon(Icons.expand_more),
                ],
              ),
            ),
          ),
          Expanded(
            child: intro != null
                ? _IntroContent(intro: intro)
                : const EmptyState(
                    icon: Icons.info_outline,
                    title: 'Introdução indisponível',
                    message: 'A introdução para este livro ainda não está disponível',
                  ),
          ),
        ],
      ),
    );
  }
}

class _IntroContent extends StatelessWidget {
  final _IntroLivro intro;

  const _IntroContent({required this.intro});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          intro.titulo,
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Text(
          intro.descricao,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
                fontStyle: FontStyle.italic,
              ),
        ),
        const SizedBox(height: 20),
        ...intro.secoes.map((secao) => _SecaoWidget(secao: secao)),
      ],
    );
  }
}

class _SecaoWidget extends StatelessWidget {
  final _SecaoIntro secao;

  const _SecaoWidget({required this.secao});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              secao.titulo,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 14,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              secao.conteudo,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
