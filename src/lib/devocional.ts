export interface Devocional {
  dia: number;
  titulo: string;
  versiculo: { livro: string; capitulo: number; versiculo: number };
  texto: string;
  meditacao: string;
  oracao: string;
}

export const devocionais: Devocional[] = [
  {
    dia: 1,
    titulo: 'O Amor Inabalável de Deus',
    versiculo: { livro: 'Sl', capitulo: 136, versiculo: 1 },
    texto: 'Salmos 136.1 — "Louvai ao SENHOR, porque ele é bom; porque a sua benignidade dura para sempre."',
    meditacao: 'A bondade de Deus não é passageira nem condicional. Ela dura para sempre, atravessando gerações, falhas e circunstâncias. Hoje, descansa nesta verdade: o amor de Deus por ti não depende do teu desempenho, mas do caráter imutável dEle.',
    oracao: 'Senhor, obrigado pelo Teu amor que nunca falha. Ajuda-me a confiar na Tua bondade mesmo quando não entendo as circunstâncias.',
  },
  {
    dia: 2,
    titulo: 'A Palavra como Lâmpada',
    versiculo: { livro: 'Sl', capitulo: 119, versiculo: 105 },
    texto: 'Salmos 119.105 — "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho."',
    meditacao: 'Em um mundo de trevas e confusão, a Palavra de Deus é a luz que revela o caminho seguro. Não precisamos temer o desconhecido quando temos a Escritura como guia. Cada passo dado sob sua luz é um passo de fé e sabedoria.',
    oracao: 'Pai, que a Tua palavra ilumine cada decisão que eu tomar hoje. Ajuda-me a buscá-la como minha fonte de direção.',
  },
  {
    dia: 3,
    titulo: 'Graça Suficiente',
    versiculo: { livro: '2Co', capitulo: 12, versiculo: 9 },
    texto: '2 Coríntios 12.9 — "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza."',
    meditacao: 'Paulo aprendeu que a fraqueza não é um obstáculo para Deus, mas um canal para o Seu poder. Quando reconhecemos nossa insuficiência, abrimos espaço para a suficiência divina. A graça de Deus não apenas cobre nossas falhas — ela as transforma em testemunho.',
    oracao: 'Senhor, que eu me glorie nas minhas fraquezas, sabendo que o Teu poder se aperfeiçoa em mim. A Tua graça me basta.',
  },
  {
    dia: 4,
    titulo: 'O Bom Pastor',
    versiculo: { livro: 'Sl', capitulo: 23, versiculo: 1 },
    texto: 'Salmos 23.1 — "O SENHOR é o meu pastor; nada me faltará."',
    meditacao: 'O Salmo 23 não é apenas um poema reconfortante, mas uma declaração de confiança radical. Se o Senhor é o nosso Pastor, temos tudo o que precisamos. Nossa responsabilidade é segui-Lo; a dEle é prover, guiar e proteger.',
    oracao: 'Pastor amoroso, confio em Ti para me guiar por pastos verdejantes e águas tranquilas. Ajuda-me a descansar em Tua provisão.',
  },
  {
    dia: 5,
    titulo: 'Fé que Move Montanhas',
    versiculo: { livro: 'Mc', capitulo: 11, versiculo: 24 },
    texto: 'Marcos 11.24 — "Por isso vos digo que tudo o que pedirdes, orando, crede que recebereis, e tê-lo-eis."',
    meditacao: 'A fé genuína não é um sentimento, mas uma decisão de confiar na fidelidade de Deus. Jesus nos ensina que a oração feita com fé move montanhas — não por causa do poder da fé em si, mas por causa do Deus poderoso em quem depositamos essa fé.',
    oracao: 'Deus, aumenta a minha fé. Ajuda-me a crer que Tu és fiel para cumprir Tuas promessas, mesmo quando não vejo resultados imediatos.',
  },
  {
    dia: 6,
    titulo: 'Vigiai e Orai',
    versiculo: { livro: 'Mt', capitulo: 26, versiculo: 41 },
    texto: 'Mateus 26.41 — "Vigiai e orai, para que não entreis em tentação; o espírito, na verdade, está pronto, mas a carne é fraca."',
    meditacao: 'Jesus sabia que o espírito humano deseja obedecer, mas a carne é frágil diante da tentação. A solução não é simplesmente força de vontade, mas vigilância espiritual e oração constante. Sem oração, estamos vulneráveis; com ela, estamos fortalecidos.',
    oracao: 'Senhor, ajuda-me a vigiar e orar. Fortalece meu espírito para resistir às tentações e manter meus olhos fixos em Ti.',
  },
  {
    dia: 7,
    titulo: 'O Maior Mandamento',
    versiculo: { livro: 'Mt', capitulo: 22, versiculo: 37 },
    texto: 'Mateus 22.37 — "Amarás o Senhor teu Deus de todo o teu coração, e de toda a tua alma, e de todo o teu pensamento."',
    meditacao: 'A essência de toda a Lei e Profetas se resume ao amor. Não um amor superficial, mas um amor que envolve todo o ser — coração, alma e mente. Este amor não é opcional para o discípulo; é o fundamento de toda obediência verdadeira.',
    oracao: 'Pai, ensina-me a Te amar de todo o meu ser. Que este amor seja a motivação de cada pensamento, palavra e ação.',
  },
  {
    dia: 8,
    titulo: 'Novas Criaturas',
    versiculo: { livro: '2Co', capitulo: 5, versiculo: 17 },
    texto: '2 Coríntios 5.17 — "Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo."',
    meditacao: 'Em Cristo, não somos meramente reformados ou melhorados — somos feitos novas criaturas. O passado não define mais quem somos. Nosso pecado foi crucificado com Cristo, e uma nova vida, com novas identidade, propósito e esperança, começa.',
    oracao: 'Senhor, obrigado por me fazer nova criatura. Ajuda-me a viver conforme a minha nova identidade em Ti, deixando o passado para trás.',
  },
  {
    dia: 9,
    titulo: 'A Paz que Excede Todo Entendimento',
    versiculo: { livro: 'Fp', capitulo: 4, versiculo: 7 },
    texto: 'Filipenses 4.7 — "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus."',
    meditacao: 'A paz que Deus oferece não depende das circunstâncias externas. Ela excede nossa capacidade de compreender precisamente porque não é baseada no que vemos, mas em quem Deus é. Esta paz guarda nosso coração e mente como um soldado protege uma cidade.',
    oracao: 'Deus de paz, que a Tua paz, que excede todo entendimento, guarde meu coração e minha mente em Cristo Jesus hoje.',
  },
  {
    dia: 10,
    titulo: 'Perseverança na Fé',
    versiculo: { livro: 'Hb', capitulo: 12, versiculo: 1 },
    texto: 'Hebreus 12.1 — "Corramos, com perseverança, a carreira que nos está proposta, olhando para Jesus, autor e consumador da fé."',
    meditacao: 'A vida cristã é comparada a uma corrida de resistência, não a uma corrida de velocidade. O segredo para perseverar não está em nosso próprio esforço, mas em mantermos nossos olhos fixos em Jesus. Ele começou e completará a obra da fé em nós.',
    oracao: 'Senhor Jesus, ajuda-me a correr com perseverança, mantendo meus olhos fixos em Ti, autor e consumador da minha fé.',
  },
];

export function getDevocionalDoDia(dia?: number): Devocional {
  const hoje = dia ?? new Date().getFullYear() % 2 === 0 ? new Date().getDate() : new Date().getDate();
  const diaDoAno = dia ?? Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const idx = (diaDoAno - 1) % devocionais.length;
  return devocionais[idx];
}

export function getDevocionalPorDia(dia: number): Devocional | undefined {
  return devocionais.find(d => d.dia === dia);
}
