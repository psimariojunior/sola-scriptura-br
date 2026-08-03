import WidgetKit

/// Modelo de dados para o versículo do dia
/// Contém o texto do versículo, referência bíblica e data
struct VerseEntry: TimelineEntry {
    let verse: String
    let reference: String
    let date: Date
}
