export interface ParaleloSinotico {
  id: string;
  titulo: string;
  categoria: 'narrativa' | 'parabola' | 'milagre' | 'discurso' | 'ensino' | 'paixao' | 'pos-ressurreicao';
  mateus?: string[];
  marcos?: string[];
  lucas?: string[];
  joao?: string[];
  fonte?: 'Q' | 'M' | 'L' | 'Mc' | 'independente' | 'composto';
  notas?: string;
}

const paralelos: ParaleloSinotico[] = [
  // INFÂNCIA
  { id: 'inf-001', titulo: 'Anunciação do nascimento de João Batista', categoria: 'narrativa', lucas: ['lc:1:5-25'], fonte: 'L', notas: 'Zacarias e Isabel.' },
  { id: 'inf-002', titulo: 'Anunciação do nascimento de Jesus', categoria: 'narrativa', lucas: ['lc:1:26-38'], fonte: 'L', notas: 'Gabriel aparece a Maria.' },
  { id: 'inf-003', titulo: 'Visita de Maria a Isabel', categoria: 'narrativa', lucas: ['lc:1:39-56'], fonte: 'L', notas: 'Magnificat.' },
  { id: 'inf-004', titulo: 'Nascimento de João Batista', categoria: 'narrativa', lucas: ['lc:1:57-80'], fonte: 'L', notas: 'Benedictus.' },
  { id: 'inf-005', titulo: 'Genealogia de Jesus', categoria: 'narrativa', mateus: ['mt:1:1-17'], lucas: ['lc:3:23-38'], fonte: 'M', notas: 'Mateus: Abraão a José. Lucas: José a Adão.' },
  { id: 'inf-006', titulo: 'Nascimento de Jesus', categoria: 'narrativa', mateus: ['mt:1:18-25'], lucas: ['lc:2:1-7'], fonte: 'M', notas: 'Mateus: sonho de José. Lucas: Belém.' },
  { id: 'inf-007', titulo: 'Adoração dos pastores', categoria: 'narrativa', lucas: ['lc:2:8-20'], fonte: 'L' },
  { id: 'inf-008', titulo: 'Circuncisão e apresentação no templo', categoria: 'narrativa', lucas: ['lc:2:21-40'], fonte: 'L', notas: 'Simeão e Ana. Nunc Dimittis.' },
  { id: 'inf-009', titulo: 'Magos do Oriente', categoria: 'narrativa', mateus: ['mt:2:1-12'], fonte: 'M' },
  { id: 'inf-010', titulo: 'Fuga para o Egito', categoria: 'narrativa', mateus: ['mt:2:13-15'], fonte: 'M' },
  { id: 'inf-011', titulo: 'Matança dos inocentes', categoria: 'narrativa', mateus: ['mt:2:16-18'], fonte: 'M' },
  { id: 'inf-012', titulo: 'Retorno do Egito e fixação em Nazaré', categoria: 'narrativa', mateus: ['mt:2:19-23'], fonte: 'M' },
  { id: 'inf-013', titulo: 'Jesus no templo aos 12 anos', categoria: 'narrativa', lucas: ['lc:2:41-52'], fonte: 'L' },

  // BATISMO E TENTAÇÃO
  { id: 'min-001', titulo: 'Ministério de João Batista', categoria: 'narrativa', mateus: ['mt:3:1-6'], marcos: ['mc:1:1-6'], lucas: ['lc:3:1-14'], joao: ['jo:1:19-28'], fonte: 'Mc' },
  { id: 'min-002', titulo: 'Batismo de Jesus', categoria: 'narrativa', mateus: ['mt:3:13-17'], marcos: ['mc:1:9-11'], lucas: ['lc:3:21-22'], joao: ['jo:1:29-34'], fonte: 'Mc' },
  { id: 'min-003', titulo: 'Tentação no deserto', categoria: 'narrativa', mateus: ['mt:4:1-11'], marcos: ['mc:1:12-13'], lucas: ['lc:4:1-13'], fonte: 'Q' },

  // CHAMADA DOS DISCÍPULOS
  { id: 'cham-001', titulo: 'Testemunho de João sobre Jesus', categoria: 'narrativa', joao: ['jo:1:35-51'], fonte: 'independente' },
  { id: 'cham-002', titulo: 'Bodas de Caná', categoria: 'milagre', joao: ['jo:2:1-11'], fonte: 'independente', notas: 'Água em vinho.' },
  { id: 'cham-003', titulo: 'Primeira purificação do templo', categoria: 'narrativa', joao: ['jo:2:13-22'], fonte: 'independente', notas: 'João: início. Sinóticos: fim.' },
  { id: 'cham-004', titulo: 'Nicodemos e o renascimento', categoria: 'ensino', joao: ['jo:3:1-21'], fonte: 'independente', notas: 'João 3:16.' },
  { id: 'cham-005', titulo: 'A mulher samaritana', categoria: 'narrativa', joao: ['jo:4:1-42'], fonte: 'independente' },
  { id: 'cham-006', titulo: 'Chamada dos primeiros discípulos', categoria: 'narrativa', mateus: ['mt:4:18-22'], marcos: ['mc:1:16-20'], lucas: ['lc:5:1-11'], fonte: 'Mc' },
  { id: 'cham-007', titulo: 'Expulsão do espírito imundo na sinagoga', categoria: 'milagre', mateus: ['mt:4:23-25'], marcos: ['mc:1:21-28'], lucas: ['lc:4:31-37'], fonte: 'Mc' },
  { id: 'cham-008', titulo: 'Curando a sogra de Pedro', categoria: 'milagre', mateus: ['mt:8:14-17'], marcos: ['mc:1:29-34'], lucas: ['lc:4:38-41'], fonte: 'Mc' },
  { id: 'cham-009', titulo: 'Primeira pregação na Galileia', categoria: 'narrativa', mateus: ['mt:4:23-25'], marcos: ['mc:1:35-39'], lucas: ['lc:4:42-44'], fonte: 'Mc' },
  { id: 'cham-010', titulo: 'Curação do leproso', categoria: 'milagre', mateus: ['mt:8:1-4'], marcos: ['mc:1:40-45'], lucas: ['lc:5:12-16'], fonte: 'Mc' },
  { id: 'cham-011', titulo: 'Curação do paralítico', categoria: 'milagre', mateus: ['mt:9:1-8'], marcos: ['mc:2:1-12'], lucas: ['lc:5:17-26'], fonte: 'Mc', notas: 'Teus pecados estão perdoados.' },
  { id: 'cham-012', titulo: 'Chamada de Mateus/Levi', categoria: 'narrativa', mateus: ['mt:9:9-13'], marcos: ['mc:2:13-17'], lucas: ['lc:5:27-32'], fonte: 'Mc' },
  { id: 'cham-013', titulo: 'Questão do jejum', categoria: 'ensino', mateus: ['mt:9:14-17'], marcos: ['mc:2:18-22'], lucas: ['lc:5:33-39'], fonte: 'Mc' },
  { id: 'cham-014', titulo: 'Sabat no campo de trigo', categoria: 'ensino', mateus: ['mt:12:1-8'], marcos: ['mc:2:23-28'], lucas: ['lc:6:1-5'], fonte: 'Mc' },
  { id: 'cham-015', titulo: 'Mão seca no sinagoga', categoria: 'milagre', mateus: ['mt:12:9-14'], marcos: ['mc:3:1-6'], lucas: ['lc:6:6-11'], fonte: 'Mc' },
  { id: 'cham-016', titulo: 'Jesus acalma a tempestade', categoria: 'milagre', mateus: ['mt:8:23-27'], marcos: ['mc:4:35-41'], lucas: ['lc:8:22-25'], fonte: 'Mc' },
  { id: 'cham-017', titulo: 'Expulsão dos demônios do gerasenho', categoria: 'milagre', mateus: ['mt:8:28-34'], marcos: ['mc:5:1-20'], lucas: ['lc:8:26-39'], fonte: 'Mc', notas: 'Legião.' },
  { id: 'cham-018', titulo: 'Curação da mulher com fluxo de sangue', categoria: 'milagre', mateus: ['mt:9:20-22'], marcos: ['mc:5:24-34'], lucas: ['lc:8:43-48'], fonte: 'Mc' },
  { id: 'cham-019', titulo: 'Ressurreição da filha de Jairo', categoria: 'milagre', mateus: ['mt:9:18-26'], marcos: ['mc:5:21-43'], lucas: ['lc:8:40-56'], fonte: 'Mc' },
  { id: 'cham-020', titulo: 'Curação dos dois cegos', categoria: 'milagre', mateus: ['mt:9:27-31'], fonte: 'M' },
  { id: 'cham-021', titulo: 'Expulsão de demônio mudo', categoria: 'milagre', mateus: ['mt:9:32-34'], fonte: 'M' },
  { id: 'cham-022', titulo: 'Centurião de Cafarnaum', categoria: 'milagre', mateus: ['mt:8:5-13'], lucas: ['lc:7:1-10'], fonte: 'Q' },
  { id: 'cham-023', titulo: 'Filhos do viúva de Naim', categoria: 'milagre', lucas: ['lc:7:11-17'], fonte: 'L' },
  { id: 'cham-024', titulo: 'João Batista pergunta', categoria: 'ensino', mateus: ['mt:11:2-19'], lucas: ['lc:7:18-35'], fonte: 'Q' },
  { id: 'cham-025', titulo: 'Mulher pecadora ungindo Jesus', categoria: 'narrativa', mateus: ['mt:7:36-50'], marcos: ['mc:14:3-9'], lucas: ['lc:7:36-50'], fonte: 'composto' },

  // SERMÃO DA MONTE
  { id: 'serm-001', titulo: 'Beatitudes', categoria: 'discurso', mateus: ['mt:5:1-12'], lucas: ['lc:6:20-26'], fonte: 'Q' },
  { id: 'serm-002', titulo: 'Sal da terra e luz do mundo', categoria: 'discurso', mateus: ['mt:5:13-16'], marcos: ['mc:9:50'], lucas: ['lc:14:34-35'], fonte: 'Q' },
  { id: 'serm-003', titulo: 'Antiga lei e cumprimento', categoria: 'discurso', mateus: ['mt:5:17-48'], fonte: 'M', notas: 'Seis antíteses.' },
  { id: 'serm-004', titulo: 'Amar os inimigos', categoria: 'discurso', mateus: ['mt:5:43-48'], lucas: ['lc:6:27-36'], fonte: 'Q' },
  { id: 'serm-005', titulo: 'Dar esmola em segredo', categoria: 'discurso', mateus: ['mt:6:1-4'], fonte: 'M' },
  { id: 'serm-006', titulo: 'O Pai Nosso', categoria: 'discurso', mateus: ['mt:6:5-15'], lucas: ['lc:11:1-4'], fonte: 'Q' },
  { id: 'serm-007', titulo: 'O tesouro no céu', categoria: 'discurso', mateus: ['mt:6:19-21'], lucas: ['lc:12:33-34'], fonte: 'Q' },
  { id: 'serm-008', titulo: 'Não se preocupar', categoria: 'discurso', mateus: ['mt:6:25-34'], lucas: ['lc:12:22-31'], fonte: 'Q', notas: 'Os pássaros do céu. Lírios do campo.' },
  { id: 'serm-009', titulo: 'Não julgar', categoria: 'discurso', mateus: ['mt:7:1-5'], lucas: ['lc:6:37-42'], fonte: 'Q', notas: 'A viga e a trave.' },
  { id: 'serm-010', titulo: 'Pedir, buscar, bater', categoria: 'discurso', mateus: ['mt:7:7-11'], lucas: ['lc:11:9-13'], fonte: 'Q' },
  { id: 'serm-011', titulo: 'A árvore e seus frutos', categoria: 'discurso', mateus: ['mt:7:15-20'], lucas: ['lc:6:43-45'], fonte: 'Q' },
  { id: 'serm-012', titulo: 'Não todoque me diz Senhor', categoria: 'discurso', mateus: ['mt:7:21-27'], lucas: ['lc:6:46-49'], fonte: 'Q', notas: 'Casa sobre rocha.' },
  { id: 'serm-013', titulo: 'Curação do centurião', categoria: 'milagre', mateus: ['mt:8:5-13'], lucas: ['lc:7:1-10'], fonte: 'Q' },
  { id: 'serm-014', titulo: 'Ressurreição do filho da viúva de Naim', categoria: 'milagre', lucas: ['lc:7:11-17'], fonte: 'L' },
  { id: 'serm-015', titulo: 'João pergunta a Jesus', categoria: 'ensino', mateus: ['mt:11:2-19'], lucas: ['lc:7:18-35'], fonte: 'Q' },
  { id: 'serm-016', titulo: 'Parábola dos dois devedores', categoria: 'parabola', lucas: ['lc:7:41-43'], fonte: 'L' },

  // PARÁBOLAS
  { id: 'par-001', titulo: 'Parábola do semeador', categoria: 'parabola', mateus: ['mt:13:1-23'], marcos: ['mc:4:1-20'], lucas: ['lc:8:4-15'], fonte: 'Mc' },
  { id: 'par-002', titulo: 'Parábola da ervas daninhas', categoria: 'parabola', mateus: ['mt:13:24-30'], fonte: 'M' },
  { id: 'par-003', titulo: 'Parábola do grão de mostarda', categoria: 'parabola', mateus: ['mt:13:31-32'], marcos: ['mc:4:30-32'], lucas: ['lc:13:18-19'], fonte: 'Mc' },
  { id: 'par-004', titulo: 'Parábola do fermento', categoria: 'parabola', mateus: ['mt:13:33'], lucas: ['lc:13:20-21'], fonte: 'Q' },
  { id: 'par-005', titulo: 'Parábola do tesouro escondido', categoria: 'parabola', mateus: ['mt:13:44'], fonte: 'M' },
  { id: 'par-006', titulo: 'Parábola da pérola preciosa', categoria: 'parabola', mateus: ['mt:13:45-46'], fonte: 'M' },
  { id: 'par-007', titulo: 'Parábola da rede', categoria: 'parabola', mateus: ['mt:13:47-50'], fonte: 'M' },
  { id: 'par-008', titulo: 'Parábola do servo sem misericórdia', categoria: 'parabola', mateus: ['mt:18:23-35'], fonte: 'M' },
  { id: 'par-009', titulo: 'Parábola do bom pastor', categoria: 'parabola', joao: ['jo:10:1-18'], fonte: 'independente' },
  { id: 'par-010', titulo: 'Parábola do semeador e o crecente', categoria: 'parabola', marcos: ['mc:4:26-29'], fonte: 'Mc' },
  { id: 'par-011', titulo: 'Parábola do vinhateiro', categoria: 'parabola', mateus: ['mt:21:33-46'], marcos: ['mc:12:1-12'], lucas: ['lc:20:9-19'], fonte: 'Mc' },
  { id: 'par-012', titulo: 'Parábola do banquete de bodas', categoria: 'parabola', mateus: ['mt:22:1-14'], lucas: ['lc:14:15-24'], fonte: 'Q' },
  { id: 'par-013', titulo: 'Parábola das dez virgens', categoria: 'parabola', mateus: ['mt:25:1-13'], fonte: 'M' },
  { id: 'par-014', titulo: 'Parábola dos talentos', categoria: 'parabola', mateus: ['mt:25:14-30'], lucas: ['lc:19:11-27'], fonte: 'Q' },
  { id: 'par-015', titulo: 'Parábola das ovelhas e bodes', categoria: 'parabola', mateus: ['mt:25:31-46'], fonte: 'M' },
  { id: 'par-016', titulo: 'Parábola do filho pródigo', categoria: 'parabola', lucas: ['lc:15:11-32'], fonte: 'L' },
  { id: 'par-017', titulo: 'Parábola do administrador astuto', categoria: 'parabola', lucas: ['lc:16:1-13'], fonte: 'L' },
  { id: 'par-018', titulo: 'Parábola do rico e Lázaro', categoria: 'parabola', lucas: ['lc:16:19-31'], fonte: 'L' },
  { id: 'par-019', titulo: 'Parábola do juiz injusto', categoria: 'parabola', lucas: ['lc:18:1-8'], fonte: 'L' },
  { id: 'par-020', titulo: 'Parábola do fariseu e do publicano', categoria: 'parabola', lucas: ['lc:18:9-14'], fonte: 'L' },
  { id: 'par-021', titulo: 'Parábola das minas', categoria: 'parabola', lucas: ['lc:19:11-27'], fonte: 'L' },
  { id: 'par-022', titulo: 'Parábola do ladrão', categoria: 'parabola', joao: ['jo:10:1-10'], fonte: 'independente' },
  { id: 'par-023', titulo: 'Parábola da videira', categoria: 'parabola', joao: ['jo:15:1-17'], fonte: 'independente' },
  { id: 'par-024', titulo: 'Parábola do trigo e do joio', categoria: 'parabola', mateus: ['mt:13:24-30'], fonte: 'M' },
  { id: 'par-025', titulo: 'Parábola dos obreiros da vinha', categoria: 'parabola', mateus: ['mt:20:1-16'], fonte: 'M' },
  { id: 'par-026', titulo: 'Parábola dos dois filhos', categoria: 'parabola', mateus: ['mt:21:28-32'], fonte: 'M' },
  { id: 'par-027', titulo: 'Parábola da figueira', categoria: 'parabola', mateus: ['mt:24:32-35'], marcos: ['mc:13:28-31'], lucas: ['lc:21:29-33'], fonte: 'Mc' },
  { id: 'par-028', titulo: 'Parábola do servo vigilante', categoria: 'parabola', mateus: ['mt:24:42-51'], marcos: ['mc:13:33-37'], lucas: ['lc:12:35-40'], fonte: 'Q' },
  { id: 'par-029', titulo: 'Parábola do homem rico insensato', categoria: 'parabola', lucas: ['lc:12:13-21'], fonte: 'L' },
  { id: 'par-030', titulo: 'Parábola do rei que faz guerra', categoria: 'parabola', lucas: ['lc:14:28-33'], fonte: 'L' },
  { id: 'par-031', titulo: 'Parábola do sal', categoria: 'parabola', mateus: ['mt:5:13'], marcos: ['mc:9:50'], lucas: ['lc:14:34-35'], fonte: 'Q' },
  { id: 'par-032', titulo: 'Parábola da lamparina', categoria: 'parabola', mateus: ['mt:5:14-16'], marcos: ['mc:4:21-23'], lucas: ['lc:8:16-18'], fonte: 'Q' },
  { id: 'par-033', titulo: 'Parábola da cidade sobre o monte', categoria: 'parabola', mateus: ['mt:5:14-16'], fonte: 'M' },
  { id: 'par-034', titulo: 'Parábola do fiel administrador', categoria: 'parabola', mateus: ['mt:24:45-51'], lucas: ['lc:12:42-48'], fonte: 'Q' },
  { id: 'par-035', titulo: 'Parábola da festa do casamento', categoria: 'parabola', mateus: ['mt:22:1-14'], fonte: 'M' },
  { id: 'par-036', titulo: 'Parábola do credor misericordioso', categoria: 'parabola', mateus: ['mt:18:23-35'], fonte: 'M' },
  { id: 'par-037', titulo: 'Parábola das ovelhas perdidas', categoria: 'parabola', mateus: ['mt:18:10-14'], lucas: ['lc:15:3-7'], fonte: 'Q' },
  { id: 'par-038', titulo: 'Parábola da moeda perdida', categoria: 'parabola', lucas: ['lc:15:8-10'], fonte: 'L' },
  { id: 'par-039', titulo: 'Parábola do pano novo e odres novos', categoria: 'parabola', mateus: ['mt:9:16-17'], marcos: ['mc:2:21-22'], lucas: ['lc:5:36-39'], fonte: 'Mc' },
  { id: 'par-040', titulo: 'Parábola do cego guiando cego', categoria: 'parabola', mateus: ['mt:15:14'], lucas: ['lc:6:39'], fonte: 'Q' },

  // MILAGRES
  { id: 'mil-001', titulo: 'Transformação da água em vinho', categoria: 'milagre', joao: ['jo:2:1-11'], fonte: 'independente' },
  { id: 'mil-002', titulo: 'Expulsão dos demônios do gerasenho', categoria: 'milagre', mateus: ['mt:8:28-34'], marcos: ['mc:5:1-20'], lucas: ['lc:8:26-39'], fonte: 'Mc' },
  { id: 'mil-003', titulo: 'Curação da mulher com fluxo de sangue', categoria: 'milagre', mateus: ['mt:9:20-22'], marcos: ['mc:5:24-34'], lucas: ['lc:8:43-48'], fonte: 'Mc' },
  { id: 'mil-004', titulo: 'Ressurreição da filha de Jairo', categoria: 'milagre', mateus: ['mt:9:18-26'], marcos: ['mc:5:21-43'], lucas: ['lc:8:40-56'], fonte: 'Mc' },
  { id: 'mil-005', titulo: 'Curação do paralítico na piscina de Betesda', categoria: 'milagre', joao: ['jo:5:1-15'], fonte: 'independente' },
  { id: 'mil-006', titulo: 'Alimentação dos 5.000', categoria: 'milagre', mateus: ['mt:14:13-21'], marcos: ['mc:6:30-44'], lucas: ['lc:9:10-17'], joao: ['jo:6:1-14'], fonte: 'Mc', notas: 'Único nos 4 evangelhos.' },
  { id: 'mil-007', titulo: 'Jesus caminha sobre as águas', categoria: 'milagre', mateus: ['mt:14:22-33'], marcos: ['mc:6:45-52'], joao: ['jo:6:16-21'], fonte: 'Mc' },
  { id: 'mil-008', titulo: 'Curação do mudo na Decápole', categoria: 'milagre', mateus: ['mt:15:29-31'], marcos: ['mc:7:31-37'], fonte: 'Mc' },
  { id: 'mil-009', titulo: 'Alimentação dos 4.000', categoria: 'milagre', mateus: ['mt:15:32-39'], marcos: ['mc:8:1-10'], fonte: 'Mc' },
  { id: 'mil-010', titulo: 'Curação do cego de Betsaida', categoria: 'milagre', marcos: ['mc:8:22-26'], fonte: 'Mc' },
  { id: 'mil-011', titulo: 'Curação do cego de Jericó', categoria: 'milagre', mateus: ['mt:20:29-34'], marcos: ['mc:10:46-52'], lucas: ['lc:18:35-43'], fonte: 'Mc' },
  { id: 'mil-012', titulo: 'Transfiguração', categoria: 'milagre', mateus: ['mt:17:1-13'], marcos: ['mc:9:2-13'], lucas: ['lc:9:28-36'], fonte: 'Mc' },
  { id: 'mil-013', titulo: 'Curação do garoto com espírito mudo', categoria: 'milagre', mateus: ['mt:17:14-21'], marcos: ['mc:9:14-29'], lucas: ['lc:9:37-43'], fonte: 'Mc' },
  { id: 'mil-014', titulo: 'Curação da filha da cananeia', categoria: 'milagre', mateus: ['mt:15:21-28'], marcos: ['mc:7:24-30'], fonte: 'Mc' },
  { id: 'mil-015', titulo: 'Curação dos 10 leprosos', categoria: 'milagre', lucas: ['lc:17:11-19'], fonte: 'L' },
  { id: 'mil-016', titulo: 'Curação do servo cortado da orelha', categoria: 'milagre', lucas: ['lc:22:50-51'], joao: ['jo:18:10-11'], fonte: 'independente' },
  { id: 'mil-017', titulo: 'A pesca dos 153 peixes', categoria: 'milagre', joao: ['jo:21:1-14'], fonte: 'independente' },
  { id: 'mil-018', titulo: 'Maldição da figueira', categoria: 'milagre', mateus: ['mt:21:18-22'], marcos: ['mc:11:12-14'], fonte: 'Mc' },
  { id: 'mil-019', titulo: 'Expulsão dos vendedores do templo', categoria: 'milagre', mateus: ['mt:21:12-17'], marcos: ['mc:11:15-19'], lucas: ['lc:19:45-48'], joao: ['jo:2:13-22'], fonte: 'Mc' },
  { id: 'mil-020', titulo: 'Ressurreição de Lázaro', categoria: 'milagre', joao: ['jo:11:1-44'], fonte: 'independente' },
  { id: 'mil-021', titulo: 'Curação do cego de nascença', categoria: 'milagre', joao: ['jo:9:1-41'], fonte: 'independente' },
  { id: 'mil-022', titulo: 'Pesca miraculosa (antes da chamada)', categoria: 'milagre', lucas: ['lc:5:1-11'], fonte: 'L' },
  { id: 'mil-023', titulo: 'Lavação dos pés', categoria: 'milagre', joao: ['jo:13:1-17'], fonte: 'independente' },
  { id: 'mil-024', titulo: 'Tributo no templo', categoria: 'narrativa', mateus: ['mt:17:24-27'], fonte: 'M' },
  { id: 'mil-025', titulo: 'Multiplicação dos pães (João)', categoria: 'milagre', joao: ['jo:6:1-14'], fonte: 'independente' },

  // DISCURSOS
  { id: 'disc-001', titulo: 'Sermão da Monte', categoria: 'discurso', mateus: ['mt:5:1-7:29'], lucas: ['lc:6:17-49'], fonte: 'composto' },
  { id: 'disc-002', titulo: 'Discurso missionsário', categoria: 'discurso', mateus: ['mt:10:1-42'], marcos: ['mc:6:7-13'], lucas: ['lc:9:1-6'], fonte: 'Mc' },
  { id: 'disc-003', titulo: 'Discurso em parábolas', categoria: 'discurso', mateus: ['mt:13:1-58'], marcos: ['mc:4:1-34'], lucas: ['lc:8:1-21'], fonte: 'Mc' },
  { id: 'disc-004', titulo: 'Discurso sobre a Igreja', categoria: 'discurso', mateus: ['mt:16:13-18:35'], fonte: 'M' },
  { id: 'disc-005', titulo: 'Discurso escatológico', categoria: 'discurso', mateus: ['mt:24:1-25:46'], marcos: ['mc:13:1-37'], lucas: ['lc:17:20-37', 'lc:21:5-38'], fonte: 'Mc' },
  { id: 'disc-006', titulo: 'Discurso joanino sobre o Consolador', categoria: 'discurso', joao: ['jo:14:1-16:33'], fonte: 'independente' },
  { id: 'disc-007', titulo: 'Oração sacerdotal', categoria: 'discurso', joao: ['jo:17:1-26'], fonte: 'independente' },
  { id: 'disc-008', titulo: 'Discurso sobre o Filho do Homem', categoria: 'discurso', joao: ['jo:5:19-47'], fonte: 'independente' },
  { id: 'disc-009', titulo: 'Discurso do Pão da Vida', categoria: 'discurso', joao: ['jo:6:25-71'], fonte: 'independente' },
  { id: 'disc-010', titulo: 'Discurso na festa dos tabernáculos', categoria: 'discurso', joao: ['jo:7:1-52'], fonte: 'independente' },
  { id: 'disc-011', titulo: 'Discurso da luz do mundo', categoria: 'discurso', joao: ['jo:8:12-59'], fonte: 'independente' },
  { id: 'disc-012', titulo: 'Discurso do bom pastor', categoria: 'discurso', joao: ['jo:10:1-21'], fonte: 'independente' },
  { id: 'disc-013', titulo: 'Discurso sobre a videira', categoria: 'discurso', joao: ['jo:15:1-17'], fonte: 'independente' },
  { id: 'disc-014', titulo: 'Discurso do Espírito Santo', categoria: 'discurso', joao: ['jo:16:4-15'], fonte: 'independente' },
  { id: 'disc-015', titulo: 'Discurso antes da ascensão', categoria: 'discurso', lucas: ['lc:24:36-53'], joao: ['jo:20:19-23'], fonte: 'composto' },
  { id: 'disc-016', titulo: 'Discurso sobre os últimos tempos', categoria: 'discurso', mateus: ['mt:24:1-44'], marcos: ['mc:13:1-32'], lucas: ['lc:21:5-33'], fonte: 'Mc' },

  // EU SOU
  { id: 'eu-001', titulo: 'Eu sou o pão da vida', categoria: 'ensino', joao: ['jo:6:35,48-51'], fonte: 'independente' },
  { id: 'eu-002', titulo: 'Eu sou a luz do mundo', categoria: 'ensino', joao: ['jo:8:12'], fonte: 'independente' },
  { id: 'eu-003', titulo: 'Eu sou a porta', categoria: 'ensino', joao: ['jo:10:7,9'], fonte: 'independente' },
  { id: 'eu-004', titulo: 'Eu sou o bom pastor', categoria: 'ensino', joao: ['jo:10:11,14'], fonte: 'independente' },
  { id: 'eu-005', titulo: 'Eu sou a ressurreição e a vida', categoria: 'ensino', joao: ['jo:11:25'], fonte: 'independente' },
  { id: 'eu-006', titulo: 'Eu sou o caminho, a verdade e a vida', categoria: 'ensino', joao: ['jo:14:6'], fonte: 'independente' },
  { id: 'eu-007', titulo: 'Eu sou a videira', categoria: 'ensino', joao: ['jo:15:1,5'], fonte: 'independente' },

  // DEBATES COM FARISEUS E ESCRIBAS
  { id: 'deb-001', titulo: 'Debate sobre o divórcio', categoria: 'ensino', mateus: ['mt:19:3-12'], marcos: ['mc:10:2-12'], fonte: 'Mc' },
  { id: 'deb-002', titulo: 'Debate sobre o sabat', categoria: 'ensino', mateus: ['mt:12:1-8'], marcos: ['mc:2:23-28'], lucas: ['lc:6:1-5'], fonte: 'Mc' },
  { id: 'deb-003', titulo: 'Debate sobre a purificação', categoria: 'ensino', mateus: ['mt:15:1-20'], marcos: ['mc:7:1-23'], fonte: 'Mc' },
  { id: 'deb-004', titulo: 'Debate sobre a ressurreição', categoria: 'ensino', mateus: ['mt:22:23-33'], marcos: ['mc:12:18-27'], lucas: ['lc:20:27-40'], fonte: 'Mc' },
  { id: 'deb-005', titulo: 'Debate sobre o maior mandamento', categoria: 'ensino', mateus: ['mt:22:34-40'], marcos: ['mc:12:28-34'], fonte: 'Mc' },
  { id: 'deb-006', titulo: 'Debate sobre a origem do batismo', categoria: 'ensino', mateus: ['mt:21:23-27'], marcos: ['mc:11:27-33'], lucas: ['lc:20:1-8'], fonte: 'Mc' },
  { id: 'deb-007', titulo: 'Debate sobre tributo a César', categoria: 'ensino', mateus: ['mt:22:15-22'], marcos: ['mc:12:13-17'], lucas: ['lc:20:19-26'], fonte: 'Mc' },
  { id: 'deb-008', titulo: 'Debate sobre o Filho do Homem e Davi', categoria: 'ensino', marcos: ['mc:12:35-37'], lucas: ['lc:20:41-44'], fonte: 'Mc' },
  { id: 'deb-009', titulo: 'Advertência contra os escribas', categoria: 'ensino', mateus: ['mt:23:1-39'], marcos: ['mc:12:38-40'], lucas: ['lc:20:45-47'], fonte: 'Mc' },
  { id: 'deb-010', titulo: 'Debate sobre a pedra angular', categoria: 'ensino', mateus: ['mt:21:42-44'], marcos: ['mc:12:10-12'], lucas: ['lc:20:17-19'], fonte: 'Mc' },
  { id: 'deb-011', titulo: 'Debate sobre os mandamentos', categoria: 'ensino', mateus: ['mt:19:16-22'], marcos: ['mc:10:17-22'], lucas: ['lc:18:18-23'], fonte: 'Mc' },
  { id: 'deb-012', titulo: 'Debate sobre a lei e os profetas', categoria: 'ensino', lucas: ['lc:16:14-18'], fonte: 'L' },

  // PAIXÃO
  { id: 'px-001', titulo: 'Unção em Betânia', categoria: 'paixao', mateus: ['mt:26:6-13'], marcos: ['mc:14:3-9'], joao: ['jo:12:1-8'], fonte: 'Mc' },
  { id: 'px-002', titulo: 'Conspiração contra Jesus', categoria: 'paixao', mateus: ['mt:26:14-16'], marcos: ['mc:14:10-11'], lucas: ['lc:22:3-6'], fonte: 'Mc' },
  { id: 'px-003', titulo: 'Preparativos para a Páscoa', categoria: 'paixao', mateus: ['mt:26:17-19'], marcos: ['mc:14:12-16'], lucas: ['lc:22:7-13'], fonte: 'Mc' },
  { id: 'px-004', titulo: 'Predição da traição', categoria: 'paixao', mateus: ['mt:26:20-25'], marcos: ['mc:14:17-21'], lucas: ['lc:22:14-23'], joao: ['jo:13:21-30'], fonte: 'Mc' },
  { id: 'px-005', titulo: 'Instituição da Ceia', categoria: 'paixao', mateus: ['mt:26:26-29'], marcos: ['mc:14:22-25'], lucas: ['lc:22:19-20'], fonte: 'Mc' },
  { id: 'px-006', titulo: 'Predição da negação de Pedro', categoria: 'paixao', mateus: ['mt:26:31-35'], marcos: ['mc:14:27-31'], lucas: ['lc:22:31-34'], joao: ['jo:13:36-38'], fonte: 'Mc' },
  { id: 'px-007', titulo: 'Agonia no Getsêmani', categoria: 'paixao', mateus: ['mt:26:36-46'], marcos: ['mc:14:32-42'], lucas: ['lc:22:39-46'], fonte: 'Mc' },
  { id: 'px-008', titulo: 'Prisão de Jesus', categoria: 'paixao', mateus: ['mt:26:47-56'], marcos: ['mc:14:43-52'], lucas: ['lc:22:47-53'], joao: ['jo:18:1-12'], fonte: 'Mc' },
  { id: 'px-009', titulo: 'Julgamento perante o Sinédrio', categoria: 'paixao', mateus: ['mt:26:57-68'], marcos: ['mc:14:53-65'], lucas: ['lc:22:54-65'], joao: ['jo:18:12-14,24'], fonte: 'Mc' },
  { id: 'px-010', titulo: 'Negação de Pedro', categoria: 'paixao', mateus: ['mt:26:69-75'], marcos: ['mc:14:66-72'], lucas: ['lc:22:54-62'], joao: ['jo:18:15-18,25-27'], fonte: 'Mc' },
  { id: 'px-011', titulo: 'Judas devolve as moedas', categoria: 'paixao', mateus: ['mt:27:3-10'], fonte: 'M' },
  { id: 'px-012', titulo: 'Julgamento perante Pilatos', categoria: 'paixao', mateus: ['mt:27:1-26'], marcos: ['mc:15:1-15'], lucas: ['lc:23:1-25'], joao: ['jo:18:28-19:16'], fonte: 'Mc' },
  { id: 'px-013', titulo: 'Julgamento perante Herodes', categoria: 'paixao', lucas: ['lc:23:6-12'], fonte: 'L' },
  { id: 'px-014', titulo: 'Flagelação de Jesus', categoria: 'paixao', mateus: ['mt:27:26'], marcos: ['mc:15:15'], lucas: ['lc:23:16'], joao: ['jo:19:1'], fonte: 'Mc' },
  { id: 'px-015', titulo: 'Zombaria dos soldados', categoria: 'paixao', mateus: ['mt:27:27-31'], marcos: ['mc:15:16-20'], joao: ['jo:19:1-5'], fonte: 'Mc' },
  { id: 'px-016', titulo: 'Via Dolorosa', categoria: 'paixao', mateus: ['mt:27:32'], marcos: ['mc:15:21'], lucas: ['lc:23:26-32'], joao: ['jo:19:17'], fonte: 'Mc' },
  { id: 'px-017', titulo: 'Crucificação', categoria: 'paixao', mateus: ['mt:27:33-38'], marcos: ['mc:15:22-32'], lucas: ['lc:23:33-38'], joao: ['jo:19:17-24'], fonte: 'Mc' },
  { id: 'px-018', titulo: 'Zombaria na cruz', categoria: 'paixao', mateus: ['mt:27:39-44'], marcos: ['mc:15:29-32'], lucas: ['lc:23:35-38'], joao: ['jo:19:25-27'], fonte: 'Mc' },
  { id: 'px-019', titulo: 'O bom ladrão', categoria: 'paixao', lucas: ['lc:23:39-43'], fonte: 'L' },
  { id: 'px-020', titulo: 'Dedução de João e Maria', categoria: 'paixao', joao: ['jo:19:25-27'], fonte: 'independente' },
  { id: 'px-021', titulo: 'Trevas sobre a terra', categoria: 'paixao', mateus: ['mt:27:45'], marcos: ['mc:15:33'], lucas: ['lc:23:44-45'], fonte: 'Mc' },
  { id: 'px-022', titulo: 'Morte de Jesus', categoria: 'paixao', mateus: ['mt:27:50-54'], marcos: ['mc:15:33-39'], lucas: ['lc:23:44-49'], joao: ['jo:19:28-30'], fonte: 'Mc' },
  { id: 'px-023', titulo: 'Rasgar do véu do templo', categoria: 'paixao', mateus: ['mt:27:51'], marcos: ['mc:15:38'], lucas: ['lc:23:45'], fonte: 'Mc' },
  { id: 'px-024', titulo: 'Centurião confessa', categoria: 'paixao', mateus: ['mt:27:54'], marcos: ['mc:15:39'], lucas: ['lc:23:47'], fonte: 'Mc' },
  { id: 'px-025', titulo: 'Sepultamento', categoria: 'paixao', mateus: ['mt:27:57-61'], marcos: ['mc:15:42-47'], lucas: ['lc:23:50-56'], joao: ['jo:19:38-42'], fonte: 'Mc' },
  { id: 'px-026', titulo: 'Guarda no túmulo', categoria: 'paixao', mateus: ['mt:27:62-66'], fonte: 'M' },

  // RESURREIÇÃO E PÓS-RESSURREIÇÃO
  { id: 'res-001', titulo: 'Mulheres no túmulo vazio', categoria: 'pos-ressurreicao', mateus: ['mt:28:1-8'], marcos: ['mc:16:1-8'], lucas: ['lc:24:1-12'], joao: ['jo:20:1-13'], fonte: 'Mc' },
  { id: 'res-002', titulo: 'Maria Madalena encontra Jesus', categoria: 'pos-ressurreicao', joao: ['jo:20:11-18'], fonte: 'independente' },
  { id: 'res-003', titulo: 'Guardas corrompidos', categoria: 'pos-ressurreicao', mateus: ['mt:28:11-15'], fonte: 'M' },
  { id: 'res-004', titulo: 'Jesus aparece às mulheres', categoria: 'pos-ressurreicao', mateus: ['mt:28:9-10'], fonte: 'M' },
  { id: 'res-005', titulo: 'Aparecimento aos discípulos (Jerusalém)', categoria: 'pos-ressurreicao', lucas: ['lc:24:36-49'], joao: ['jo:20:19-23'], fonte: 'composto' },
  { id: 'res-006', titulo: 'Aparecimento a Tomé', categoria: 'pos-ressurreicao', joao: ['jo:20:24-29'], fonte: 'independente' },
  { id: 'res-007', titulo: 'Aparecimento na Galileia (7 discípulos)', categoria: 'pos-ressurreicao', joao: ['jo:21:1-23'], fonte: 'independente' },
  { id: 'res-008', titulo: 'A Comissão (Mateus)', categoria: 'pos-ressurreicao', mateus: ['mt:28:16-20'], fonte: 'M', notas: 'Grande Comissão.' },
  { id: 'res-009', titulo: 'Ascensão', categoria: 'pos-ressurreicao', marcos: ['mc:16:19-20'], lucas: ['lc:24:50-53'], fonte: 'composto' },
  { id: 'res-010', titulo: 'Grande Comissão (Marcos)', categoria: 'pos-ressurreicao', marcos: ['mc:16:15-18'], fonte: 'M' },
  { id: 'res-011', titulo: 'Aparecimento em Emaús', categoria: 'pos-ressurreicao', lucas: ['lc:24:13-35'], fonte: 'L' },

  // ENSINOS DIVERSOS
  { id: 'ens-001', titulo: 'O que sai da boca contamina', categoria: 'ensino', mateus: ['mt:15:10-20'], marcos: ['mc:7:14-23'], fonte: 'Mc' },
  { id: 'ens-002', titulo: 'A pedra de tropeço', categoria: 'ensino', mateus: ['mt:18:6-9'], marcos: ['mc:9:42-50'], lucas: ['lc:17:1-3'], fonte: 'Q' },
  { id: 'ens-003', titulo: 'Obrigação de perdoar', categoria: 'ensino', mateus: ['mt:18:15-35'], lucas: ['lc:17:3-4'], fonte: 'composto' },
  { id: 'ens-004', titulo: 'A lei do talião', categoria: 'ensino', mateus: ['mt:5:38-42'], fonte: 'M' },
  { id: 'ens-005', titulo: 'O discípulo não é maior que o mestre', categoria: 'ensino', mateus: ['mt:10:24-25'], lucas: ['lc:6:40'], joao: ['jo:13:16,15:20'], fonte: 'Q' },
  { id: 'ens-006', titulo: 'Vigiar e orar', categoria: 'ensino', mateus: ['mt:26:41'], marcos: ['mc:14:38'], lucas: ['lc:22:40,46'], fonte: 'Mc' },
  { id: 'ens-007', titulo: 'O maior entre vós', categoria: 'ensino', mateus: ['mt:23:11-12'], marcos: ['mc:9:35'], lucas: ['lc:9:48'], fonte: 'Mc' },
  { id: 'ens-008', titulo: 'Servir e ser servido', categoria: 'ensino', mateus: ['mt:20:25-28'], marcos: ['mc:10:42-45'], lucas: ['lc:22:25-27'], fonte: 'Mc' },
  { id: 'ens-009', titulo: 'Deixar as crianças', categoria: 'ensino', mateus: ['mt:19:13-15'], marcos: ['mc:10:13-16'], lucas: ['lc:18:15-17'], fonte: 'Mc' },
  { id: 'ens-010', titulo: 'A vida mais importante que o dinheiro', categoria: 'ensino', mateus: ['mt:16:26'], marcos: ['mc:8:36-37'], lucas: ['lc:9:25'], fonte: 'Mc' },
  { id: 'ens-011', titulo: 'Ninguém acende lamparina', categoria: 'ensino', mateus: ['mt:5:15'], marcos: ['mc:4:21'], lucas: ['lc:8:16'], fonte: 'Q' },
  { id: 'ens-012', titulo: 'Os doze tronos', categoria: 'ensino', mateus: ['mt:19:28'], lucas: ['lc:22:28-30'], fonte: 'Q' },
  { id: 'ens-013', titulo: 'Fazer discípulos', categoria: 'ensino', mateus: ['mt:28:19-20'], marcos: ['mc:16:15'], joao: ['jo:20:21'], fonte: 'composto' },
  { id: 'ens-014', titulo: 'A porta estreita', categoria: 'ensino', lucas: ['lc:13:24-30'], fonte: 'L' },
  { id: 'ens-015', titulo: 'Contar o custo', categoria: 'ensino', lucas: ['lc:14:25-33'], fonte: 'L' },
  { id: 'ens-016', titulo: 'A fé como grão de mostarda', categoria: 'ensino', mateus: ['mt:17:20'], lucas: ['lc:17:6'], fonte: 'Q' },
  { id: 'ens-017', titulo: 'Reconhecer os tempos', categoria: 'ensino', mateus: ['mt:16:2-3'], lucas: ['lc:12:56'], fonte: 'Q' },
  { id: 'ens-018', titulo: 'Sinais de Jonas', categoria: 'ensino', lucas: ['lc:11:24-36'], fonte: 'L' },
  { id: 'ens-019', titulo: 'Advertência contra a avareza', categoria: 'ensino', lucas: ['lc:12:13-21'], fonte: 'L' },
  { id: 'ens-020', titulo: 'Mulher curvada no sabat', categoria: 'milagre', lucas: ['lc:13:10-17'], fonte: 'L' },

  // CENAS EXCLUSIVAS
  { id: 'luc-001', titulo: 'Cântico do Magnificat', categoria: 'narrativa', lucas: ['lc:1:46-55'], fonte: 'L' },
  { id: 'luc-002', titulo: 'Cântico de Zacarias', categoria: 'narrativa', lucas: ['lc:1:67-79'], fonte: 'L' },
  { id: 'luc-003', titulo: 'Cântico de Simeão', categoria: 'narrativa', lucas: ['lc:2:29-32'], fonte: 'L' },
  { id: 'luc-004', titulo: 'Jesus rejeitado em Nazaré', categoria: 'narrativa', lucas: ['lc:4:16-30'], fonte: 'L' },
  { id: 'luc-005', titulo: 'Parábola do bom samaritano', categoria: 'parabola', lucas: ['lc:10:25-37'], fonte: 'L' },
  { id: 'luc-006', titulo: 'Jesus na casa de Marta e Maria', categoria: 'narrativa', lucas: ['lc:10:38-42'], fonte: 'L' },
  { id: 'luc-007', titulo: 'Zaccheu', categoria: 'narrativa', lucas: ['lc:19:1-10'], fonte: 'L' },
  { id: 'luc-008', titulo: 'Lamento sobre Jerusalém', categoria: 'narrativa', lucas: ['lc:19:41-44'], fonte: 'L' },
  { id: 'luc-009', titulo: 'Envio dos 70', categoria: 'narrativa', lucas: ['lc:10:1-24'], fonte: 'L' },
  { id: 'luc-010', titulo: 'Ensinamento sobre a oração', categoria: 'ensino', lucas: ['lc:11:1-13'], fonte: 'L' },

  // MAIS PARÁBOLAS E ENSINOS
  { id: 'par-041', titulo: 'Parábola da viúva e o juiz', categoria: 'parabola', lucas: ['lc:18:1-8'], fonte: 'L' },
  { id: 'par-042', titulo: 'Parábola do fariseu e do publicano', categoria: 'parabola', lucas: ['lc:18:9-14'], fonte: 'L' },
  { id: 'par-043', titulo: 'Parábola das dez minas', categoria: 'parabola', lucas: ['lc:19:11-27'], fonte: 'L' },
  { id: 'par-044', titulo: 'Parábola do semeador', categoria: 'parabola', mateus: ['mt:13:3-9'], marcos: ['mc:4:2-9'], lucas: ['lc:8:5-8'], fonte: 'Mc' },
  { id: 'par-045', titulo: 'Explicação da parábola do semeador', categoria: 'parabola', mateus: ['mt:13:18-23'], marcos: ['mc:4:13-20'], lucas: ['lc:8:11-15'], fonte: 'Mc' },
  { id: 'par-046', titulo: 'Parábola do semeador crescente', categoria: 'parabola', marcos: ['mc:4:26-29'], fonte: 'Mc' },

  // MAIS MILAGRES
  { id: 'mil-026', titulo: 'Curação do servo do sumo sacerdote', categoria: 'milagre', marcos: ['mc:14:47'], lucas: ['lc:22:51'], joao: ['jo:18:10-11'], fonte: 'independente' },
  { id: 'mil-027', titulo: 'Andar sobre as águas (Mateus)', categoria: 'milagre', mateus: ['mt:14:25-33'], marcos: ['mc:6:48-51'], joao: ['jo:6:19'], fonte: 'Mc' },
  { id: 'mil-028', titulo: 'Pesca miraculosa pós-ressurreição', categoria: 'milagre', joao: ['jo:21:1-14'], fonte: 'independente' },
  { id: 'mil-029', titulo: 'Curação do cego e mudo endemoninhado', categoria: 'milagre', mateus: ['mt:9:32-34'], fonte: 'M' },
  { id: 'mil-030', titulo: 'Multiplicação dos pães (Mateus/Marcos/Lucas)', categoria: 'milagre', mateus: ['mt:14:13-21'], marcos: ['mc:6:30-44'], lucas: ['lc:9:10-17'], fonte: 'Mc' },

  // MAIS DEBATES
  { id: 'deb-013', titulo: 'Recolher os fragmentos', categoria: 'ensino', mateus: ['mt:14:20'], marcos: ['mc:6:43'], lucas: ['lc:9:17'], joao: ['jo:6:12-13'], fonte: 'Mc' },
  { id: 'deb-014', titulo: 'Debate sobre a ressurreição (saduceus)', categoria: 'ensino', mateus: ['mt:22:23-33'], marcos: ['mc:12:18-27'], lucas: ['lc:20:27-40'], fonte: 'Mc' },
  { id: 'deb-015', titulo: 'Debate sobre tributo a César', categoria: 'ensino', mateus: ['mt:22:15-22'], marcos: ['mc:12:13-17'], lucas: ['lc:20:19-26'], fonte: 'Mc' },

  // CENAS EXTRAS DE PAIXÃO
  { id: 'px-027', titulo: 'Judas devolve as moedas e se suicida', categoria: 'paixao', mateus: ['mt:27:3-10'], fonte: 'M' },
  { id: 'px-028', titulo: 'Sentença de morte', categoria: 'paixao', mateus: ['mt:27:24-26'], marcos: ['mc:15:15'], lucas: ['lc:23:20-25'], joao: ['jo:19:16'], fonte: 'Mc' },
  { id: 'px-029', titulo: 'Simão de Cirene carrega a cruz', categoria: 'paixao', mateus: ['mt:27:32'], marcos: ['mc:15:21'], lucas: ['lc:23:26'], joao: ['jo:19:17'], fonte: 'Mc' },
  { id: 'px-030', titulo: 'Mulheres de Jerusalém', categoria: 'paixao', lucas: ['lc:23:27-31'], fonte: 'L' },

  // CENAS EXTRAS DE ENSINO
  { id: 'ens-021', titulo: 'O que é o Reino de Deus?', categoria: 'ensino', lucas: ['lc:17:20-37'], fonte: 'L' },
  { id: 'ens-022', titulo: 'Sinais do fim', categoria: 'ensino', lucas: ['lc:21:7-19'], fonte: 'L' },
  { id: 'ens-023', titulo: 'Caída de Jerusalém', categoria: 'ensino', lucas: ['lc:21:20-24'], fonte: 'L' },
  { id: 'ens-024', titulo: 'Juízo final', categoria: 'ensino', lucas: ['lc:21:25-38'], fonte: 'L' },
  { id: 'ens-025', titulo: 'Mulher samaritana e adoração', categoria: 'ensino', joao: ['jo:4:19-26'], fonte: 'independente' },
  { id: 'ens-026', titulo: 'Discurso do pão da vida', categoria: 'ensino', joao: ['jo:6:25-71'], fonte: 'independente' },
  { id: 'ens-027', titulo: 'Luz do mundo e fariseus', categoria: 'ensino', joao: ['jo:8:12-59'], fonte: 'independente' },
  { id: 'ens-028', titulo: 'Os 70/72 enviados', categoria: 'ensino', lucas: ['lc:10:1-24'], fonte: 'L' },
  { id: 'ens-029', titulo: 'A urgência do Reino', categoria: 'ensino', lucas: ['lc:14:15-24'], fonte: 'L' },
  { id: 'ens-030', titulo: 'Jesus e as crianças', categoria: 'ensino', mateus: ['mt:19:13-15'], marcos: ['mc:10:13-16'], lucas: ['lc:18:15-17'], fonte: 'Mc' },
];

