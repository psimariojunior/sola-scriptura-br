# Licenças das traduções bíblicas empacotadas localmente

Este documento lista a licença e a fonte de **cada tradução bíblica cujo texto
integral está versionado neste repositório** em `src/data/biblia/texto/<id>/`
(carregadas localmente, sem depender de API externa). Traduções que só existem
via API Midvash (`ntlh`, `naa`, `nvt`, `kja`, `aa`, `nbv`, `as21`, `jfaa`, `kjf`,
`msgpt`, `bpm`, `nva`, `esv`, `niv`, `nkjv`, `nlt`, `rvr1960`, `lsg`) não estão
listadas aqui porque nenhum texto delas é armazenado no repositório — apenas o
código consome a API de terceiros em tempo real.

## ⚠️ Traduções protegidas por direitos autorais (risco jurídico)

As três traduções abaixo estão **protegidas por direitos autorais** e seu texto
integral está versionado no repositório sem uma licença explícita de
redistribuição. Isso representa um **risco jurídico real** para um app público
sem fins lucrativos que redistribui o texto integral offline.

| ID | Nome | Detentor dos direitos | Ano | Observação |
|----|------|------------------------|-----|------------|
| `acf` | Almeida Corrigida Fiel | Sociedade Bíblica Trinitariana do Brasil | 2015 (revisão) | Copyright ativo. Uso público requer licenciamento/autorização. |
| `ara` | Almeida Revista e Atualizada | Sociedade Bíblica do Brasil (SBB) | 1993 | Copyright ativo. Uso público requer licenciamento/autorização. |
| `nvi` | Nova Versão Internacional | Biblica, Inc. (International Bible Society) | 2000 | Copyright ativo. Uso público requer licenciamento/autorização. |

**Recomendação:** manter essas três traduções empacotadas é um risco jurídico
que deve ser resolvido pelo dono do produto — seja obtendo uma licença formal
de redistribuição junto à Trinitariana/SBB/Biblica, seja removendo o texto
integral do repositório e substituindo por chamada à API Midvash (como já é
feito para `naa`, `ntlh`, `nvt` etc.) ou pelas alternativas livres listadas
abaixo. Esta tarefa **não removeu nem alterou** os arquivos de `acf`, `ara` ou
`nvi` — essa decisão cabe ao dono do produto.

## ✅ Traduções de domínio público ou licença livre já existentes

| ID | Nome | Ano | Licença | Fonte |
|----|------|-----|---------|-------|
| `arc` | Almeida Revista e Corrigida | 1898 (base) | Domínio público (edições anteriores a 1951 da tradução de João Ferreira de Almeida) | Texto amplamente distribuído em domínio público em português |
| `kjv` | King James Version | 1611 | Domínio público (fora do Reino Unido; a Coroa britânica detém direitos de impressão apenas dentro do Reino Unido) | Texto amplamente distribuído em domínio público |
| `web` | World English Bible | 2000 | Domínio público (declarado explicitamente pelo tradutor/editor, sem restrições de uso) | [ebible.org/web](https://ebible.org/web/) |

## ✅ Traduções de domínio público / licença livre adicionadas nesta tarefa

| ID | Nome | Ano | Licença | Fonte |
|----|------|-----|---------|-------|
| `alm1911` | Almeida 1911 (Revista e Corrigida, edição de 1911) | 1911 | **Domínio público** — edição mais recente de Almeida que já caiu em domínio público no Brasil | JSON convertido de [github.com/damarals/biblias](https://github.com/damarals/biblias) (release `ALM1911.json`, formato "thiagobodruk/biblia") |
| `blivre` | Bíblia Livre (BLIVRE) | 2018 | **Creative Commons Atribuição 3.0 Brasil (CC BY 3.0 BR)** — modernização ortográfica/linguística da Almeida 1819 | JSON convertido de [github.com/damarals/biblias](https://github.com/damarals/biblias) (release `BLIVRE.json`); projeto original: [bibliaportugues.com/blivre](https://www.bibliaportugues.com/) |
| `jfaal` | João Ferreira de Almeida Atualizada Livre (JFAAL) | 2023 (revisão) | **Creative Commons Atribuição 3.0 Brasil (CC BY 3.0 BR)** — base Almeida 1911 (domínio público) com revisão gramatical assistida por IA (GPT-4), mantendo o sentido original | JSON convertido de [github.com/BibliaJFAAL/JFAAL](https://github.com/BibliaJFAAL/JFAAL) (arquivo `atualizada/1911-JFAAtualizadaLivre.json`) |

### Atribuição exigida (CC BY 3.0 BR)

Ao exibir `blivre` ou `jfaal` na UI, inclua um crédito visível (ex.: rodapé do
card de versículo ou tela "Sobre as traduções") com o texto:

> "Bíblia Livre" (BLIVRE) — © autores do projeto Bíblia Livre, licenciado sob
> [CC BY 3.0 BR](https://creativecommons.org/licenses/by/3.0/br/).

> "João Ferreira de Almeida Atualizada Livre" (JFAAL) — baseado na tradução de
> 1911 de João Ferreira de Almeida (domínio público), revisado pelo projeto
> [BibliaJFAAL/JFAAL](https://github.com/BibliaJFAAL/JFAAL), licenciado sob
> [CC BY 3.0 BR](https://creativecommons.org/licenses/by/3.0/br/).

`alm1911` é domínio público, então não há exigência legal de atribuição, mas é
uma boa prática citar a fonte dos dados (ver tabela acima).

## Como os dados foram gerados

O script [`scripts/gerar-traducao-dominio-publico.mjs`](../../../../scripts/gerar-traducao-dominio-publico.mjs)
baixa os JSONs brutos das fontes acima (com cache local em
`scripts/_tmp_licenciamento/`) e os converte para o mesmo formato por-livro
usado por `arc/`, `kjv/`, etc. (`Record<numeroDoCapitulo, string[]>` por
arquivo `<abreviacao>.ts`, mais um `index.ts` agregador). Para reprocessar ou
adicionar novas traduções no mesmo formato:

```bash
node scripts/gerar-traducao-dominio-publico.mjs --fonte alm1911
node scripts/gerar-traducao-dominio-publico.mjs --fonte blivre
node scripts/gerar-traducao-dominio-publico.mjs --fonte jfaal
node scripts/gerar-traducao-dominio-publico.mjs --fonte todas
```

Cobertura confirmada: as três traduções trazem os **66 livros** protestantes
completos, **1189 capítulos** (total canônico correto) e ~31.100 versículos
cada (a pequena variação de 1-4 versículos entre traduções é normal e reflete
diferenças de versificação, não texto faltante).
