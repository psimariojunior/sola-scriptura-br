import { Injectable, Logger } from '@nestjs/common';

interface EventoCronologico {
  data: string;
  evento: string;
  referencia: string;
  categoria: string;
  periodo: string;
}

interface LinhaTempo {
  periodos: Array<{
    nome: string;
    inicio: string;
    fim: string;
    eventos: EventoCronologico[];
  }>;
}

const LINHA_TEMPO_BIBLICA: Record<string, EventoCronologico[]> = {
  patriarcas: [
    { data: 'c. 2166 a.C.', evento: 'Nascimento de Abraão', referencia: 'Gn 11:26', categoria: 'pessoa', periodo: 'Patriarcas' },
    { data: 'c. 2091 a.C.', evento: 'Chamado de Abraão', referencia: 'Gn 12:1-4', categoria: 'evento', periodo: 'Patriarcas' },
    { data: 'c. 2066 a.C.', evento: 'Nascimento de Isaque', referencia: 'Gn 21:1-5', categoria: 'pessoa', periodo: 'Patriarcas' },
    { data: 'c. 2006 a.C.', evento: 'Nascimento de Jacó', referencia: 'Gn 25:24-26', categoria: 'pessoa', periodo: 'Patriarcas' },
    { data: 'c. 1915 a.C.', evento: 'José no Egito', referencia: 'Gn 41:41', categoria: 'pessoa', periodo: 'Patriarcas' },
    { data: 'c. 1876 a.C.', evento: 'Jacó desce ao Egito', referencia: 'Gn 46:1-7', categoria: 'evento', periodo: 'Patriarcas' },
  ],
  exodo: [
    { data: 'c. 1526 a.C.', evento: 'Nascimento de Moisés', referencia: 'Ex 2:1-10', categoria: 'pessoa', periodo: 'Êxodo' },
    { data: 'c. 1446 a.C.', evento: 'Êxodo do Egito', referencia: 'Ex 12:31-42', categoria: 'evento', periodo: 'Êxodo' },
    { data: 'c. 1446 a.C.', evento: 'Recepção da Lei no Sinai', referencia: 'Ex 20:1-17', categoria: 'evento', periodo: 'Êxodo' },
    { data: 'c. 1406 a.C.', evento: 'Entrada em Canaã', referencia: 'Js 3:14-17', categoria: 'evento', periodo: 'Êxodo' },
  ],
  juizes: [
    { data: 'c. 1390 a.C.', evento: 'Período dos Juízes', referencia: 'Jz 2:16-23', categoria: 'evento', periodo: 'Juízes' },
    { data: 'c. 1100 a.C.', evento: 'Débora e Baraque', referencia: 'Jz 4-5', categoria: 'pessoa', periodo: 'Juízes' },
    { data: 'c. 1050 a.C.', evento: 'Samuel, último juiz', referencia: '1Sm 7:15-17', categoria: 'pessoa', periodo: 'Juízes' },
  ],
  reis: [
    { data: 'c. 1050 a.C.', evento: 'Saul torna-se rei', referencia: '1Sm 10:1', categoria: 'pessoa', periodo: 'Reino Unido' },
    { data: 'c. 1010 a.C.', evento: 'Davi torna-se rei', referencia: '2Sm 5:1-5', categoria: 'pessoa', periodo: 'Reino Unido' },
    { data: 'c. 970 a.C.', evento: 'Salomão torna-se rei', referencia: '1Rs 1:28-40', categoria: 'pessoa', periodo: 'Reino Unido' },
    { data: 'c. 966 a.C.', evento: 'Dedicação do Templo', referencia: '1Rs 8:1-66', categoria: 'evento', periodo: 'Reino Unido' },
    { data: 'c. 931 a.C.', evento: 'Divisão do Reino', referencia: '1Rs 12:1-24', categoria: 'evento', periodo: 'Reino Dividido' },
    { data: 'c. 722 a.C.', evento: 'Queda de Samaria', referencia: '2Rs 17:1-6', categoria: 'evento', periodo: 'Reino Dividido' },
    { data: 'c. 586 a.C.', evento: 'Queda de Jerusalém e Exílio', referencia: '2Rs 25:1-21', categoria: 'evento', periodo: 'Exílio' },
  ],
  pos_exilio: [
    { data: 'c. 538 a.C.', evento: 'Decreto de Ciro', referencia: 'Ed 1:1-4', categoria: 'evento', periodo: 'Pós-Exílio' },
    { data: 'c. 516 a.C.', evento: 'Dedicação do segundo templo', referencia: 'Ed 6:13-18', categoria: 'evento', periodo: 'Pós-Exílio' },
    { data: 'c. 445 a.C.', evento: 'Muralhas de Jerusalém reconstruídas', referencia: 'Ne 6:15-16', categoria: 'evento', periodo: 'Pós-Exílio' },
  ],
  intertestamentario: [
    { data: 'c. 332 a.C.', evento: 'Alexandre, o Grande, conquista Israel', referencia: 'História', categoria: 'evento', periodo: 'Intertestamentário' },
    { data: 'c. 167 a.C.', evento: 'Revolta dos Macabeus', referencia: '1Macabeus', categoria: 'evento', periodo: 'Intertestamentário' },
    { data: 'c. 63 a.C.', evento: 'Pompeu conquista Jerusalém', referencia: 'História', categoria: 'evento', periodo: 'Intertestamentário' },
  ],
  vida_jesus: [
    { data: 'c. 5 a.C.', evento: 'Nascimento de Jesus', referencia: 'Mt 1:18-25; Lc 2:1-20', categoria: 'pessoa', periodo: 'Vida de Jesus' },
    { data: 'c. 27 d.C.', evento: 'Batismo de Jesus', referencia: 'Mt 3:13-17', categoria: 'evento', periodo: 'Vida de Jesus' },
    { data: 'c. 30 d.C.', evento: 'Crucificação e Ressurreição', referencia: 'Mt 27-28', categoria: 'evento', periodo: 'Vida de Jesus' },
    { data: 'c. 30 d.C.', evento: 'Ascensão de Jesus', referencia: 'At 1:6-11', categoria: 'evento', periodo: 'Vida de Jesus' },
  ],
  igreja_primitiva: [
    { data: 'c. 30 d.C.', evento: 'Pentecostes', referencia: 'At 2:1-4', categoria: 'evento', periodo: 'Igreja Primitiva' },
    { data: 'c. 34 d.C.', evento: 'Conversão de Paulo', referencia: 'At 9:1-19', categoria: 'pessoa', periodo: 'Igreja Primitiva' },
    { data: 'c. 49 d.C.', evento: 'Concílio de Jerusalém', referencia: 'At 15:1-29', categoria: 'evento', periodo: 'Igreja Primitiva' },
    { data: 'c. 67-68 d.C.', evento: 'Morte de Pedro e Paulo', referencia: 'Tradição', categoria: 'pessoa', periodo: 'Igreja Primitiva' },
    { data: 'c. 95 d.C.', evento: 'Apocalipse de João', referencia: 'Ap 1:9-10', categoria: 'evento', periodo: 'Igreja Primitiva' },
  ],
};

