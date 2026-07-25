import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade — Sola Scriptura',
  description:
    'Saiba como coletamos, usamos e protegemos suas informações na plataforma Sola Scriptura.',
  alternates: { canonical: '/privacidade' },
};

const sections = [
  {
    id: 'introducao',
    title: '1. Introdução',
    content: (
      <>
        <p>
          A Sola Scriptura é uma plataforma gratuita de estudo bíblico. Esta Política de Privacidade
          descreve como coletamos, usamos e protegemos suas informações quando você utiliza nosso site
          e aplicativo.
        </p>
        <p>
          Ao utilizar o Sola Scriptura, você concorda com as práticas descritas nesta política.
        </p>
      </>
    ),
  },
  {
    id: 'informacoes',
    title: '2. Informações Coletadas',
    subsections: [
      {
        subtitle: '2.1 Informações que você fornece voluntariamente',
        items: [
          'Conta de usuário: nome, e-mail e senha (quando você cria uma conta)',
          'Dados de estudo: favoritos, anotações, progresso de leitura e cursos',
          'Preferências: tema, idioma e configurações de leitura',
          'Conteúdo gerado: notas pessoais e coleções de versículos',
        ],
      },
      {
        subtitle: '2.2 Informações coletadas automaticamente',
        items: [
          'Dados de uso: páginas visitadas, tempo de leitura, versículos acessados',
          'Informações do dispositivo: tipo de dispositivo, sistema operacional, navegador',
          'Dados de localização: apenas quando você usa o Atlas Bíblico (com sua permissão)',
          'Cache e dados offline: conteúdo salvo para acesso offline',
        ],
      },
      {
        subtitle: '2.3 Serviços de terceiros',
        items: [
          'Supabase: hospedagem de dados do usuário e autenticação',
          'Groq API: processamento de perguntas ao assistente IA',
          'Cloudflare: proxy e proteção do site',
          'Google Analytics: estatísticas de uso (anonimizadas)',
        ],
      },
    ],
  },
  {
    id: 'uso',
    title: '3. Uso das Informações',
    intro: 'Utilizamos suas informações para:',
    items: [
      'Fornecer e melhorar os serviços de estudo bíblico',
      'Sincronizar seus dados entre dispositivos',
      'Processar suas perguntas ao assistente IA',
      'Enviar notificações sobre seu progresso (somente com sua permissão)',
      'Analisar o uso da plataforma para melhorias',
      'Garantir a segurança da conta',
    ],
  },
  {
    id: 'compartilhamento',
    title: '4. Compartilhamento de Dados',
    content: (
      <>
        <p>
          <strong>Não vendemos</strong> suas informações pessoais a terceiros.
        </p>
        <p>Compartilhamos dados apenas nas seguintes situações:</p>
      </>
    ),
    items: [
      'Com seu consentimento: quando você opta por compartilhar versículos ou progresso',
      'Por obrigação legal: quando exigido por lei ou ordem judicial',
      'Com prestadores de serviço: empresas que nos ajudam a operar (hospedagem, análise), sob acordos de confidencialidade',
    ],
  },
  {
    id: 'armazenamento',
    title: '5. Armazenamento e Segurança',
    subsections: [
      {
        subtitle: '5.1 Armazenamento',
        items: [
          'Dados da conta são armazenados em servidores seguros (Supabase)',
          'Dados de estudo (favoritos, notas) são armazenados localmente no seu dispositivo e sincronizados quando você tem uma conta',
          'Cache offline é mantido no navegador para acesso sem internet',
        ],
      },
      {
        subtitle: '5.2 Segurança',
        items: [
          'Senhas são criptografadas (não armazenadas em texto plano)',
          'Comunicação é criptografada via HTTPS',
          'Acesso aos dados é restrito e monitorado',
          'Não coletamos dados sensíveis além do necessário',
        ],
      },
    ],
  },
  {
    id: 'direitos',
    title: '6. Seus Direitos',
    intro: 'Você tem direito a:',
    items: [
      'Acessar seus dados pessoais',
      'Corrigir informações incorretas',
      'Excluir sua conta e todos os dados associados',
      'Exportar seus dados em formato JSON',
      'Optar por não receber notificações',
      'Retirar consentimento a qualquer momento',
    ],
    footer: (
      <p>
        Para exercer esses direitos, entre em contato conosco ou acesse as configurações da sua
        conta.
      </p>
    ),
  },
  {
    id: 'menores',
    title: '7. Menores de Idade',
    content: (
      <>
        <p>
          O Sola Scriptura é acessível a todas as idades. Não coletamos intencionalmente dados de
          menores de 13 anos sem o consentimento de um responsável legal.
        </p>
        <p>
          Se você é menor de 13 anos, por favor, utilize o site com a supervisão de um adulto.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: '8. Cookies e Tecnologias Semelhantes',
    intro: 'Utilizamos:',
    items: [
      'Cookies essenciais: para manter sua sessão e preferências',
      'Cookies de performance: para analisar o uso da plataforma (anonimizadas)',
      'LocalStorage/IndexedDB: para dados de estudo e cache offline',
    ],
    footer: <p>Você pode gerenciar cookies nas configurações do seu navegador.</p>,
  },
  {
    id: 'notificacoes',
    title: '9. Notificações Push',
    content: (
      <p>
        As notificações push são enviadas apenas com seu consentimento explícito. Você pode
        desativá-las a qualquer momento nas configurações do dispositivo ou da conta.
      </p>
    ),
  },
  {
    id: 'alteracoes',
    title: '10. Alterações nesta Política',
    content: (
      <p>
        Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças
        significativas por e-mail ou notificação no aplicativo.
      </p>
    ),
  },
  {
    id: 'contato',
    title: '11. Contato',
    intro: 'Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato:',
    items: [
      'E-mail: contato@solascripturabr.com.br',
      'Site: https://solascripturabr.com.br',
    ],
  },
  {
    id: 'jurisdicao',
    title: '12. Jurisdição',
    content: (
      <p>Esta política é regida pelas leis da República Federativa do Brasil.</p>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Header />

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: 'var(--brand-subtle)',
                color: 'var(--brand-default)',
              }}
            >
              <Shield className="w-4 h-4" />
              Legal
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-light mb-3">
              Política de <span style={{ color: 'var(--brand-default)' }}>Privacidade</span>
            </h1>

            <p style={{ color: 'var(--muted-fg)' }} className="text-sm">
              Última atualização: Julho de 2026
            </p>

            <div
              className="w-16 h-px mx-auto mt-6"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--brand-default), transparent)',
              }}
            />
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-200"
            style={{ color: 'var(--brand-default)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>

          {/* Content */}
          <article
            className="prose-custom space-y-10"
            style={{ color: 'var(--fg)' }}
          >
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2
                  className="font-display text-2xl font-light mb-4 pb-2"
                  style={{
                    borderBottom: '1px solid var(--brand-subtle)',
                    color: 'var(--fg)',
                  }}
                >
                  {section.title}
                </h2>

                {section.content && (
                  <div
                    className="space-y-3 text-base leading-relaxed"
                    style={{ color: 'var(--muted-fg)' }}
                  >
                    {section.content}
                  </div>
                )}

                {section.intro && (
                  <p className="text-base leading-relaxed" style={{ color: 'var(--muted-fg)' }}>
                    {section.intro}
                  </p>
                )}

                {section.items && (
                  <ul className="mt-3 space-y-2">
                    {section.items.map((item, i) => {
                      const [bold, ...rest] = item.split(':');
                      return (
                        <li
                          key={i}
                          className="flex gap-3 text-base leading-relaxed"
                          style={{ color: 'var(--muted-fg)' }}
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: 'var(--brand-default)' }}
                          />
                          <span>
                            {rest.length > 0 ? (
                              <>
                                <strong style={{ color: 'var(--fg)' }}>{bold}:</strong>
                                {rest.join(':')}
                              </>
                            ) : (
                              item
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {section.subsections && (
                  <div className="space-y-6 mt-4">
                    {section.subsections.map((sub, si) => (
                      <div key={si}>
                        <h3
                          className="text-lg font-semibold mb-3"
                          style={{ color: 'var(--fg)' }}
                        >
                          {sub.subtitle}
                        </h3>
                        <ul className="space-y-2">
                          {sub.items.map((item, i) => {
                            const [bold, ...rest] = item.split(':');
                            return (
                              <li
                                key={i}
                                className="flex gap-3 text-base leading-relaxed"
                                style={{ color: 'var(--muted-fg)' }}
                              >
                                <span
                                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: 'var(--brand-default)' }}
                                />
                                <span>
                                  {rest.length > 0 ? (
                                    <>
                                      <strong style={{ color: 'var(--fg)' }}>{bold}:</strong>
                                      {rest.join(':')}
                                    </>
                                  ) : (
                                    item
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {section.footer && (
                  <div
                    className="mt-3 text-base leading-relaxed"
                    style={{ color: 'var(--muted-fg)' }}
                  >
                    {section.footer}
                  </div>
                )}
              </section>
            ))}
          </article>

          {/* Bottom back link */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300"
              style={{
                background: 'var(--brand-default)',
                color: 'var(--brand-contrast)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
