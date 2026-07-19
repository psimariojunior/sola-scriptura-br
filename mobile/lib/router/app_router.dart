import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../providers/auth_provider.dart';
import '../screens/auth/callback_screen.dart';
import '../screens/auth/cadastro_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/biblia/biblia_screen.dart';
import '../screens/biblia/commentary_screen.dart';
import '../screens/biblia/cross_references_screen.dart';
import '../screens/biblia/translation_selector_screen.dart';
import '../screens/biblia/verse_detail_screen.dart';
import '../screens/compartilhar/compartilhar_screen.dart';
import '../screens/conta_screen.dart';
import '../screens/cronologia/cronologia_screen.dart';
import '../screens/estudos/estudo_detail_screen.dart';
import '../screens/estudos/estudos_screen.dart';
import '../screens/estudos/estudo_detail_screen.dart';
import '../screens/estudos/manuais_screen.dart';
import '../screens/extras/devocional_screen.dart';
import '../screens/extras/flashcards_screen.dart';
import '../screens/extras/quiz_screen.dart';
import '../screens/favorites_screen.dart';
import '../screens/ferramentas/comparar_screen.dart';
import '../screens/ferramentas/concordancia_screen.dart';
import '../screens/ferramentas/critica_textual_screen.dart';
import '../screens/ferramentas/ferramentas_screen.dart';
import '../screens/ferramentas/harmonia_screen.dart';
import '../screens/ferramentas/introducoes_screen.dart';
import '../screens/ferramentas/milagres_screen.dart';
import '../screens/ferramentas/parabolas_screen.dart';
import '../screens/highlights_screen.dart';
import '../screens/home_screen.dart';
import '../screens/ia/ia_screen.dart';
import '../screens/idiomas/dicionario_screen.dart';
import '../screens/idiomas/idiomas_screen.dart';
import '../screens/idiomas/palavra_detail_screen.dart';
import '../screens/notes_screen.dart';
import '../screens/personagens/personagem_detail_screen.dart';
import '../screens/bookmarks_screen.dart';
import '../screens/personagens/personagens_screen.dart';
import '../screens/pesquisa/pesquisa_screen.dart';
import '../screens/planos/planos_screen.dart';
import '../screens/splash_screen.dart';
import '../screens/teologia/categoria_screen.dart';
import '../screens/teologia/doutrina_screen.dart';
import '../screens/teologia/teologia_screen.dart';

class AppRouter {
  final AuthProvider authProvider;

  AppRouter(this.authProvider);

