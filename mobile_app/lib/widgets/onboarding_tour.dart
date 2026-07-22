import 'package:flutter/material.dart';
import '../config/theme.dart';

class OnboardingTour extends StatefulWidget {
  final VoidCallback onComplete;

  const OnboardingTour({super.key, required this.onComplete});

  @override
  State<OnboardingTour> createState() => _OnboardingTourState();
}

class _OnboardingTourState extends State<OnboardingTour> {
  int _currentStep = 0;

  static const List<_TourStep> _steps = [
    _TourStep(
      icon: Icons.auto_stories_rounded,
      title: 'Bíblia em 10 Traduções',
      description: 'Leia a Palavra de Deus em diversas traduções, com léxico hebraico e grego integrado.',
      target: '/biblia',
    ),
    _TourStep(
      icon: Icons.psychology_rounded,
      title: 'Assistente com IA',
      description: 'Tire suas dúvidas bíblicas com nossa inteligência artificial baseada em teologia.',
      target: '/ia',
    ),
    _TourStep(
      icon: Icons.search_rounded,
      title: 'Pesquisa Avançada',
      description: 'Encontre versículos por tema, palavra ou referência com nossa busca semântica.',
      target: '/pesquisa',
    ),
    _TourStep(
      icon: Icons.book_rounded,
      title: 'Estudo Acadêmico',
      description: 'Acesse exegese, teologia sistemática, histórico e geografia bíblica.',
      target: '/teologia',
    ),
  ];

  void _nextStep() {
    if (_currentStep < _steps.length - 1) {
      setState(() => _currentStep++);
    } else {
      widget.onComplete();
    }
  }

  void _skip() {
    widget.onComplete();
  }

  @override
  Widget build(BuildContext context) {
    final step = _steps[_currentStep];

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [AppTheme.bgDark, AppTheme.bgMedium, AppTheme.bgDark],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(32),
            child: Column(
              children: [
                // Skip button
                Align(
                  alignment: Alignment.topRight,
                  child: TextButton(
                    onPressed: _skip,
                    child: const Text(
                      'Pular',
                      style: TextStyle(color: AppTheme.textMuted, fontSize: 14),
                    ),
                  ),
                ),

                const Spacer(flex: 2),

                // Icon
                Container(
                  width: 120,
                  height: 120,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: RadialGradient(
                      colors: [
                        AppTheme.goldLight.withOpacity(0.3),
                        AppTheme.gold.withOpacity(0.1),
                      ],
                    ),
                    border: Border.all(
                      color: AppTheme.gold.withOpacity(0.3),
                      width: 1,
                    ),
                  ),
                  child: Icon(
                    step.icon,
                    size: 56,
                    color: AppTheme.goldLight,
                  ),
                ),
                const SizedBox(height: 48),

                // Title
                Text(
                  step.title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontFamily: 'serif',
                    fontSize: 28,
                    fontWeight: FontWeight.w300,
                    color: AppTheme.textPrimary,
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 16),

                // Description
                Text(
                  step.description,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 15,
                    color: AppTheme.textSecondary,
                    height: 1.6,
                  ),
                ),
                const SizedBox(height: 16),

                // Target path
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.goldSubtle,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    step.target,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppTheme.gold,
                      fontFamily: 'monospace',
                    ),
                  ),
                ),

                const Spacer(flex: 2),

                // Progress dots
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(
                    _steps.length,
                    (i) => Container(
                      width: i == _currentStep ? 24 : 8,
                      height: 8,
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      decoration: BoxDecoration(
                        color: i == _currentStep ? AppTheme.gold : AppTheme.textMuted.withOpacity(0.3),
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 32),

                // Next button
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: ElevatedButton(
                    onPressed: _nextStep,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.gold,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: Text(
                      _currentStep < _steps.length - 1 ? 'Próximo' : 'Começar',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _TourStep {
  final IconData icon;
  final String title;
  final String description;
  final String target;

  const _TourStep({
    required this.icon,
    required this.title,
    required this.description,
    required this.target,
  });
}
