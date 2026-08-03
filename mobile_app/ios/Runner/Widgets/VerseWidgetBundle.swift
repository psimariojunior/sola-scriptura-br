import WidgetKit
import SwiftUI

/// Bundle principal que registra todos os widgets do app
/// Este é o ponto de entrada para o WidgetKit
@main
struct VerseWidgetBundle: WidgetBundle {
    var body: some Widget {
        VerseWidget()
    }
}
