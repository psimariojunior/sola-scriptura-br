import WidgetKit

/// Provider que fornece os dados do versículo do dia para o widget
/// Utiliza TimelineProvider para atualizar o conteúdo a cada 24h
struct VerseTimelineProvider: TimelineProvider {
    
    /// Versículos populares para fallback
    /// Caso não consiga buscar dados externos, usa esta lista
    private let fallbackVerses: [(verse: String, reference: String)] = [
        ("Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", "João 3:16"),
        ("O Senhor é o meu pastor; nada me faltará.", "Salmos 23:1"),
        ("Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.", "Provérbios 3:5"),
        ("Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.", "Jeremias 29:11"),
        ("Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", "Mateus 11:28"),
        ("E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.", "Romanos 8:28"),
        ("O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?", "Salmos 27:1"),
        ("Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.", "Isaías 40:31"),
        ("Deem graças ao Senhor porque ele é bom; o seu amor dura para sempre.", "Salmos 136:1"),
        ("Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação.", "2 Timóteo 1:7"),
        ("Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.", "Salmos 23:4"),
        ("Buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.", "Mateus 6:33"),
        ("Tudo posso naquele que me fortalece.", "Filipenses 4:13"),
        ("O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.", "1 Coríntios 13:4"),
        ("Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.", "Romanos 6:23")
    ]
    
    /// Placeholder inicial antes de carregar dados reais
    func placeholder(in context: Context) -> VerseEntry {
        VerseEntry(
            verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
            reference: "João 3:16",
            date: Date()
        )
    }
    
    /// Snapshot para visualização no Xcode
    func getSnapshot(in context: Context, completion: @escaping (VerseEntry) -> Void) {
        let entry = VerseEntry(
            verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
            reference: "João 3:16",
            date: Date()
        )
        completion(entry)
    }
    
    /// Timeline principal - gera entradas para cada dia
    func getTimeline(in context: Context, completion: @escaping (Timeline<VerseEntry>) -> Void) {
        let verse = getVerseForToday()
        
        let entry = VerseEntry(
            verse: verse.verse,
            reference: verse.reference,
            date: Date()
        )
        
        // Próxima atualização: meia-noite do dia seguinte
        let nextUpdate = Calendar.current.startOfDay(for: Date().addingTimeInterval(86400))
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        
        completion(timeline)
    }
    
    /// Retorna o versículo para o dia atual
    /// Usa o dia do ano como índice para selecionar um versículo
    private func getVerseForToday() -> (verse: String, reference: String) {
        // Tenta buscar do UserDefaults (app pode atualizar via bridge)
        if let savedVerse = UserDefaults(suiteName: "group.com.solascriptura.widget") {
            if let verse = savedVerse.string(forKey: "daily_verse"),
               let reference = savedVerse.string(forKey: "daily_reference") {
                return (verse, reference)
            }
        }
        
        // Fallback: usa o dia do ano para selecionar um versículo da lista
        let calendar = Calendar.current
        let dayOfYear = calendar.ordinality(of: .day, in: .year, for: Date()) ?? 1
        let index = (dayOfYear - 1) % fallbackVerses.count
        
        return fallbackVerses[index]
    }
}
