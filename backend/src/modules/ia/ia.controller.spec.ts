import { Test, TestingModule } from '@nestjs/testing';
import { IaController } from './presentation/ia.controller';
import { IaService } from './application/ia.service';

describe('IaController', () => {
  let controller: IaController;
  let iaService: jest.Mocked<IaService>;

  const mockIaService = {
    perguntar: jest.fn(),
    perguntarStream: jest.fn(),
    analisarExegese: jest.fn(),
    analisarGrego: jest.fn(),
    compararPassagens: jest.fn(),
    gerarEmbeddingTexto: jest.fn(),
    gerarEmbeddings: jest.fn(),
    popularEmbeddings: jest.fn(),
    statusEmbeddings: jest.fn(),
    buscarNoGrafo: jest.fn(),
    estatisticasGrafo: jest.fn(),
    obterEstatisticasCusto: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IaController],
      providers: [
        { provide: IaService, useValue: mockIaService },
      ],
    }).compile();

    controller = module.get<IaController>(IaController);
    iaService = module.get(IaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('perguntar', () => {
    it('should call iaService.perguntar with consulta and tradicao', async () => {
      const dados = { consulta: 'O que e graça?', tradicao: 'reformada' };
      const respostaEsperada = {
        pergunta: 'O que e graça?',
        resposta: 'Graça e...',
        contexto: [],
        tradicaoTeologica: 'reformada',
        fontes: [],
      };
      mockIaService.perguntar.mockResolvedValue(respostaEsperada);

      const resultado = await controller.perguntar(dados, 'reformada');

      expect(iaService.perguntar).toHaveBeenCalledWith('O que e graça?', 'reformada');
      expect(resultado).toEqual(respostaEsperada);
    });
  });

  describe('analisarExegese', () => {
    it('should call iaService.analisarExegese with versiculoId and texto', async () => {
      const dados = { versiculoId: 'v-123', texto: 'αγαπη αιωνιος' };
      mockIaService.analisarExegese.mockResolvedValue({} as any);

      await controller.analisarExegese(dados);

      expect(iaService.analisarExegese).toHaveBeenCalledWith('v-123', 'αγαπη αιωνιος');
    });
  });

  describe('comparar', () => {
    it('should call iaService.compararPassagens with passagens list', async () => {
      const dados = { passagens: ['Joao 3:16', 'Romanos 5:8'] };
      mockIaService.compararPassagens.mockResolvedValue({} as any);

      await controller.comparar(dados);

      expect(iaService.compararPassagens).toHaveBeenCalledWith(['Joao 3:16', 'Romanos 5:8']);
    });
  });
});
