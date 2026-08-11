import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'src/data/lexicon/grego.ts');
const content = readFileSync(filePath, 'utf8');

// Mapping of strong number -> { definicao, definicaoResumida, categoria (optional) }
const fixes = {
  'G175': { definicao: 'Sem fruto, infértil, improdutivo.', definicaoResumida: 'Sem fruto, infértil, improdutivo', categoria: 'adjetivo' },
  'G383': { definicao: 'Agitar, excitar, motivar.', definicaoResumida: 'Agitar, excitar, motivar', categoria: 'verbo' },
  'G388': { definicao: 'Crucificar novamente.', definicaoResumida: 'Crucificar novamente', categoria: 'verbo' },
  'G396': { definicao: 'Subverter, derrubar, destruir.', definicaoResumida: 'Subverter, derrubar, destruir', categoria: 'verbo' },
  'G425': { definicao: 'Alívio, liberdade, descanso.', definicaoResumida: 'Alívio, liberdade, descanso', categoria: 'substantivo' },
  'G468': { definicao: 'Recompensa, retribuição.', definicaoResumida: 'Recompensa, retribuição', categoria: 'substantivo' },
  'G469': { definicao: 'Recompensa, retribuição.', definicaoResumida: 'Recompensa, retribuição', categoria: 'substantivo' },
  'G564': { definicao: 'Incircunciso.', definicaoResumida: 'Incircunciso', categoria: 'adjetivo' },
  'G580': { definicao: 'Rejeição, perda.', definicaoResumida: 'Rejeição, perda', categoria: 'substantivo' },
  'G668': { definicao: 'Escapar, fugir.', definicaoResumida: 'Escapar, fugir', categoria: 'verbo' },
  'G724': { definicao: 'Extorsão, rapina, pilhagem.', definicaoResumida: 'Extorsão, rapina, pilhagem', categoria: 'substantivo' },
  'G800': { definicao: 'Discordante, desarmônico, incompatível.', definicaoResumida: 'Discordante, desarmônico, incompatível', categoria: 'adjetivo' },
  'G803': { definicao: 'Segurança, certeza, firmeza.', definicaoResumida: 'Segurança, certeza, firmeza', categoria: 'substantivo' },
  'G804': { definicao: 'Certo, seguro, firme, confiável.', definicaoResumida: 'Certo, seguro, firme, confiável', categoria: 'adjetivo' },
  'G806': { definicao: 'Seguramente, com certeza.', definicaoResumida: 'Seguramente, com certeza', categoria: 'advérbio' },
  'G865': { definicao: 'Hostil ao bem, inimigo da virtude.', definicaoResumida: 'Hostil ao bem, inimigo da virtude', categoria: 'adjetivo' },
  'G917': { definicao: 'Pesadamente, com dificuldade.', definicaoResumida: 'Pesadamente, com dificuldade', categoria: 'advérbio' },
  'G949': { definicao: 'Firme, estável, seguro, constante.', definicaoResumida: 'Firme, estável, seguro, constante', categoria: 'adjetivo' },
  'G950': { definicao: 'Confirmar, estabelecer, firmar.', definicaoResumida: 'Confirmar, estabelecer, firmar', categoria: 'verbo' },
  'G1005': { definicao: 'Norte.', definicaoResumida: 'Norte', categoria: 'substantivo' },
  'G1021': { definicao: 'Lento, tardio, demorado.', definicaoResumida: 'Lento, tardio, demorado', categoria: 'adjetivo' },
  'G1051': { definicao: 'Leite.', definicaoResumida: 'Leite', categoria: 'substantivo' },
  'G1078': { definicao: 'Geração, natureza, origem.', definicaoResumida: 'Geração, natureza, origem', categoria: 'substantivo' },
  'G1123': { definicao: 'Escrito, inscrito.', definicaoResumida: 'Escrito, inscrito', categoria: 'adjetivo' },
  'G1184': { definicao: 'Agradável, aceitável, aprovado.', definicaoResumida: 'Agradável, aceitável, aprovado', categoria: 'adjetivo' },
  'G1330': { definicao: 'Vir, passar, atravessar, ir.', definicaoResumida: 'Vir, passar, atravessar, ir', categoria: 'verbo' },
  'G1397': { definicao: 'Escravidão, cativeiro, servidão.', definicaoResumida: 'Escravidão, cativeiro, servidão', categoria: 'substantivo' },
  'G1414': { definicao: 'Ser poderoso, ter poder.', definicaoResumida: 'Ser poderoso, ter poder', categoria: 'verbo' },
  'G1432': { definicao: 'Gratuitamente, debalde, sem causa.', definicaoResumida: 'Gratuitamente, debalde, sem causa', categoria: 'advérbio' },
  'G1529': { definicao: 'Entrada, acesso, vinda.', definicaoResumida: 'Entrada, acesso, vinda', categoria: 'substantivo' },
  'G1545': { definicao: 'Saída, desfecho, fim.', definicaoResumida: 'Saída, desfecho, fim', categoria: 'substantivo' },
  'G1612': { definicao: 'Subverter, perverter, corromper.', definicaoResumida: 'Subverter, perverter, corromper', categoria: 'verbo' },
  'G1721': { definicao: 'Enxertado, implantado.', definicaoResumida: 'Enxertado, implantado', categoria: 'adjetivo' },
  'G1727': { definicao: 'Contrário, oposto, adverso.', definicaoResumida: 'Contrário, oposto, adverso', categoria: 'adjetivo' },
  'G1774': { definicao: 'Habitar em, morar em.', definicaoResumida: 'Habitar em, morar em', categoria: 'verbo' },
  'G1784': { definicao: 'Honrado, precioso, estimado.', definicaoResumida: 'Honrado, precioso, estimado', categoria: 'adjetivo' },
  'G1789': { definicao: 'Nutrir em, educar em.', definicaoResumida: 'Nutrir em, educar em', categoria: 'verbo' },
  'G1799': { definicao: 'Diante, na presença de.', definicaoResumida: 'Diante, na presença de', categoria: 'preposição' },
  'G1830': { definicao: 'Pesquisar diligentemente, examinar.', definicaoResumida: 'Pesquisar diligentemente, examinar', categoria: 'verbo' },
  'G1851': { definicao: 'Proeminência, destaque.', definicaoResumida: 'Proeminência, destaque', categoria: 'substantivo' },
  'G2000': { definicao: 'Perigoso, arriscado.', definicaoResumida: 'Perigoso, arriscado', categoria: 'adjetivo' },
  'G2017': { definicao: 'Iluminar, brilhar sobre.', definicaoResumida: 'Iluminar, brilhar sobre', categoria: 'verbo' },
  'G2040': { definicao: 'Trabalhador, operário.', definicaoResumida: 'Trabalhador, operário', categoria: 'substantivo' },
  'G2347': { definicao: 'Aflição, angústia, perseguição, tribulação.', definicaoResumida: 'Aflição, angústia, perseguição, tribulação', categoria: 'substantivo' },
  'G2348': { definicao: 'Morrer, estar morto.', definicaoResumida: 'Morrer, estar morto', categoria: 'verbo' },
  'G2397': { definicao: 'Aparência, semblante, aspecto.', definicaoResumida: 'Aparência, semblante, aspecto', categoria: 'substantivo' },
  'G2409': { definicao: 'Sacerdote.', definicaoResumida: 'Sacerdote', categoria: 'substantivo' },
  'G2478': { definicao: 'Forte, poderoso, valente.', definicaoResumida: 'Forte, poderoso, valente', categoria: 'adjetivo' },
  'G2487': { definicao: 'Pegada, vestígio, passo.', definicaoResumida: 'Pegada, vestígio, passo', categoria: 'substantivo' },
  'G2515': { definicao: 'Assento, cadeira, cátedra.', definicaoResumida: 'Assento, cadeira, cátedra', categoria: 'substantivo' },
  'G2538': { definicao: 'Novidade.', definicaoResumida: 'Novidade', categoria: 'substantivo' },
  'G2593': { definicao: 'Frutífero, produtivo.', definicaoResumida: 'Frutífero, produtivo', categoria: 'adjetivo' },
  'G2718': { definicao: 'Descer, ir embora, aportar.', definicaoResumida: 'Descer, ir embora, aportar', categoria: 'verbo' },
  'G2756': { definicao: 'Vazio, vão, fútil.', definicaoResumida: 'Vazio, vão, fútil', categoria: 'adjetivo' },
  'G2812': { definicao: 'Ladrão, roubo.', definicaoResumida: 'Ladrão, roubo', categoria: 'substantivo' },
  'G2821': { definicao: 'Chamado, chamamento, vocação.', definicaoResumida: 'Chamado, chamamento, vocação', categoria: 'substantivo' },
  'G2866': { definicao: 'Melhorar (de saúde).', definicaoResumida: 'Melhorar (de saúde)', categoria: 'advérbio' },
  'G3037': { definicao: 'Pedra.', definicaoResumida: 'Pedra', categoria: 'substantivo' },
  'G3045': { definicao: 'Delicado, suntuoso, gordíssimo.', definicaoResumida: 'Delicado, suntuoso, gordíssimo', categoria: 'adjetivo' },
  'G3085': { definicao: 'Redenção, libertação.', definicaoResumida: 'Redenção, libertação', categoria: 'substantivo' },
  'G3112': { definicao: 'Longe, à distância.', definicaoResumida: 'Longe, à distância', categoria: 'advérbio' },
  'G3147': { definicao: 'Açoitar, flagelar, chicotear.', definicaoResumida: 'Açoitar, flagelar, chicotear', categoria: 'verbo' },
  'G3174': { definicao: 'Grandeza, magnitude.', definicaoResumida: 'Grandeza, magnitude', categoria: 'substantivo' },
  'G3186': { definicao: 'Maior.', definicaoResumida: 'Maior', categoria: 'adjetivo' },
  'G3320': { definicao: 'Muro divisório, parede intermediária.', definicaoResumida: 'Muro divisório, parede intermediária', categoria: 'substantivo' },
  'G3324': { definicao: 'Cheio, repleto.', definicaoResumida: 'Cheio, repleto', categoria: 'adjetivo' },
  'G3428': { definicao: 'Adúltera.', definicaoResumida: 'Adúltera', categoria: 'substantivo' },
  'G3435': { definicao: 'Manchar, contaminar,污染.', definicaoResumida: 'Manchar, contaminar', categoria: 'verbo' },
  'G3444': { definicao: 'Forma, aparência.', definicaoResumida: 'Forma, aparência', categoria: 'substantivo' },
  'G3445': { definicao: 'Dar forma, moldar, plasmar.', definicaoResumida: 'Dar forma, moldar, plasmar', categoria: 'verbo' },
  'G3500': { definicao: 'Morte, mortificação, impotência.', definicaoResumida: 'Morte, mortificação, impotência', categoria: 'substantivo' },
  'G3613': { definicao: 'Habitação, morada, residência.', definicaoResumida: 'Habitação, morada, residência', categoria: 'substantivo' },
  'G3744': { definicao: 'Odor, perfume, fragrância.', definicaoResumida: 'Odor, perfume, fragrância', categoria: 'substantivo' },
  'G3794': { definicao: 'Fortaleza, refúgio.', definicaoResumida: 'Fortaleza, refúgio', categoria: 'substantivo' },
  'G3802': { definicao: 'Enredar, apanhar, prender.', definicaoResumida: 'Enredar, apanhar, prender', categoria: 'verbo' },
  'G3889': { definicao: 'Consolo, encorajamento.', definicaoResumida: 'Consolo, encorajamento', categoria: 'substantivo' },
  'G3890': { definicao: 'Consolo, conforto.', definicaoResumida: 'Consolo, conforto', categoria: 'substantivo' },
  'G3940': { definicao: 'Peregrinação, estadia temporária.', definicaoResumida: 'Peregrinação, estadia temporária', categoria: 'substantivo' },
  'G4145': { definicao: 'Rico, abastado, opulento.', definicaoResumida: 'Rico, abastado, opulento', categoria: 'adjetivo' },
  'G4148': { definicao: 'Enriquecer, tornar rico.', definicaoResumida: 'Enriquecer, tornar rico', categoria: 'verbo' },
  'G4163': { definicao: 'Autor, poeta, autor de.', definicaoResumida: 'Autor, poeta, autor de', categoria: 'substantivo' },
  'G4167': { definicao: 'Rebanho, aprisco.', definicaoResumida: 'Rebanho, aprisco', categoria: 'substantivo' },
  'G4199': { definicao: 'Destruir, devastar, saquear.', definicaoResumida: 'Destruir, devastar, saquear', categoria: 'verbo' },
  'G4204': { definicao: 'Prostituta, meretriz.', definicaoResumida: 'Prostituta, meretriz', categoria: 'substantivo' },
  'G4418': { definicao: 'Calcanhar.', definicaoResumida: 'Calcanhar', categoria: 'substantivo' },
  'G4473': { definicao: 'Aspersão, respingo, aplicação.', definicaoResumida: 'Aspersão, respingo, aplicação', categoria: 'substantivo' },
  'G4617': { definicao: 'Peneirar, acossar, testar.', definicaoResumida: 'Peneirar, acossar, testar', categoria: 'verbo' },
  'G4740': { definicao: 'Firmeza, estabilidade, consistência.', definicaoResumida: 'Firmeza, estabilidade, consistência', categoria: 'substantivo' },
  'G4821': { definicao: 'Reinar com, ser co-regente com.', definicaoResumida: 'Reinar com, ser co-regente com', categoria: 'verbo' },
  'G5079': { definicao: 'Artífice, construtor, artesão.', definicaoResumida: 'Artífice, construtor, artesão', categoria: 'substantivo' },
  'G5462': { definicao: 'Iluminação, luz.', definicaoResumida: 'Iluminação, luz', categoria: 'substantivo' },
  'G5593': { definicao: 'Frio, gelado.', definicaoResumida: 'Frio, gelado', categoria: 'adjetivo' },
};

