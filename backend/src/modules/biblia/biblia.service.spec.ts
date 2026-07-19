import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BibliaService } from './application/biblia.service';
import { Livro } from './domain/livro.entity';
import { Capitulo } from './domain/capitulo.entity';
import { Versiculo } from './domain/versiculo.entity';
import { Palavra } from './domain/palavra.entity';
import { Traducao } from './domain/traducao.entity';
import { Testamento } from './domain/testamento.entity';
import { NotFoundException } from '@nestjs/common';

describe('BibliaService', () => {
  let service: BibliaService;

  const mockLivroRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockCapituloRepo = {
    findOne: jest.fn(),
  };

  const mockVersiculoRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockPalavraRepo = {
    findOne: jest.fn(),
  };

  const mockTraducaoRepo = {
    find: jest.fn(),
  };

  const mockTestamentoRepo = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BibliaService,
        { provide: getRepositoryToken(Livro), useValue: mockLivroRepo },
        { provide: getRepositoryToken(Capitulo), useValue: mockCapituloRepo },
        { provide: getRepositoryToken(Versiculo), useValue: mockVersiculoRepo },
        { provide: getRepositoryToken(Palavra), useValue: mockPalavraRepo },
        { provide: getRepositoryToken(Traducao), useValue: mockTraducaoRepo },
        { provide: getRepositoryToken(Testamento), useValue: mockTestamentoRepo },
      ],
    }).compile();

    service = module.get<BibliaService>(BibliaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listarTestamentos', () => {
    it('should return testamentos ordered by ordem', async () => {
      const mockTestamentos = [
        { id: '1', nome: 'AT', ordem: 1 },
        { id: '2', nome: 'NT', ordem: 2 },
      ];
      mockTestamentoRepo.find.mockResolvedValue(mockTestamentos);

      const result = await service.listarTestamentos();

      expect(result).toEqual(mockTestamentos);
      expect(mockTestamentoRepo.find).toHaveBeenCalledWith({
        order: { ordem: 'ASC' },
        relations: ['livros'],
      });
    });
  });

  describe('listarLivros', () => {
    it('should return all books', async () => {
      const mockLivros = [{ id: '1', nome: 'Gênesis' }];
      mockLivroRepo.find.mockResolvedValue(mockLivros);

      const result = await service.listarLivros();

      expect(result).toEqual(mockLivros);
      expect(mockLivroRepo.find).toHaveBeenCalledWith({
        where: {},
        order: { ordemGeral: 'ASC' },
      });
    });

    it('should filter by testamentoId', async () => {
      const mockLivros = [{ id: '40', nome: 'Mateus' }];
      mockLivroRepo.find.mockResolvedValue(mockLivros);

      const result = await service.listarLivros('nt-id');

      expect(mockLivroRepo.find).toHaveBeenCalledWith({
        where: { testamentoId: 'nt-id' },
        order: { ordemGeral: 'ASC' },
      });
    });
  });

  describe('buscarPorSlug', () => {
    it('should return book by slug', async () => {
      const mockLivro = { id: '1', slug: 'genesis' };
      mockLivroRepo.findOne.mockResolvedValue(mockLivro);

      const result = await service.buscarPorSlug('genesis');

      expect(result).toEqual(mockLivro);
    });

    it('should throw NotFoundException for non-existent slug', async () => {
      mockLivroRepo.findOne.mockResolvedValue(null);

      await expect(service.buscarPorSlug('inexistente'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('buscarCapitulo', () => {
    it('should return chapter by livroId and numero', async () => {
      const mockCapitulo = { id: '1', numero: 1 };
      mockCapituloRepo.findOne.mockResolvedValue(mockCapitulo);

      const result = await service.buscarCapitulo('livro-1', 1);

      expect(result).toEqual(mockCapitulo);
    });

    it('should throw NotFoundException for non-existent chapter', async () => {
      mockCapituloRepo.findOne.mockResolvedValue(null);

      await expect(service.buscarCapitulo('livro-1', 999))
        .rejects.toThrow(NotFoundException);
    });
  });
});
