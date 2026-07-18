import 'package:flutter/material.dart';

import '../../widgets/empty_state.dart';

class _Passagem {
  final String titulo;
  final String mateus;
  final String marcos;
  final String lucas;
  final String? notas;

  const _Passagem({
    required this.titulo,
    required this.mateus,
    required this.marcos,
    required this.lucas,
    this.notas,
  });
}

const _passagens = [
  _Passagem(
    titulo: 'Nascimento de Jesus',
    mateus: 'Mt 1:18-25 — Nascimento de Jesus, anunciado por anjos. José sonha e obedece.',
    marcos: 'Não registrado em Marcos.',
    lucas: 'Lc 1:26-38 — Anunciação a Maria. Lc 2:1-20 — Nascimento em Belém, adoração dos pastores.',
    notas: 'Mateus foca na perspectiva de José; Lucas na perspectiva de Maria.',
  ),
  _Passagem(
    titulo: 'Batismo de Jesus',
    mateus: 'Mt 3:13-17 — Jesus é batizado por João. O céu se abre e o Espírito desce.',
    marcos: 'Mc 1:9-11 — Breve relato do batismo.',
    lucas: 'Lc 3:21-22 — Registra a oração de Jesus e a descida do Espírito.',
    notas: 'Todos os três sinóticos relatam a voz do Pai do céu.',
  ),
  _Passagem(
    titulo: 'Tentação no deserto',
    mateus: 'Mt 4:1-11 — Três tentações de Satanás. Jesus responde com Escrituras.',
    marcos: 'Mc 1:12-13 — Menção breve ao deserto e aos anjos.',
    lucas: 'Lc 4:1-13 — Ordem diferente das tentações; menciona o tempo determinado.',
    notas: 'Marcos é o mais breve. Lucas e Mateus invertem a ordem da 2ª e 3ª tentação.',
  ),
  _Passagem(
    titulo: 'Sermão da Montanha',
    mateus: 'Mt 5-7 — Discurso extenso: bem-aventuranças, amor aos inimigos, oração, julgamento.',
    marcos: 'Não registrado como discurso contínuo.',
    lucas: 'Lc 6:20-49 — Versão resumida no "Sermão da Planície".',
    notas: 'Mateus tem a versão mais completa. Lucas apresenta versão mais curta e com diferenças.',
  ),
  _Passagem(
    titulo: 'Multiplicação dos pães',
    mateus: 'Mt 14:13-21 — 5.000 alimentados com 5 pães e 2 peixes.',
    marcos: 'Mc 6:30-44 — Mesmo evento com detalhes adicionais.',
    lucas: 'Lc 9:10-17 — Versão mais concisa.',
    notas: 'Há dois eventos de multiplicação nos Evangelhos; este é o primeiro.',
  ),
  _Passagem(
    titulo: 'Transfiguração',
    mateus: 'Mt 17:1-8 — Jesus transfigurado no monte, com Moisés e Elias.',
    marcos: 'Mc 9:2-8 — Adiciona detalhes sobre as roupas brancas.',
    lucas: 'Lc 9:28-36 — Menciona a conversa de Jesus com Moisés e Elias.',
    notas: 'Todos registram a voz do Pai e o mandado de silêncio.',
  ),
  _Passagem(
    titulo: 'Entrada triunfal em Jerusalém',
    mateus: 'Mt 21:1-11 — Jesus entra montado num jumento, multidões aclamam.',
    marcos: 'Mc 11:1-10 — Registra a Busca do jumento.',
    lucas: 'Lc 19:28-44 — Jesus chora sobre Jerusalém.',
    notas: 'Lucas inclui o lamento sobre Jerusalém, ausente nos outros.',
  ),
  _Passagem(
    titulo: 'Última Ceia',
    mateus: 'Mt 26:17-30 — Instituição da Ceia, predição da traição.',
    marcos: 'Mc 14:12-26 — Versão similar com detalhes.',
    lucas: 'Lc 22:7-38 — Inclui discussão sobre quem é o maior.',
    notas: 'Mateus e Marcos mencionam o "sangue da aliança". Lucas menciona o cálice.',
  ),
  _Passagem(
    titulo: 'Crucificação e Morte',
    mateus: 'Mt 27:32-56 — Trevas, véu rasgado, morte. Centurião declara Jesus inocente.',
    marcos: 'Mc 15:22-39 — Versão concisa, centurião declara "Filho de Deus".',
    lucas: 'Lc 23:26-49 — Jesus perdoa os crucificados. Último fôlego.',
    notas: 'Cada evangelista destaca aspectos diferentes da paixão.',
  ),
  _Passagem(
    titulo: 'Ressurreição',
    mateus: 'Mt 28:1-10 — Mulheres encontram túmulo vazio. Jesus aparece.',
    marcos: 'Mc 16:1-8 — Mulheres assustadas. Fim abrupto em Marcos original.',
    lucas: 'Lc 24:1-12 — Pedro corre ao túmulo. Lc 24:13-35 — Aparelhos a dois discípulos.',
    notas: 'Marcos termina abruptamente (versão original). Lucas inclui o encontro no caminho de Emaús.',
  ),
];

class HarmoniaScreen extends StatefulWidget {
  const HarmoniaScreen({super.key});

  @override
  State<HarmoniaScreen> createState() => _HarmoniaScreenState();
}

class _HarmoniaScreenState extends State<HarmoniaScreen> {
  int _indice = 0;

  @override
  Widget build(BuildContext context) {
    final p = _passagens[_indice];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Harmonia Sinótica'),
        actions: [
          IconButton(
            icon: const Icon(Icons.chevron_left),
            onPressed: _indice > 0 ? () => setState(() => _indice--) : null,
          ),
          Text('${_indice + 1}/${_passagens.length}',
              style: const TextStyle(fontSize: 14)),
          IconButton(
            icon: const Icon(Icons.chevron_right),
            onPressed: _indice < _passagens.length - 1
                ? () => setState(() => _indice++)
                : null,
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(12),
        children: [
          Text(
            p.titulo,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          _colunaEvangelho(context, 'Mateus', p.mateus, Colors.blue),
          const SizedBox(height: 12),
          _colunaEvangelho(context, 'Marcos', p.marcos, Colors.green),
          const SizedBox(height: 12),
          _colunaEvangelho(context, 'Lucas', p.lucas, Colors.orange),
          if (p.notas != null) ...[
            const SizedBox(height: 16),
            Card(
              color: Theme.of(context).colorScheme.surfaceVariant.withOpacity(0.5),
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Icon(Icons.info_outline, size: 18, color: Theme.of(context).colorScheme.primary),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        p.notas!,
                        style: TextStyle(fontSize: 13, color: Theme.of(context).colorScheme.onSurfaceVariant),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _colunaEvangelho(BuildContext context, String titulo, String texto, Color cor) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 4,
                  height: 18,
                  decoration: BoxDecoration(
                    color: cor,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  titulo,
                  style: TextStyle(fontWeight: FontWeight.bold, color: cor, fontSize: 14),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text(texto, style: Theme.of(context).textTheme.bodyMedium),
          ],
        ),
      ),
    );
  }
}
