import { Test, TestingModule } from '@nestjs/testing';
import { HistoriaController } from './presentation/historia.controller';
import { HistoriaService } from './application/historia.service';

describe('HistoriaController', () => {
  let controller: HistoriaController;
  let service: jest.Mocked<HistoriaService>;

  const mockService = {
    buscarPorLivro: jest.fn(),
    buscarPorEntidade: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriaController],
      providers: [
        { provide: HistoriaService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<HistoriaController>(HistoriaController);
    service = module.get(HistoriaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('contextoHistorico', () => {
    it('should return historical context for a book', async () => {
      const mockCtx = { id: '1', entidadeTipo: 'livro', entidadeId: 'genesis', titulo: 'Contexto de Gênesis' };
      mockService.buscarPorLivro.mockResolvedValue(mockCtx as any);

      const result = await controller.contextoHistorico('genesis');

      expect(result).toEqual(mockCtx);
      expect(mockService.buscarPorLivro).toHaveBeenCalledWith('genesis');
    });
  });

  describe('contextoPorEntidade', () => {
    it('should return context by entity type', async () => {
      const mockCtx = { id: '1', entidadeTipo: 'personagem', entidadeId: 'moises' };
      mockService.buscarPorEntidade.mockResolvedValue(mockCtx as any);

      const result = await controller.contextoPorEntidade('personagem', 'moises');

      expect(result).toEqual(mockCtx);
      expect(mockService.buscarPorEntidade).toHaveBeenCalledWith('personagem', 'moises');
    });
  });
});
