import 'package:flutter/material.dart';

import '../../widgets/empty_state.dart';

enum _CategoriaMilagre { natureza, cura, exorcismo, morte }

class _Milagre {
  final String titulo;
  final String referencia;
  final String descricao;
  final _CategoriaMilagre categoria;

  const _Milagre({
    required this.titulo,
    required this.referencia,
    required this.descricao,
    required this.categoria,
  });
}

const _milagres = [
  _Milagre(
    titulo: 'Transformação da água em vinho',
    referencia: 'João 2:1-11',
    descricao: 'Primeiro milagre de Jesus, nas Bodas de Caná, revelando Sua glória.',
    categoria: _CategoriaMilagre.natureza,
  ),
  _Milagre(
    titulo: 'Cura do filho doofficial',
    referencia: 'João 4:46-54',
    descricao: 'Jesus curou o filho de um official real à distância, pela palavra.',
    categoria: _CategoriaMilagre.cura,
  ),
  _Milagre(
    titulo: 'Expulsão do espírito imundo',
    referencia: 'Marcos 1:23-26',
    descricao: 'Jesus expulsou um espírito imundo de um homem na sinagoga de Cafarnaum.',
    categoria: _CategoriaMilagre.exorcismo,
  ),
  _Milagre(
    titulo: 'Cura da sogra de Pedro',
    referencia: 'Mateus 8:14-15',
    descricao: 'Jesus tocou na mão da sogra de Pedro e a febre a deixou.',
    categoria: _CategoriaMilagre.cura,
  ),
  _Milagre(
    titulo: 'Tempestade acalmar',
    referencia: 'Marcos 4:35-41',
    descricao: 'Jesus acalmou o mar e o vento com uma palavra, demonstrando poder sobre a natureza.',
    categoria: _CategoriaMilagre.natureza,
  ),
  _Milagre(
    titulo: 'Expulsão da legião',
    referencia: 'Marcos 5:1-20',
    descricao: 'Jesus libertou um homem endemoninhado da região dos Gadarenos.',
    categoria: _CategoriaMilagre.exorcismo,
  ),
  _Milagre(
    titulo: 'Cura da mulher com fluxo de sangue',
    referencia: 'Marcos 5:25-34',
    descricao: 'Uma mulher tocou o manto de Jesus e foi curada de 12 anos de enfermidade.',
    categoria: _CategoriaMilagre.cura,
  ),
  _Milagre(
    titulo: 'Ressurreição da filha de Jairo',
    referencia: 'Marcos 5:35-43',
    descricao: 'Jesus ressuscitou a filha de 12 anos de Jairo, líder da sinagoga.',
    categoria: _CategoriaMilagre.morte,
  ),
  _Milagre(
    titulo: 'Alimentação de 5.000',
    referencia: 'Mateus 14:13-21',
    descricao: 'Jesus alimentou 5.000 homens com cinco pães e dois peixes.',
    categoria: _CategoriaMilagre.natureza,
  ),
  _Milagre(
    titulo: 'Jesus caminha sobre as águas',
    referencia: 'Mateus 14:22-33',
    descricao: 'Jesus caminhou sobre o mar da Galileia em meio à tempestade.',
    categoria: _CategoriaMilagre.natureza,
  ),
  _Milagre(
    titulo: 'Cura do surdo-mudo',
    referencia: 'Marcos 7:31-37',
    descricao: 'Jesus tocou nos ouvidos e na língua de um surdo-mudo e o curou.',
    categoria: _CategoriaMilagre.cura,
  ),
  _Milagre(
    titulo: 'Alimentação de 4.000',
    referencia: 'Mateus 15:32-39',
    descricao: 'Jesus alimentou 4.000 pessoas com sete pães e alguns peixes.',
    categoria: _CategoriaMilagre.natureza,
  ),
  _Milagre(
    titulo: 'Cura do cego de nascença',
    referencia: 'João 9:1-7',
    descricao: 'Jesus abriu os olhos de um cego de nascença com lama feita de saliva.',
    categoria: _CategoriaMilagre.cura,
  ),
  _Milagre(
    titulo: 'Ressurreição de Lázaro',
    referencia: 'João 11:1-44',
    descricao: 'Jesus ressuscitou Lázaro após quatro dias no túmulo, o maior milagre registrado.',
    categoria: _CategoriaMilagre.morte,
  ),
  _Milagre(
    titulo: 'Cura dos dez leprosos',
    referencia: 'Lucas 17:11-19',
    descricao: 'Jesus curou dez leprosos e apenas um voltou para agradecer.',
    categoria: _CategoriaMilagre.cura,
  ),
  _Milagre(
    titulo: 'Expulsão do espírito da filha da viúva',
    referencia: 'Lucas 7:11-17',
    descricao: 'Jesus ressuscitou o filho da viúva de Naim durante o funeral.',
    categoria: _CategoriaMilagre.morte,
  ),
  _Milagre(
    titulo: 'A pesca miraculosa',
    referencia: 'Lucas 5:1-11',
    descricao: 'Jesus encheu as redes de Pedro com grande quantidade de peixes.',
    categoria: _CategoriaMilagre.natureza,
  ),
  _Milagre(
    titulo: 'Cura do servo do centurião',
    referencia: 'Mateus 8:5-13',
    descricao: 'Jesus curou o servo de um centurião romano à distância, pela fé.',
    categoria: _CategoriaMilagre.cura,
  ),
];

