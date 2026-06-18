import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';

async function seed() {
  const logger = new Logger('Seed');
  logger.log('Iniciando seed do banco de dados...');

  const app = await NestFactory.createApplicationContext(AppModule);

  const testamentoRepo = app.get(getRepositoryToken('Testamento'));
  const livroRepo = app.get(getRepositoryToken('Livro'));
  const traducaoRepo = app.get(getRepositoryToken('Traducao'));

  logger.log('Criando testamentos...');
  const testamentos = [
    { nome: 'Antigo Testamento', slug: 'antigo-testamento', ordem: 1, totalLivros: 39 },
    { nome: 'Novo Testamento', slug: 'novo-testamento', ordem: 2, totalLivros: 27 },
  ];
  for (const t of testamentos) {
    const existe = await testamentoRepo.findOne({ where: { slug: t.slug } });
    if (!existe) {
      await testamentoRepo.save(t);
    }
  }
  logger.log('Testamentos criados');

  logger.log('Criando traduções...');
  const traducoes = [
    { nome: 'Nova Versão Internacional', sigla: 'NVI', idioma: 'pt-BR', anoPublicacao: 2001, licencaPublica: false, gratuita: true },
    { nome: 'Almeida Revista e Atualizada', sigla: 'ARA', idioma: 'pt-BR', anoPublicacao: 1993, licencaPublica: true, gratuita: true },
    { nome: 'Almeida Corrigida Fiel', sigla: 'ACF', idioma: 'pt-BR', anoPublicacao: 1994, licencaPublica: true, gratuita: true },
    { nome: 'Nova Tradução na Linguagem de Hoje', sigla: 'NTLH', idioma: 'pt-BR', anoPublicacao: 2000, licencaPublica: false, gratuita: true },
    { nome: 'King James Version', sigla: 'KJV', idioma: 'en', anoPublicacao: 1611, licencaPublica: true, gratuita: true },
    { nome: 'Reina-Valera', sigla: 'RV', idioma: 'es', anoPublicacao: 1960, licencaPublica: true, gratuita: true },
  ];
  for (const t of traducoes) {
    const existe = await traducaoRepo.findOne({ where: { sigla: t.sigla } });
    if (!existe) {
      await traducaoRepo.save(t);
    }
  }
  logger.log('Traduções criadas');

  logger.log('Criando planos de leitura...');
  const planoSchema = app.get(getRepositoryToken('PlanoLeitura'));
  const planos = [
    {
      nome: 'Bíblia em 1 Ano',
      descricao: 'Leia a Bíblia completa em 365 dias',
      totalDias: 365, capitulosPorDia: 3, categoria: 'completo', publico: true,
      programacao: { tipo: 'cronologica' },
    },
    {
      nome: 'Novo Testamento em 3 Meses',
      descricao: 'Leia o Novo Testamento em 90 dias',
      totalDias: 90, capitulosPorDia: 1, categoria: 'novo-testamento', publico: true,
      programacao: { tipo: 'canonica' },
    },
    {
      nome: 'Pentateuco em 30 Dias',
      descricao: 'Estudo dos 5 livros de Moisés em 30 dias',
      totalDias: 30, capitulosPorDia: 2, categoria: 'pentateuco', publico: true,
      programacao: { tipo: 'livro', livros: ['genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio'] },
    },
  ];
  for (const p of planos) {
    const existe = await planoSchema.findOne({ where: { nome: p.nome } });
    if (!existe) {
      await planoSchema.save(p);
    }
  }
  logger.log('Planos de leitura criados');

  await app.close();
  logger.log('Seed concluído com sucesso!');
}

seed().catch((erro) => {
  console.error('Erro no seed:', erro);
  process.exit(1);
});
