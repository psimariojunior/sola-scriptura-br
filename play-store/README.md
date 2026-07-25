# Publicação na Play Store — Sola Scriptura (Flutter)

## Visão Geral

O Sola Scriptura é um app **Flutter** com WebView que carrega `https://solascripturabr.com.br`. O projeto está em `mobile_app/` e gera um APK/AAB nativo para publicação na Google Play Store.

O app utiliza `webview_flutter` para exibir o site, com recursos nativos como push notifications (Firebase), compartilhamento, autenticação biométrica e indicador de conectividade.

## Pré-requisitos

1. **Conta Google Play Developer** — taxa única de US$ 25
2. **Flutter SDK** 3.12+ instalado ([flutter.dev](https://flutter.dev/docs/get-started/install))
3. **Android Studio** instalado com Android SDK (API 34+)
4. **Java JDK 11+** instalado e `JAVA_HOME` configurado
5. **Firebase** configurado (ver seção abaixo)
6. **Keystore de release** para assinatura (ver seção abaixo)

## Configuração Firebase

O app usa Firebase Cloud Messaging (FCM) para push notifications.

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um projeto ou use o existente
3. Adicione um app Android com package name `com.solascriptura.sola_scriptura_app`
4. Baixe o `google-services.json`
5. Coloque o arquivo em `mobile_app/android/app/google-services.json`

> **Importante:** O `google-services.json` está no `.gitignore` — não deve ser commitado no repositório.

## Configuração de Assinatura (Release Keystore)

Para publicar na Play Store, é necessário assinar o app com um keystore de release.

### Gerar keystore

```bash
keytool -genkey -v -keystore ~/sola-scriptura-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias sola-scriptura
```

### Configurar no Flutter

Crie ou edite o arquivo `mobile_app/android/key.properties`:

```properties
storePassword=SUA_SENHA
keyPassword=SUA_SENHA_KEY
keyAlias=sola-scriptura
storeFile=CAMINHO_PARA/sola-scriptura-release.jks
```

> **Importante:** O `key.properties` está no `.gitignore` — nunca commite senhas.

O `build.gradle` já deve estar configurado para ler essas propriedades.

## Build

### 1. Entrar no diretório do app

```bash
cd mobile_app
```

### 2. Instalar dependências

```bash
flutter pub get
```

### 3. Build APK (teste local)

```bash
flutter build apk --release
```

O APK será gerado em `mobile_app/build/app/outputs/flutter-apk/app-release.apk`.

### 4. Build App Bundle (Play Store)

```bash
flutter build appbundle --release
```

O AAB será gerado em `mobile_app/build/app/outputs/bundle/release/app-release.aab`.

### 5. Testar no celular

```bash
flutter install --debug
```

Ou conecte o dispositivo via USB e rode:

```bash
flutter run --release
```

## Publicar na Play Store

1. Acesse [Google Play Console](https://play.google.com/console)
2. Crie um novo aplicativo
3. Faça upload do arquivo `.aab` (App Bundle)
4. Preencha as informações da listing (ver `store-listing.md`)
5. Adicione screenshots e feature graphic (1024x500)
6. Configure a política de privacidade (ver `privacy-policy.md`)
7. Preencha o formulário de classificação de conteúdo
8. Submeta para revisão

## Atualizações

Para atualizar o app na Play Store:

1. Atualize o site — o WebView carrega a versão mais recente automaticamente
2. Se mudar código nativo (permissões, Firebase, etc), incremente a versão em `pubspec.yaml`:
   ```yaml
   version: 1.2.0+3  # versão+buildNumber
   ```
3. Faça novo build `.aab` e submeta no Play Console

## Estrutura do App

```
mobile_app/
├── lib/
│   └── main.dart          # App principal (WebView + splash + notifications)
├── android/
│   └── app/
│       ├── google-services.json   # Firebase (não commitado)
│       └── build.gradle           # Config Android
├── pubspec.yaml            # Dependências e versão
└── build/
    └── app/outputs/
        ├── flutter-apk/    # APKs
        └── bundle/release/ # AAB para Play Store
```

## Solução de Problemas

| Problema | Solução |
|----------|---------|
| `Flutter not found` | Adicione Flutter ao PATH ou execute `flutter doctor` |
| `JAVA_HOME not set` | Configure JAVA_HOME apontando para o JDK 11+ |
| `Android SDK not found` | Instale Android Studio e aceite as licenças (`flutter doctor --android-licenses`) |
| `google-services.json missing` | Baixe do Firebase Console e coloque em `android/app/` |
| `Keystore error` | Verifique se `key.properties` existe e os caminhos estão corretos |
| `Version conflict` | Incremente `version` em `pubspec.yaml` antes de cada release |
| WebView não carrega | Verifique se `INTERNET` permission está no `AndroidManifest.xml` |
| Rejeição na Play Store | Verifique políticas de conteúdo e classificação indicativa |

## Referências

- [Flutter Docs — Android deployment](https://docs.flutter.dev/deployment/android)
- [Flutter — Build and release an Android app](https://docs.flutter.dev/deployment/android)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
