// Indice consolidado de comentarios reais (Matthew Henry)
// Gerado automaticamente por scripts/fetch-all-commentaries.mjs
// Data: 2026-07-18T03:22:59.774Z
// Total: 3570 comentarios em 56 livros

import { Comentario } from '../comentarios';

// Re-exporta todos os comentarios por livro
import { comentariosgn } from './raw/gn-matthew-henry';
import { comentariosex } from './raw/ex-matthew-henry';
import { comentarioslv } from './raw/lv-matthew-henry';
import { comentariosnm } from './raw/nm-matthew-henry';
import { comentariosdt } from './raw/dt-matthew-henry';
import { comentariosjs } from './raw/js-matthew-henry';
import { comentariosjz } from './raw/jz-matthew-henry';
import { comentariosrt } from './raw/rt-matthew-henry';
import { comentarios1sm } from './raw/1sm-matthew-henry';
import { comentarios2sm } from './raw/2sm-matthew-henry';
import { comentarios1rs } from './raw/1rs-matthew-henry';
import { comentarios2rs } from './raw/2rs-matthew-henry';
import { comentarios1cr } from './raw/1cr-matthew-henry';
import { comentarios2cr } from './raw/2cr-matthew-henry';
import { comentariosed } from './raw/ed-matthew-henry';
import { comentariosne } from './raw/ne-matthew-henry';
import { comentarioset } from './raw/et-matthew-henry';
import { comentariosjó } from './raw/jó-matthew-henry';
import { comentariossl } from './raw/sl-matthew-henry';
import { comentariospv } from './raw/pv-matthew-henry';
import { comentariosec } from './raw/ec-matthew-henry';
import { comentariosis } from './raw/is-matthew-henry';
import { comentariosjr } from './raw/jr-matthew-henry';
import { comentarioslm } from './raw/lm-matthew-henry';
import { comentariosdn } from './raw/dn-matthew-henry';
import { comentariosos } from './raw/os-matthew-henry';
import { comentariosam } from './raw/am-matthew-henry';
import { comentariosob } from './raw/ob-matthew-henry';
import { comentariosjn } from './raw/jn-matthew-henry';
import { comentariosmq } from './raw/mq-matthew-henry';
import { comentarioshc } from './raw/hc-matthew-henry';
import { comentariossf } from './raw/sf-matthew-henry';
import { comentariosag } from './raw/ag-matthew-henry';
import { comentarioszc } from './raw/zc-matthew-henry';
import { comentariosml } from './raw/ml-matthew-henry';
import { comentariosmt } from './raw/mt-matthew-henry';
import { comentariosrm } from './raw/rm-matthew-henry';
import { comentarios1co } from './raw/1co-matthew-henry';
import { comentarios2co } from './raw/2co-matthew-henry';
import { comentariosgl } from './raw/gl-matthew-henry';
import { comentariosef } from './raw/ef-matthew-henry';
import { comentarioscl } from './raw/cl-matthew-henry';
import { comentarios1ts } from './raw/1ts-matthew-henry';
import { comentarios2ts } from './raw/2ts-matthew-henry';
import { comentarios1tm } from './raw/1tm-matthew-henry';
import { comentarios2tm } from './raw/2tm-matthew-henry';
import { comentariostt } from './raw/tt-matthew-henry';
import { comentariosfm } from './raw/fm-matthew-henry';
import { comentarioshb } from './raw/hb-matthew-henry';
import { comentariostg } from './raw/tg-matthew-henry';
import { comentarios1pe } from './raw/1pe-matthew-henry';
import { comentarios2pe } from './raw/2pe-matthew-henry';
import { comentarios1jo } from './raw/1jo-matthew-henry';
import { comentarios2jo } from './raw/2jo-matthew-henry';
import { comentarios3jo } from './raw/3jo-matthew-henry';
import { comentariosap } from './raw/ap-matthew-henry';

// Todos os comentarios concatenados
export const todosComentariosReais: Comentario[] = [
  ...comentariosgn,
  ...comentariosex,
  ...comentarioslv,
  ...comentariosnm,
  ...comentariosdt,
  ...comentariosjs,
  ...comentariosjz,
  ...comentariosrt,
  ...comentarios1sm,
  ...comentarios2sm,
  ...comentarios1rs,
  ...comentarios2rs,
  ...comentarios1cr,
  ...comentarios2cr,
  ...comentariosed,
  ...comentariosne,
  ...comentarioset,
  ...comentariosjó,
  ...comentariossl,
  ...comentariospv,
  ...comentariosec,
  ...comentariosis,
  ...comentariosjr,
  ...comentarioslm,
  ...comentariosdn,
  ...comentariosos,
  ...comentariosam,
  ...comentariosob,
  ...comentariosjn,
  ...comentariosmq,
  ...comentarioshc,
  ...comentariossf,
  ...comentariosag,
  ...comentarioszc,
  ...comentariosml,
  ...comentariosmt,
  ...comentariosrm,
  ...comentarios1co,
  ...comentarios2co,
  ...comentariosgl,
  ...comentariosef,
  ...comentarioscl,
  ...comentarios1ts,
  ...comentarios2ts,
  ...comentarios1tm,
  ...comentarios2tm,
  ...comentariostt,
  ...comentariosfm,
  ...comentarioshb,
  ...comentariostg,
  ...comentarios1pe,
  ...comentarios2pe,
  ...comentarios1jo,
  ...comentarios2jo,
  ...comentarios3jo,
  ...comentariosap
];

