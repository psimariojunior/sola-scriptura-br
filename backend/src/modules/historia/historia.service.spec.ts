import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HistoriaService } from './application/historia.service';
import { ContextoHistorico } from './domain/contexto-historico.entity';
import { NotFoundException } from '@nestjs/common';

describe('HistoriaService', () => {
  let service: HistoriaService;

  const mockContextoRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoriaService,
        { provide: getRepositoryToken(ContextoHistorico), useValue: mockContextoRepo },
      ],
    }).compile();

    service = module.get<HistoriaService>(HistoriaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buscarPorEntidade', () => {
    it('should return context by entity type and id', async () => {
      const mockCtx = { id: '1', entidadeTipo: 'livro', entidadeId: 'genesis' };
      mockContextoRepo.findOne.mockResolvedValue(mockCtx);

      const result = await service.buscarPorEntidade('livro', 'genesis');

      expect(result).toEqual(mockCtx);
    });

    it('should throw NotFoundException for non-existent context', async () => {
      mockContextoRepo.findOne.mockResolvedValue(null);

      await expect(service.buscarPorEntidade('livro', 'inexistente'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('buscarPorLivro', () => {
    it('should delegate to buscarPorEntidade with tipo=livro', async () => {
      const mockCtx = { id: '1', entidadeTipo: 'livro', entidadeId: 'genesis' };
      mockContextoRepo.findOne.mockResolvedValue(mockCtx);

      const result = await service.buscarPorLivro('genesis');

      expect(result).toEqual(mockCtx);
      expect(mockContextoRepo.findOne).toHaveBeenCalledWith({
        where: { entidadeTipo: 'livro', entidadeId: 'genesis' },
      });
    });
  });
});
