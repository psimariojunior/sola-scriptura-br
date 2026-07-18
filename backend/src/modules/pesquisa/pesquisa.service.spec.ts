import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PesquisaService } from './application/pesquisa.service';
import { PesquisaHistorico } from './domain/pesquisa-historico.entity';
import { PesquisaSugestao } from './domain/pesquisa-sugestao.entity';
import { Livro } from '../biblia/domain/livro.entity';
import { Versiculo } from '../biblia/domain/versiculo.entity';
import { Personagem } from '../personagens/domain/personagem.entity';
import { Doutrina } from '../teologia/domain/doutrina.entity';
import { ContextoHistorico } from '../historia/domain/contexto-historico.entity';
import { Localizacao } from '../geografia/domain/localizacao.entity';
import { PalavraGrega } from '../grego/domain/palavra-grega.entity';
import { PalavraHebraica } from '../hebraico/domain/palavra-hebraica.entity';
import { Verbete } from '../dicionario/domain/verbete.entity';
import { ElasticsearchService } from '../../infra/busca/elasticsearch.service';
import { TipoPesquisa } from './application/dto/pesquisa.dto';

function createMockRepo() {
  const qb = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]),
  };

  return {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(() => qb),
  };
}

describe('PesquisaService', () => {
  let service: PesquisaService;
  let historicoRepo: ReturnType<typeof createMockRepo>;
  let sugestaoRepo: ReturnType<typeof createMockRepo>;
  let livroRepo: ReturnType<typeof createMockRepo>;

  const mockElasticsearch = {
    buscarTextoCompleto: jest.fn(),
    buscarSemantica: jest.fn(),
  };

  beforeEach(async () => {
    historicoRepo = createMockRepo();
    sugestaoRepo = createMockRepo();
    livroRepo = createMockRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PesquisaService,
        { provide: ElasticsearchService, useValue: mockElasticsearch },
        { provide: getRepositoryToken(PesquisaHistorico), useValue: historicoRepo },
        { provide: getRepositoryToken(PesquisaSugestao), useValue: sugestaoRepo },
        { provide: getRepositoryToken(Livro), useValue: livroRepo },
        { provide: getRepositoryToken(Versiculo), useValue: createMockRepo() },
        { provide: getRepositoryToken(Personagem), useValue: createMockRepo() },
        { provide: getRepositoryToken(Doutrina), useValue: createMockRepo() },
        { provide: getRepositoryToken(ContextoHistorico), useValue: createMockRepo() },
        { provide: getRepositoryToken(Localizacao), useValue: createMockRepo() },
        { provide: getRepositoryToken(PalavraGrega), useValue: createMockRepo() },
        { provide: getRepositoryToken(PalavraHebraica), useValue: createMockRepo() },
        { provide: getRepositoryToken(Verbete), useValue: createMockRepo() },
      ],
    }).compile();

    service = module.get<PesquisaService>(PesquisaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('pesquisar', () => {
    it('should return results from Elasticsearch', async () => {
      const dto = { q: 'graça', page: 1, limit: 20, tipo: TipoPesquisa.ALL };
      mockElasticsearch.buscarTextoCompleto.mockResolvedValue([
        { id: '1', score: 1.0, fonte: { texto: 'Teste', livro_nome: 'Romanos', capitulo_numero: 8, numero: 28, livro_nome_abreviado: 'Rm' } },
      ]);

      const resultado = await service.pesquisar(dto);

      expect(resultado).toHaveProperty('resultados');
      expect(resultado).toHaveProperty('total');
      expect(mockElasticsearch.buscarTextoCompleto).toHaveBeenCalled();
    });

    it('should filter results by tipo when specified', async () => {
      const dto = { q: 'graça', page: 1, limit: 20, tipo: TipoPesquisa.VERSICULOS };
      mockElasticsearch.buscarTextoCompleto.mockResolvedValue([
        { id: '1', score: 1.0, fonte: { texto: 'Teste', livro_nome: 'Romanos', capitulo_numero: 8, numero: 28, livro_nome_abreviado: 'Rm' } },
      ]);

      const resultado = await service.pesquisar(dto);

      expect(resultado).toHaveProperty('resultados');
    });
  });

  describe('buscarLivros', () => {
    it('should query livros and return mapped results', async () => {
      const livro = {
        id: 1,
        nome: 'Genesis',
        slug: 'genesis',
        nomeAbreviado: 'Gen',
        totalCapitulos: 50,
        temasPrincipais: '',
        contextoHistorico: '',
        autor: 'Moises',
        testamentoId: 'at',
      };
      const qb = livroRepo.createQueryBuilder();
      qb.getMany.mockResolvedValue([livro]);

      const resultado = await service.buscarLivros('genesis');

      expect(livroRepo.createQueryBuilder).toHaveBeenCalled();
      expect(resultado).toHaveLength(1);
      expect(resultado[0].titulo).toBe('Genesis');
      expect(resultado[0].tipo).toBe('livro');
    });
  });

  describe('registrarBusca', () => {
    it('should create and save a historico record', async () => {
      historicoRepo.create.mockReturnValue({});
      historicoRepo.save.mockResolvedValue({});

      await service.registrarBusca('user-1', 'graça', { tipo: 'all' }, 5);

      expect(historicoRepo.create).toHaveBeenCalled();
      expect(historicoRepo.save).toHaveBeenCalled();
    });
  });
});