@Injectable()
export class ChronologyService {
  private readonly logger = new Logger(ChronologyService.name);

  async obterLinhaTempo(periodo?: string): Promise<LinhaTempo> {
    if (periodo && LINHA_TEMPO_BIBLICA[periodo]) {
      return {
        periodos: [
          {
            nome: this.nomePeriodo(periodo),
            inicio: LINHA_TEMPO_BIBLICA[periodo][0]?.data || '',
            fim: LINHA_TEMPO_BIBLICA[periodo][LINHA_TEMPO_BIBLICA[periodo].length - 1]?.data || '',
            eventos: LINHA_TEMPO_BIBLICA[periodo],
          },
        ],
      };
    }

    const periodos = Object.entries(LINHA_TEMPO_BIBLICA).map(([chave, eventos]) => ({
      nome: this.nomePeriodo(chave),
      inicio: eventos[0]?.data || '',
      fim: eventos[eventos.length - 1]?.data || '',
      eventos,
    }));

    return { periodos };
  }

  async buscarEventosPorReferencia(referencia: string): Promise<EventoCronologico[]> {
    const eventos: EventoCronologico[] = [];
    for (const eventosPeriodo of Object.values(LINHA_TEMPO_BIBLICA)) {
      for (const evento of eventosPeriodo) {
        if (evento.referencia.includes(referencia)) {
          eventos.push(evento);
        }
      }
    }
    return eventos;
  }

  private nomePeriodo(chave: string): string {
    const mapa: Record<string, string> = {
      patriarcas: 'Patriarcas',
      exodo: 'Êxodo e Conquista',
      juizes: 'Juízes',
      reis: 'Reis e Profetas',
      pos_exilio: 'Pós-Exílio',
      intertestamentario: 'Período Intertestamentário',
      vida_jesus: 'Vida de Jesus',
      igreja_primitiva: 'Igreja Primitiva',
    };
    return mapa[chave] || chave;
  }
}