export default paralelos;

export function getParalelosLivro(livro: 'mt' | 'mc' | 'lc' | 'jo'): ParaleloSinotico[] {
  const chaveMap: Record<string, keyof Pick<ParaleloSinotico, 'mateus' | 'marcos' | 'lucas' | 'joao'>> = {
    mt: 'mateus',
    mc: 'marcos',
    lc: 'lucas',
    jo: 'joao',
  };
  const chave = chaveMap[livro];
  if (!chave) return [];
  return paralelos.filter((p) => {
    const refs = p[chave];
    return Array.isArray(refs) && refs.length > 0;
  });
}

export function getParaleloPorVersiculo(livro: string, cap: number, ver: number): ParaleloSinotico | undefined {
  const prefixo = `${livro}:${cap}:${ver}`;
  return paralelos.find((p) => {
    const todas = [...(p.mateus ?? []), ...(p.marcos ?? []), ...(p.lucas ?? []), ...(p.joao ?? [])];
    return todas.some((r) => r.startsWith(prefixo));
  });
}

export function getParalelosPorCategoria(categoria: string): ParaleloSinotico[] {
  return paralelos.filter((p) => p.categoria === categoria);
}

export function buscarParalelos(pesquisa: string): ParaleloSinotico[] {
  const termo = pesquisa.toLowerCase();
  return paralelos.filter((p) => {
    const texto = `${p.titulo} ${p.notas ?? ''} ${p.id}`.toLowerCase();
    const refs = [...(p.mateus ?? []), ...(p.marcos ?? []), ...(p.lucas ?? []), ...(p.joao ?? [])].join(' ').toLowerCase();
    return texto.includes(termo) || refs.includes(termo);
  });
}
