import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioService } from './application/usuario.service';
import { Usuario } from './domain/usuario.entity';
import { PreferenciaUsuario } from './domain/preferencia-usuario.entity';
import { PerfilUsuario } from './domain/perfil-usuario.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsuarioService', () => {
  let service: UsuarioService;

  const mockUsuarioRepo = {
    findOne: jest.fn(),
    findAndCount: jest.fn(),
  };

  const mockPreferenciaRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockPerfilRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: getRepositoryToken(Usuario), useValue: mockUsuarioRepo },
        { provide: getRepositoryToken(PreferenciaUsuario), useValue: mockPreferenciaRepo },
        { provide: getRepositoryToken(PerfilUsuario), useValue: mockPerfilRepo },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buscarPerfil', () => {
    it('should return user profile', async () => {
      const mockUsuario = { id: 'user-1', nome: 'João', perfil: {}, preferencias: {} };
      mockUsuarioRepo.findOne.mockResolvedValue(mockUsuario);

      const result = await service.buscarPerfil('user-1');

      expect(result).toEqual(mockUsuario);
    });

    it('should throw NotFoundException for non-existent user', async () => {
      mockUsuarioRepo.findOne.mockResolvedValue(null);

      await expect(service.buscarPerfil('inexistente'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('atualizarPerfil', () => {
    it('should create profile if not exists', async () => {
      mockPerfilRepo.findOne.mockResolvedValue(null);
      const mockPerfil = { id: 'perfil-1', usuarioId: 'user-1', bio: 'João' };
      mockPerfilRepo.create.mockReturnValue(mockPerfil);
      mockPerfilRepo.save.mockResolvedValue(mockPerfil);

      const result = await service.atualizarPerfil('user-1', { bio: 'João' });

      expect(mockPerfilRepo.create).toHaveBeenCalled();
      expect(mockPerfilRepo.save).toHaveBeenCalled();
    });

    it('should update existing profile', async () => {
      const mockPerfil = { id: 'perfil-1', usuarioId: 'user-1', bio: 'Antigo' };
      mockPerfilRepo.findOne.mockResolvedValue(mockPerfil);
      mockPerfilRepo.save.mockResolvedValue({ ...mockPerfil, bio: 'Novo' });

      const result = await service.atualizarPerfil('user-1', { bio: 'Novo' });

      expect(mockPerfilRepo.save).toHaveBeenCalled();
    });
  });
});
