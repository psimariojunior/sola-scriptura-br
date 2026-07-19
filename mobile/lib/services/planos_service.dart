import '../models/plano.dart';

class PlanosService {
  PlanosService();

  List<PlanoLeitura> getPlanos() {
    return List.of(_planos);
  }
}

const List<PlanoLeitura> _planos = [
  PlanoLeitura(
    id: 'biblia-1-ano',
    nome: 'Bíblia em 1 ano',
    descricao: 'Leia toda a Bíblia em 365 dias, com porções equilibradas do AT e NT.',
    duracaoDias: 365,
    progresso: 0.35,
    leiturasHoje: ['Gênesis 22', 'Mateus 5', 'Salmos 10'],
  ),
  PlanoLeitura(
    id: 'nt-30-dias',
    nome: 'Novo Testamento em 30 dias',
    descricao: 'Leia todo o Novo Testamento em um mês, com aproximadamente 6 capítulos por dia.',
    duracaoDias: 30,
    progresso: 0.60,
    leiturasHoje: ['Lucas 12', '1 Coríntios 4'],
  ),
  PlanoLeitura(
    id: 'salmos-proverbios',
    nome: 'Salmos e Provérbios',
    descricao: 'Leia um Salmo e um Provérbio por dia durante um mês, edificando sua sabedoria.',
    duracaoDias: 31,
    progresso: 0.20,
    leiturasHoje: ['Salmos 119', 'Provérbios 27'],
  ),
  PlanoLeitura(
    id: 'evangelhos-30-dias',
    nome: 'Evangelhos em 30 dias',
    descricao: 'Mateus, Marcos, Lucas e João em 30 dias, conhecendo a vida de Cristo.',
    duracaoDias: 30,
    progresso: 0.45,
    leiturasHoje: ['Mateus 20', 'Marcos 9'],
  ),
  PlanoLeitura(
    id: 'at-90-dias',
    nome: 'Antigo Testamento em 90 dias',
    descricao: 'Leia o Antigo Testamento em 3 meses, conhecendo as raízes da fé.',
    duracaoDias: 90,
    progresso: 0.15,
    leiturasHoje: ['Números 12', 'Juízes 3'],
  ),
  PlanoLeitura(
    id: 'cartas-paulinas',
    nome: 'Cartas Paulinas',
    descricao: 'Todas as cartas de Paulo em 14 dias, com foco na teologia paulina.',
    duracaoDias: 14,
    progresso: 0.80,
    leiturasHoje: ['Filemom', 'Efésios 6'],
  ),
  PlanoLeitura(
    id: 'pentateuco',
    nome: 'Pentateuco em 40 dias',
    descricao: 'Gênesis, Êxodo, Levítico, Números e Deuteronômio em 40 dias.',
    duracaoDias: 40,
    progresso: 0.25,
    leiturasHoje: ['Levítico 14', 'Números 1'],
  ),
  PlanoLeitura(
    id: 'sabedoria',
    nome: 'Livros Sapienciais',
    descricao: 'Jó, Salmos, Provérbios, Eclesiastes e Cantares em 50 dias.',
    duracaoDias: 50,
    progresso: 0.10,
    leiturasHoje: ['Jó 3', 'Provérbios 3'],
  ),
];
