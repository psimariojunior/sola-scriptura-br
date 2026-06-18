import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';

const niveisContexto = [
  {
    num: 'I',
    titulo: 'Contexto Imediato',
    desc: 'Os versículos vizinhos. A sentença, o parágrafo e a unidade de pensamento que envolvem diretamente a passagem. Aqui mora a primeira e mais óbvia salvaguarda contra o falseamento do texto.',
  },
  {
    num: 'II',
    titulo: 'Contexto do Capítulo',
    desc: 'O fluxo do argumento dentro do capítulo. Onde a passagem começa e termina, qual pergunta está sendo respondida, qual tensão está sendo resolvida.',
  },
  {
    num: 'III',
    titulo: 'Contexto do Livro',
    desc: 'O propósito, o tema, o enredo e a estrutura da obra inteira. Cada livro tem uma tese teológica que disciplina a leitura de suas partes.',
  },
  {
    num: 'IV',
    titulo: 'Contexto do Testamento',
    desc: 'Antigo ou Novo. O pacto no qual a passagem se insere, a economia da revelação vigente, o povo a quem originalmente se dirigia.',
  },
  {
    num: 'V',
    titulo: 'Contexto Canônico',
    desc: 'O testemunho de toda a Escritura. A Escritura interpreta a Escritura. O todo governa as partes, e cada parte resplende à luz do conjunto.',
  },
];

const generos = [
  { nome: 'Narrativa', simbolo: 'Ν', desc: 'História contada como relato — Gênesis, Josué, Reis, Atos. Os atos de Deus no tempo. Ler pelo enredo, não por provas doutrinárias isoladas.' },
  { nome: 'Profecia', simbolo: 'Π', desc: 'Pregação da aliança ao povo de Deus. Inclui denúncia, exortação, promessa. Aponta para o cumprimento em Cristo e no Reino vindouro.' },
  { nome: 'Lei', simbolo: 'Λ', desc: 'Torah — instrução e estatuto da aliança. Pentateuco. Revela o caráter de Deus e a gravidade do pecado; cumpre-se em Cristo e na lei do amor.' },
  { nome: 'Poesia', simbolo: 'Ψ', desc: 'Salmos e cânticos. Linguagem figurada, paralelismo, emoção devocional. Não se traduz como doutrina descritiva literal, mas como oração do povo de Deus.' },
  { nome: 'Sabedoria', simbolo: 'Σ', desc: 'Provérbios, Jó, Eclesiastes, Cânticos. Reflexão sobre a vida sob o temor do Senhor. Diversos gêneros: provérbio, diálogo, meditação, canto.' },
  { nome: 'Evangelho', simbolo: 'Ε', desc: 'Quatro retratos de Cristo. Narrativa teológica sobre a pessoa e obra de Jesus. Cada evangelista seleciona, organiza e interpreta sob o Espírito.' },
  { nome: 'Epístola', simbolo: 'Η', desc: 'Cartas pastorais à igreja. Situadas em um problema concreto. A doutrina nasce do cuidado — ler primeiro a ocasião, depois a teologia.' },
  { nome: 'Apocalíptica', simbolo: 'Α', desc: 'Apocalipse e porções de Daniel e Ezequiel. Imagem, símbolo, número, visão. Não é código secreto a ser decifrado, mas revelação a ser cantada.' },
];

const principios = [
  { titulo: 'Scriptura Scripturam interpretatur', sub: 'A Escritura interpreta a Escritura', desc: 'As passagens mais claras iluminam as mais obscuras. Jamais isolamos um texto contra o testemunho conjunto.' },
  { titulo: 'Analogia da fé', sub: 'A unidade da doutrina', desc: 'Nenhuma passagem pode ser interpretada de modo a contradizer o ensino claro de toda a Bíblia. O conjunto governa as partes.' },
  { titulo: 'Contexto histórico-gramatical', sub: 'Sentido original', desc: 'Busca-se o que o autor quis dizer aos primeiros destinatários, na sua língua, na sua história, no seu gênero — antes de aplicar.' },
  { titulo: 'Cristo como centro', sub: 'O cânon é cristológico', desc: 'Toda a Escritura testemunha de Cristo. Ele mesmo o afirmou na estrada de Emaús. Ler o AT sem Cristo é ler um texto mutilado.' },
  { titulo: 'Iluminação do Espírito', sub: 'Necessária, não autônoma', desc: 'O Espírito que inspirou a Escritura ilumina o leitor. Mas a iluminação não substitui o estudo — ela o santifica.' },
  { titulo: 'Sensibilidade ao gênero', sub: 'Como ler o que se lê', desc: 'A poesia não se lê como a lei. A profecia não se lê como a narrativa. O gênero disciplina o método de interpretação.' },
];

export default function ExegesePage() {
  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-16 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Arte & Ciência</p>
            <h1 className="font-display text-5xl font-light text-foreground">Exegese & Hermenêutica</h1>
            <div className="ornamento w-32 mx-auto mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 leading-relaxed">
              Exegese é tirar do texto o que nele está. Hermenêutica é a ciência de interpretar
              com retidão. Aqui se aprende a ler a Escritura como ela pede para ser lida.
            </p>
          </div>

          <section className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-display text-3xl font-medium text-primary whitespace-nowrap">Os Cinco Níveis de Contexto</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <p className="font-serif-body text-base text-foreground/85 leading-relaxed mb-10 drop-cap">
              Um texto fora do contexto é pretexto. O cuidado exegético começa em situar cada passagem
              em círculos concêntricos de significado — do mais próximo ao mais amplo — antes de concluir
              o que ela diz e o que ela exige. Ler fora de qualquer desses níveis é ler pela metade.
            </p>

            <div className="space-y-6">
              {niveisContexto.map((n) => (
                <article key={n.num} className="sola-card p-7 flex gap-6">
                  <span className="font-display text-5xl text-primary/50 leading-none shrink-0 w-12 text-center">
                    {n.num}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">{n.titulo}</h3>
                    <p className="font-serif-body text-sm text-foreground/80 leading-relaxed">{n.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-display text-3xl font-medium text-primary whitespace-nowrap">Gêneros Literários</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <p className="font-serif-body text-base text-foreground/85 leading-relaxed mb-10">
              A Bíblia não é um livro único — é uma biblioteca. Cada gênero exige um modo de leitura
              distinto, como quem lê um poema não lê um contrato. Conhecer o gênero é metade do trabalho
              da interpretação.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/40 border border-border/40">
              {generos.map((g) => (
                <div key={g.nome} className="bg-card p-7">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-3xl text-primary/70 leading-none mt-1">{g.simbolo}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">{g.nome}</h3>
                      <p className="font-serif-body text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-display text-3xl font-medium text-primary whitespace-nowrap">Princípios Hermenêuticos</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <div className="space-y-8">
              {principios.map((p, i) => (
                <div key={p.titulo} className="grid grid-cols-[auto_1fr] gap-6">
                  <span className="font-display text-2xl text-primary/40 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{p.titulo}</h3>
                    <p className="font-serif-body italic text-sm text-muted-foreground mb-2">{p.sub}</p>
                    <p className="font-serif-body text-sm text-foreground/80 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="sola-card p-12 text-center mt-20">
            <div className="ornamento w-24 mx-auto mb-6" />
            <p className="font-display italic text-3xl text-foreground leading-snug max-w-2xl mx-auto">
              &laquo;Procurai com diligência o sentido exato das Escrituras&raquo;
            </p>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mt-4">
              O dever do intérprete · Soli Deo Gloria
            </p>
          </div>
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
