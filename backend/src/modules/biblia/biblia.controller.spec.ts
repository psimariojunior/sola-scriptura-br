import { Test, TestingModule } from '@nestjs/testing';
import { BibliaController } from './presentation/biblia.controller';
import { BibliaService } from './application/biblia.service';

describe('BibliaController', () => {
  let controller: BibliaController;
  let service: jest.Mocked<BibliaService>;

  const mockService = {
    listarTestamentos: jest.fn(),
    listarLivros: jest.fn(),
    buscarPorSlug: jest.fn(),
    buscarCapitulo: jest.fn(),
    buscarVersiculo: jest.fn(),
    buscarPassagem: jest.fn(),
    listarTraducoes: jest.fn(),
    pesquisar: jest.fn(),
    buscarPalavraCompleta: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BibliaController],
      providers: [
        { provide: BibliaService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<BibliaController>(BibliaController);
    service = module.get(BibliaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listarTestamentos', () => {
    it('should return testamentos', async () => {
      const mockTestamentos = [
        { id: '1', nome: 'Antigo Testamento' },
        { id: '2', nome: 'Novo Testamento' },
      ];
      mockService.listarTestamentos.mockResolvedValue(mockTestamentos as any);

      const result = await controller.listarTestamentos();

      expect(result).toEqual(mockTestamentos);
      expect(mockService.listarTestamentos).toHaveBeenCalled();
    });
  });

  describe('listarLivros', () => {
    it('should return all books when no testamentoId', async () => {
      const mockLivros = [{ id: '1', nome: 'Gênesis' }];
      mockService.listarLivros.mockResolvedValue(mockLivros as any);

      const result = await controller.listarLivros();

      expect(result).toEqual(mockLivros);
      expect(mockService.listarLivros).toHaveBeenCalledWith(undefined);
    });

    it('should filter books by testamentoId', async () => {
      const mockLivros = [{ id: '40', nome: 'Mateus' }];
      mockService.listarLivros.mockResolvedValue(mockLivros as any);

      const result = await controller.listarLivros('testamento-nt');

      expect(result).toEqual(mockLivros);
      expect(mockService.listarLivros).toHaveBeenCalledWith('testamento-nt');
    });
  });

  describe('buscarLivro', () => {
    it('should return book by slug', async () => {
      const mockLivro = { id: '1', slug: 'genesis', nome: 'Gênesis' };
      mockService.buscarPorSlug.mockResolvedValue(mockLivro as any);

      const result = await controller.buscarLivro('genesis');

      expect(result).toEqual(mockLivro);
      expect(mockService.buscarPorSlug).toHaveBeenCalledWith('genesis');
    });
  });
});