// Additional entries that are still in English or have garbled morphologia/categoria
const additionalFixes = {
  'G154': { definicao: 'Pedir, requisitar, suplicar.', definicaoResumida: 'Pedir, requisitar, suplicar', categoria: 'verbo' },
  'G162': { definicao: 'Cativeiro, fazer prisioneiro.', definicaoResumida: 'Cativeiro, fazer prisioneiro', categoria: 'verbo' },
  'G198': { definicao: 'Necessariamente, por necessidade.', definicaoResumida: 'Necessariamente, por necessidade', categoria: 'advérbio' },
  'G348': { definicao: 'Frear, deter, estorvar.', definicaoResumida: 'Frear, deter, estorvar', categoria: 'verbo' },
  'G548': { definicao: 'Estar ausente.', definicaoResumida: 'Estar ausente', categoria: 'verbo' },
  'G551': { definicao: 'Não tentado, isento de tentação.', definicaoResumida: 'Não tentado, isento de tentação', categoria: 'adjetivo' },
  'G757': { definicao: 'Ser o primeiro (em posição política ou poder).', definicaoResumida: 'Ser o primeiro (em posição política ou poder)', categoria: 'verbo' },
  'G762': { definicao: 'Não extinto, perpétuo, inextinguível.', definicaoResumida: 'Não extinto, perpétuo, inextinguível', categoria: 'adjetivo' },
  'G764': { definicao: 'Ser ímpio, praticar impiedade.', definicaoResumida: 'Ser ímpio, praticar impiedade', categoria: 'verbo' },
  'G770': { definicao: 'Estar doente, enfraquecer.', definicaoResumida: 'Estar doente, enfraquecer', categoria: 'verbo' },
  'G805': { definicao: 'Tornar seguro, garantir, proteger.', definicaoResumida: 'Tornar seguro, garantir, proteger', categoria: 'verbo' },
  'G812': { definicao: 'Portar-se desordenadamente.', definicaoResumida: 'Portar-se desordenadamente', categoria: 'verbo' },
  'G853': { definicao: 'Tornar invisível, corromper, desfigurar, perecer.', definicaoResumida: 'Tornar invisível, corromper, desfigurar, perecer', categoria: 'verbo' },
  'G889': { definicao: 'Tornar inútil.', definicaoResumida: 'Tornar inútil', categoria: 'verbo' },
  'G992': { definicao: 'Deve ser lançado.', definicaoResumida: 'Deve ser lançado', categoria: 'adjetivo' },
  'G1095': { definicao: 'Envelhecer.', definicaoResumida: 'Envelhecer', categoria: 'verbo' },
  'G1168': { definicao: 'Ser tímido, covarde.', definicaoResumida: 'Ser tímido, covarde', categoria: 'verbo' },
  'G1189': { definicao: 'Suplicar, rogar, pedir com insistência.', definicaoResumida: 'Suplicar, rogar, pedir com insistência', categoria: 'verbo' },
  'G1280': { definicao: 'Estar completamente perplexo, duvidar.', definicaoResumida: 'Estar completamente perplexo, duvidar', categoria: 'verbo' },
  'G1363': { definicao: 'Dobrar, redobrar.', definicaoResumida: 'Dobrar, redobrar', categoria: 'verbo' },
  'G1387': { definicao: 'Ser enganoso, usar astúcia.', definicaoResumida: 'Ser enganoso, usar astúcia', categoria: 'verbo' },
  'G1433': { definicao: 'Presentear gratuitamente.', definicaoResumida: 'Presentear gratuitamente', categoria: 'verbo' },
  'G1486': { definicao: 'Ter costume, ser habitual.', definicaoResumida: 'Ter costume, ser habitual', categoria: 'verbo' },
  'G1514': { definicao: 'Viver em paz, manter a paz.', definicaoResumida: 'Viver em paz, manter a paz', categoria: 'verbo' },
  'G1584': { definicao: 'Brilhar, resplandecer.', definicaoResumida: 'Brilhar, resplandecer', categoria: 'verbo' },
  'G1585': { definicao: 'Esquecer completamente.', definicaoResumida: 'Esquecer completamente', categoria: 'verbo' },
  'G1608': { definicao: 'Entregar-se completamente à imoralidade.', definicaoResumida: 'Entregar-se completamente à imoralidade', categoria: 'verbo' },
  'G1751': { definicao: 'Estar dentro, haver.', definicaoResumida: 'Estar dentro, haver', categoria: 'verbo' },
  'G1754': { definicao: 'Ser ativo, eficiente, operar.', definicaoResumida: 'Ser ativo, eficiente, operar', categoria: 'verbo' },
  'G1760': { definicao: 'Refletir, ponderar, considerar.', definicaoResumida: 'Refletir, ponderar, considerar', categoria: 'verbo' },
  'G1823': { definicao: 'Iluminar, resplandecer (de muito branco).', definicaoResumida: 'Iluminar, resplandecer (de muito branco)', categoria: 'verbo' },
  'G1871': { definicao: 'Mendigar, pedir esmola.', definicaoResumida: 'Mendigar, pedir esmola', categoria: 'verbo' },
  'G1905': { definicao: 'Perguntar, interrogar, demandar.', definicaoResumida: 'Perguntar, interrogar, demandar', categoria: 'verbo' },
  'G2020': { definicao: 'Começar a clarear, amanhecer.', definicaoResumida: 'Começar a clarear, amanhecer', categoria: 'verbo' },
  'G2109': { definicao: 'Fazer bem, beneficiar.', definicaoResumida: 'Fazer bem, beneficiar', categoria: 'verbo' },
  'G2132': { definicao: 'Ser bem-intencionado, favorável.', definicaoResumida: 'Ser bem-intencionado, favorável', categoria: 'verbo' },
  'G2146': { definicao: 'Ter boa aparência, fazer boa figura.', definicaoResumida: 'Ter boa aparência, fazer boa figura', categoria: 'verbo' },
  'G2151': { definicao: 'Ser piedoso, reverenciar.', definicaoResumida: 'Ser piedoso, reverenciar', categoria: 'verbo' },
  'G2174': { definicao: 'Estar de bom ânimo, animar-se.', definicaoResumida: 'Estar de bom ânimo, animar-se', categoria: 'verbo' },
  'G2289': { definicao: 'Matar, pôr à morte, mortificar.', definicaoResumida: 'Matar, pôr à morte, mortificar', categoria: 'verbo' },
  'G2350': { definicao: 'Fazer tumulto, perturbar, confundir.', definicaoResumida: 'Fazer tumulto, perturbar, confundir', categoria: 'verbo' },
  'G2354': { definicao: 'Lamentar, prantear, chorar.', definicaoResumida: 'Lamentar, prantear, chorar', categoria: 'verbo' },
  'G2666': { definicao: 'Engolir, tragar, devorar.', definicaoResumida: 'Engolir, tragar, devorar', categoria: 'verbo' },
  'G2686': { definicao: 'Agir com astúcia contra.', definicaoResumida: 'Agir com astúcia contra', categoria: 'verbo' },
  'G2691': { definicao: 'Tornar-se luxurioso contra.', definicaoResumida: 'Tornar-se luxurioso contra', categoria: 'verbo' },
  'G2767': { definicao: 'Misturar, despejar (para beber).', definicaoResumida: 'Misturar, despejar (para beber)', categoria: 'verbo' },
  'G2955': { definicao: 'Curvar-se para a frente.', definicaoResumida: 'Curvar-se para a frente', categoria: 'verbo' },
  'G2979': { definicao: 'Recalcitrar, dar coices.', definicaoResumida: 'Recalcitrar, dar coices', categoria: 'verbo' },
  'G3054': { definicao: 'Discutir por trifles, controversas vãs.', definicaoResumida: 'Discutir por trifles, controversas vãs', categoria: 'verbo' },
  'G3093': { definicao: 'Afligir, entristecer, causar pesar.', definicaoResumida: 'Afligir, entristecer, causar pesar', categoria: 'verbo' },
  'G3106': { definicao: 'Felizar, dizer bem-aventurado.', definicaoResumida: 'Felizar, dizer bem-aventurado', categoria: 'verbo' },
  'G3114': { definicao: 'Ser paciente, tolerar, suportar.', definicaoResumida: 'Ser paciente, tolerar, suportar', categoria: 'verbo' },
  'G3154': { definicao: 'Tornar tolo, tornar vão.', definicaoResumida: 'Tornar tolo, tornar vão', categoria: 'verbo' },
  'G3199': { definicao: 'Importar, interessar.', definicaoResumida: 'Importar, interessar', categoria: 'verbo' },
  'G3356': { definicao: 'Ter compaixão moderada.', definicaoResumida: 'Ter compaixão moderada', categoria: 'verbo' },
  'G3455': { definicao: 'Mugir, roaring.', definicaoResumida: 'Mugir, roaring', categoria: 'verbo' },
  'G3580': { definicao: 'Ser hospitaleiro, acolher estrangeiros.', definicaoResumida: 'Ser hospitaleiro, acolher estrangeiros', categoria: 'verbo' },
  'G3868': { definicao: 'Recusar, desculpar-se, evitar.', definicaoResumida: 'Recusar, desculpar-se, evitar', categoria: 'verbo' },
  'G3879': { definicao: 'Olhar por cima do ombro, examinar.', definicaoResumida: 'Olhar por cima do ombro, examinar', categoria: 'verbo' },
};

