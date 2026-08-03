# iOS Widget - Versículo do Dia

## Instruções de Instalação

### 1. Adicionar Target do Widget no Xcode

1. Abra o projeto `Runner.xcworkspace` no Xcode
2. Vá em **File → New → Target**
3. Selecione **Widget Extension** (iOS)
4. Configure:
   - **Product Name**: `VerseWidget`
   - **Team**: Sua equipe de desenvolvimento
   - **Bundle Identifier**: `com.solascriptura.sola_scriptura_app.VerseWidget`
   - **Include Extension**: Marque esta opção
5. Clique em **Finish**

### 2. Substituir Arquivos Gerados

Após criar o target, o Xcode criará arquivos temporários. Substitua-os pelos nossos arquivos:

1. No Navigator do Xcode, expanda a pasta **VerseWidget**
2. Delete os arquivos `VerseWidget.swift` e `VerseWidgetBundle.swift` gerados pelo Xcode
3. Arraste os arquivos da pasta `Runner/Widgets/` para dentro do target `VerseWidget`:
   - `VerseEntry.swift`
   - `VerseTimelineProvider.swift`
   - `VerseWidget.swift`
   - `VerseWidgetBundle.swift`
4. Marque **Copy items if needed** e selecione o target **VerseWidget**

### 3. Configurar App Group (Opcional)

Para que o widget compartilhe dados com o app principal:

1. No Xcode, selecione o target **Runner**
2. Vá em **Signing & Capabilities**
3. Clique em **+ Capability** e adicione **App Groups**
4. Clique no **+** e crie: `group.com.solascriptura.widget`
5. Repita o processo para o target **VerseWidget**
6. No código do Flutter, salve os dados no UserDefaults com o mesmo App Group:
   ```swift
   let defaults = UserDefaults(suiteName: "group.com.solascriptura.widget")
   defaults?.set(verse, forKey: "daily_verse")
   defaults?.set(reference, forKey: "daily_reference")
   ```

### 4. Adicionar Widget no Home Screen

1. Toque longamente na tela inicial até os ícones tremerem
2. Toque em **+** no canto superior esquerdo
3. Busque por "Sola Scriptura" ou "Versículo"
4. Selecione o widget e escolha o tamanho
5. Toque em **Adicionar Widget**

## Tamanhos Disponíveis

| Tamanho | Descrição | Uso |
|---------|-----------|-----|
| **Accessory Rectangular** | Lock Screen (iPhone 14 Pro+) | Versículo compacto |
| **Accessory Circular** | Lock Screen / Apple Watch | Ícone + referência |
| **System Medium** | Home Screen (2x4) | Versículo com gradiente |
| **System Large** | Home Screen (4x4) | Versículo completo |

## Funcionalidades

- **Atualização automática**: Widget atualiza a cada 24h (meia-noite)
- **Fallback inteligente**: 15 versículos populares caso não haja dados
- **Gradiente dourado**: Design premium que combina com o app
- **Suporte a múltiplos tamanhos**: Lock Screen e Home Screen
- **App Group**: Compartilha dados entre app e widget

## Arquivos

```
Runner/Widgets/
├── VerseEntry.swift              # Modelo de dados
├── VerseTimelineProvider.swift   # Provider do timeline
├── VerseWidget.swift             # Widget principal
└── VerseWidgetBundle.swift       # Bundle do widget
```

## Personalização

### Alterar Versículos

Edite o array `fallbackVerses` em `VerseTimelineProvider.swift`:

```swift
private let fallbackVerses: [(verse: String, reference: String)] = [
    ("Seu versículo aqui.", "Referência"),
    // ...
]
```

### Alterar Cores

As cores estão definidas em `VerseWidget.swift` usando valores RGB:

- **Gradiente dourado**: `Color(red: 0.98, green: 0.96, blue: 0.93)`
- **Texto principal**: `Color(red: 0.2, green: 0.15, blue: 0.05)`
- **Referência**: `Color(red: 0.6, green: 0.42, blue: 0.1)`

### Adicionar Novos Tamanhos

Para adicionar um novo tamanho, edite `VerseWidget.swift` e adicione um caso no switch:

```swift
case .systemExtraLarge:
    systemExtraLargeView
```

## Solução de Problemas

### Widget não aparece na lista

1. Verifique se o target **VerseWidget** está configurado corretamente
2. Limpe o build: **Product → Clean Build Folder**
3. Rebuild: **Product → Build**

### Dados não atualizam

1. Verifique se o App Group está configurado em ambos os targets
2. Verifique se o UserDefaults está sendo acessado com a mesma chave
3. Force atualização: delete o widget e adicione novamente

### Erro de compilação

1. Verifique se todos os arquivos estão no target correto
2. Verifique se o iOS Deployment Target é 14.0 ou superior
3. Verifique se o WidgetKit está importado corretamente

## Requisitos

- iOS 14.0 ou superior
- Xcode 12.0 ou superior
- Swift 5.0 ou superior
