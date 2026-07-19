import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GeografiaService } from './application/geografia.service';
import { Localizacao } from './domain/localizacao.entity';
import { Rota } from './domain/rota.entity';
import { NotFoundException } from '@nestjs/common';

describe('GeografiaService', () => {
  let service: GeografiaService;

  const mockLocalizacaoRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockRotaRepo = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeografiaService,
        { provide: getRepositoryToken(Localizacao), useValue: mockLocalizacaoRepo },
        { provide: getRepositoryToken(Rota), useValue: mockRotaRepo },
      ],
    }).compile();

    service = module.get<GeografiaService>(GeografiaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listarLocalizacoes', () => {
    it('should return all locations', async () => {
      const mockLocs = [{ id: '1', nomePortugues: 'Jerusalém' }];
      mockLocalizacaoRepo.find.mockResolvedValue(mockLocs);

      const result = await service.listarLocalizacoes();

      expect(result).toEqual(mockLocs);
      expect(mockLocalizacaoRepo.find).toHaveBeenCalledWith({
        where: {},
        order: { nomePortugues: 'ASC' },
      });
    });

    it('should filter by tipo', async () => {
      mockLocalizacaoRepo.find.mockResolvedValue([]);

      await service.listarLocalizacoes('cidade');

      expect(mockLocalizacaoRepo.find).toHaveBeenCalledWith({
        where: { tipo: 'cidade' },
        order: { nomePortugues: 'ASC' },
      });
    });
  });

  describe('buscarLocalizacao', () => {
    it('should return location by slug', async () => {
      const mockLoc = { id: '1', slug: 'jerusalem' };
      mockLocalizacaoRepo.findOne.mockResolvedValue(mockLoc);

      const result = await service.buscarLocalizacao('jerusalem');

      expect(result).toEqual(mockLoc);
    });

    it('should throw NotFoundException for non-existent slug', async () => {
      mockLocalizacaoRepo.findOne.mockResolvedValue(null);

      await expect(service.buscarLocalizacao('inexistente'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('listarRotas', () => {
    it('should return all routes', async () => {
      const mockRotas = [{ id: '1', nome: 'Rota do Êxodo' }];
      mockRotaRepo.find.mockResolvedValue(mockRotas);

      const result = await service.listarRotas();

      expect(result).toEqual(mockRotas);
    });
  });
});
