class ApiConfig {
  ApiConfig._();

  static const String baseUrl = 'https://api.solascripturabr.com.br/api/v1';

  static const Duration connectTimeout = Duration(seconds: 15);
  static const Duration receiveTimeout = Duration(seconds: 30);
  static const Duration sendTimeout = Duration(seconds: 15);

  static const Duration rateLimitBackoff = Duration(seconds: 30);

  static const Map<String, String> endpoints = {
    'auth_login': '/auth/login',
    'auth_register': '/auth/cadastrar',
    'auth_refresh': '/auth/refresh',
    'auth_logout': '/auth/logout',
    'auth_google': '/auth/google',
    'auth_me': '/auth/me',
    'biblia_livros': '/biblia/livros',
    'biblia_livro': '/biblia/livros',
    'biblia_capitulo': '/biblia/capitulos',
    'biblia_versiculo': '/biblia/versiculos',
    'biblia_passagem': '/biblia/passagem',
    'biblia_traducoes': '/biblia/traducoes',
    'biblia_pesquisar': '/biblia/pesquisar',
    'biblia_palavra': '/biblia/palavras',
    'pesquisa': '/pesquisa',
    'pesquisa_avancada': '/pesquisa/avancada',
    'pesquisa_autocomplete': '/pesquisa/autocomplete',
    'pesquisa_populares': '/pesquisa/populares',
    'pesquisa_versiculos': '/pesquisa/versiculos',
    'pesquisa_personagens': '/pesquisa/personagens',
    'ia_perguntar': '/ia/perguntar',
    'ia_stream': '/ia/perguntar-stream',
    'ia_exegese': '/ia/exegese',
    'ia_comparar': '/ia/comparar',
    'grego_strong': '/grego/strong',
    'grego_buscar': '/grego/buscar',
    'grego_frequentes': '/grego/frequentes',
    'hebraico_strong': '/hebraico/strong',
    'hebraico_buscar': '/hebraico/buscar',
    'hebraico_raiz': '/hebraico/raiz',
    'comentarios': '/comentarios',
    'comentarios_autor': '/comentarios/autor',
    'comentarios_autores': '/comentarios/autores',
    'usuario_perfil': '/usuario/perfil',
    'usuario_preferencias': '/usuario/preferencias',
    'favoritos': '/favoritos',
    'notas': '/notas',
    'teologia': '/teologia',
    'historia': '/historia',
    'cronologia': '/cronologia',
    'personagens': '/personagens',
    'audio': '/audio',
  };

  static String endpoint(String key) => endpoints[key] ?? '/$key';
}
