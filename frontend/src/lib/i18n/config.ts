import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const recursos = {
  'pt-BR': {
    translation: {
      nav: {
        biblia: 'Bíblia',
        pesquisa: 'Pesquisar',
        estudos: 'Estudos',
        ia: 'IA',
        entrar: 'Entrar',
        cadastrar: 'Cadastrar',
      },
      biblia: {
        carregando: 'Carregando...',
        erro_carregar: 'Erro ao carregar',
        capitulo: 'Capítulo',
        versiculo: 'Versículo',
        livro: 'Livro',
        traducoes: 'Traduções',
        strong: 'Strong',
        exegese: 'Exegese',
        hermeneutica: 'Hermenêutica',
      },
      comum: {
        salvando: 'Salvando...',
        salvo: 'Salvo',
        erro: 'Erro',
        sucesso: 'Sucesso',
        carregando: 'Carregando...',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources: recursos,
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  interpolation: { escapeValue: false },
});

export default i18n;
