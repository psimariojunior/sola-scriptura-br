const BRAND = {
  primary: '#1A1A2E',
  accent: '#C9A96E',
  light: '#F5F5F0',
  text: '#333333',
  muted: '#666666',
  white: '#FFFFFF',
};

function baseLayout(title: string, content: string): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.light};font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.light};padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:${BRAND.white};border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:${BRAND.primary};padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:${BRAND.accent};font-size:24px;letter-spacing:1px;">SOLA SCRIPTURA</h1>
              <p style="margin:4px 0 0;color:${BRAND.white};font-size:12px;letter-spacing:2px;opacity:0.7;">ESTUDO BÍBLICO ACADÊMICO</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color:${BRAND.primary};padding:24px 40px;text-align:center;">
              <p style="margin:0;color:${BRAND.white};font-size:11px;opacity:0.6;">© ${new Date().getFullYear()} Sola Scriptura BR — Estudo Bíblico Acadêmico</p>
              <p style="margin:8px 0 0;color:${BRAND.accent};font-size:11px;">
                <a href="#" style="color:${BRAND.accent};text-decoration:none;">Cancelar inscrição</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function btn(href: string, label: string): string {
  return `
    <a href="${href}" style="display:inline-block;background-color:${BRAND.accent};color:${BRAND.primary};text-decoration:none;padding:14px 32px;border-radius:6px;font-weight:600;font-size:14px;margin-top:16px;">
      ${label}
    </a>`;
}

export function welcomeEmail(name: string): string {
  const content = `
    <h2 style="margin:0 0 8px;color:${BRAND.primary};font-size:22px;">Bem-vindo, ${name}!</h2>
    <p style="margin:0 0 20px;color:${BRAND.muted};font-size:14px;line-height:1.6;">
      Sua jornada de estudo bíblico acadêmico começa agora. Explore traduções, idiomas originais, exegese automática e muito mais.
    </p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
    <h3 style="margin:0 0 12px;color:${BRAND.primary};font-size:16px;">O que você pode fazer agora:</h3>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:8px 0;color:${BRAND.text};font-size:14px;">📖 Leia a Bíblia em múltiplas traduções</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:${BRAND.text};font-size:14px;">🔤 Estude grego e hebraico originais</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:${BRAND.text};font-size:14px;">🤖 Use nosso assistente de IA para exegese</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:${BRAND.text};font-size:14px;">📊 Salve e organize seus estudos</td>
      </tr>
    </table>
    ${btn('#', 'Começar Agora')}
  `;
  return baseLayout('Bem-vindo ao Sola Scriptura', content);
}

export function passwordResetEmail(name: string, resetUrl: string): string {
  const content = `
    <h2 style="margin:0 0 8px;color:${BRAND.primary};font-size:22px;">Redefinição de Senha</h2>
    <p style="margin:0 0 16px;color:${BRAND.muted};font-size:14px;line-height:1.6;">
      Olá ${name}, solicitamos a redefinição da sua senha. Clique no botão abaixo para criar uma nova senha.
    </p>
    <p style="margin:0;color:${BRAND.text};font-size:13px;">
      Se você não solicitou esta alteração, ignore este e-mail.
    </p>
    ${btn(resetUrl, 'Redefinir Senha')}
    <p style="margin:24px 0 0;color:${BRAND.muted};font-size:12px;line-height:1.5;">
      Este link expira em 24 horas por segurança.
    </p>
  `;
  return baseLayout('Redefinição de Senha', content);
}

export function weeklyStudySummary(
  name: string,
  stats: { chaptersRead: number; hoursStudied: number; streak: number }
): string {
  const content = `
    <h2 style="margin:0 0 4px;color:${BRAND.primary};font-size:22px;">Resumo Semanal</h2>
    <p style="margin:0 0 24px;color:${BRAND.muted};font-size:14px;">Veja como foi sua semana de estudo, ${name}.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.light};border-radius:8px;overflow:hidden;">
      <tr>
        <td width="33%" align="center" style="padding:24px 12px;border-right:1px solid #e0e0e0;">
          <p style="margin:0 0 4px;font-size:28px;font-weight:700;color:${BRAND.accent};">${stats.chaptersRead}</p>
          <p style="margin:0;color:${BRAND.muted};font-size:12px;">Capítulos Lidos</p>
        </td>
        <td width="34%" align="center" style="padding:24px 12px;border-right:1px solid #e0e0e0;">
          <p style="margin:0 0 4px;font-size:28px;font-weight:700;color:${BRAND.accent};">${stats.hoursStudied}h</p>
          <p style="margin:0;color:${BRAND.muted};font-size:12px;">Horas de Estudo</p>
        </td>
        <td width="33%" align="center" style="padding:24px 12px;">
          <p style="margin:0 0 4px;font-size:28px;font-weight:700;color:${BRAND.accent};">${stats.streak}</p>
          <p style="margin:0;color:${BRAND.muted};font-size:12px;">Dias de Sequência</p>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;">
      Continue firme! "Estuda para apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade." — 2 Timóteo 2:15
    </p>
    ${btn('#', 'Continuar Estudando')}
  `;
  return baseLayout('Seu Resumo Semanal', content);
}

export function newFeatureAnnouncement(
  title: string,
  description: string,
  ctaLabel: string = 'Saiba Mais'
): string {
  const content = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.primary};border-radius:8px;overflow:hidden;margin-bottom:24px;">
      <tr>
        <td style="padding:32px 28px;text-align:center;">
          <p style="margin:0 0 4px;color:${BRAND.accent};font-size:12px;letter-spacing:2px;text-transform:uppercase;">Novidade</p>
          <h2 style="margin:0;color:${BRAND.white};font-size:22px;">${title}</h2>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;color:${BRAND.text};font-size:14px;line-height:1.7;">${description}</p>
    ${btn('#', ctaLabel)}
  `;
  return baseLayout(title, content);
}
