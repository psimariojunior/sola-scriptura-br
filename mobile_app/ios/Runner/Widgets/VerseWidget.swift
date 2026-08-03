import WidgetKit
import SwiftUI

/// Widget principal que exibe o versículo do dia
/// Suporta tamanhos Medium (accessoryRectangular) e Large (accessoryCircular)
struct VerseWidget: Widget {
    let kind: String = "VerseWidget"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: VerseTimelineProvider()) { entry in
            VerseWidgetView(entry: entry)
        }
        .configurationDisplayName("Versículo do Dia")
        .description("Exibe o versículo bíblico do dia no seu homescreen.")
        .supportedFamilies([.accessoryRectangular, .accessoryCircular, .systemMedium, .systemLarge])
    }
}

/// Vista principal do widget
struct VerseWidgetView: View {
    let entry: VerseEntry
    @Environment(\.widgetFamily) var family
    
    var body: some View {
        switch family {
        case .accessoryRectangular:
            accessoryRectangularView
        case .accessoryCircular:
            accessoryCircularView
        case .systemMedium:
            systemMediumView
        case .systemLarge:
            systemLargeView
        default:
            accessoryRectangularView
        }
    }
    
    // MARK: - Accessory Rectangular (Lock Screen - iPhone 14 Pro+)
    
    private var accessoryRectangularView: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(entry.reference)
                .font(.system(size: 11, weight: .bold, design: .rounded))
                .foregroundStyle(.secondary)
            
            Text(entry.verse)
                .font(.system(size: 13, weight: .regular, design: .serif))
                .lineLimit(4)
                .minimumScaleFactor(0.8)
        }
        .containerBackground(.fill.tertiary, for: .widget)
    }
    
    // MARK: - Accessory Circular (Lock Screen - Apple Watch)
    
    private var accessoryCircularView: some View {
        ZStack {
            AccessoryWidgetBackground()
            
            VStack(spacing: 2) {
                Image(systemName: "book.fill")
                    .font(.system(size: 16))
                    .foregroundStyle(.orange)
                
                Text(entry.reference)
                    .font(.system(size: 10, weight: .bold, design: .rounded))
                    .lineLimit(1)
            }
        }
        .containerBackground(.fill.tertiary, for: .widget)
    }
    
    // MARK: - System Medium (Home Screen - tamanho médio)
    
    private var systemMediumView: some View {
        ZStack {
            // Fundo gradiente dourado sutil
            LinearGradient(
                colors: [
                    Color(red: 0.98, green: 0.96, blue: 0.93),
                    Color(red: 0.96, green: 0.93, blue: 0.88)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            VStack(alignment: .leading, spacing: 8) {
                // Ícone e referência
                HStack(spacing: 6) {
                    Image(systemName: "book.closed.fill")
                        .font(.system(size: 12))
                        .foregroundStyle(Color(red: 0.76, green: 0.55, blue: 0.18))
                    
                    Text(entry.reference)
                        .font(.system(size: 13, weight: .bold, design: .rounded))
                        .foregroundStyle(Color(red: 0.45, green: 0.32, blue: 0.09))
                }
                
                // Texto do versículo
                Text(entry.verse)
                    .font(.system(size: 14, weight: .regular, design: .serif))
                    .foregroundStyle(Color(red: 0.2, green: 0.15, blue: 0.05))
                    .lineLimit(4)
                    .minimumScaleFactor(0.85)
                
                Spacer(minLength: 0)
                
                // Rodapé sutil
                HStack {
                    Spacer()
                    Text("Sola Scriptura")
                        .font(.system(size: 9, weight: .light, design: .rounded))
                        .foregroundStyle(Color(red: 0.6, green: 0.45, blue: 0.12).opacity(0.6))
                }
            }
            .padding(12)
        }
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }
    
    // MARK: - System Large (Home Screen - tamanho grande)
    
    private var systemLargeView: some View {
        ZStack {
            // Fundo gradiente dourado mais pronunciado
            LinearGradient(
                colors: [
                    Color(red: 0.99, green: 0.97, blue: 0.94),
                    Color(red: 0.97, green: 0.94, blue: 0.89),
                    Color(red: 0.95, green: 0.91, blue: 0.85)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            VStack(alignment: .leading, spacing: 12) {
                // Cabeçalho com ícone
                HStack(spacing: 8) {
                    Image(systemName: "book.closed.fill")
                        .font(.system(size: 16))
                        .foregroundStyle(Color(red: 0.76, green: 0.55, blue: 0.18))
                    
                    Text("Versículo do Dia")
                        .font(.system(size: 14, weight: .semibold, design: .rounded))
                        .foregroundStyle(Color(red: 0.45, green: 0.32, blue: 0.09))
                }
                
                Divider()
                    .background(Color(red: 0.76, green: 0.55, blue: 0.18).opacity(0.3))
                
                // Texto do versículo
                Text(entry.verse)
                    .font(.system(size: 17, weight: .regular, design: .serif))
                    .foregroundStyle(Color(red: 0.15, green: 0.1, blue: 0.03))
                    .lineSpacing(4)
                    .lineLimit(6)
                    .minimumScaleFactor(0.85)
                
                Spacer(minLength: 0)
                
                // Referência em destaque
                HStack {
                    Spacer()
                    Text(entry.reference)
                        .font(.system(size: 15, weight: .bold, design: .rounded))
                        .foregroundStyle(Color(red: 0.6, green: 0.42, blue: 0.1))
                }
                
                // Rodapé
                HStack {
                    Spacer()
                    Text("Sola Scriptura BR")
                        .font(.system(size: 10, weight: .light, design: .rounded))
                        .foregroundStyle(Color(red: 0.6, green: 0.45, blue: 0.12).opacity(0.5))
                }
            }
            .padding(16)
        }
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
    }
}

// MARK: - Preview

#if DEBUG
struct VerseWidget_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            VerseWidgetView(entry: VerseEntry(
                verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
                reference: "João 3:16",
                date: Date()
            ))
            .previewContext(WidgetPreviewContext(family: .accessoryRectangular))
            .previewDisplayName("Accessory Rectangular")
            
            VerseWidgetView(entry: VerseEntry(
                verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
                reference: "João 3:16",
                date: Date()
            ))
            .previewContext(WidgetPreviewContext(family: .accessoryCircular))
            .previewDisplayName("Accessory Circular")
            
            VerseWidgetView(entry: VerseEntry(
                verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
                reference: "João 3:16",
                date: Date()
            ))
            .previewContext(WidgetPreviewContext(family: .systemMedium))
            .previewDisplayName("System Medium")
            
            VerseWidgetView(entry: VerseEntry(
                verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
                reference: "João 3:16",
                date: Date()
            ))
            .previewContext(WidgetPreviewContext(family: .systemLarge))
            .previewDisplayName("System Large")
        }
    }
}
#endif
