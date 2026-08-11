import { readFileSync, writeFileSync } from 'fs';

// Compact entry format: [id, ref, tipo, [[leitura, [manuscritos], classificacao],...], explicacao, [versiculos], pericope?, rec?]
// This keeps the data compact while still being readable
const D = [
// CAT 1: LETTER SIMILARITY ~50
["vt-001","mt:1:25","letras_similares",[["o primeiro filho (τὸν πρωτότοκον)",["Sinaitico (01)","Vaticano (03)"],"forte"],["um filho (υἱόν)",["Alexandrino (02)","Beza (05)"],"moderada"]],"Diferença entre artigo definido e indefinido.",["mt:1:25"],"O Nascimento de Jesus"],
["vt-002","mt:5:22","letras_similares",[["sem causa (εἰκῆ)",["Alexandrino (02)","Vaticano (03)"],"moderada"],["omissão de 'sem causa'",["Sinaitico (01)","Beza (05)"],"forte"]],"A adição 'sem causa' pode ser suavização. A leitura mais dura é provavelmente original.",["mt:5:22"],"A Raiva"],
["vt-003","mt:6:1","letras_similares",[["diante dos homens",["Sinaitico (01)","Vaticano (03)"],"forte"],["diante de vós mesmos",["Alexandrino (02)"],"moderada"]],"Confusão por semelhança fonética em pronúncia tardia do grego.",["mt:6:1"],"Esmolas, Oração e Jejum"],
["vt-004","mt:13:35","letras_similares",[["o profeta",["Sinaitico (01)","Vaticano (03)"],"forte"],["Isaías, o profeta",["Alexandrino (02)","Manuscritos posteriores"],"moderada"]],"Mateus cita Sl 78:2 mas atribui a Isaías.",["mt:13:35"],"Os Tesouros Escondidos"],
["vt-005","mt:19:16","letras_similares",[["Mestre, que farei de bom?",["Sinaitico (01)","Vaticano (03)"],"forte"],["Mestre, que farei para ter a vida eterna?",["Alexandrino (02)"],"moderada"]],"Harmonização com Mc 10:17 e Lc 18:18.",["mt:19:16"],"O Rico Jovem"],
["vt-006","mt:27:24","letras_similares",[["inocente (ἀθῷος)",["Sinaitico (01)","Vaticano (03)"],"forte"],["justo (δίκαιος)",["Alexandrino (02)","Beza (05)"],"moderada"]],"Confusão por semelhança de sentido.",["mt:27:24"],"A Inocência de Pilatos"],
["vt-007","mc:1:41","letras_similares",[["compenetrou-se de compaixão",["Sinaitico (01)","Alexandrino (02)"],"forte"],["ficou irado",["Beza (05)","Manuscritos latinos antigos"],"moderada"]],"A leitura 'ficou irado' é mais difícil e provavelmente original.",["mc:1:41"],"Jesus Cura um Leproso"],
["vt-008","mc:7:26","letras_similares",[["fenícia de origem siria",["Sinaitico (01)","Vaticano (03)"],"forte"],["cananeia",["Alexandrino (02)"],"moderada"]],"Mateus 15:22 chama de 'cananeia'.",["mc:7:26"],"A Filha da Mulher Sidoniana"],
["vt-009","mc:9:48","letras_similares",[["onde o verme deles não morre",["Sinaitico (01)","Vaticano (03)"],"forte"],["onde o seu verme não morre",["Alexandrino (02)"],"moderada"]],"Diferença entre pronome plural e singular.",["mc:9:48"],"O Fogo Inextinguível"],
["vt-010","mc:12:30","letras_similares",[["com todo o teu coração",["Sinaitico (01)","Vaticano (03)"],"forte"],["com todo o teu entendimento",["Alexandrino (02)"],"moderada"]],"Mateus 22:37 usa 'entendimento' em vez de 'coração'.",["mc:12:30"],"O Grande Mandamento"],
["vt-011","mc:13:33","letras_similares",[["vigiai e orai",["Sinaitico (01)","Vaticano (03)"],"forte"],["vigiai",["Alexandrino (02)"],"moderada"]],"Harmonização com Mc 14:38.",["mc:13:33"],"A Hora de Jesus"],
["vt-012","lc:2:33","letras_similares",[["o pai e a mãe dele",["Sinaitico (01)","Vaticano (03)"],"forte"],["José e a mãe dele",["Alexandrino (02)","Beza (05)"],"moderada"]],"Lucas evita chamar José de 'pai' de Jesus.",["lc:2:33"],"Simeão e Ana no Templo"],
["vt-013","lc:2:43","letras_similares",[["os pais",["Sinaitico (01)","Vaticano (03)"],"forte"],["José e sua mãe",["Alexandrino (02)"],"moderada"]],"Mesma tendência de Lucas evitar chamar José de pai.",["lc:2:43"],"Jesus no Templo"],
["vt-014","lc:2:48","letras_similares",[["teu pai e eu",["Sinaitico (01)","Vaticano (03)"],"forte"],["José e eu",["Alexandrino (02)"],"moderada"]],"Maria chama José de 'pai' de Jesus.",["lc:2:48"],"Jesus no Templo"],
["vt-015","lc:3:22","letras_similares",[["Tu és meu Filho amado; em ti me agrado",["Sinaitico (01)","Vaticano (03)"],"forte"],["Tu és meu Filho amado; hoje te gerei",["Beza (05)","Manuscritos latinos antigos"],"fraca"]],"A leitura citando Sl 2:7 pode refletir tradição adopcionista.",["lc:3:22"],"O Batismo de Jesus"],
["vt-016","lc:11:2-3","letras_similares",[["venha o teu reino; seja feita a tua vontade",["Sinaitico (01)","Vaticano (03)"],"forte"],["venha o teu reino Santo",["Beza (05)","Manuscritos siríacos"],"moderada"]],"A variante 'reino Santo' é harmonização com Didaquê 8:2.",["lc:11:2","lc:11:3"],"O Pai Nosso"],
["vt-017","lc:22:43-44","letras_similares",[["versículos incluídos",["Alexandrino (02)","Beza (05)"],"forte"],["versículos omitidos",["Sinaitico (01)","Vaticano (03)","Papiro 75"],"forte"]],"Evidência dividida. Podem ter sido omitidos por razões docéticas.",["lc:22:43","lc:22:44"],"A Agonia no Getsêmani","Incluídos com nota sobre evidência dividida."],
["vt-018","lc:23:34","letras_similares",[["versículo incluído",["Sinaitico (01)","Alexandrino (02)","Vaticano (03)"],"forte"],["versículo omitido",["Beza (05)","Manuscritos siríacos antigos"],"moderada"]],"Alguns omitiram porque os judeus 'deveriam saber'.",["lc:23:34"],"A Crucificação"],
["vt-019","jo:1:18","letras_similares",[["o unigênito Deus",["Sinaitico (01)","Vaticano (03)","Papiro 66","Papiro 75"],"forte"],["o unigênito Filho",["Alexandrino (02)"],"moderada"]],"A leitura 'Deus' é mais difícil e provavelmente original.",["jo:1:18"],"O Verbo Encarnado","Lê 'o unigênito Deus'."],
["vt-020","jo:1:34","letras_similares",[["Filho de Deus",["Sinaitico (01)","Alexandrino (02)"],"forte"],["o Eleito de Deus",["Vaticano (03)"],"moderada"]],"A leitura 'eleito' é mais difícil mas 'Filho de Deus' tem melhor suporte.",["jo:1:34"],"O Testemunho de João Batista"],
["vt-021","jo:3:13","letras_similares",[["que está nos céus",["Alexandrino (02)","Manuscritos posteriores"],"forte"],["omissão da frase",["Papiro 66","Sinaitico (01)"],"moderada"]],"Pode ser adição cristológica para enfatizar a preexistência.",["jo:3:13"],"O Filho do Homem"],
["vt-022","jo:19:14","letras_similares",[["sexta (ἕκτη)",["Sinaitico (01)","Vaticano (03)"],"forte"],["terceira (τρίτη)",["Alexandrino (02)"],"moderada"]],"Discordância sobre o horário.",["jo:19:14"],"A Sentença de Pilatos"],
["vt-023","at:20:28","letras_similares",[["a igreja de Deus",["Alexandrino (02)","Vaticano (03)"],"forte"],["a igreja do Senhor",["Manuscritos occidentais"],"moderada"],["a igreja do Senhor e Deus",["Manuscritos posteriores"],"fraca"]],"A leitura 'Deus' é mais provável por dificuldade do copista.",["at:20:28"],"A Igreja de Deus"],
["vt-024","rm:5:1","letras_similares",[["temos paz (indicativo)",["Sinaitico (01)","Vaticano (03)"],"forte"],["tenhamos paz (subjuntivo)",["Alexandrino (02)"],"moderada"]],"A leitura indicativa é mais difícil e provavelmente original.",["rm:5:1"],"Justificação"],
["vt-025","rm:8:1","letras_similares",[["nenhuma condenação",["Sinaitico (01)","Vaticano (03)"],"forte"],["nenhuma condenação para aqueles em Cristo Jesus",["Manuscritos posteriores"],"moderada"]],"A leitura mais curta é mais provável por ser mais difícil.",["rm:8:1"],"Liberdade em Cristo"],
["vt-026","rm:9:5","letras_similares",[["Cristo, que é Deus sobre todas as coisas",["Manuscritos gregos"],"forte"],["Cristo. Bendito o Deus eterno.",["Manuscritos posteriores"],"moderada"]],"A pontuação muda completamente o significado teológico.",["rm:9:5"],"Israel e Cristo"],
["vt-027","rm:16:24","letras_similares",[["versículo omitido",["Sinaitico (01)","Vaticano (03)"],"forte"],["A graça de nosso Senhor Jesus Cristo seja com todos.",["Manuscritos posteriores"],"moderada"]],"A fórmula de graça pode ter sido adicionada de outras epístolas.",["rm:16:24"],"Saudações Finais"],
["vt-028","1co:11:24","letras_similares",[["isto é o meu corpo, que é dado por vós",["Sinaitico (01)","Vaticano (03)"],"forte"],["isto é o meu corpo, que é partido por vós",["Alexandrino (02)"],"moderada"]],"A questão é se Jesus disse 'quebrado' ou não.",["1co:11:24"],"A Ceia do Senhor"],
["vt-029","1co:14:34-35","letras_similares",[["versículos incluídos na posição atual",["Sinaitico (01)","Vaticano (03)"],"forte"],["versículos após 14:40",["Alexandrino (02)","Beza (05)"],"moderada"]],"Alguns manuscritos colocam após 14:40.",["1co:14:34","1co:14:35"],"O Silêncio das Mulheres"],
["vt-030","1co:15:47","letras_similares",[["o primeiro homem, Adão, é terrenal",["Sinaitico (01)","Vaticano (03)"],"forte"],["o primeiro homem é terrenal",["Alexandrino (02)"],"moderada"]],"O nome 'Adão' pode ser glossa explicativa.",["1co:15:47"],"O Último Adão"],
["vt-031","2co:4:14","letras_similares",[["o Senhor Jesus",["Sinaitico (01)","Vaticano (03)"],"forte"],["Jesus",["Alexandrino (02)"],"moderada"]],"A adição 'Senhor' pode ser glossa cristológica.",["2co:4:14"],"A Ressurreição"],
["vt-032","2co:5:17","letras_similares",[["se alguém está em Cristo",["Sinaitico (01)","Vaticano (03)"],"forte"],["quem está em Cristo",["Alexandrino (02)"],"moderada"]],"A construção grega varia entre participio e condicional.",["2co:5:17"],"A Nova Criatura"],
["vt-033","gl:1:8","letras_similares",[["um anjo do céu primeiro, depois nós",["Sinaitico (01)","Vaticano (03)"],"forte"],["nós primeiro, depois um anjo do céu",["Alexandrino (02)"],"moderada"]],"A ordem 'anjo... nós' é mais provável por ser mais difícil.",["gl:1:8"],"O Outro Evangelho"],
["vt-034","ef:1:1","letras_similares",[["em Efeso",["Manuscritos posteriores"],"forte"],["omissão de 'em Efeso'",["Sinaitico (01)","Vaticano (03)"],"moderada"]],"Pode indicar que a epístola era circular.",["ef:1:1"],"Saudação"],
["vt-035","ef:3:9","letras_similares",[["comunhão do mistério",["Sinaitico (01)","Vaticano (03)"],"forte"],["administração do mistério",["Alexandrino (02)"],"moderada"]],"As duas palavras são facilmente confundidas em manuscritos gregos.",["ef:3:9"],"O Mistério Oculto"],
["vt-036","cl:1:14","letras_similares",[["redenção, o perdão dos pecados",["Sinaitico (01)","Vaticano (03)"],"forte"],["redenção pelo seu sangue, o perdão dos pecados",["Manuscritos posteriores"],"moderada"]],"A frase 'pelo seu sangue' foi harmonizada de Ef 1:7.",["cl:1:14"],"Redenção"],
["vt-037","cl:2:2","letras_similares",[["o mistério de Deus, o Pai, e de Cristo",["Alexandrino (02)","Vaticano (03)"],"forte"],["o mistério de Deus, em Cristo",["Manuscritos posteriores"],"moderada"]],"Reflete tradição mais antiga sobre relação Pai-Filho.",["cl:2:2"],"O Tesouro da Sabedoria"],
["vt-038","hb:2:9","letras_similares",[["pela graça de Deus",["Alexandrino (02)","Vaticano (03)"],"forte"],["exceto Jesus",["Manuscritos posteriores"],"moderada"]],"A leitura 'exceto Jesus' é tão surpreendente que provavelmente não foi inventada.",["hb:2:9"],"A Morte de Jesus"],
["vt-039","hb:4:15","letras_similares",[["tentado em tudo como nós, porém sem pecado",["Sinaitico (01)","Vaticano (03)"],"forte"],["tentado em tudo como nós",["Alexandrino (02)"],"moderada"]],"A adição 'porém sem pecado' pode ser glossa anti-docética.",["hb:4:15"],"Sumo Sacerdote Compassivo"],
["vt-040","hb:10:34","letras_similares",[["vosso próprio",["Sinaitico (01)","Vaticano (03)"],"forte"],["meus",["Alexandrino (02)"],"moderada"]],"A leitura 'meus' pode refletir tradição mais antiga.",["hb:10:34"],"Os Sofrimentos dos Cristãos"],
["vt-041","1jo:2:23","letras_similares",[["versículo com segunda parte incluída",["Manuscritos posteriores"],"forte"],["versículo sem a segunda parte",["Sinaitico (01)","Vaticano (03)"],"moderada"]],"A segunda parte pode ser glossa inspirada em 1 João 4:15.",["1jo:2:23"],"O Negador do Filho"],
["vt-042","1jo:4:3","letras_similares",[["não confessou",["Sinaitico (01)","Vaticano (03)"],"forte"],["negou/destruiu",["Manuscritos posteriores"],"moderada"]],"A leitura 'não confessou' é mais difícil e provavelmente original.",["1jo:4:3"],"O Espírito da Mentira"],
["vt-043","1jo:5:7","letras_similares",[["Comma Johanneum omitido",["Sinaitico (01)","Vaticano (03)","Todos os gregos antigos"],"forte"],["Comma Johanneum incluído",["Textus Receptus","Manuscritos latinos tardios"],"fraca"]],"A adição trinitária não aparece em nenhum grego anterior ao séc. XVI.",["1jo:5:7","1jo:5:8"],"A Trindade no Texto","Omitido na NA28."],
["vt-044","1tm:3:16","letras_similares",[["isto se manifestou em carne",["Sinaitico (01)","Vaticano (03)"],"forte"],["Deus se manifestou em carne",["Manuscritos posteriores"],"moderada"]],"Confusão entre ΟΣ e ΘΣ em uncinais gregos.",["1tm:3:16"],"O Mistério da Piedade","Lê 'isto' (ὅ)."],
["vt-045","1pe:5:10","letras_similares",[["Cristo Jesus",["Sinaitico (01)","Vaticano (03)"],"forte"],["Jesus",["Alexandrino (02)"],"moderada"]],"A forma abreviada pode ser original.",["1pe:5:10"],"A Graça Eterna"],
["vt-046","ap:1:8","letras_similares",[["Alfa e Ômega - dito por Deus",["Sinaitico (01)","Vaticano (03)"],"forte"],["Alfa e Ômega - dito por Cristo",["Manuscritos posteriores"],"moderada"]],"No v.8 as palavras são de Deus; no v.11 omitidas por alguns.",["ap:1:8"],"Alfa e Ômega"],
["vt-047","ap:22:14","letras_similares",[["lavam suas vestes",["Sinaitico (01)","Vaticano (03)"],"forte"],["têm direito à árvore da vida",["Manuscritos posteriores"],"moderada"]],"As duas leituras refletem teologias diferentes.",["ap:22:14"],"A Bênção Final"],
["vt-048","mt:17:21","letras_similares",[["versículo omitido",["Sinaitico (01)","Vaticano (03)","Alexandrino (02)"],"forte"],["Mas esta espécie não sai senão pela oração e pelo jejum",["Manuscritos posteriores"],"moderada"]],"Copiado de Mc 9:29 para Mateus por escribas.",["mt:17:21"],"A Fé na Oração"],
["vt-049","mc:9:44","letras_similares",[["versículos 44 e 46 omitidos",["Sinaitico (01)","Vaticano (03)"],"forte"],["versículos incluídos",["Manuscritos posteriores"],"moderada"]],"A repetição tripla pode ser expansão homilética.",["mc:9:44","mc:9:46"],"O Fogo do Inferno","Omitidos na NA28."],
["vt-050","mt:6:13","letras_similares",[["doxologia omitida",["Sinaitico (01)","Vaticano (03)","Alexandrino (02)"],"forte"],["Pois teu é o reino, e o poder, e a glória, para sempre.",["Manuscritos posteriores"],"moderada"]],"A doxologia veio da liturgia cristã primitiva.",["mt:6:13"],"O Pai Nosso","Doxologia omitida na NA28."],
];

const data = JSON.parse(readFileSync('scripts/all-entries.json', 'utf8'));

// Convert compact format to full format
const fullEntries = D.map(d => ({
  id: d[0],
  referencia: d[1],
  tipo: d[2],
  variantes: d[3],
  explicacao: d[4],
  versiculosAfetados: d[5],
  ...(d[6] ? { pericope: d[6] } : {}),
  ...(d[7] ? { recomendacaoNA28: d[7] } : {}),
}));

data.entries = fullEntries;
writeFileSync('scripts/all-entries.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`Wrote ${fullEntries.length} entries (batch 1)`);
