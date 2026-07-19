import '../models/pergunta.dart';

class QuizService {
  QuizService();

  List<PerguntaQuiz> getPerguntas({String? categoria}) {
    if (categoria == null ||
        categoria.isEmpty ||
        categoria.toLowerCase() == 'todos') {
      return List.of(_perguntas);
    }
    return _perguntas.where((p) => p.categoria == categoria).toList();
  }
}

const List<PerguntaQuiz> _perguntas = [
  PerguntaQuiz(
    pergunta: 'Quem construiu a arca?',
    opcoes: ['Abraão', 'Noé', 'Moisés', 'Davi'],
    correta: 1,
    categoria: 'Antigo Testamento',
    explicacao: 'Noé construiu a arca por ordem de Deus, antes do dilúvio (Gênesis 6-9).',
  ),
  PerguntaQuiz(
    pergunta: 'Qual o primeiro milagre de Jesus?',
    opcoes: [
      'Cura do cego',
      'Ressurreição de Lázaro',
      'Água em vinho',
      'Multiplicação dos pães',
    ],
    correta: 2,
    categoria: 'Novo Testamento',
    explicacao:
        'Nas bodas de Caná, Jesus transformou água em vinho, sendo este seu primeiro milagre registrado (João 2:1-11).',
  ),
  PerguntaQuiz(
    pergunta: 'Quantos mandamentos Deus deu no Sinai?',
    opcoes: ['5', '7', '10', '12'],
    correta: 2,
    categoria: 'Antigo Testamento',
    explicacao: 'Os Dez Mandamentos foram entregues a Moisés no Monte Sinai (Êxodo 20).',
  ),
  PerguntaQuiz(
    pergunta: 'Quem traiu Jesus com 30 moedas?',
    opcoes: ['Pedro', 'Judas', 'Tomé', 'André'],
    correta: 1,
    categoria: 'Personagens',
    explicacao: 'Judas Iscariotes traiu Jesus por trinta moedas de prata (Mateus 26:14-16).',
  ),
  PerguntaQuiz(
    pergunta: 'Qual o livro mais longo da Bíblia?',
    opcoes: ['Gênesis', 'Salmos', 'Isaías', 'Atos'],
    correta: 1,
    categoria: 'Bíblia Geral',
    explicacao:
        'Salmos tem 150 capítulos, sendo o livro mais longo do cânon bíblico.',
  ),
  PerguntaQuiz(
    pergunta: 'Quem foi engolido por um grande peixe?',
    opcoes: ['Elias', 'Jonas', 'Pedro', 'Paulo'],
    correta: 1,
    categoria: 'Antigo Testamento',
    explicacao: 'Jonas ficou três dias no ventre do grande peixe (Jonas 1-2).',
  ),
  PerguntaQuiz(
    pergunta: 'Em que cidade Jesus nasceu?',
    opcoes: ['Nazaré', 'Jerusalém', 'Belém', 'Cafarnaum'],
    correta: 2,
    categoria: 'Novo Testamento',
    explicacao: 'Jesus nasceu em Belém da Judeia, cumprindo a profecia de Miqueias 5:2.',
  ),
  PerguntaQuiz(
    pergunta: 'Quantos discípulos Jesus escolheu?',
    opcoes: ['7', '10', '12', '24'],
    correta: 2,
    categoria: 'Personagens',
    explicacao: 'Jesus escolheu doze apóstolos para estar com ele (Marcos 3:14).',
  ),
  PerguntaQuiz(
    pergunta: 'Qual é o primeiro livro do Novo Testamento?',
    opcoes: ['Marcos', 'Mateus', 'Lucas', 'João'],
    correta: 1,
    categoria: 'Bíblia Geral',
    explicacao: 'Mateus é o primeiro livro do NT na ordem canônica.',
  ),
  PerguntaQuiz(
    pergunta: 'Quem foi o primeiro rei de Israel?',
    opcoes: ['Davi', 'Saul', 'Salomão', 'Josué'],
    correta: 1,
    categoria: 'Antigo Testamento',
    explicacao: 'Saul foi ungido rei por Samuel e reinou sobre Israel (1 Samuel 10).',
  ),
  PerguntaQuiz(
    pergunta: 'De quem Jesus nasceu?',
    opcoes: [
      'Maria e José',
      'Isabel e Zacarias',
      'Ana e Elias',
      'Rute e Boaz',
    ],
    correta: 0,
    categoria: 'Novo Testamento',
    explicacao:
        'Jesus nasceu da virgem Maria, que estava desposada com José (Mateus 1:18-25).',
  ),
  PerguntaQuiz(
    pergunta: 'Qual o fruto do Espírito?',
    opcoes: [
      'Riquezas e poder',
      'Amor, alegria, paz',
      'Sabedoria e ciência',
      'Força e beleza',
    ],
    correta: 1,
    categoria: 'Doutrina',
    explicacao:
        'O fruto do Espírito é amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão e domínio próprio (Gálatas 5:22-23).',
  ),
  PerguntaQuiz(
    pergunta: 'Quem libertou Israel do Egito?',
    opcoes: ['Josué', 'Moisés', 'Davi', 'Abraão'],
    correta: 1,
    categoria: 'Antigo Testamento',
    explicacao: 'Moisés foi o libertador que Deus levantou para tirar Israel do Egito (Êxodo).',
  ),
  PerguntaQuiz(
    pergunta: 'Qual apóstolo foi chamado de "pedra"?',
    opcoes: ['Paulo', 'Pedro', 'Tiago', 'João'],
    correta: 1,
    categoria: 'Personagens',
    explicacao:
        'Pedro (do grego Petros, pedra) recebeu este nome de Jesus (Mateus 16:18).',
  ),
  PerguntaQuiz(
    pergunta: 'Onde Jesus foi crucificado?',
    opcoes: ['Getsêmani', 'Sinai', 'Gólgota', 'Sião'],
    correta: 2,
    categoria: 'Novo Testamento',
    explicacao: 'Jesus foi crucificado no Gólgota, lugar chamado Calvário (Lucas 23:33).',
  ),
  PerguntaQuiz(
    pergunta: 'Quem escreveu a maioria das epístolas do NT?',
    opcoes: ['Pedro', 'Paulo', 'João', 'Tiago'],
    correta: 1,
    categoria: 'Personagens',
    explicacao: 'Paulo é o autor de 13 epístolas paulinas no Novo Testamento.',
  ),
  PerguntaQuiz(
    pergunta: 'O que significa "Jesus" em hebraico?',
    opcoes: [
      'Deus é salvação',
      'Deus é forte',
      'Pai da luz',
      'Príncipe da paz',
    ],
    correta: 0,
    categoria: 'Novo Testamento',
    explicacao: 'Jesus é a forma grega de Yeshua, que significa "Yahweh é salvação".',
  ),
  PerguntaQuiz(
    pergunta: 'Quantos livros tem o Novo Testamento?',
    opcoes: ['24', '27', '39', '66'],
    correta: 1,
    categoria: 'Bíblia Geral',
    explicacao: 'O NT tem 27 livros, escritos ao longo do primeiro século.',
  ),
  PerguntaQuiz(
    pergunta: 'Qual foi o primeiro casal da humanidade?',
    opcoes: [
      'Abraão e Sara',
      'Adão e Eva',
      'Isaque e Rebeca',
      'Jacó e Raquel',
    ],
    correta: 1,
    categoria: 'Antigo Testamento',
    explicacao: 'Adão e Eva foram o primeiro casal, criados por Deus no Éden (Gênesis 2-3).',
  ),
  PerguntaQuiz(
    pergunta: 'Quem foi lançado na cova dos leões?',
    opcoes: ['Jó', 'Davi', 'Daniel', 'Elias'],
    correta: 2,
    categoria: 'Antigo Testamento',
    explicacao:
        'Daniel foi lançado na cova dos leões por causa de sua fidelidade a Deus (Daniel 6).',
  ),
];
