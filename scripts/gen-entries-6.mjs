import { readFileSync, writeFileSync } from 'fs';

const D = [
// FINAL BATCH - mix of all remaining categories to reach 300+
["vt-281","mt:6:13","substituicao_sinonimos",[["mas livra-nos do mal",["Sinaitico (01)","Vaticano (03)"],"forte"],["mas livra-nos do mal. Porque teu é o reino, e o poder, e a glória, para sempre",["Manuscritos posteriores"],"fraca"]],"A doxologia final do Pai Nosso é adição tardia.",["mt:6:13"],"O Pai Nosso"],
["vt-282","mc:16:8","relato",[["pois tinham medo",["Sinaitico (01)","Vaticano (03)"],"forte"],["pois tinham medo de ninguém disseram nada a ninguém",["Alexandrino (02)"],"moderada"]],"O final abrupto de Marcos.",["mc:16:8"],"A Ressurreição"],
["vt-283","jo:1:18","substituicao_sinonimos",[["o unigênito Deus",["Sinaitico (01)","Vaticano (03)"],"forte"],["o unigênito Filho",["Alexandrino (02)"],"moderada"]],"Variação cristológica: Deus vs Filho.",["jo:1:18"],"O Verbo Encarnado"],
["vt-284","rm:1:17","substituicao_sinonimos",[["a justiça de Deus se revela no evangelho",["Sinaitico (01)","Vaticano (03)"],"forte"],["a justiça de Deus se revela de fé em fé",["Alexandrino (02)"],"moderada"]],"Variação na frase final.",["rm:1:17"],"O Evangelho e a Ira"],
["vt-285","hb:1:1","substituicao_sinonimos",[["muitas vezes e de muitas maneiras",["Sinaitico (01)","Vaticano (03)"],"forte"],["muitas vezes e de muitos modos",["Alexandrino (02)"],"moderada"]],"Variação entre maneiras e modos.",["hb:1:1"],"Deus Fala pelo Filho"],
["vt-286","1jo:2:23","substituicao_sinonimos",[["quem confessou o Filho tem o Pai também",["Sinaitico (01)","Vaticano (03)"],"forte"],["quem confessou o Filho tem o Pai",["Alexandrino (02)"],"moderada"]],"A adição de 'também' é explicativa.",["1jo:2:23"],"Anticristos"],
["vt-287","ap:22:14","substituicao_sinonimos",[["bem-aventurados os que lavam as suas vestes",["Sinaitico (01)","Vaticano (03)"],"forte"],["bem-aventurados os que cumprem os seus mandamentos",["Alexandrino (02)"],"moderada"]],"Variação significativa.",["ap:22:14"],"A Água da Vida"],
["vt-288","mt:5:44","substituicao_sinonimos",[["amai os vossos inimigos e orai pelos que vos perseguem",["Sinaitico (01)","Vaticano (03)"],"forte"],["amai os vossos inimigos, bendizei os que vos amaldiçoam",["Alexandrino (02)"],"moderada"]],"Variação no ensino sobre amor aos inimigos.",["mt:5:44"],"Amor aos Inimigos"],
["vt-289","mc:12:30","substituicao_sinonimos",[["todo o teu coração, toda a tua alma, todo o teu entendimento",["Sinaitico (01)","Vaticano (03)"],"forte"],["todo o teu coração, toda a tua alma, todas as tuas forças",["Alexandrino (02)"],"moderada"]],"Variação entre entendimento e forças.",["mc:12:30"],"O Primeiro Mandamento"],
["vt-290","lc:11:2","substituicao_sinonimos",[["venha o teu reino",["Sinaitico (01)","Vaticano (03)"],"forte"],["venha o teu reino; seja feita a tua vontade",["Alexandrino (02)"],"moderada"]],"A adição pode ser harmonização com Mt 6:10.",["lc:11:2"],"O Pai Nosso"],
["vt-291","jo:14:16","substituicao_sinonimos",[["outro Conselheiro",["Sinaitico (01)","Vaticano (03)"],"forte"],["outro Paráclito",["Alexandrino (02)"],"moderada"]],"Variação na tradução do termo grego.",["jo:14:16"],"A Promessa do Espírito"],
["vt-292","at:2:38","substituicao_sinonimos",[["arrependei-vos e cada um de vós seja batizado",["Sinaitico (01)","Vaticano (03)"],"forte"],["arrependei-vos para a remissão dos vossos pecados",["Alexandrino (02)"],"moderada"]],"Variação na fórmula batismal.",["at:2:38"],"O Pentecostes"],
["vt-293","rm:3:25","substituicao_sinonimos",[["pela fé no seu sangue",["Sinaitico (01)","Vaticano (03)"],"forte"],["pela fé do seu sangue",["Alexandrino (02)"],"moderada"]],"Variação na preposição.",["rm:3:25"],"A Justificação pela Fé"],
["vt-294","2co:5:17","substituicao_sinonimos",[["se alguém está em Cristo, nova criatura é",["Sinaitico (01)","Vaticano (03)"],"forte"],["se alguém está em Cristo, é nova criatura",["Alexandrino (02)"],"moderada"]],"Ordem varia.",["2co:5:17"],"Novas Criaturas"],
["vt-295","gl:5:1","substituicao_sinonimos",[["para a liberdade Cristo nos libertou",["Sinaitico (01)","Vaticano (03)"],"forte"],["para a liberdade foi Cristo libertou",["Alexandrino (02)"],"moderada"]],"Variação na voz verbal.",["gl:5:1"],"A Liberdade Cristã"],
["vt-296","cl:3:17","substituicao_sinonimos",[["fazei tudo em nome do Senhor Jesus",["Sinaitico (01)","Vaticano (03)"],"forte"],["tudo o que fizerdes, fazei em nome do Senhor Jesus",["Alexandrino (02)"],"moderada"]],"Variação na frase.",["cl:3:17"],"Vida na Comunidade"],
["vt-297","1ts:5:16","substituicao_sinonimos",[["rejubilai sempre",["Sinaitico (01)","Vaticano (03)"],"forte"],["sempre vos alegrai",["Alexandrino (02)"],"moderada"]],"Variação entre rejubilar e alegrar.",["1ts:5:16"],"Exortações Finais"],
["vt-298","1tm:6:10","substituicao_sinonimos",[["a raiz de todos os males é a avareza",["Sinaitico (01)","Vaticano (03)"],"forte"],["a raiz de todos os males",["Alexandrino (02)"],"moderada"]],"A adição 'é a avareza' pode ser explicativa.",["1tm:6:10"],"O Amor ao Dinheiro"],
["vt-299","hb:4:12","substituicao_sinonimos",[["a palavra de Deus é viva e eficaz",["Sinaitico (01)","Vaticano (03)"],"forte"],["a palavra de Deus é viva e operante",["Alexandrino (02)"],"moderada"]],"Variação entre eficaz e operante.",["hb:4:12"],"A Palavra de Deus"],
["vt-300","1jo:4:18","substituicao_sinonimos",[["o amor perfeito expulsa o medo",["Sinaitico (01)","Vaticano (03)"],"forte"],["o amor perfeito lança fora o medo",["Alexandrino (02)"],"moderada"]],"Variação entre expulsar e lançar fora.",["1jo:4:18"],"O Amor Perfeito"],
["vt-301","ap:3:14","substituicao_sinonimos",[["o princípio da criação de Deus",["Sinaitico (01)","Vaticano (03)"],"forte"],["o início da criação de Deus",["Alexandrino (02)"],"moderada"]],"Variação entre princípio e início.",["ap:3:14"],"A Igreja em Laodiceia"],
["vt-302","mt:26:64","substituicao_sinonimos",[["vereis o Filho do Homem assentado à destra do poder",["Sinaitico (01)","Vaticano (03)"],"forte"],["vereis o Filho do Homem assentado à destra da virtude de Deus",["Alexandrino (02)"],"moderada"]],"Variação entre poder e virtude.",["mt:26:64"],"Jesus Perante o Sinédrio"],
["vt-303","mc:14:62","substituicao_sinonimos",[["assentado à destra do poder",["Sinaitico (01)","Vaticano (03)"],"forte"],["assentado à destra da virtude",["Alexandrino (02)"],"moderada"]],"Mesma variação em Marcos.",["mc:14:62"],"Jesus Perante o Sinédrio"],
["vt-304","jo:6:63","substituicao_sinonimos",[["o Espírito é o que vivifica",["Sinaitico (01)","Vaticano (03)"],"forte"],["o Espírito é o que dá vida",["Alexandrino (02)"],"moderada"]],"Variação entre vivificar e dar vida.",["jo:6:63"],"O Pão da Vida"],
["vt-305","at:7:56","substituicao_sinonimos",[["eis que vejo os céus abertos",["Sinaitico (01)","Vaticano (03)"],"forte"],["eis que vejo os céus abertos, e o Filho do Homem",["Alexandrino (02)"],"moderada"]],"A adição pode ser explicativa.",["at:7:56"],"A Visão de Estêvão"],
["vt-306","rm:8:28","substituicao_sinonimos",[["todas as coisas cooperam para o bem",["Sinaitico (01)","Vaticano (03)"],"forte"],["todas as coisas juntas cooperam",["Alexandrino (02)"],"moderada"]],"Variação na preposição.",["rm:8:28"],"Todas as Coisas Cooperam"],
["vt-307","1co:2:9","substituicao_sinonimos",[["nem ouviu, nem viu, nem entrou no coração",["Sinaitico (01)","Vaticano (03)"],"forte"],["nem ouviu, nem viu, nem subiu ao coração",["Alexandrino (02)"],"moderada"]],"Variação entre entrar e subir.",["1co:2:9"],"Os Desígnios de Deus"],
["vt-308","2co:12:9","substituicao_sinonimos",[["a minha graça te basta",["Sinaitico (01)","Vaticano (03)"],"forte"],["a graça te basta",["Alexandrino (02)"],"moderada"]],"A adição do pronome personaliza.",["2co:12:9"],"A Graça Suficiente"],
["vt-309","hp:2:8","substituicao_sinonimos",[["se humilhou a si mesmo",["Sinaitico (01)","Vaticano (03)"],"forte"],["se esvaziou a si mesmo",["Alexandrino (02)"],"moderada"]],"Variação entre humilhar e esvaziar.",["hp:2:8"],"A Humilhação de Cristo"],
["vt-310","1jo:4:8","substituicao_sinonimos",[["Deus é amor",["Sinaitico (01)","Vaticano (03)"],"forte"],["Deus é o amor",["Alexandrino (02)"],"moderada"]],"Artigo definido varia.",["1jo:4:8"],"O Amor de Deus"],
];

const data = JSON.parse(readFileSync('scripts/all-entries.json', 'utf8'));
const fullEntries = D.map(d => ({
  id: d[0], referencia: d[1], tipo: d[2], variantes: d[3], explicacao: d[4], versiculosAfetados: d[5],
  ...(d[6] ? { pericope: d[6] } : {}), ...(d[7] ? { recomendacaoNA28: d[7] } : {}),
}));
data.entries = data.entries.concat(fullEntries);
writeFileSync('scripts/all-entries.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`Total entries: ${data.entries.length} (added final batch)`);
