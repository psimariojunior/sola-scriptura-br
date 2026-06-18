import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowledgeGraphService } from './knowledge-graph.service';
import { KnowledgeGraphEntity, KnowledgeGraphRelationship } from '../../../infrastructure/database/entities/knowledge-graph.entity';

describe('KnowledgeGraphService', () => {
  let service: KnowledgeGraphService;
  let entityRepo: Repository<KnowledgeGraphEntity>;

  const mockEntityRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([]),
    })),
  };

  const mockRelRepo = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnowledgeGraphService,
        { provide: getRepositoryToken(KnowledgeGraphEntity), useValue: mockEntityRepo },
        { provide: getRepositoryToken(KnowledgeGraphRelationship), useValue: mockRelRepo },
      ],
    }).compile();

    service = module.get<KnowledgeGraphService>(KnowledgeGraphService);
    entityRepo = module.get(getRepositoryToken(KnowledgeGraphEntity));
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('buscarEntidade', () => {
    it('deve retornar entidade quando encontrada', async () => {
      const mockEntity = {
        id: '1',
        nome: 'Abraão',
        tipo: 'pessoa',
        descricao: 'Pai da fé',
        propriedades: {},
      };

      mockEntityRepo.findOne.mockResolvedValue(mockEntity);

      const resultado = await service.buscarEntidade('Abraão');
      expect(resultado).toBeDefined();
      expect(resultado?.nome).toBe('Abraão');
      expect(resultado?.tipo).toBe('pessoa');
    });

    it('deve retornar null quando entidade não encontrada', async () => {
      mockEntityRepo.findOne.mockResolvedValue(null);
      const resultado = await service.buscarEntidade('Inexistente');
      expect(resultado).toBeNull();
    });
  });

  describe('listarEntidadesPorTipo', () => {
    it('deve listar entidades por tipo', async () => {
      const mockEntities = [
        { id: '1', nome: 'Abraão', tipo: 'pessoa', descricao: '', propriedades: {} },
        { id: '2', nome: 'Isaque', tipo: 'pessoa', descricao: '', propriedades: {} },
      ];

      mockEntityRepo.find.mockResolvedValue(mockEntities);

      const resultado = await service.listarEntidadesPorTipo('pessoa');
      expect(resultado).toHaveLength(2);
      expect(resultado[0].nome).toBe('Abraão');
    });
  });
});
