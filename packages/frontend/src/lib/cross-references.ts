// Cross-references database - maps verses to related verses
export const CROSS_REFERENCES: Record<string, { ref: string; text: string; tipo: string }[]> = {
  "Joao 3:16": [
    { ref: "Romanos 5:8", text: "Mas Deus prova o seu amor por nós em que Cristo morreu por nós, sendo nós ainda pecadores.", tipo: "Paralelo" },
    { ref: "1 João 4:9", text: "Nisto se manifestou o amor de Deus em nós: em que Deus nos enviou o seu Filho unigênito.", tipo: "Paralelo" },
    { ref: "Romanos 6:23", text: "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna.", tipo: "Tematico" },
    { ref: "Efésios 2:8", text: "Pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.", tipo: "Tematico" },
    { ref: "Tito 3:5", text: "Salvou-nos pela lavagem da regeneração e pela renovação do Espírito Santo.", tipo: "Tematico" },
    { ref: "Isaías 53:5", text: "Mas ele foi ferido por causa das nossas transgressões.", tipo: "Messiânico" },
    { ref: "1 Pedro 2:24", text: "Levando ele mesmo em seu corpo os nossos pecados sobre o madeiro.", tipo: "Tematico" },
  ],
  "Gênesis 1:1": [
    { ref: "João 1:1", text: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.", tipo: "Paralelo" },
    { ref: "Hebreus 11:3", text: "Pela fé entendemos que os mundos foram criados pela palavra de Deus.", tipo: "Tematico" },
    { ref: "Colossenses 1:16", text: "Porque nele foram criadas todas as coisas que há nos céus e na terra.", tipo: "Tematico" },
    { ref: "Isaías 42:5", text: "Assim diz o Deus, o Senhor, que criou os céus e estendeu a terra.", tipo: "Paralelo" },
  ],
  "Isaías 53:5": [
    { ref: "1 Pedro 2:24", text: "Levando ele mesmo em seu corpo os nossos pecados sobre o madeiro.", tipo: "Cumprimento" },
    { ref: "Romanos 5:8", text: "Cristo morreu por nós, sendo nós ainda pecadores.", tipo: "Tematico" },
    { ref: "Mateus 8:17", text: "Para que se cumprisse o que fora dito pelo profeta: Ele mesmo tomou as nossas enfermidades.", tipo: "Cumprimento" },
    { ref: "1 Coríntios 15:3", text: "Cristo morreu por nossos pecados, segundo as Escrituras.", tipo: "Tematico" },
  ],
  "Romanos 8:28": [
    { ref: "Jeremias 29:11", text: "Eu bem sei os pensamentos que tenho a vosso respeito, pensamentos de paz.", tipo: "Paralelo" },
    { ref: "Efésios 1:11", text: "Nele fomos feitos herança, conforme o propósito daquele que faz todas as coisas.", tipo: "Tematico" },
    { ref: "Romanos 8:29", text: "Porque os que dantes conhecidos foram, também de antemão foram destinados.", tipo: "Continuação" },
    { ref: "Jeremias 32:27", text: "Eu sou o Senhor, o Deus de toda a carne; há alguma coisa difícil para mim?", tipo: "Paralelo" },
  ],
  "Salmos 23:1": [
    { ref: "João 10:11", text: "Eu sou o bom pastor. O bom pastor dá a sua vida pelas ovelhas.", tipo: "Messiânico" },
    { ref: "1 Pedro 5:4", text: "Quando aparecer o Sumo Pastor, recebereis a coroa da glória.", tipo: "Tematico" },
    { ref: "Hebreus 13:20", text: "O grande pastor das ovelhas, pelo sangue da aliança eterna.", tipo: "Tematico" },
  ],
  "Efésios 2:8": [
    { ref: "Romanos 3:24", text: "Sendo justificados gratuitamente pela sua graça, pela redenção que há em Cristo Jesus.", tipo: "Paralelo" },
    { ref: "Tito 3:5", text: "Salvou-nos pela lavagem da regeneração e pela renovação do Espírito Santo.", tipo: "Tematico" },
    { ref: "Romanos 5:15", text: "Mas o dom não é como a ofensa... pela graça de um só homem, Jesus Cristo.", tipo: "Tematico" },
    { ref: "2 Coríntios 9:15", text: "Graças a Deus pelo seu dom inefável!", tipo: "Tematico" },
  ],
  "Filipenses 4:13": [
    { ref: "2 Coríntios 12:9", text: "A minha graça é suficiente para ti, porque o meu poder se aperfeiçoa na fraqueza.", tipo: "Paralelo" },
    { ref: "Isaías 40:31", text: "Mas aqueles que esperam no Senhor renovarão as forças.", tipo: "Tematico" },
    { ref: "João 15:5", text: "Sem mim nada podeis fazer.", tipo: "Tematico" },
  ],
  "Mateus 28:19": [
    { ref: "Marcos 16:15", text: "Ide por todo o mundo e pregai o evangelho a toda criatura.", tipo: "Paralelo" },
    { ref: "Lucas 24:47", text: "Que se pregasse em seu nome o arrependimento para remissão de pecados.", tipo: "Paralelo" },
    { ref: "Atos 1:8", text: "Sereis minhas testemunhas em Jerusalém, na Judeia, na Samaria.", tipo: "Tematico" },
  ],
  "Romanos 3:23": [
    { ref: "Romanos 6:23", text: "Porque o salário do pecado é a morte.", tipo: "Tematico" },
    { ref: "1 João 1:8", text: "Se dissermos que não temos pecado, enganamos a nós mesmos.", tipo: "Paralelo" },
    { ref: "Gênesis 6:5", text: "Viu o Senhor que a maldade do homem se multiplicara sobre a terra.", tipo: "Tematico" },
  ],
  "2 Timóteo 3:16": [
    { ref: "2 Pedro 1:20-21", text: "Nenhuma profecia da Escritura é de interpretação particular. Os homens falaram da parte de Deus.", tipo: "Paralelo" },
    { ref: "Salmo 119:105", text: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.", tipo: "Tematico" },
    { ref: "Hebreus 4:12", text: "Porque a palavra de Deus é viva, e eficaz, e mais cortante que qualquer espada.", tipo: "Tematico" },
  ],
  "Hebreus 4:12": [
    { ref: "Isaías 55:11", text: "Assim será a palavra que sair da minha boca; não voltará para mim vazia.", tipo: "Paralelo" },
    { ref: "Salmo 119:105", text: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.", tipo: "Tematico" },
    { ref: "2 Timóteo 3:16", text: "Toda a Escritura é divinamente inspirada.", tipo: "Tematico" },
  ],
  "Apocalipse 21:1": [
    { ref: "Isaías 65:17", text: "Pois eis que eu crio novos céus e nova terra.", tipo: "Profecia" },
    { ref: "2 Pedro 3:13", text: "Mas, segundo a sua promessa, esperamos novos céus e nova terra.", tipo: "Paralelo" },
    { ref: "Apocalipse 21:4", text: "Enxugará toda lágrima dos seus olhos.", tipo: "Continuação" },
  ],
  "1 João 4:8": [
    { ref: "João 3:16", text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", tipo: "Paralelo" },
    { ref: "1 João 4:16", text: "Deus é amor; quem está no amor está em Deus, e Deus nele.", tipo: "Continuação" },
    { ref: "Salmo 136:1", text: "Largai graças ao Senhor, porque ele é bom; o seu amor dura para sempre.", tipo: "Tematico" },
  ],
  "Mateus 6:33": [
    { ref: "Salmo 37:4", text: "Deleita-te também no Senhor, e te concederá os desejos do teu coração.", tipo: "Paralelo" },
    { ref: "Lucas 12:31", text: "Mas buscai primeiro o reino de Deus, e todas estas coisas vos serão acrescentadas.", tipo: "Paralelo" },
    { ref: "Filipenses 4:19", text: "Meu Deus suprirá todas as vossas necessidades, segundo a sua riqueza.", tipo: "Tematico" },
  ],
  "João 14:6": [
    { ref: "Atos 4:12", text: "Não há salvação em nenhum outro; porque não há nenhum outro nome debaixo do céu.", tipo: "Tematico" },
    { ref: "1 Timóteo 2:5", text: "Porque há um Deus, e também um mediador entre Deus e os homens.", tipo: "Tematico" },
    { ref: "João 10:9", text: "Eu sou a porta; quem entrar por mim será salvo.", tipo: "Paralelo" },
  ],
};

// Get cross-references for a verse
export function getCrossReferences(livro: string, capitulo: number, versiculo: number) {
  const key = `${livro} ${capitulo}:${versiculo}`;
  return CROSS_REFERENCES[key] || [];
}

// Search verses by keyword
export function searchVerses(keyword: string) {
  const results: { ref: string; text: string }[] = [];
  for (const [ref, verses] of Object.entries(CROSS_REFERENCES)) {
    for (const v of verses) {
      if (v.text.toLowerCase().includes(keyword.toLowerCase())) {
        results.push({ ref: v.ref, text: v.text });
      }
    }
  }
  return results;
}
