import 'package:flutter/material.dart';

import '../../widgets/empty_state.dart';

class _Parabola {
  final String titulo;
  final String referencia;
  final String resumo;
  final String texto;
  final String explicacao;

  const _Parabola({
    required this.titulo,
    required this.referencia,
    required this.resumo,
    required this.texto,
    required this.explicacao,
  });
}

const _parabolas = [
  _Parabola(
    titulo: 'O Semeador',
    referencia: 'Mateus 13:3-9',
    resumo: 'Jesus ensina sobre diferentes respostas à Palavra de Deus.',
    texto: 'Saiu o semeador a semear. Enquanto semeava, parte caiu à beira do caminho, parte caiu em terreno pedregoso, parte entre espinhos e parte em boa terra.',
    explicacao: 'Representa quatro tipos de ouvintes da Palavra: os que não compreendem, os que recebem com alegria mas não perseveram, os que são sufocados pelas preocupações e os que produzem fruto.',
  ),
  _Parabola(
    titulo: 'O Bom Samaritano',
    referencia: 'Lucas 10:30-37',
    resumo: 'A parábola sobre amar o próximo sem distinção.',
    texto: 'Um homem descia de Jerusalém para Jericó, caiu nas mãos dos salteadores. Um sacerdote e um levita passaram sem ajudar. Um samaritano socorreu-o.',
    explicacao: 'Ensinou que o próximo é toda pessoa que precisa de ajuda, independentemente de raça, religião ou posição social.',
  ),
  _Parabola(
    titulo: 'O Filho Pródigo',
    referencia: 'Lucas 15:11-32',
    resumo: 'A história da graça e do perdão do Pai.',
    texto: 'Um filho pediu sua herança, gastou tudo e voltou arrependido. O pai o recebeu com festa.',
    explicacao: 'Illustra o amor incondicional de Deus que acolhe o pecador arrependido e celebra sua restauração.',
  ),
  _Parabola(
    titulo: 'O SemearJoio',
    referencia: 'Mateus 13:24-30',
    resumo: 'O joio misturado com o trigo até o juízo final.',
    texto: 'Um homem semeou boa semente, mas seu inimigo semeou joio. Os servos queriam arrancar o joio, mas ele disse que deixasse crescer até a ceifa.',
    explicacao: 'Representa a coexistência dos justos e dos ímpios no mundo até o dia do juízo, quando Deus separará definitivamente.',
  ),
  _Parabola(
    titulo: 'A Ovelha Perdida',
    referencia: 'Mateus 18:12-14',
    resumo: 'O valor de uma única alma perante Deus.',
    texto: 'Se um homem tem cem ovelhas e uma se perde, não deixa as noventa e nove para ir buscar a perdida.',
    explicacao: 'Demonstra o cuidado personalizado de Deus por cada individuo e a alegria no céu quando um pecador se arrepende.',
  ),
  _Parabola(
    titulo: 'O Tesouro Escondido',
    referencia: 'Mateus 13:44',
    resumo: 'O valor infinito do Reino dos Céus.',
    texto: 'Um homem encontrou um tesouro escondido num campo. Vendeu tudo o que tinha para comprar aquele campo.',
    explicacao: 'O Reino dos Céus é tão valioso que vale a pena sacrificar tudo para obtê-lo.',
  ),
  _Parabola(
    titulo: 'A Pérola de Grande Preço',
    referencia: 'Mateus 13:45-46',
    resumo: 'A busca pela excelência espiritual.',
    texto: 'Um comerciante de pérolas encontrou uma de grande valor e vendeu tudo para comprá-la.',
    explicacao: 'Assim como o comerciante reconheceu o valor da pérola, devemos reconhecer e buscar o Reino de Deus acima de tudo.',
  ),
  _Parabola(
    titulo: 'Os Talentos',
    referencia: 'Mateus 25:14-30',
    resumo: 'A responsabilidade de usar os dons que Deus nos deu.',
    texto: 'Um homem deixou talentos com seus servos. Dois o multiplicaram, mas um escondeu no campo.',
    explicacao: 'Devemos usar os dons e oportunidades que Deus nos dá para o Seu reino, e prestaremos contas do que fizemos com eles.',
  ),
  _Parabola(
    titulo: 'As Dez Virgens',
    referencia: 'Mateus 25:1-13',
    resumo: 'A importância de estar preparado para a volta de Cristo.',
    texto: 'Cinco virgens foram sábias e cinco foram insensatas. Somente as sábias entraram para as bodas.',
    explicacao: 'Devemos estar preparados espiritualmente para a volta de Jesus, pois o dia e a hora ninguém sabe.',
  ),
  _Parabola(
    titulo: 'O Juiz Iníquo',
    referencia: 'Lucas 18:1-8',
    resumo: 'A persistência na oração.',
    texto: 'Uma viúva pediu justiça a um juiz que não temia a Deus. Ele acabou atendendo por não querer ser incomodado.',
    explicacao: 'Se um juiz injusto atendeu, quanto mais o justo Deus atenderá os que clamaM a Ele dia e noite.',
  ),
  _Parabola(
    titulo: 'O Publicano e o Fariseu',
    referencia: 'Lucas 18:9-14',
    resumo: 'A humildade diante de Deus.',
    texto: 'O fariseu orava ostentando suas obras, enquanto o publicano orava pedindo misericórdia.',
    explicacao: 'Deus resiste aos soberbos, mas dá graça aos humildes. A verdadeira adoração vem de um coração arrependido.',
  ),
  _Parabola(
    titulo: 'Os Operários da Vinha',
    referencia: 'Mateus 20:1-16',
    resumo: 'A generosidade da graça divina.',
    texto: 'Um dono de vinha contratou operários em diferentes horas, mas pagou a todos igualmente.',
    explicacao: 'A graça de Deus não é proporcional aos nossos méritos, mas à Sua bondade e soberania.',
  ),
];