// Dados por livro
export const comentariosPorLivro: Record<string, Comentario[]> = {
  'gn': comentariosgn,
  'ex': comentariosex,
  'lv': comentarioslv,
  'nm': comentariosnm,
  'dt': comentariosdt,
  'js': comentariosjs,
  'jz': comentariosjz,
  'rt': comentariosrt,
  '1sm': comentarios1sm,
  '2sm': comentarios2sm,
  '1rs': comentarios1rs,
  '2rs': comentarios2rs,
  '1cr': comentarios1cr,
  '2cr': comentarios2cr,
  'ed': comentariosed,
  'ne': comentariosne,
  'et': comentarioset,
  'jó': comentariosjó,
  'sl': comentariossl,
  'pv': comentariospv,
  'ec': comentariosec,
  'is': comentariosis,
  'jr': comentariosjr,
  'lm': comentarioslm,
  'dn': comentariosdn,
  'os': comentariosos,
  'am': comentariosam,
  'ob': comentariosob,
  'jn': comentariosjn,
  'mq': comentariosmq,
  'hc': comentarioshc,
  'sf': comentariossf,
  'ag': comentariosag,
  'zc': comentarioszc,
  'ml': comentariosml,
  'mt': comentariosmt,
  'rm': comentariosrm,
  '1co': comentarios1co,
  '2co': comentarios2co,
  'gl': comentariosgl,
  'ef': comentariosef,
  'cl': comentarioscl,
  '1ts': comentarios1ts,
  '2ts': comentarios2ts,
  '1tm': comentarios1tm,
  '2tm': comentarios2tm,
  'tt': comentariostt,
  'fm': comentariosfm,
  'hb': comentarioshb,
  'tg': comentariostg,
  '1pe': comentarios1pe,
  '2pe': comentarios2pe,
  '1jo': comentarios1jo,
  '2jo': comentarios2jo,
  '3jo': comentarios3jo,
  'ap': comentariosap
};

