import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './presentation/usuario.controller';
import { UsuarioService } from './application/usuario.service';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: jest.Mocked<UsuarioService>;

  const mockService = {
    buscarPerfil: jest.fn(),
    atualizarPerfil: jest.fn(),
    atualizarPreferencias: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        { provide: UsuarioService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get(UsuarioService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('buscarPerfil', () => {
    it('should return user profile', async () => {
      const mockPerfil = { id: 'user-1', nome: 'João' };
      mockService.buscarPerfil.mockResolvedValue(mockPerfil as any);

      const result = await controller.buscarPerfil('user-1');

      expect(result).toEqual(mockPerfil);
      expect(mockService.buscarPerfil).toHaveBeenCalledWith('user-1');
    });
  });

  describe('atualizarPerfil', () => {
    it('should update user profile', async () => {
      const mockPerfil = { id: 'user-1', bio: 'João Atualizado' };
      mockService.atualizarPerfil.mockResolvedValue(mockPerfil as any);

      const result = await controller.atualizarPerfil('user-1', { bio: 'João Atualizado' });

      expect(result).toEqual(mockPerfil);
      expect(mockService.atualizarPerfil).toHaveBeenCalledWith('user-1', { bio: 'João Atualizado' });
    });
  });

  describe('atualizarPreferencias', () => {
    it('should update user preferences', async () => {
      const mockPref = { tema: 'dark', idioma: 'pt' };
      mockService.atualizarPreferencias.mockResolvedValue(mockPref as any);

      const result = await controller.atualizarPreferencias('user-1', { tema: 'dark' });

      expect(result).toEqual(mockPref);
      expect(mockService.atualizarPreferencias).toHaveBeenCalledWith('user-1', { tema: 'dark' });
    });
  });
});