class MilagresScreen extends StatefulWidget {
  const MilagresScreen({super.key});

  @override
  State<MilagresScreen> createState() => _MilagresScreenState();
}

class _MilagresScreenState extends State<MilagresScreen> {
  _CategoriaMilagre? _filtro;

  static const _nomesCategorias = {
    _CategoriaMilagre.natureza: 'Natureza',
    _CategoriaMilagre.cura: 'Cura',
    _CategoriaMilagre.exorcismo: 'Exorcismo',
    _CategoriaMilagre.morte: 'Ressurreição',
  };

  static const _iconesCategorias = {
    _CategoriaMilagre.natureza: Icons.thunderstorm,
    _CategoriaMilagre.cura: Icons.healing,
    _CategoriaMilagre.exorcismo: Icons.psychology_alt,
    _CategoriaMilagre.morte: Icons.favorite,
  };

  List<_Milagre> get _filtrados {
    if (_filtro == null) return _milagres;
    return _milagres.where((m) => m.categoria == _filtro).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Milagres de Jesus')),
      body: Column(
        children: [
          SizedBox(
            height: 60,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              children: [
                _chipFiltro(null, 'Todos', Icons.all_inclusive),
                ..._nomesCategorias.entries.map((e) =>
                    _chipFiltro(e.key, e.value, _iconesCategorias[e.key])),
              ],
            ),
          ),
          Expanded(
            child: _filtrados.isEmpty
                ? const EmptyState(
                    icon: Icons.auto_awesome,
                    title: 'Nenhum milagre encontrado',
                  )
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    itemCount: _filtrados.length,
                    itemBuilder: (context, index) {
                      final m = _filtrados[index];
                      return Card(
                        margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
                        child: ListTile(
                          contentPadding: const EdgeInsets.all(16),
                          leading: Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(
                              color: Theme.of(context).colorScheme.primaryContainer,
                              shape: BoxShape.circle,
                            ),
                            child: Icon(_iconesCategorias[m.categoria], size: 20),
                          ),
                          title: Text(m.titulo, style: const TextStyle(fontWeight: FontWeight.bold)),
                          subtitle: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const SizedBox(height: 4),
                              Text(
                                m.referencia,
                                style: TextStyle(fontSize: 12, color: Theme.of(context).colorScheme.primary),
                              ),
                              const SizedBox(height: 2),
                              Text(m.descricao, maxLines: 2, overflow: TextOverflow.ellipsis),
                            ],
                          ),
                          trailing: const Icon(Icons.chevron_right),
                          isThreeLine: true,
                          onTap: () => Navigator.of(context).push(MaterialPageRoute(
                            builder: (_) => _MilagreDetalhe(milagre: m),
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

  Widget _chipFiltro(_CategoriaMilagre? cat, String label, IconData? icon) {
    final selecionado = _filtro == cat;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: FilterChip(
        label: Text(label),
        avatar: icon != null ? Icon(icon, size: 18) : null,
        selected: selecionado,
        onSelected: (_) => setState(() => _filtro = cat),
      ),
    );
  }
}

class _MilagreDetalhe extends StatelessWidget {
  final _Milagre milagre;

  const _MilagreDetalhe({required this.milagre});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(milagre.titulo)),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            milagre.referencia,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Theme.of(context).colorScheme.primary,
            ),
          ),
          const SizedBox(height: 20),
          Text(milagre.descricao, style: Theme.of(context).textTheme.bodyLarge),
        ],
      ),
    );
  }
}