// Estatisticas
export const estatisticasReais = {
  totalComentarios: 3570,
  totalLivros: 56,
  dataGeracao: '2026-07-18T03:22:59.775Z',
  fonte: 'Matthew Henry Commentary (dominio publico)',
  detalhesLivros: {
  "gn": {
    "nomePt": "Gênesis",
    "capitulos": 50,
    "comentarios": 239
  },
  "ex": {
    "nomePt": "Êxodo",
    "capitulos": 40,
    "comentarios": 136
  },
  "lv": {
    "nomePt": "Levítico",
    "capitulos": 27,
    "comentarios": 88
  },
  "nm": {
    "nomePt": "Números",
    "capitulos": 36,
    "comentarios": 93
  },
  "dt": {
    "nomePt": "Deuteronômio",
    "capitulos": 34,
    "comentarios": 101
  },
  "js": {
    "nomePt": "Josué",
    "capitulos": 24,
    "comentarios": 69
  },
  "jz": {
    "nomePt": "Juízes",
    "capitulos": 21,
    "comentarios": 72
  },
  "rt": {
    "nomePt": "Rute",
    "capitulos": 4,
    "comentarios": 12
  },
  "1sm": {
    "nomePt": "1 Samuel",
    "capitulos": 31,
    "comentarios": 103
  },
  "2sm": {
    "nomePt": "2 Samuel",
    "capitulos": 24,
    "comentarios": 72
  },
  "1rs": {
    "nomePt": "1 Reis",
    "capitulos": 22,
    "comentarios": 73
  },
  "2rs": {
    "nomePt": "2 Reis",
    "capitulos": 25,
    "comentarios": 82
  },
  "1cr": {
    "nomePt": "1 Crônicas",
    "capitulos": 29,
    "comentarios": 66
  },
  "2cr": {
    "nomePt": "2 Crônicas",
    "capitulos": 36,
    "comentarios": 83
  },
  "ed": {
    "nomePt": "Esdras",
    "capitulos": 10,
    "comentarios": 26
  },
  "ne": {
    "nomePt": "Neemias",
    "capitulos": 13,
    "comentarios": 32
  },
  "et": {
    "nomePt": "Ester",
    "capitulos": 10,
    "comentarios": 21
  },
  "jó": {
    "nomePt": "Jó",
    "capitulos": 42,
    "comentarios": 134
  },
  "sl": {
    "nomePt": "Salmos",
    "capitulos": 150,
    "comentarios": 443
  },
  "pv": {
    "nomePt": "Provérbios",
    "capitulos": 31,
    "comentarios": 519
  },
  "ec": {
    "nomePt": "Eclesiastes",
    "capitulos": 12,
    "comentarios": 42
  },
  "is": {
    "nomePt": "Isaías",
    "capitulos": 66,
    "comentarios": 192
  },
  "jr": {
    "nomePt": "Jeremias",
    "capitulos": 52,
    "comentarios": 148
  },
  "lm": {
    "nomePt": "Lamentações",
    "capitulos": 5,
    "comentarios": 14
  },
  "dn": {
    "nomePt": "Daniel",
    "capitulos": 12,
    "comentarios": 40
  },
  "os": {
    "nomePt": "Oséias",
    "capitulos": 14,
    "comentarios": 33
  },
  "am": {
    "nomePt": "Amós",
    "capitulos": 9,
    "comentarios": 21
  },
  "ob": {
    "nomePt": "Obadias",
    "capitulos": 1,
    "comentarios": 2
  },
  "jn": {
    "nomePt": "Jonas",
    "capitulos": 4,
    "comentarios": 3
  },
  "mq": {
    "nomePt": "Miquéias",
    "capitulos": 7,
    "comentarios": 17
  },
  "hc": {
    "nomePt": "Habacuque",
    "capitulos": 3,
    "comentarios": 8
  },
  "sf": {
    "nomePt": "Sofonias",
    "capitulos": 3,
    "comentarios": 10
  },
  "ag": {
    "nomePt": "Ageu",
    "capitulos": 2,
    "comentarios": 5
  },
  "zc": {
    "nomePt": "Zacarias",
    "capitulos": 14,
    "comentarios": 34
  },
  "ml": {
    "nomePt": "Malaquias",
    "capitulos": 4,
    "comentarios": 9
  },
  "mt": {
    "nomePt": "Mateus",
    "capitulos": 28,
    "comentarios": 80
  },
  "rm": {
    "nomePt": "Romanos",
    "capitulos": 16,
    "comentarios": 49
  },
  "1co": {
    "nomePt": "1 Coríntios",
    "capitulos": 16,
    "comentarios": 67
  },
  "2co": {
    "nomePt": "2 Coríntios",
    "capitulos": 13,
    "comentarios": 38
  },
  "gl": {
    "nomePt": "Gálatas",
    "capitulos": 6,
    "comentarios": 18
  },
  "ef": {
    "nomePt": "Efésios",
    "capitulos": 6,
    "comentarios": 18
  },
  "cl": {
    "nomePt": "Colossenses",
    "capitulos": 4,
    "comentarios": 17
  },
  "1ts": {
    "nomePt": "1 Tessalonicenses",
    "capitulos": 5,
    "comentarios": 18
  },
  "2ts": {
    "nomePt": "2 Tessalonicenses",
    "capitulos": 3,
    "comentarios": 10
  },
  "1tm": {
    "nomePt": "1 Timóteo",
    "capitulos": 6,
    "comentarios": 17
  },
  "2tm": {
    "nomePt": "2 Timóteo",
    "capitulos": 4,
    "comentarios": 13
  },
  "tt": {
    "nomePt": "Tito",
    "capitulos": 3,
    "comentarios": 8
  },
  "fm": {
    "nomePt": "Filemom",
    "capitulos": 1,
    "comentarios": 2
  },
  "hb": {
    "nomePt": "Hebreus",
    "capitulos": 13,
    "comentarios": 33
  },
  "tg": {
    "nomePt": "Tiago",
    "capitulos": 5,
    "comentarios": 13
  },
  "1pe": {
    "nomePt": "1 Pedro",
    "capitulos": 5,
    "comentarios": 22
  },
  "2pe": {
    "nomePt": "2 Pedro",
    "capitulos": 3,
    "comentarios": 14
  },
  "1jo": {
    "nomePt": "1 João",
    "capitulos": 5,
    "comentarios": 26
  },
  "2jo": {
    "nomePt": "2 João",
    "capitulos": 1,
    "comentarios": 5
  },
  "3jo": {
    "nomePt": "3 João",
    "capitulos": 1,
    "comentarios": 4
  },
  "ap": {
    "nomePt": "Apocalipse",
    "capitulos": 22,
    "comentarios": 56
  }
}
};
