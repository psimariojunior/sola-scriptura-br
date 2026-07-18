class ApiConfig {
  ApiConfig._();

  static const String baseUrl = 'https://api.solascripturabr.com.br/api/v1';
  static const String supabaseUrl = 'https://YOUR_PROJECT.supabase.co';
  static const String supabaseAnonKey = 'YOUR_ANON_KEY';

  static const Duration connectTimeout = Duration(seconds: 15);
  static const Duration receiveTimeout = Duration(seconds: 30);
  static const Duration sendTimeout = Duration(seconds: 15);

  static const Map<String, String> endpoints = {
    'livros': '/biblia/livros',
    'capitulos': '/biblia/capitulos',
    'versiculos': '/biblia/versiculos',
    'pesquisa': '/pesquisa',
    'lexicon': '/lexicon',
    'comentarios': '/comentarios',
    'exegese': '/exegese',
    'ia_chat': '/ia/chat',
    'ia_stream': '/ia/stream',
    'ia_estudo': '/ia/estudo',
    'teologia': '/teologia',
    'historia': '/historia',
    'cronologia': '/cronologia',
    'personagens': '/personagens',
    'usuario': '/usuario',
    'favoritos': '/usuario/favoritos',
    'notas': '/usuario/notas',
    'planos': '/usuario/planos-leitura',
    'audio': '/audio',
    'auth_login': '/auth/login',
    'auth_register': '/auth/register',
    'auth_google': '/auth/google',
    'auth_logout': '/auth/logout',
    'auth_session': '/auth/session',
  };

  static String endpoint(String key) => endpoints[key] ?? '/$key';
}
