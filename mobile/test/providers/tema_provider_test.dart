import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sola_scriptura_br/providers/tema_provider.dart';
import 'package:sola_scriptura_br/theme/app_theme.dart';

void main() {
  group('TemaProvider', () {
    setUp(() {
      SharedPreferences.setMockInitialValues({});
    });

    group('estado inicial', () {
      test('deve iniciar com tema light por padrao', () {
        final provider = TemaProvider();

        expect(provider.tema, AppTheme.light);
      });

      test('deve iniciar com tamanho de fonte 18', () {
        final provider = TemaProvider();

        expect(provider.fontSize, 18.0);
      });

      test('deve iniciar com isLoaded como false', () {
        final provider = TemaProvider();

        expect(provider.isLoaded, isFalse);
      });
    });

    group('setTema', () {
      test('deve alterar tema para dark', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setTema(AppTheme.dark);

        expect(provider.tema, AppTheme.dark);
      });

      test('deve alterar tema para sepia', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setTema(AppTheme.sepia);

        expect(provider.tema, AppTheme.sepia);
      });

      test('deve alterar tema para noturno', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setTema(AppTheme.noturno);

        expect(provider.tema, AppTheme.noturno);
      });

      test('nao deve alterar se o tema for o mesmo', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        final initialTema = provider.tema;
        await provider.setTema(initialTema);

        expect(provider.tema, initialTema);
      });

      test('deve notificar listeners ao alterar tema', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        int notifyCount = 0;
        provider.addListener(() {
          notifyCount++;
        });

        await provider.setTema(AppTheme.dark);

        expect(notifyCount, greaterThan(0));
      });
    });

    group('isDark', () {
      test('deve retornar false para tema light', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        expect(provider.isDark, isFalse);
      });

      test('deve retornar true para tema dark', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setTema(AppTheme.dark);

        expect(provider.isDark, isTrue);
      });

      test('deve retornar true para tema sepia', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setTema(AppTheme.sepia);

        expect(provider.isDark, isTrue);
      });

      test('deve retornar true para tema noturno', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setTema(AppTheme.noturno);

        expect(provider.isDark, isTrue);
      });
    });

    group('themeData', () {
      test('deve retornar ThemeData para tema light', () {
        final provider = TemaProvider();

        final themeData = provider.themeData;

        expect(themeData, isNotNull);
        expect(themeData.brightness, Brightness.light);
      });

      test('deve retornar ThemeData para tema dark', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setTema(AppTheme.dark);
        final themeData = provider.themeData;

        expect(themeData.brightness, Brightness.dark);
      });
    });

    group('persistencia', () {
      test('deve salvar tema no SharedPreferences', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setTema(AppTheme.dark);

        final prefs = await SharedPreferences.getInstance();
        expect(prefs.getString('tema_selecionado'), AppTheme.dark);
      });

      test('deve carregar tema salvo do SharedPreferences', () async {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('tema_selecionado', AppTheme.sepia);

        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        expect(provider.tema, AppTheme.sepia);
      });

      test('deve manter tema padrao quando nada esta salvo', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        expect(provider.tema, AppTheme.light);
      });
    });

    group('setFontSize', () {
      test('deve alterar tamanho da fonte', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setFontSize(24.0);

        expect(provider.fontSize, 24.0);
      });

      test('nao deve alterar se o tamanho for o mesmo', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setFontSize(18.0);

        expect(provider.fontSize, 18.0);
      });

      test('deve salvar tamanho da fonte no SharedPreferences', () async {
        final provider = TemaProvider();
        await Future.delayed(const Duration(milliseconds: 100));

        await provider.setFontSize(22.0);

        final prefs = await SharedPreferences.getInstance();
        expect(prefs.getDouble('font_size'), 22.0);
      });
    });
  });
}
