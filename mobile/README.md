# Sola Scriptura BR — App Mobile (MVP)

Leitor bíblico para Android/iOS construído em Flutter. MVP focado em leitura
da Bíblia (sem login), buscando os capítulos da API pública Midvash.

## Funcionalidades (MVP)
- Leitura de todos os 66 livros (Antigo e Novo Testamento).
- 8 traduções: ARC, NVI, ARA, ACF, KJV, WEB, NAA, NTLH.
- Seletor de livro (AT/NT), seletor de capítulo em grade e troca de tradução.
- 4 temas: Claro, Escuro, Sépia e Noturno (persistidos localmente).
- Uso anônimo/local — nenhuma autenticação necessária.

## Como rodar
```bash
cd mobile
flutter pub get
flutter run
```

> Requer Flutter 3.3+ e um emulador/dispositivo conectado. Conexão com a
> internet é necessária para carregar os capítulos (API Midvash).

## Estrutura
```
lib/
  main.dart                     # MaterialApp + TemaProvider
  theme/app_theme.dart          # 4 temas (light/dark/sepia/noturno)
  models/                       # livro, versiculo, traducao
  providers/tema_provider.dart  # estado do tema (shared_preferences)
  services/biblia_service.dart  # fetch da API + lista de 66 livros
  screens/biblia_reader_screen.dart
  widgets/                      # verse_card, book_selector, chapter_grid
```

## Observações
- A API Midvash não exige cabeçalho de autenticação.
- Caso uma tradução não esteja disponível na API, o app exibe um erro amigável.
