import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AutenticacaoService } from './application/autenticacao.service';
import { Usuario } from '../usuario/domain/usuario.entity';
import { RefreshToken } from './domain/refresh-token.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('$2a$12$hashed'),
}));

describe('AutenticacaoService', () => {
  let service: AutenticacaoService;

  const mockUsuarioRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockRefreshRepo = {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('jwt-token-teste'),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutenticacaoService,
        { provide: getRepositoryToken(Usuario), useValue: mockUsuarioRepo },
        { provide: getRepositoryToken(RefreshToken), useValue: mockRefreshRepo },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AutenticacaoService>(AutenticacaoService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException for non-existent user', async () => {
      mockUsuarioRepo.findOne.mockResolvedValue(null);

      await expect(service.login('inexistente@email.com', 'senha'))
        .rejects.toThrow(UnauthorizedException);
    });

    it('should return tokens for valid credentials', async () => {
      const usuario = {
        id: 'uuid-123',
        nome: 'Teste',
        email: 'teste@email.com',
        senhaHash: '$2a$12$hash',
        ativo: true,
        role: 'user',
      };
      mockUsuarioRepo.findOne.mockResolvedValue(usuario);
      mockRefreshRepo.create.mockReturnValue({ token: 'rt-uuid' });
      mockRefreshRepo.save.mockResolvedValue({});

      const resultado = await service.login('teste@email.com', 'senha');

      expect(resultado).toHaveProperty('accessToken');
      expect(resultado).toHaveProperty('refreshToken');
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: usuario.id,
        email: usuario.email,
      });
    });
  });

  describe('gerarTokens (via login)', () => {
    it('should create a refresh token and save it', async () => {
      const usuario = {
        id: 'uuid-456',
        nome: 'Maria',
        email: 'maria@email.com',
        senhaHash: '$2a$12$hash',
        ativo: true,
        role: 'user',
      };
      mockUsuarioRepo.findOne.mockResolvedValue(usuario);
      mockRefreshRepo.create.mockReturnValue({ token: 'refresh-uuid' });
      mockRefreshRepo.save.mockResolvedValue({});

      await service.login('maria@email.com', 'senha');

      expect(mockRefreshRepo.create).toHaveBeenCalled();
      expect(mockRefreshRepo.save).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should deactivate all refresh tokens for user', async () => {
      mockRefreshRepo.update.mockResolvedValue({});

      await service.logout('user-uuid');

      expect(mockRefreshRepo.update).toHaveBeenCalledWith(
        { usuarioId: 'user-uuid', ativo: true },
        { ativo: false },
      );
    });
  });
});
