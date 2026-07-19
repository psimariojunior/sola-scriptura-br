import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExegeseService } from './application/exegese.service';
import { AnaliseExegetica } from './domain/analise-exegetica.entity';
import { NotFoundException } from '@nestjs/common';

describe('ExegeseService', () => {
  let service: ExegeseService;

  const mockAnaliseRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExegeseService,
        { provide: getRepositoryToken(AnaliseExegetica), useValue: mockAnaliseRepo },
      ],
    }).compile();

    service = module.get<ExegeseService>(ExegeseService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buscarPorVersiculo', () => {
    it('should return analysis by verse id', async () => {
      const mockAnalise = { id: '1', versiculoId: 'v-1', contextoImediato: 'Teste' };
      mockAnaliseRepo.findOne.mockResolvedValue(mockAnalise);

      const result = await service.buscarPorVersiculo('v-1');

      expect(result).toEqual(mockAnalise);
    });

    it('should throw NotFoundException for non-existent analysis', async () => {
      mockAnaliseRepo.findOne.mockResolvedValue(null);

      await expect(service.buscarPorVersiculo('inexistente'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('gerarAnalise', () => {
    it('should create and save analysis', async () => {
      const mockAnalise = { id: '1', versiculoId: 'v-1', contextoImediato: 'Novo' };
      mockAnaliseRepo.create.mockReturnValue(mockAnalise);
      mockAnaliseRepo.save.mockResolvedValue(mockAnalise);

      const result = await service.gerarAnalise('v-1', { contextoImediato: 'Novo' });

      expect(mockAnaliseRepo.create).toHaveBeenCalled();
      expect(mockAnaliseRepo.save).toHaveBeenCalled();
    });
  });

  describe('listarContextos', () => {
    it('should return contexts for verse', async () => {
      const mockAnalise = {
        id: '1',
        versiculoId: 'v-1',
        contextoImediato: 'Imediato',
        contextoCapitulo: 'Capítulo',
        contextoLivro: 'Livro',
        contextoTestamento: 'Testamento',
        contextoCanonico: 'Cânonico',
      };
      mockAnaliseRepo.findOne.mockResolvedValue(mockAnalise);

      const result = await service.listarContextos('v-1');

      expect(result).toEqual({
        contextoImediato: 'Imediato',
        contextoCapitulo: 'Capítulo',
        contextoLivro: 'Livro',
        contextoTestamento: 'Testamento',
        contextoCanonico: 'Cânonico',
      });
    });
  });
});
