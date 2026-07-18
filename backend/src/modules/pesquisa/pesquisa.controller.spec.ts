import { Test, TestingModule } from '@nestjs/testing';
import { PesquisaController } from './presentation/pesquisa.controller';
import { PesquisaService } from './application/pesquisa.service';
import { PesquisaIndexService } from './application/pesquisa-index.service';

describe('PesquisaController', () => {
  let controller: PesquisaController;
  let pesquisaService: jest.Mocked<PesquisaService>;

  const mockPesquisaService = {
    pesquisar: jest.fn(),
    autocomplete: jest.fn(),
    sugestoesPopulares: jest.fn(),
    historicoBuscas: jest.fn(),
    registrarBusca: jest.fn(),
    buscarLivros: jest.fn(),
    buscarVersiculos: jest.fn(),
    buscarPersonagens: jest.fn(),
    buscarDoutrinas: jest.fn(),
    buscarHistoria: jest.fn(),
    buscarGeografia: jest.fn(),
    buscarGrego: jest.fn(),
    buscarHebraico: jest.fn(),
    buscarDicionario: jest.fn(),
    buscaCompleta: jest.fn(),
  };

  const mockIndexService = {
    indexarTudo: jest.fn(),
    recriarIndices: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PesquisaController],
      providers: [
        { provide: PesquisaService, useValue: mockPesquisaService },
        { provide: PesquisaIndexService, useValue: mockIndexService },
      ],
    }).compile();

    controller = module.get<PesquisaController>(PesquisaController);
    pesquisaService = module.get(PesquisaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('pesquisar (GET /pesquisa)', () => {
    it('should call pesquisaService.pesquisar with query params', async () => {
      const dto = { q: 'graca', page: 1, limit: 20 };
      const resultadoEsperado = {
        resultados: [],
        total: 0,
        page: 1,
        limit: 20,
        tempo_ms: 10,
        fontes: [],
      };
      mockPesquisaService.pesquisar.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.pesquisar(dto as any);

      expect(pesquisaService.pesquisar).toHaveBeenCalledWith(dto, undefined);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('buscarLivros', () => {
    it('should call pesquisaService.buscarLivros with query', async () => {
      mockPesquisaService.buscarLivros.mockResolvedValue([]);

      const resultado = await controller.buscarLivros('genesis');

      expect(pesquisaService.buscarLivros).toHaveBeenCalledWith('genesis');
      expect(resultado).toEqual([]);
    });
  });

  describe('autocomplete', () => {
    it('should call pesquisaService.autocomplete with q and limite', async () => {
      mockPesquisaService.autocomplete.mockResolvedValue({ sugestoes: [] });

      const resultado = await controller.autocomplete({ q: 'gra', limite: 5 } as any);

      expect(pesquisaService.autocomplete).toHaveBeenCalledWith('gra', 5);
      expect(resultado).toEqual({ sugestoes: [] });
    });
  });
});
