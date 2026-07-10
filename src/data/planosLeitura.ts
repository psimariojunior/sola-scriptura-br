export interface LeituraDia {
  dia: number;
  titulo: string;
  passagens: Array<{ livro: string; capitulo: number; versiculoInicio?: number; versiculoFim?: number }>;
}

export const planos: Record<string, { nome: string; desc: string; totalDias: number }> = {
  biblicoEm1Ano: { nome: 'Bíblia em 1 Ano', desc: 'Leia a Bíblia completa em 365 dias', totalDias: 365 },
  ntEm30Dias: { nome: 'Novo Testamento em 30 Dias', desc: 'Leia o NT em um mês', totalDias: 30 },
  sabedoria: { nome: 'Sabedoria em 31 Dias', desc: 'Provérbios e Sabedoria', totalDias: 31 },
  evangelhos: { nome: 'Evangelhos em 40 Dias', desc: 'Mateus, Marcos, Lucas, João', totalDias: 40 },
  salmos: { nome: 'Salmos em 60 Dias', desc: 'Leia todos os Salmos', totalDias: 60 },
};

function lerDia(dia: number, total: number, base: number, salto: number): number {
  return base + ((dia - 1) * salto);
}

export function gerarPlano(id: string): LeituraDia[] {
  const dias: LeituraDia[] = [];

  switch (id) {
    case 'biblicoEm1Ano':
      // AT pela manhã, NT à noite
      for (let d = 1; d <= 365; d++) {
        const dia: LeituraDia = { dia: d, titulo: `Dia ${d}`, passagens: [] };
        // AT: 3 capítulos por dia
        const atInicio = lerDia(d, 365, 1, 3);
        if (atInicio <= 929) {
          dia.passagens.push({ livro: 'gn', capitulo: atInicio });
          if (atInicio + 1 <= 929) dia.passagens.push({ livro: 'gn', capitulo: atInicio + 1 });
          if (atInicio + 2 <= 929) dia.passagens.push({ livro: 'gn', capitulo: atInicio + 2 });
        }
        // NT: 1 capítulo por dia
        const ntInicio = lerDia(d, 365, 1, 1);
        if (ntInicio <= 260) {
          dia.passagens.push({ livro: 'mt', capitulo: ntInicio });
        }
        dias.push(dia);
      }
      break;

    case 'ntEm30Dias':
      for (let d = 1; d <= 30; d++) {
        const inicio = lerDia(d, 30, 1, 9);
        dias.push({
          dia: d,
          titulo: `Dia ${d}`,
          passagens: Array.from({ length: 9 }, (_, i) => {
            const cap = inicio + i;
            return { livro: 'mt', capitulo: cap > 260 ? cap - 260 : cap };
          }),
        });
      }
      break;

    case 'sabedoria':
      for (let d = 1; d <= 31; d++) {
        dias.push({
          dia: d,
          titulo: `Provérbios ${d}`,
          passagens: [{ livro: 'pv', capitulo: d }],
        });
      }
      break;

    case 'evangelhos':
      {
        const livros = ['mt', 'mc', 'lc', 'jo'];
        let idx = 0;
        for (let d = 1; d <= 40; d++) {
          const l = livros[Math.min(Math.floor((d - 1) / 10), 3)];
          dias.push({
            dia: d,
            titulo: `${d} - ${l}`,
            passagens: [{ livro: l, capitulo: ((d - 1) % 10) + 1 }],
          });
        }
      }
      break;

    case 'salmos':
      for (let d = 1; d <= 60; d++) {
        dias.push({
          dia: d,
          titulo: `Salmo ${d}`,
          passagens: [{ livro: 'sl', capitulo: d }],
        });
      }
      break;

    default:
      dias.push({ dia: 1, titulo: 'Início', passagens: [{ livro: 'gn', capitulo: 1 }] });
  }

  return dias;
}
