import '../models/cronologia.dart';

class CronologiaService {
  CronologiaService();

  List<EventoCronologico> getEventos() {
    return List.of(_eventos);
  }

  List<EventoCronologico> getEventosPorPeriodo(String periodo) {
    if (periodo == 'Todas' || periodo.isEmpty) return getEventos();
    return _eventos.where((e) => e.periodo == periodo).toList();
  }
}

const List<EventoCronologico> _eventos = [
  EventoCronologico(
    data: '~4004 a.C.',
    evento: 'Criação do mundo',
    periodo: 'Criação',
    detalhes:
        'Deus criou os céus e a terra em seis dias literais, estabelecendo o fundamento de toda a história.',
  ),
  EventoCronologico(
    data: '~2348 a.C.',
    evento: 'Dilúvio Universal',
    periodo: 'Criação',
    detalhes:
        'Noé e sua família foram preservados na arca enquanto Deus julgava a humanidade corrupta.',
  ),
  EventoCronologico(
    data: '~2000 a.C.',
    evento: 'Chamado de Abraão',
    periodo: 'Patriarcas',
    detalhes:
        'Deus chamou Abrão de Ur dos Caldeus para formar uma grande nação e ser bênção a todas as famílias da terra.',
  ),
  EventoCronologico(
    data: '~1900 a.C.',
    evento: 'Aliança com Abraão',
    periodo: 'Patriarcas',
    detalhes:
        'Deus fez aliança com Abraão, prometendo-lhe uma descendência numerosa como as estrelas do céu.',
  ),
  EventoCronologico(
    data: '~1700 a.C.',
    evento: 'José no Egito',
    periodo: 'Patriarcas',
    detalhes:
        'José foi vendido como escravo pelos irmãos, mas Deus o elevou a governador do Egito, salvando muitas vidas.',
  ),
  EventoCronologico(
    data: '~1446 a.C.',
    evento: 'Êxodo do Egito',
    periodo: 'Êxodo',
    detalhes:
        'Moisés libertou Israel da escravidão egípcia mediante as dez pragas e a Páscoa.',
  ),
  EventoCronologico(
    data: '~1445 a.C.',
    evento: 'Lei no Sinai',
    periodo: 'Êxodo',
    detalhes:
        'Deus entregou a Lei a Moisés no Monte Sinai, formalizando a aliança com Israel.',
  ),
  EventoCronologico(
    data: '~1406 a.C.',
    evento: 'Conquista de Canaã',
    periodo: 'Conquista',
    detalhes:
        'Josué liderou Israel na conquista da Terra Prometida após a morte de Moisés.',
  ),
  EventoCronologico(
    data: '~1350 a.C.',
    evento: 'Período dos Juízes',
    periodo: 'Juízes',
    detalhes:
        'Deus levantou juízes como Gideão, Débora e Sansão para libertar Israel da opressão dos povos vizinhos.',
  ),
  EventoCronologico(
    data: '~1050 a.C.',
    evento: 'Ungido Saul como Rei',
    periodo: 'Reinos',
    detalhes:
        'Israel pediu um rei para ser como as nações vizinhas, e Deus ungiu Saul como primeiro rei de Israel.',
  ),
  EventoCronologico(
    data: '~1010 a.C.',
    evento: 'Reinado de Davi',
    periodo: 'Reinos',
    detalhes:
        'Davi unificou Israel, conquistou Jerusalém e foi descrito como homem segundo o coração de Deus.',
  ),
  EventoCronologico(
    data: '~970 a.C.',
    evento: 'Construção do Templo',
    periodo: 'Reinos',
    detalhes:
        'Salomão, filho de Davi, construiu o Templo de Jerusalém, cumprindo o desejo de seu pai.',
  ),
  EventoCronologico(
    data: '~930 a.C.',
    evento: 'Divisão do Reino',
    periodo: 'Reinos',
    detalhes:
        'Após a morte de Salomão, Israel se dividiu em Reino do Norte (Israel) e Reino do Sul (Judá).',
  ),
  EventoCronologico(
    data: '~722 a.C.',
    evento: 'Queda de Samaria',
    periodo: 'Exílio',
    detalhes:
        'O Império Assírio conquistou o Reino do Norte, levando as dez tribos para o exílio.',
  ),
  EventoCronologico(
    data: '~586 a.C.',
    evento: 'Destruição de Jerusalém',
    periodo: 'Exílio',
    detalhes:
        'Nabucodonosor, da Babilônia, destruiu o Templo e levou Judá para o exílio babilônico.',
  ),
  EventoCronologico(
    data: '~538 a.C.',
    evento: 'Ciro Decreta o Retorno',
    periodo: 'Retorno',
    detalhes:
        'Ciro, o Grande, decreto que os judeus exilados pudessem retornar a Jerusalém e reconstruir o Templo.',
  ),
  EventoCronologico(
    data: '~516 a.C.',
    evento: 'Templo Reconstruído',
    periodo: 'Retorno',
    detalhes:
        'O segundo Templo foi dedicado em Jerusalém, completando a obra sob a liderança de Zorobabel e Ageu.',
  ),
  EventoCronologico(
    data: '~430 a.C.',
    evento: 'Último Profeta do AT',
    periodo: 'Retorno',
    detalhes:
        'Malaquias foi o último profeta do Antigo Testamento, encerrando o cânon profético por cerca de 400 anos.',
  ),
  EventoCronologico(
    data: '~4 a.C.',
    evento: 'Nascimento de Jesus',
    periodo: 'Ministério',
    detalhes:
        'Jesus Cristo nasceu em Belém da Virgem Maria, cumprindo as profecias messiânicas.',
  ),
  EventoCronologico(
    data: '~27 d.C.',
    evento: 'Batismo de Jesus',
    periodo: 'Ministério',
    detalhes:
        'Jesus foi batizado por João Batista no rio Jordão, iniciando seu ministério público.',
  ),
  EventoCronologico(
    data: '~30 d.C.',
    evento: 'Crucificação e Ressurreição',
    periodo: 'Ministério',
    detalhes:
        'Jesus foi crucificado no Gólgota e ressuscitou ao terceiro dia, evento central da fé cristã.',
  ),
  EventoCronologico(
    data: '~33 d.C.',
    evento: 'Pentecostes',
    periodo: 'Igreja Primitiva',
    detalhes:
        'O Espírito Santo foi derramado sobre os discípulos, nascendo a Igreja e iniciando a expansão do evangelho.',
  ),
  EventoCronologico(
    data: '~34-46 d.C.',
    evento: 'Conversão de Paulo',
    periodo: 'Igreja Primitiva',
    detalhes:
        'Saulo de Tarso foi convertido no caminho de Damasco e se tornou o apóstolo Paulo.',
  ),
  EventoCronologico(
    data: '~50 d.C.',
    evento: 'Concílio de Jerusalém',
    periodo: 'Igreja Primitiva',
    detalhes:
        'Os apóstolos se reuniram para decidir sobre a circuncisão e a relação da lei com a fé cristã.',
  ),
  EventoCronologico(
    data: '~62 d.C.',
    evento: 'Martírio de Tiago',
    periodo: 'Igreja Primitiva',
    detalhes:
        'Tiago, irmão de Jesus e líder da igreja em Jerusalém, foi martirizado pelo sumo sacerdote Anás.',
  ),
  EventoCronologico(
    data: '~64-68 d.C.',
    evento: 'Martírio de Pedro e Paulo',
    periodo: 'Igreja Primitiva',
    detalhes:
        'Pedro foi crucificado em Roma e Paulo decapitado, sob o imperador Nero.',
  ),
  EventoCronologico(
    data: '~70 d.C.',
    evento: 'Destruição do Templo',
    periodo: 'Apocalipse',
    detalhes:
        'O general Tito destruiu o segundo Templo de Jerusalém, cumprindo a profecia de Jesus.',
  ),
  EventoCronologico(
    data: '~95 d.C.',
    evento: 'Apocalipse escrito',
    periodo: 'Apocalipse',
    detalhes:
        'João, exilado em Patmos, recebeu a revelação de Jesus Cristo e a escreveu para as sete igrejas.',
  ),
  EventoCronologico(
    data: '~325 d.C.',
    evento: 'Concílio de Niceia',
    periodo: 'Igreja Primitiva',
    detalhes:
        'Constantino convocou o primeiro concílio ecumênico, que condenou o arianismo e produziu o Credo Niceno.',
  ),
  EventoCronologico(
    data: '~95-100 d.C.',
    evento: 'Cânon do NT formado',
    periodo: 'Apocalipse',
    detalhes:
        'O cânon do Novo Testamento foi gradualmente reconhecido nas igrejas cristãs primitivas.',
  ),
];