  late final GoRouter router = GoRouter(
    initialLocation: '/splash',
    refreshListenable: authProvider,
    redirect: (context, state) {
      final isAuthenticated = authProvider.isAuthenticated;
      final isSplash = state.matchedLocation == '/splash';
      final isAuthRoute = state.matchedLocation == '/login' ||
          state.matchedLocation == '/cadastro' ||
          state.matchedLocation == '/callback';

      if (isSplash) return null;

      if (!isAuthenticated && !isAuthRoute) {
        return '/login';
      }
      if (isAuthenticated && isAuthRoute) {
        return '/';
      }
      return null;
    },
    routes: [
      // Auth
      GoRoute(path: '/splash', builder: (_, __) => const SplashScreen()),
      GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
      GoRoute(path: '/cadastro', builder: (_, __) => const CadastroScreen()),
      GoRoute(path: '/callback', builder: (_, __) => const CallbackScreen()),

      // Home + tabs
      GoRoute(path: '/', builder: (_, __) => const HomeScreen()),

      // Bíblia
      GoRoute(path: '/biblia', builder: (_, __) => const BibliaScreen()),
      GoRoute(
        path: '/biblia/:livro',
        builder: (_, state) => BibliaScreen(
          livroInicial: state.pathParameters['livro'] ?? 'gn',
        ),
      ),
      GoRoute(
        path: '/biblia/:livro/:capitulo',
        builder: (_, state) => BibliaScreen(
          livroInicial: state.pathParameters['livro'] ?? 'gn',
          capituloInicial:
              int.tryParse(state.pathParameters['capitulo'] ?? '1') ?? 1,
        ),
      ),
      GoRoute(
        path: '/biblia/traducoes',
        builder: (_, __) => const TranslationSelectorScreen(),
      ),

      // Versículo
      GoRoute(
        path: '/versiculo/:ref',
        builder: (_, state) => VerseDetailScreen.fromReferencia(
          referencia: state.pathParameters['ref'] ?? '',
        ),
      ),
      GoRoute(
        path: '/comentarios/:ref',
        builder: (_, state) => CommentaryScreen.fromReferencia(
          referencia: state.pathParameters['ref'] ?? '',
        ),
      ),
      GoRoute(
        path: '/referencias-cruzadas/:ref',
        builder: (_, state) => CrossReferencesScreen.fromReferencia(
          referencia: state.pathParameters['ref'] ?? '',
        ),
      ),

      // Pesquisa
      GoRoute(path: '/pesquisa', builder: (_, __) => const PesquisaScreen()),

      // Idiomas
      GoRoute(path: '/idiomas', builder: (_, __) => const IdiomasScreen()),
      GoRoute(
        path: '/idiomas/:strong',
        builder: (_, state) => PalavraDetailScreen.fromStrong(
          strong: state.pathParameters['strong'] ?? '',
        ),
      ),
      GoRoute(
        path: '/dicionario',
        builder: (_, __) => const DicionarioScreen(),
      ),

      // IA
      GoRoute(path: '/ia', builder: (_, __) => IaScreen.defaultInstance()),

      // Estudos
      GoRoute(path: '/estudos', builder: (_, __) => const EstudosScreen()),
      GoRoute(
        path: '/estudos/:slug',
        builder: (_, state) => EstudoDetailScreen.fromSlug(
          slug: state.pathParameters['slug'] ?? '',
        ),
      ),
      GoRoute(path: '/manuais', builder: (_, __) => const ManuaisScreen()),

      // Teologia
      GoRoute(path: '/teologia', builder: (_, __) => const TeologiaScreen()),
      GoRoute(
        path: '/teologia/:categoria',
        builder: (_, state) => CategoriaScreen.fromSlug(
          slug: state.pathParameters['categoria'] ?? '',
        ),
      ),
      GoRoute(
        path: '/teologia/:categoria/:id',
        builder: (_, state) => DoutrinaScreen.fromId(
          id: state.pathParameters['id'] ?? '',
        ),
      ),

      // Personagens
      GoRoute(
        path: '/personagens',
        builder: (_, __) => const PersonagensScreen(),
      ),
      GoRoute(
        path: '/personagens/:slug',
        builder: (_, state) => PersonagemDetailScreen.fromSlug(
          slug: state.pathParameters['slug'] ?? '',
        ),
      ),

      // Cronologia
      GoRoute(
        path: '/cronologia',
        builder: (_, __) => const CronologiaScreen(),
      ),

      // Ferramentas
      GoRoute(
        path: '/ferramentas',
        builder: (_, __) => const FerramentasScreen(),
      ),
      GoRoute(
        path: '/concordancia',
        builder: (_, __) => const ConcordanciaScreen(),
      ),
      GoRoute(
        path: '/critica-textual',
        builder: (_, __) => const CriticaTextualScreen(),
      ),
      GoRoute(
        path: '/introducoes',
        builder: (_, __) => const IntroducoesScreen(),
      ),
      GoRoute(
        path: '/parabolas',
        builder: (_, __) => const ParabolasScreen(),
      ),
      GoRoute(
        path: '/milagres',
        builder: (_, __) => const MilagresScreen(),
      ),
      GoRoute(
        path: '/harmonia',
        builder: (_, __) => const HarmoniaScreen(),
      ),
      GoRoute(
        path: '/comparar',
        builder: (_, __) => const CompararScreen(),
      ),

      // Extras
      GoRoute(path: '/quiz', builder: (_, __) => const QuizScreen()),
      GoRoute(
        path: '/flashcards',
        builder: (_, __) => const FlashcardsScreen(),
      ),
      GoRoute(
        path: '/devocional',
        builder: (_, __) => const DevocionalScreen(),
      ),
      GoRoute(
        path: '/devocional/:dia',
        builder: (_, state) {
          final dia = int.tryParse(state.pathParameters['dia'] ?? '');
          return DevocionalScreen(diaInicial: dia);
        },
      ),
      GoRoute(
        path: '/planos',
        builder: (_, __) => const PlanosLeituraScreen(),
      ),
      GoRoute(
        path: '/compartilhar',
        builder: (_, __) => const CompartilharScreen(),
      ),

      // Conta
      GoRoute(path: '/conta', builder: (_, __) => const ContaScreen()),
      GoRoute(path: '/favoritos', builder: (_, __) => const FavoritesScreen()),
      GoRoute(path: '/notas', builder: (_, __) => const NotesScreen()),
      GoRoute(
        path: '/destaques',
        builder: (_, __) => const HighlightsScreen(),
      ),
      GoRoute(
        path: '/marcadores',
        builder: (_, __) => const BookmarksScreen(),
      ),
    ],
    errorBuilder: (_, state) => Scaffold(
      body: Center(child: Text('Página não encontrada: ${state.error}')),
    ),
  );
}
