import { Test, TestingModule } from '@nestjs/testing';
import { BibleService } from './bible.service';
import { BibleRepository } from '../infrastructure/bible.repository';

describe('BibleService', () => {
  let service: BibleService;

  const mockRepo = {
    encontrarVersiculo: jest.fn(),
    buscarVersiculosAntes: jest.fn(),
    buscarVersiculosDepois: jest.fn(),
    encontrarCapitulo: jest.fn(),
    encontrarLivro: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BibleService,
        { provide: BibleRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<BibleService>(BibleService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('buscarVersiculo', () => {
    it('deve retornar um versículo quando encontrado', async () => {
      const versiculoMock = {
        id: '1',
        livro: 'João',
        capitulo: 3,
        numero: 16,
        texto: 'Porque Deus amou o mundo...',
      };

      mockRepo.encontrarVersiculo.mockResolvedValue(versiculoMock);

      const resultado = await service.buscarVersiculo(
        { livro: 'João', capitulo: 3, versiculo: 16 },
        'ARA',
      );

      expect(resultado).toEqual(versiculoMock);
      expect(mockRepo.encontrarVersiculo).toHaveBeenCalledWith(
        { livro: 'João', capitulo: 3, versiculo: 16 },
        'ARA',
      );
    });

    it('deve lançar NotFoundException quando versículo não encontrado', async () => {
      mockRepo.encontrarVersiculo.mockResolvedValue(null);

      await expect(
        service.buscarVersiculo({ livro: 'X', capitulo: 1, versiculo: 1 }),
      ).rejects.toThrow();
    });
  });

  describe('buscarContexto', () => {
    it('deve retornar contexto completo do versículo', async () => {
      const versiculoMock = {
        id: '1',
        livro: 'João',
        capitulo: 3,
        numero: 16,
        texto: 'Porque Deus amou o mundo...',
      };

      mockRepo.encontrarVersiculo.mockResolvedValue(versiculoMock);
      mockRepo.buscarVersiculosAntes.mockResolvedValue([]);
      mockRepo.buscarVersiculosDepois.mockResolvedValue([]);
      mockRepo.encontrarCapitulo.mockResolvedValue({ numero: 3, totalVersiculos: 36 });
      mockRepo.encontrarLivro.mockResolvedValue({
        nome: 'João',
        testamento: 'NT',
        genero: 'Evangelho',
        autor: 'João',
      });

      const resultado = await service.buscarContexto(
        { livro: 'João', capitulo: 3, versiculo: 16 },
        'ARA',
      );

      expect(resultado.versiculo).toEqual(versiculoMock);
      expect(resultado.livro.nome).toBe('João');
      expect(resultado.capitulo.numero).toBe(3);
    });
  });
});
