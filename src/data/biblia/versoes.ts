export interface Versao {
  id: string;
  nome: string;
  sigla: string;
  descricao: string;
  idioma: string;
  ano: number;
}

export const traducoes: Versao[] = [
  // Traduções locais (completas)
  { id: 'arc', nome: 'Almeida Revista e Corrigida', sigla: 'ARC', descricao: 'Tradução clássica de João Ferreira de Almeida', idioma: 'pt-BR', ano: 1898 },
  { id: 'nvi', nome: 'Nova Versão Internacional', sigla: 'NVI', descricao: 'Tradução contemporânea e precisa', idioma: 'pt-BR', ano: 2000 },
  { id: 'ara', nome: 'Almeida Revista e Atualizada', sigla: 'ARA', descricao: 'Revisão da ARC pela SBB', idioma: 'pt-BR', ano: 1993 },
  { id: 'acf', nome: 'Almeida Corrigida Fiel', sigla: 'ACF', descricao: 'Revisão fiel da ARC por Stuart', idioma: 'pt-BR', ano: 2015 },
  { id: 'kjv', nome: 'King James Version', sigla: 'KJV', descricao: 'Authorized Version em inglês', idioma: 'en', ano: 1611 },
  { id: 'web', nome: 'World English Bible', sigla: 'WEB', descricao: 'Domínio público em inglês moderno', idioma: 'en', ano: 2000 },

  // Traduções via API Midvash
  { id: 'naa', nome: 'Nova Almeida Atualizada', sigla: 'NAA', descricao: 'Revisão da Almeida pela SBB em linguagem contemporânea', idioma: 'pt-BR', ano: 2017 },
  { id: 'ntlh', nome: 'Nova Tradução na Linguagem de Hoje', sigla: 'NTLH', descricao: 'Tradução em linguagem simples e acessível', idioma: 'pt-BR', ano: 2000 },
  { id: 'nvt', nome: 'Nova Versão Transformadora', sigla: 'NVT', descricao: 'Tradução que enfatiza a transformação do leitor', idioma: 'pt-BR', ano: 2020 },
  { id: 'kja', nome: 'King James Atualizada', sigla: 'KJA', descricao: 'Atualização da KJV em português moderno', idioma: 'pt-BR', ano: 2015 },
  { id: 'aa', nome: 'Almeida e Atualizada', sigla: 'AA', descricao: 'Versão atualizada da Almeida', idioma: 'pt-BR', ano: 2009 },
  { id: 'nbv', nome: 'Nova Bíblia Viva', sigla: 'NBV', descricao: 'Tradução em linguagem contemporânea e acessível', idioma: 'pt-BR', ano: 2008 },

  // Novas traduções via API Midvash
  { id: 'as21', nome: 'Almeida Século 21', sigla: 'AS21', descricao: 'Almeida atualizada em linguagem do século 21', idioma: 'pt-BR', ano: 2009 },
  { id: 'jfaa', nome: 'João Ferreira de Almeida Atualizada', sigla: 'JFAA', descricao: 'Revisão contemporânea da Almeida', idioma: 'pt-BR', ano: 2009 },
  { id: 'kjf', nome: 'King James Fiel', sigla: 'KJF', descricao: 'Tradução fiel da KJV em português', idioma: 'pt-BR', ano: 2015 },
  { id: 'msgpt', nome: 'A Mensagem', sigla: 'MSG', descricao: 'Paráfrase contemporânea de Eugene Peterson', idioma: 'pt-BR', ano: 2018 },
  { id: 'bpm', nome: 'Bíblia Portuguesa Mundial', sigla: 'BPM', descricao: 'Tradução em português acessível', idioma: 'pt-BR', ano: 2020 },
  { id: 'nva', nome: 'Nova Versão de Acesso Livre', sigla: 'NVA', descricao: 'Tradução de domínio público', idioma: 'pt-BR', ano: 2018 },

  // Traduções em outros idiomas
  { id: 'esv', nome: 'English Standard Version', sigla: 'ESV', descricao: 'Tradução em inglês contemporâneo', idioma: 'en', ano: 2001 },
  { id: 'niv', nome: 'New International Version', sigla: 'NIV', descricao: 'Tradução em inglês contemporâneo', idioma: 'en', ano: 2011 },
  { id: 'nkjv', nome: 'New King James Version', sigla: 'NKJV', descricao: 'Atualização da KJV em inglês moderno', idioma: 'en', ano: 1982 },
  { id: 'nlt', nome: 'New Living Translation', sigla: 'NLT', descricao: 'Tradução em linguagem acessível', idioma: 'en', ano: 2015 },
  { id: 'rvr1960', nome: 'Reina-Valera 1960', sigla: 'RVR60', descricao: 'Tradução clássica em espanhol', idioma: 'es', ano: 1960 },
  { id: 'lsg', nome: 'Louis Segond', sigla: 'LSG', descricao: 'Tradução clássica em francês', idioma: 'fr', ano: 1910 },
];

export const traducaoPadrao = 'arc';
