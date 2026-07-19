import { Test, TestingModule } from '@nestjs/testing';
import { HermeneuticaController } from './presentation/hermeneutica.controller';
import { HermeneuticaService } from './application/hermeneutica.service';

describe('HermeneuticaController', () => {
  let controller: HermeneuticaController;
  let service: jest.Mocked<HermeneuticaService>;

  const mockService = {
    buscarPorVersiculo: jest.fn(),
    identificarGenero: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HermeneuticaController],
      providers: [
        { provide: HermeneuticaService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<HermeneuticaController>(HermeneuticaController);
    service = module.get(HermeneuticaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('analisar', () => {
    it('should return hermeneutical analysis', async () => {
      const mockAnalise = { id: '1', versiculoId: 'v-1', generoLiterario: 'Narrativa' };
      mockService.buscarPorVersiculo.mockResolvedValue(mockAnalise as any);

      const result = await controller.analisar('v-1');

      expect(result).toEqual(mockAnalise);
      expect(mockService.buscarPorVersiculo).toHaveBeenCalledWith('v-1');
    });
  });

  describe('genero', () => {
    it('should return literary genre', async () => {
      mockService.identificarGenero.mockResolvedValue('Narrativa');

      const result = await controller.genero('v-1');

      expect(result).toBe('Narrativa');
      expect(mockService.identificarGenero).toHaveBeenCalledWith('v-1');
    });
  });
});
