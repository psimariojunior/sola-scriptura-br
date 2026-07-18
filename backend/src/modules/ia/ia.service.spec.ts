import { Test, TestingModule } from '@nestjs/testing';
import { IaService } from './application/ia.service';
import { RAGService } from '../../infra/ia/rag.service';
import { LLMService } from '../../infra/ia/llm.service';
import { KnowledgeGraphService } from '../../infra/ia/knowledge-graph.service';

describe('IaService', () => {
  let service: IaService;

  const mockRagService = {
    buscarContexto: jest.fn(),
    montarPrompt: jest.fn(),
    gerarEmbeddingsEntidade: jest.fn(),
    popularEmbeddings: jest.fn(),
    statusEmbeddings: jest.fn(),
  };

  const mockLlmService = {
    gerarResposta: jest.fn(),
    gerarRespostaStream: jest.fn(),
    gerarEmbedding: jest.fn(),
    obterEstatisticasCusto: jest.fn(),
  };

  const mockKnowledgeGraph = {
    popularGrafo: jest.fn(),
    buscarVizinhos: jest.fn(),
    estatisticas: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IaService,
        { provide: RAGService, useValue: mockRagService },
        { provide: LLMService, useValue: mockLlmService },
        { provide: KnowledgeGraphService, useValue: mockKnowledgeGraph },
      ],
    }).compile();

    service = module.get<IaService>(IaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('perguntar', () => {
    it('should call RAG to get context, then LLM for response', async () => {
      mockRagService.buscarContexto.mockResolvedValue({ fontes: [] });
      mockRagService.montarPrompt.mockResolvedValue('prompt montado');
      mockLlmService.gerarResposta.mockResolvedValue('Resposta da IA');

      const resultado = await service.perguntar('O que e graça?');

      expect(mockRagService.buscarContexto).toHaveBeenCalledWith('O que e graça?');
      expect(mockRagService.montarPrompt).toHaveBeenCalled();
      expect(mockLlmService.gerarResposta).toHaveBeenCalledWith('prompt montado');
      expect(resultado.resposta).toBe('Resposta da IA');
      expect(resultado.pergunta).toBe('O que e graça?');
    });

    it('should include metadata with modelo and tempoMs', async () => {
      mockRagService.buscarContexto.mockResolvedValue({ fontes: [] });
      mockRagService.montarPrompt.mockResolvedValue('prompt');
      mockLlmService.gerarResposta.mockResolvedValue('ok');

      const resultado = await service.perguntar('teste');

      expect(resultado.metadados).toBeDefined();
      expect(resultado.metadados?.modelo).toBe('gpt-4o');
      expect(resultado.metadados?.tempoMs).toBeGreaterThanOrEqual(0);
    });
  });

  describe('analisarExegese', () => {
    it('should delegate to perguntar with a formatted exegese prompt', async () => {
      mockRagService.buscarContexto.mockResolvedValue({ fontes: [] });
      mockRagService.montarPrompt.mockResolvedValue('prompt');
      mockLlmService.gerarResposta.mockResolvedValue('Analise exegética...');

      const resultado = await service.analisarExegese('versiculo-uuid', 'Texto grego');

      expect(mockRagService.buscarContexto).toHaveBeenCalled();
      expect(resultado.resposta).toBe('Analise exegética...');
    });
  });

  describe('compararPassagens', () => {
    it('should delegate to perguntar with a comparison prompt', async () => {
      mockRagService.buscarContexto.mockResolvedValue({ fontes: [] });
      mockRagService.montarPrompt.mockResolvedValue('prompt');
      mockLlmService.gerarResposta.mockResolvedValue('Comparacao...');

      const resultado = await service.compararPassagens(['Joao 3:16', 'Rom 5:8']);

      expect(mockRagService.buscarContexto).toHaveBeenCalled();
      expect(resultado.resposta).toBe('Comparacao...');
    });
  });
});
