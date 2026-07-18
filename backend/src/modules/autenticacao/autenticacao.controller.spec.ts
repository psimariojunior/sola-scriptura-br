import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoController } from './presentation/autenticacao.controller';
import { AutenticacaoService } from './application/autenticacao.service';
import { ConfigService } from '@nestjs/config';

describe('AutenticacaoController', () => {
  let controller: AutenticacaoController;
  let authService: jest.Mocked<AutenticacaoService>;

  const mockAuthService = {
    cadastrar: jest.fn(),
    login: jest.fn(),
    refresh: jest.fn(),
    logout: jest.fn(),
    googleAuthUrl: jest.fn(),
    googleCallback: jest.fn(),
    appleIniciar: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutenticacaoController],
      providers: [
        { provide: AutenticacaoService, useValue: mockAuthService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    controller = module.get<AutenticacaoController>(AutenticacaoController);
    authService = module.get(AutenticacaoService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with email and senha', async () => {
      const credenciais = { email: 'teste@email.com', senha: '123456' };
      const resultadoEsperado = { accessToken: 'jwt-token', refreshToken: 'rt-123' };
      mockAuthService.login.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.login(credenciais);

      expect(authService.login).toHaveBeenCalledWith('teste@email.com', '123456');
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('cadastrar', () => {
    it('should call authService.cadastrar with user data', async () => {
      const dados = { nome: 'Joao', email: 'joao@email.com', senha: '12345678' };
      const resultadoEsperado = { accessToken: 'jwt-token', refreshToken: 'rt-123' };
      mockAuthService.cadastrar.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.cadastrar(dados);

      expect(authService.cadastrar).toHaveBeenCalledWith(dados);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('logout', () => {
    it('should call authService.logout with usuario id', async () => {
      mockAuthService.logout.mockResolvedValue(undefined);

      await controller.logout('user-uuid-123');

      expect(authService.logout).toHaveBeenCalledWith('user-uuid-123');
    });
  });
});
