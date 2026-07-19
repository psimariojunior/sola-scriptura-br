import { Test, TestingModule } from '@nestjs/testing';
import { GeografiaController } from './presentation/geografia.controller';
import { GeografiaService } from './application/geografia.service';

describe('GeografiaController', () => {
  let controller: GeografiaController;
  let service: jest.Mocked<GeografiaService>;

  const mockService = {
    listarLocalizacoes: jest.fn(),
    buscarLocalizacao: jest.fn(),
    listarRotas: jest.fn(),
    buscarProximos: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeografiaController],
      providers: [
        { provide: GeografiaService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<GeografiaController>(GeografiaController);
    service = module.get(GeografiaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listarLocalizacoes', () => {
    it('should return all locations', async () => {
      const mockLocs = [{ id: '1', nome: 'Jerusalém' }];
      mockService.listarLocalizacoes.mockResolvedValue(mockLocs as any);

      const result = await controller.listarLocalizacoes();

      expect(result).toEqual(mockLocs);
      expect(mockService.listarLocalizacoes).toHaveBeenCalledWith(undefined);
    });

    it('should filter by tipo', async () => {
      const mockLocs = [{ id: '1', nome: 'Jerusalém', tipo: 'cidade' }];
      mockService.listarLocalizacoes.mockResolvedValue(mockLocs as any);

      await controller.listarLocalizacoes('cidade');

      expect(mockService.listarLocalizacoes).toHaveBeenCalledWith('cidade');
    });
  });

  describe('buscarLocalizacao', () => {
    it('should return location by slug', async () => {
      const mockLoc = { id: '1', slug: 'jerusalem', nome: 'Jerusalém' };
      mockService.buscarLocalizacao.mockResolvedValue(mockLoc as any);

      const result = await controller.buscarLocalizacao('jerusalem');

      expect(result).toEqual(mockLoc);
    });
  });

  describe('listarRotas', () => {
    it('should return all routes', async () => {
      const mockRotas = [{ id: '1', nome: 'Rota do Êxodo' }];
      mockService.listarRotas.mockResolvedValue(mockRotas as any);

      const result = await controller.listarRotas();

      expect(result).toEqual(mockRotas);
    });
  });

  describe('proximos', () => {
    it('should return nearby locations', async () => {
      const mockLocs = [{ id: '1', nome: 'Betel' }];
      mockService.buscarProximos.mockResolvedValue(mockLocs as any);

      const result = await controller.proximos(31.7, 35.2, 50);

      expect(result).toEqual(mockLocs);
      expect(mockService.buscarProximos).toHaveBeenCalledWith(31.7, 35.2, 50);
    });
  });
});
