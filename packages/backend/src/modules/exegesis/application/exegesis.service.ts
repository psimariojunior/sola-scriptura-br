import { Injectable, Logger } from '@nestjs/common';
import { BibleService } from '../../bible/application/bible.service';

@Injectable()
export class ExegesisService {
  private readonly logger = new Logger(ExegesisService.name);

  constructor(private readonly bibleService: BibleService) {}

  async analisarContexto(livro: string, capitulo: number, versiculo: number, versao = 'ARA') {
    const contexto = await this.bibleService.buscarContexto(
      { livro, capitulo, versiculo },
      versao,
      5,
    );

    return {
      contextoImediato: {
        antes: contexto.antes,
        depois: contexto.depois,
      },
      contextoLiterario: {
        livro: contexto.livro,
        capitulo: contexto.capitulo,
      },
    };
  }

  async analiseExegeticaCompleta(livro: string, capitulo: number, versiculo: number, versao = 'ARA') {
    const contexto = await this.bibleService.buscarContexto(
      { livro, capitulo, versiculo },
      versao,
      5,
    );

    const analise = {
      dadosGerais: {
        referencia: `${livro} ${capitulo}:${versiculo}`,
        versao,
        texto: contexto.versiculo.texto,
        textoOriginal: contexto.versiculo.textoOriginal,
      },
      contextoLiterario: {
        livro: contexto.livro.nome,
        testamento: contexto.livro.testamento,
        generoLiterario: this.identificarGenero(contexto.livro.genero),
        autor: contexto.livro.autor,
      },
      estruturaSintatica: {
        tipoOracao: this.analisarTipoOracao(contexto.versiculo.texto),
        conectivosChave: this.extrairConectivos(contexto.versiculo.texto),
      },
      contextoImediato: {
        versiculosAntes: contexto.antes.map((v) => `${v.livro} ${v.capitulo}:${v.numero} - ${v.texto}`),
        versiculoAtual: contexto.versiculo.texto,
        versiculosDepois: contexto.depois.map((v) => `${v.livro} ${v.capitulo}:${v.numero} - ${v.texto}`),
      },
      analiseTeologica: {
        doutrinasRelacionadas: this.identificarDoutrinas(contexto.versiculo.texto),
        temasPrincipais: this.extrairTemas(contexto.versiculo.texto),
      },
    };

    return analise;
  }

  private identificarGenero(genero: string): string {
    const mapa: Record<string, string> = {
      narrative: 'Narrativa Histórica',
      poetry: 'Poesia',
      prophecy: 'Profecia',
      law: 'Lei',
      wisdom: 'Sabedoria',
      gospel: 'Evangelho',
      epistle: 'Epístola',
      apocalyptic: 'Apocalíptico',
    };
    return mapa[genero] || genero;
  }

  private analisarTipoOracao(texto: string): string {
    if (texto.endsWith('?')) return 'Interrogativa';
    if (texto.endsWith('!')) return 'Exclamativa';
    if (texto.includes(':')) return 'Declarativa';
    return 'Declarativa';
  }

  private extrairConectivos(texto: string): string[] {
    const conectivos = ['portanto', 'porque', 'mas', 'e', 'ou', 'contudo', 'todavia', 'assim'];
    return conectivos.filter((c) => texto.toLowerCase().includes(c));
  }

  private identificarDoutrinas(texto: string): string[] {
    const palavrasChave: Record<string, string[]> = {
      Soteriologia: ['salvação', 'redenção', 'justificação', 'graça', 'fé'],
      Cristologia: ['Cristo', 'Jesus', 'Filho', 'Messias', 'Senhor'],
      Pneumatologia: ['Espírito', 'Espírito Santo'],
      Hamartiologia: ['pecado', 'pecados', 'transgressão'],
      Escatologia: ['juízo', 'fim', 'ressureição', 'eterno'],
      Teontologia: ['Deus', 'Senhor', 'Todo-Poderoso', 'Yahweh'],
      Antropologia: ['homem', 'criatura', 'humano', 'alma'],
    };

    const doutrinas: string[] = [];
    for (const [doutrina, palavras] of Object.entries(palavrasChave)) {
      if (palavras.some((p) => texto.toLowerCase().includes(p.toLowerCase()))) {
        doutrinas.push(doutrina);
      }
    }
    return doutrinas;
  }

  private extrairTemas(texto: string): string[] {
    return [];
  }
}
