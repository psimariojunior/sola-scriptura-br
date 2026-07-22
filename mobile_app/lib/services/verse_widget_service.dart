import 'package:flutter/services.dart';
import 'package:home_widget/home_widget.dart';

class VerseWidgetService {
  static const _channel = MethodChannel('com.solascriptura/widget');

  static Future<void> updateWidget({
    required String verseText,
    required String verseReference,
  }) async {
    await HomeWidget.saveWidgetData<String>('verse_text', verseText);
    await HomeWidget.saveWidgetData<String>('verse_reference', verseReference);

    await HomeWidget.updateWidget(
      name: 'VerseWidgetProvider',
      androidName: 'VerseWidgetProvider',
    );
  }

  static Future<void> updateWithDailyVerse() async {
    const verses = [
      {'text': 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', 'ref': 'João 3:16'},
      {'text': 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.', 'ref': 'Provérbios 3:5'},
      { 'text': 'Posso todas as coisas naquele que me fortalece.', 'ref': 'Filipenses 4:13'},
      {'text': 'O Senhor é o meu pastor; nada me faltará.', 'ref': 'Salmo 23:1'},
      {'text': 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.', 'ref': 'Jeremias 29:11'},
      {'text': 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.', 'ref': 'Mateus 11:28'},
      {'text': 'O amor é sofredor, é bondoso; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece.', 'ref': '1 Coríntios 13:4'},
      {'text': 'Deem graças ao Senhor porque ele é bom; o seu amor dura para sempre.', 'ref': 'Salmo 136:1'},
      {'text': 'Porque Deus não nos deu espírito de timidez, mas de fortaleza, de amor e de moderação.', 'ref': '2 Timóteo 1:7'},
      {'text': 'Lançando sobre ele toda a vossa ansiedade, porque ele cuida de vós.', 'ref': '1 Pedro 5:7'},
      {'text': 'Buscai primeiro o reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.', 'ref': 'Mateus 6:33'},
      {'text': 'Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim.', 'ref': 'João 14:6'},
      {'text': 'E sabemos que em todas as coisas Deus contribui para o bem daqueles que o amam.', 'ref': 'Romanos 8:28'},
      {'text': 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.', 'ref': 'Isaías 41:10'},
      {'text': 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.', 'ref': 'Salmo 91:1'},
      {'text': 'Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.', 'ref': 'Romanos 6:23'},
      {'text': 'Porque pela graça sois salvos, por meio da fé; e isso não vem de vós, é dom de Deus.', 'ref': 'Efésios 2:8'},
      {'text': 'O Senhor peleja por vós, e vós estareis em silêncio.', 'ref': 'Êxodo 14:14'},
      {'text': 'A Palavra de Deus é viva, e eficaz, e mais cortante do que qualquer espada de dois gumes.', 'ref': 'Hebreus 4:12'},
      {'text': 'Filhos, obedecei a vossos pais no Senhor, porque isto é justo.', 'ref': 'Efésios 6:1'},
      {'text': 'Porque o Senhor teu Deus é quem vai contigo; não te desamparará, nem te deixará.', 'ref': 'Deuteronômio 31:6'},
      {'text': 'Portanto, se alguém estiver em Cristo, é nova criação; as coisas antigas já passaram; eis que se fizeram novas.', 'ref': '2 Coríntios 5:17'},
      {'text': 'Tudo posso naquele que me fortalece.', 'ref': 'Filipenses 4:13'},
      {'text': 'Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes, que não sabes.', 'ref': 'Jeremias 33:3'},
      {'text': 'De sorte que não temamos o dia de amanhã; porque o amanhã cuidará de si mesmo.', 'ref': 'Mateus 6:34'},
      {'text': 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.', 'ref': 'Salmo 23:4'},
      {'text': 'O amor nunca falha; mas havendo profecias, serão aniquiladas; havendo línguas, cessarão; havendo ciência, desaparecerá.', 'ref': '1 Coríntios 13:8'},
      {'text': 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.', 'ref': 'Hebreus 11:1'},
      {'text': 'Porque o Senhor é bom; o seu amor é eterno; e a sua verdade subsistirá de geração em geração.', 'ref': 'Salmo 100:5'},
      {'text': 'Portanto, arrependei-vos, e convertei-vos, para que sejam apagados os vossos pecados.', 'ref': 'Atos 3:19'},
      {'text': 'Porque é Deus quem em vós opera tanto o querer como o efetuar, segundo a sua boa vontade.', 'ref': 'Filipenses 2:13'},
      {'text': 'E o que provou que nos amou? Pela nossa fé, pois Deus nos ressuscitou com Cristo.', 'ref': 'Efésios 2:4-5'},
      {'text': 'O mandamento novo vos dou, que vos ameis uns aos outros; como eu vos amei.', 'ref': 'João 13:34'},
      {'text': 'Portanto, não julgueis, para que não sejais julgados.', 'ref': 'Mateus 7:1'},
      {'text': 'Os frutos do Espírito são: amor, gozo, paz, longanimidade, benignidade, bondade, fé.', 'ref': 'Gálatas 5:22'},
      {'text': 'Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos.', 'ref': 'Mateus 5:6'},
      {'text': 'E conhecereis a verdade, e a verdade vos libertará.', 'ref': 'João 8:32'},
      {'text': 'Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos.', 'ref': 'Filipenses 4:4'},
      {'text': 'Não vos canbeis de fazer o bem; porque a seu tempo ceifaremos, se não desfalecermos.', 'ref': 'Gálatas 6:9'},
      {'text': 'O Senhor é a minha luz e a minha salvação; a quem temerei?', 'ref': 'Salmo 27:1'},
    ];

    final now = DateTime.now();
    final index = now.difference(DateTime(2024, 1, 1)).inDays % verses.length;
    final verse = verses[index];

    await updateWidget(
      verseText: verse['text']!,
      verseReference: verse['ref']!,
    );
  }
}
