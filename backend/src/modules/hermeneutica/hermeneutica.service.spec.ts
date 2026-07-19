import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HermeneuticaService } from './application/hermeneutica.service';
import { AnaliseHermeneutica } from './domain/analise-hermeneutica.entity';
import { NotFoundException } from '@nestjs/common';

describe('HermeneuticaService', () => {
  let service: HermeneuticaService;

  const mockAnaliseRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HermeneuticaService,
        { provide: getRepositoryToken(AnaliseHermeneutica), useValue: mockAnaliseRepo },
      ],
    }).compile();

    service = module.get<HermeneuticaService>(HermeneuticaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buscarPorVersiculo', () => {
    it('should return analysis by verse id', async () => {
      const mockAnalise = { id: '1', versiculoId: 'v-1', generoLiterario: 'Narrativa' };
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

  describe('identificarGenero', () => {
    it('should return literary genre', async () => {
      const mockAnalise = { id: '1', versiculoId: 'v-1', generoLiterario: 'Narrativa' };
      mockAnaliseRepo.findOne.mockResolvedValue(mockAnalise);

      const result = await service.identificarGenero('v-1');

      expect(result).toBe('Narrativa');
    });

    it('should throw NotFoundException for non-existent analysis', async () => {
      mockAnaliseRepo.findOne.mockResolvedValue(null);

      await expect(service.identificarGenero('inexistente'))
        .rejects.toThrow(NotFoundException);
    });
  });
});
