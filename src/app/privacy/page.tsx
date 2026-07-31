export const metadata = {
  title: "Política de Privacidade — Sola Scriptura BR",
  description: "Política de privacidade do aplicativo Sola Scriptura BR",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Política de Privacidade</h1>
      <p className="text-sm text-muted-foreground">
        Última atualização: 31 de julho de 2026
      </p>

      <h2>1. Introdução</h2>
      <p>
        A Sola Scriptura BR valoriza a privacidade dos seus usuários. Esta
        Política de Privacidade descreve como coletamos, usamos e protegemos
        informações quando você utiliza nosso aplicativo móvel e site.
      </p>

      <h2>2. Dados Coletados</h2>
      <p>
        Nosso aplicativo foi projetado para funcionar com o mínimo de dados
        possível. A maioria dos seus dados permanece <strong>armazenada
        localmente no seu dispositivo</strong> e nunca é enviada para nossos
        servidores.
      </p>

      <h3>2.1 Dados Armazenados Localmente (no seu dispositivo)</h3>
      <ul>
        <li><strong>Favoritos</strong> — Versículos que você marcou como favoritos</li>
        <li><strong>Notas pessoais</strong> — Anotações vinculadas a versículos</li>
        <li><strong>Coleções</strong> — Listas personalizadas de versículos</li>
        <li><strong>Progresso de leitura</strong> — Capítulos e versículos lidos</li>
        <li><strong>Planos de leitura</strong> — Seus planos personalizados</li>
        <li><strong>Configurações</strong> — Tema, idioma, preferências</li>
        <li><strong>Flashcards</strong> — Cartões de memorização</li>
        <li><strong>Dados de gamificação</strong> — Conquistas e streaks</li>
      </ul>
      <p>
        Esses dados são armazenados exclusivamente no dispositivo using
        SharedPreferences e IndexedDB. Eles <strong>não são enviados</strong>
        para nossos servidores nem para terceiros.
      </p>

      <h3>2.2 Dados Enviados Para Nossos Servidores</h3>
      <ul>
        <li>
          <strong>Token FCM (Firebase Cloud Messaging)</strong> — Usado
          exclusivamente para enviar notificações push que você optou por
          receber. O token é necessário para o funcionamento do sistema de
          notificações.
        </li>
        <li>
          <strong>Perguntas ao Assistente IA</strong> — Quando você utiliza o
          chat com IA, suas perguntas são processadas via API Groq para gerar
          respostas sobre estudo bíblico. Essas perguntas não são armazenadas
          permanentemente.
        </li>
      </ul>

      <h3>2.3 Analytics</h3>
      <p>
        Utilizamos o <strong>Firebase Analytics</strong> para coletar dados
        anônimos de uso do aplicativo, como telas visitadas, duração de sessão
        e erros发生idos. Esses dados ajudam-nos a melhorar a experiência dos
        usuários. Nenhum dado pessoal identificável é coletado via analytics.
      </p>

      <h2>3. Como Usamos os Dados</h2>
      <ul>
        <li>Para fornecer e manter o funcionamento do aplicativo</li>
        <li>Para enviar notificações push que você solicitou</li>
        <li>Para melhorar a experiência de estudo bíblico</li>
        <li>Para detectar e corrigir erros (Crashlytics)</li>
        <li>Para entender como o aplicativo é utilizado (analytics anônimo)</li>
      </ul>

      <h2>4. Compartilhamento de Dados</h2>
      <p>
        <strong>Não vendemos, alugamos ou compartilhamos seus dados pessoais
        com terceiros.</strong>
      </p>
      <p>
        Os únicos serviços externos utilizados são:
      </p>
      <ul>
        <li><strong>Firebase (Google)</strong> — Para notificações push, analytics
          anônimo e monitoramento de erros</li>
        <li><strong>Groq</strong> — Para processamento de perguntas ao assistente
          de IA</li>
      </ul>
      <p>
        Ambos operam conforme suas próprias políticas de privacidade.
      </p>

      <h2>5. Publicidade</h2>
      <p>
        <strong>O Sola Scriptura BR não contém anúncios.</strong> Não exibimos
        publicidade de nenhum tipo no aplicativo.
      </p>

      <h2>6. Segurança</h2>
      <p>
        Implementamos medidas de segurança técnicas e organizacionais para
        proteger seus dados, incluindo criptografia em trânsito (HTTPS/TLS)
        e armazenamento seguro de chaves de acesso.
      </p>

      <h2>7. Privacidade de Crianças</h2>
      <p>
        Nosso aplicativo não é direcionado a crianças menores de 13 anos. Não
        coletamos intencionalmente dados de crianças.
      </p>

      <h2>8. Seus Direitos</h2>
      <p>
        Como todos os dados principais são armazenados localmente no seu
        dispositivo, você tem total controle sobre eles. Você pode:
      </p>
      <ul>
        <li>Excluir favoritos, notas e coleções a qualquer momento pelo
          aplicativo</li>
        <li>Desinstalar o aplicativo para remover todos os dados locais</li>
        <li>Desativar notificações push nas configurações do dispositivo</li>
      </ul>

      <h2>9. Alterações nesta Política</h2>
      <p>
        Podemos atualizar esta Política de Privacidade periodicamente. Notas
        sobre alterações significativas serão disponibilizadas no aplicativo.
      </p>

      <h2>10. Contato</h2>
      <p>
        Se você tiver dúvidas sobre esta Política de Privacidade, entre em
        contato conosco:
      </p>
      <p>
        <strong>E-mail:</strong>{" "}
        <a href="mailto:contato@solascripturabr.com.br">
          contato@solascripturabr.com.br
        </a>
      </p>
      <p>
        <strong>Site:</strong>{" "}
        <a href="https://solascripturabr.com.br">
          solascripturabr.com.br
        </a>
      </p>
    </main>
  );
}
