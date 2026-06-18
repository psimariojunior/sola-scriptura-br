export const TESTAMENTOS = {
  AT: 'Antigo Testamento',
  NT: 'Novo Testamento',
} as const;

export const GENEROS_LITERARIOS = {
  NARRATIVA: 'Narrativa',
  POESIA: 'Poesia',
  PROFECIA: 'Profecia',
  LEI: 'Lei',
  SABEDORIA: 'Sabedoria',
  EVANGELHO: 'Evangelho',
  EPISTOLA: 'Epístola',
  APOCALIPTICO: 'Apocalíptico',
} as const;

export const DOUTRINAS_SISTEMATICAS = [
  'Teontologia',
  'Cristologia',
  'Pneumatologia',
  'Antropologia',
  'Hamartiologia',
  'Soteriologia',
  'Eclesiologia',
  'Escatologia',
  'Angelologia',
  'Demonologia',
  'Bibliologia',
] as const;

export const TRADICOES_TEOLOGICAS = [
  'arminiana',
  'reformada',
  'batista',
  'pentecostal',
  'wesleyana',
] as const;

export const IDIOMAS_BIBLICOS = ['hebraico', 'grego', 'aramaico'] as const;

export const CONFIG_PT_BR = {
  locale: 'pt-BR',
  timezone: 'America/Sao_Paulo',
  dateFormat: 'DD/MM/AAAA',
  numberFormat: '1.000,00',
  currency: 'BRL',
} as const;
