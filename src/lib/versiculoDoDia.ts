interface VersiculoDoDia {
  texto: string;
  referencia: string;
}

const VERSICULOS: VersiculoDoDia[] = [
  { texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', referencia: 'João 3:16' },
  { texto: 'O Senhor é o meu pastor; nada me faltará.', referencia: 'Salmos 23:1' },
  { texto: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.', referencia: 'Provérbios 3:5' },
  { texto: 'Porque eu bem sei os planos que tenho para vocês, diz o Senhor, planos de felicidade e não de mal, para dar-lhes um futuro e uma esperança.', referencia: 'Jeremias 29:11' },
  { texto: 'Posso todas as coisas naquele que me fortalece.', referencia: 'Filipenses 4:13' },
  { texto: 'Mas os que esperam no Senhor renovam as suas forças.', referencia: 'Isaías 40:31' },
  { texto: 'Deem graças ao Senhor porque ele é bom; o seu amor dura para sempre.', referencia: 'Salmo 136:1' },
];

export function versiculoDoDia(): VersiculoDoDia {
  const hoje = new Date();
  const diaDoAno = Math.floor((hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) / 86400000);
  return VERSICULOS[diaDoAno % VERSICULOS.length];
}