const allFixes = { ...fixes, ...additionalFixes };

let fixedCount = 0;
let updatedContent = content;

for (const [strong, fix] of Object.entries(allFixes)) {
  // Match the entry by strong number
  const strongRegex = new RegExp(
    `(\\{\\s*strong:\\s*'${strong}'[^}]*?)definicao:\\s*'([^']*?)'`,
    'g'
  );

  updatedContent = updatedContent.replace(strongRegex, (match, prefix, oldDef) => {
    fixedCount++;
    return `${prefix}definicao: '${fix.definicao}'`;
  });

  // Fix definicaoResumida
  const resumidaRegex = new RegExp(
    `(\\{\\s*strong:\\s*'${strong}'[^}]*?)definicaoResumida:\\s*'([^']*?)'`,
    'g'
  );

  updatedContent = updatedContent.replace(resumidaRegex, (match, prefix, oldRes) => {
    return `${prefix}definicaoResumida: '${fix.definicaoResumida}'`;
  });

  // Fix categoria if needed
  if (fix.categoria) {
    const catRegex = new RegExp(
      `(\\{\\s*strong:\\s*'${strong}'[^}]*?)categoria:\\s*'([^']*?)'`,
      'g'
    );
    updatedContent = updatedContent.replace(catRegex, (match, prefix, oldCat) => {
      if (oldCat !== fix.categoria) {
        return `${prefix}categoria: '${fix.categoria}'`;
      }
      return match;
    });
  }
}

writeFileSync(filePath, updatedContent, 'utf8');
console.log(`Fixed ${fixedCount} entries in grego.ts`);
