import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeologiaService } from './application/teologia.service';
import { Doutrina } from './domain/doutrina.entity';
import { CategoriaDoutrina } from './domain/categoria-doutrina.entity';
import { NotFoundException } from '@nestjs/common';

describe('TeologiaService', () => {
  let service: TeologiaService;

  const mockDoutrinaRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockCategoriaRepo = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeologiaService,
        { provide: getRepositoryToken(Doutrina), useValue: mockDoutrinaRepo },
        { provide: getRepositoryToken(CategoriaDoutrina), useValue: mockCategoriaRepo },
      ],
    }).compile();

    service = module.get<TeologiaService>(TeologiaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listarCategorias', () => {
    it('should return categories ordered by ordem', async () => {
      const mockCategorias = [
        { id: '1', nome: 'Teologia Própria', slug: 'teologia-propria', ordem: 1 },
      ];
      mockCategoriaRepo.find.mockResolvedValue(mockCategorias);

      const result = await service.listarCategorias();

      expect(result).toEqual(mockCategorias);
      expect(mockCategoriaRepo.find).toHaveBeenCalledWith({
        order: { ordem: 'ASC' },
        relations: ['doutrinas'],
      });
    });
  });

  describe('buscarDoutrina', () => {
    it('should return doctrine by slug', async () => {
      const mockDoutrina = { id: '1', slug: 'trindade', nome: 'Trindade' };
      mockDoutrinaRepo.findOne.mockResolvedValue(mockDoutrina);

      const result = await service.buscarDoutrina('trindade');

      expect(result).toEqual(mockDoutrina);
    });

    it('should throw NotFoundException for non-existent doctrine', async () => {
      mockDoutrinaRepo.findOne.mockResolvedValue(null);

      await expect(service.buscarDoutrina('inexistente'))
        .rejects.toThrow(NotFoundException);
    });
  });
});
