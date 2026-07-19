export interface Versao {
  id: string;
  nome: string;
  sigla: string;
  descricao: string;
  idioma: string;
  ano: number;
}

export const traducoes: Versao[] = [
  { id: 'arc', nome: 'Almeida Revista e Corrigida', sigla: 'ARC', descricao: 'Tradução clássica de João Ferreira de Almeida', idioma: 'pt-BR', ano: 1898 },
  { id: 'nvi', nome: 'Nova Versão Internacional', sigla: 'NVI', descricao: 'Tradução contemporânea e precisa', idioma: 'pt-BR', ano: 2000 },
  { id: 'naa', nome: 'Nova Almeida Atualizada', sigla: 'NAA', descricao: 'Revisão da Almeida pela SBB em linguagem contemporânea', idioma: 'pt-BR', ano: 2017 },
  { id: 'ara', nome: 'Almeida Revista e Atualizada', sigla: 'ARA', descricao: 'Revisão da ARC pela SBB', idioma: 'pt-BR', ano: 1993 },
  { id: 'acf', nome: 'Almeida Corrigida Fiel', sigla: 'ACF', descricao: 'Revisão fiel da ARC por Stuart', idioma: 'pt-BR', ano: 2015 },
  { id: 'ntlh', nome: 'Nova Tradução na Linguagem de Hoje', sigla: 'NTLH', descricao: 'Tradução em linguagem simples e acessível', idioma: 'pt-BR', ano: 2000 },
  { id: 'kjv', nome: 'King James Version', sigla: 'KJV', descricao: 'Authorized Version em inglês', idioma: 'en', ano: 1611 },
  { id: 'web', nome: 'World English Bible', sigla: 'WEB', descricao: 'Domínio público em inglês moderno', idioma: 'en', ano: 2000 },
  { id: 'nvt', nome: 'Nova Versão Transformadora', sigla: 'NVT', descricao: 'Tradução que enfatiza a transformação do leitor', idioma: 'pt-BR', ano: 2020 },
  { id: 'kja', nome: 'King James Atualizada', sigla: 'KJA', descricao: 'Atualização da KJV em português moderno', idioma: 'pt-BR', ano: 2015 },
  { id: 'aa', nome: 'Almeida e Atualizada', sigla: 'AA', descricao: 'Versão atualizada da Almeida', idioma: 'pt-BR', ano: 2009 },
  { id: 'nbv', nome: 'Nova Bíblia Viva', sigla: 'NBV', descricao: 'Tradução em linguagem contemporânea e acessível', idioma: 'pt-BR', ano: 2008 },
];

export const traducaoPadrao = 'arc';