class ParabolasScreen extends StatefulWidget {
  const ParabolasScreen({super.key});

  @override
  State<ParabolasScreen> createState() => _ParabolasScreenState();
}

class _ParabolasScreenState extends State<ParabolasScreen> {
  String _busca = '';

  List<_Parabola> get _filtradas {
    if (_busca.isEmpty) return _parabolas;
    final b = _busca.toLowerCase();
    return _parabolas.where((p) =>
        p.titulo.toLowerCase().contains(b) ||
        p.referencia.toLowerCase().contains(b) ||
        p.resumo.toLowerCase().contains(b)).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Parábolas')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Buscar parábola...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                filled: true,
              ),
              onChanged: (v) => setState(() => _busca = v),
            ),
          ),
          Expanded(
            child: _filtradas.isEmpty
                ? const EmptyState(
                    icon: Icons.auto_stories,
                    title: 'Nenhuma parábola encontrada',
                  )
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    itemCount: _filtradas.length,
                    itemBuilder: (context, index) {
                      final p = _filtradas[index];
                      return Card(
                        margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
                        child: ListTile(
                          contentPadding: const EdgeInsets.all(16),
                          title: Text(p.titulo, style: const TextStyle(fontWeight: FontWeight.bold)),
                          subtitle: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const SizedBox(height: 4),
                              Text(
                                p.referencia,
                                style: TextStyle(fontSize: 12, color: Theme.of(context).colorScheme.primary),
                              ),
                              const SizedBox(height: 4),
                              Text(p.resumo, maxLines: 2, overflow: TextOverflow.ellipsis),
                            ],
                          ),
                          trailing: const Icon(Icons.chevron_right),
                          onTap: () => Navigator.of(context).push(MaterialPageRoute(
                            builder: (_) => _ParabolaDetalhe(parabola: p),
                          )),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

class _ParabolaDetalhe extends StatelessWidget {
  final _Parabola parabola;

  const _ParabolaDetalhe({required this.parabola});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(parabola.titulo)),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            parabola.referencia,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Theme.of(context).colorScheme.primary,
            ),
          ),
          const SizedBox(height: 16),
          Card(
            color: Theme.of(context).colorScheme.primaryContainer.withValues(alpha: 0.3),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                parabola.texto,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(fontStyle: FontStyle.italic),
              ),
            ),
          ),
          const SizedBox(height: 20),
          const Text(
            'Explicação',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          const SizedBox(height: 8),
          Text(
            parabola.explicacao,
            style: Theme.of(context).textTheme.bodyLarge,
          ),
        ],
      ),
    );
  }
}
