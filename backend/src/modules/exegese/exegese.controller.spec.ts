import { Test, TestingModule } from '@nestjs/testing';
import { ExegeseController } from './presentation/exegese.controller';
import { ExegeseService } from './application/exegese.service';

describe('ExegeseController', () => {
  let controller: ExegeseController;
  let service: jest.Mocked<ExegeseService>;

  const mockService = {
    buscarPorVersiculo: jest.fn(),
    listarContextos: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExegeseController],
      providers: [
        { provide: ExegeseService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ExegeseController>(ExegeseController);
    service = module.get(ExegeseService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('analisar', () => {
    it('should return exegetical analysis', async () => {
      const mockAnalise = { id: '1', versiculoId: 'v-1', contextoImediato: 'Teste' };
      mockService.buscarPorVersiculo.mockResolvedValue(mockAnalise as any);

      const result = await controller.analisar('v-1');

      expect(result).toEqual(mockAnalise);
      expect(mockService.buscarPorVersiculo).toHaveBeenCalledWith('v-1');
    });
  });

  describe('contextos', () => {
    it('should return contexts for verse', async () => {
      const mockContextos = {
        contextoImediato: 'Contexto imediato',
        contextoCapitulo: 'Contexto capítulo',
        contextoLivro: 'Contexto livro',
        contextoTestamento: 'Contexto testamento',
        contextoCanonico: 'Contexto cânonico',
      };
      mockService.listarContextos.mockResolvedValue(mockContextos);

      const result = await controller.contextos('v-1');

      expect(result).toEqual(mockContextos);
      expect(mockService.listarContextos).toHaveBeenCalledWith('v-1');
    });
  });
});
