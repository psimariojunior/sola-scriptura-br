# Publicação na Play Store — Sola Scriptura

## Visão Geral

O Sola Scriptura é um Progressive Web App (PWA) que será publicado na Google Play Store utilizando a ferramenta **Bubblewrap** da Google, que converte um PWA em um **Trusted Web Activity (TWA)**.

Isso significa que o app carrega o site `https://solascripturabr.com.br` em uma WebView nativa, mantendo todas as funcionalidades do PWA.

## Pré-requisitos

1. **Conta Google Play Developer** — paga uma taxa única de US$ 25
2. **Node.js** v16+ instalado
3. **Java JDK 11+** instalado
4. **Android SDK** configurado (via Android Studio)
5. **Bubblewrap CLI** instalado globalmente
6. **Icones PNG** na pasta `public/`:
   - `icon-512.png` (512x512 px)
   - `icon-192.png` (192x192 px)

## Passo a Passo

### 1. Instalar Bubblewrap

```bash
npm install -g @nickoala/bubblewrap
```

### 2. Inicializar o projeto TWA

```bash
bubblewrap init --manifest https://solascripturabr.com.br/manifest.json
```

O Bubblewrap irá:
- Baixar o manifest.json
- Detectar ícones, cor do tema e configurações
- Criar um projeto Android com WebView
- Gerar os arquivos necessários

### 3. Construir o APK

```bash
bubblewrap build
```

Isso gerará:
- `app-release-signed.apk` — para teste
- `app-release-bundle.aab` — para publicação na Play Store

### 4. Testar localmente

```bash
bubblewrap build --skipPwaEnrollmentCheck
```

Instale no celular:
```bash
adb install app-release-signed.apk
```

### 5. Publicar na Play Store

1. Acesse [Google Play Console](https://play.google.com/console)
2. Crie um novo aplicativo
3. Faça upload do arquivo `.aab`
4. Preencha as informações (ver `store-listing.md`)
5. Adicione screenshots e imagens
6. Configure a política de privacidade (ver `privacy-policy.md`)
7. Submeta para revisão

## Configurações Importantes

### Assinatura digital

O Bubblewrap gera automaticamente uma chave de assinatura. Guarde a chave em local seguro — ela é necessária para atualizações futuras.

### Atualizações

Para atualizar o app:
1. Atualize o site (PWA) — o app carregará a versão mais recente
2. Se precisar mudar configurações nativas, reconstrua com Bubblewrap

### Deep Links

Configure deep links no Bubblewrap para que URLs como `solascripturabr.com.br/biblia` abram diretamente no app.

## Solução de Problemas

| Problema | Solução |
|----------|---------|
| Erro de Java | Verifique se JDK 11+ está instalado e JAVA_HOME configurado |
| Erro de Android SDK | Instale o Android Studio e configure ANDROID_HOME |
| Manifest não encontrado | Verifique se o site está acessível publicamente |
| Ícones não encontrados | Verifique se os PNGs existem na pasta public/ |
| Rejeição na Play Store | Verifique as políticas de conteúdo da Google |

## Referências

- [Bubblewrap Docs](https://nicknisi.github.io/bubblewrap/)
- [Google Play PWA Guidelines](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [TWA vs Native](https://web.dev/using-a-pwa-in-your-android-app/)
