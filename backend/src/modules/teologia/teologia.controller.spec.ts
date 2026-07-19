import { Test, TestingModule } from '@nestjs/testing';
import { TeologiaController } from './presentation/teologia.controller';
import { TeologiaService } from './application/teologia.service';

describe('TeologiaController', () => {
  let controller: TeologiaController;
  let service: jest.Mocked<TeologiaService>;

  const mockService = {
    listarCategorias: jest.fn(),
    buscarDoutrina: jest.fn(),
    relacionarTexto: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeologiaController],
      providers: [
        { provide: TeologiaService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<TeologiaController>(TeologiaController);
    service = module.get(TeologiaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listarCategorias', () => {
    it('should return categories', async () => {
      const mockCategorias = [
        { id: '1', nome: 'Teologia Própria', slug: 'teologia-propria' },
      ];
      mockService.listarCategorias.mockResolvedValue(mockCategorias as any);

      const result = await controller.listarCategorias();

      expect(result).toEqual(mockCategorias);
      expect(mockService.listarCategorias).toHaveBeenCalled();
    });
  });

  describe('buscarDoutrina', () => {
    it('should return doctrine by slug', async () => {
      const mockDoutrina = { id: '1', slug: 'trindade', nome: 'Trindade' };
      mockService.buscarDoutrina.mockResolvedValue(mockDoutrina as any);

      const result = await controller.buscarDoutrina('trindade');

      expect(result).toEqual(mockDoutrina);
      expect(mockService.buscarDoutrina).toHaveBeenCalledWith('trindade');
    });
  });

  describe('relacionarTexto', () => {
    it('should relate theology to verse', async () => {
      const mockRelacao = { 'teologia-propria': { doutrinas: [] } };
      mockService.relacionarTexto.mockResolvedValue(mockRelacao);

      const result = await controller.relacionarTexto('versiculo-1');

      expect(result).toEqual(mockRelacao);
      expect(mockService.relacionarTexto).toHaveBeenCalledWith('versiculo-1');
    });
  });
});
