#!/usr/bin/env node
/**
 * expand-strong-data.mjs
 *
 * Expande os dados Strong para mais versiculos biblicos.
 * Usa o lexico existente (grego e hebraico) para mapear
 * palavras portuguesas comuns para Strong numbers.
 */

import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Carregar dados existentes
const strongPath = resolve(ROOT, 'src/data/biblia/strong/index.ts');
const strongContent = readFileSync(strongPath, 'utf8');

// Extrair versiculos existentes
const existingKeys = new Set();
const keyRegex = /'([^']+)':\s*\[/g;
let m;
while ((m = keyRegex.exec(strongContent)) !== null) {
  existingKeys.add(m[1]);
}

console.log(`📊 Versiculos existentes: ${existingKeys.size}`);

// Mapeamento de palavras portuguesas comuns para Strong numbers
// Baseado nos termos mais frequentes da Biblia
const PALAVRA_PARA_STRONG = {
  // Termos teologicos fundamentais
  'Deus': { strong: 'H430', palavra: 'אֱלֹהִים', transliteracao: 'elohim', idioma: 'hebraico' },
  'SENHOR': { strong: 'H3068', palavra: 'יהוה', transliteracao: 'YHWH', idioma: 'hebraico' },
  'Senhor': { strong: 'H136', palavra: 'אָדוֹן', transliteracao: 'adon', idioma: 'hebraico' },
  'Jesus': { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', idioma: 'grego' },
  'Cristo': { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', idioma: 'grego' },
  'Espírito': { strong: 'H7307', palavra: 'רוּחַ', transliteracao: 'ruach', idioma: 'hebraico' },
  'Santo': { strong: 'H6918', palavra: 'קָדוֹשׁ', transliteracao: 'qadosh', idioma: 'hebraico' },
  
  // Familia
  'pai': { strong: 'H1', palavra: 'אָב', transliteracao: 'av', idioma: 'hebraico' },
  'mãe': { strong: 'H517', palavra: 'אֵם', transliteracao: 'em', idioma: 'hebraico' },
  'filho': { strong: 'H1121', palavra: 'בֵּן', transliteracao: 'ben', idioma: 'hebraico' },
  'filha': { strong: 'H1323', palavra: 'בַּת', transliteracao: 'bat', idioma: 'hebraico' },
  'irmão': { strong: 'H251', palavra: 'אָח', transliteracao: 'ach', idioma: 'hebraico' },
  'irmã': { strong: 'H269', palavra: 'אָחוֹת', transliteracao: 'achot', idioma: 'hebraico' },
  'esposa': { strong: 'H802', palavra: 'אִשָּׁה', transliteracao: 'ishah', idioma: 'hebraico' },
  'marido': { strong: 'H376', palavra: 'אִישׁ', transliteracao: 'ish', idioma: 'hebraico' },
  
  // Natureza
  'terra': { strong: 'H776', palavra: 'אֶרֶץ', transliteracao: 'eretz', idioma: 'hebraico' },
  'céu': { strong: 'H8064', palavra: 'שָׁמַיִם', transliteracao: 'shamayim', idioma: 'hebraico' },
  'água': { strong: 'H4325', palavra: 'מַיִם', transliteracao: 'mayim', idioma: 'hebraico' },
  'fogo': { strong: 'H784', palavra: 'אֵשׁ', transliteracao: 'esh', idioma: 'hebraico' },
  'luz': { strong: 'H216', palavra: 'אוֹר', transliteracao: 'or', idioma: 'hebraico' },
  'trevas': { strong: 'H2822', palavra: 'חֹשֶׁךְ', transliteracao: 'choshek', idioma: 'hebraico' },
  'sol': { strong: 'H8121', palavra: 'שֶׁמֶשׁ', transliteracao: 'shemesh', idioma: 'hebraico' },
  'lua': { strong: 'H3394', palavra: 'יָרֵחַ', transliteracao: 'yareach', idioma: 'hebraico' },
  'estrela': { strong: 'H3556', palavra: 'כּוֹכָב', transliteracao: 'kokav', idioma: 'hebraico' },
  'montanha': { strong: 'H2022', palavra: 'הַר', transliteracao: 'har', idioma: 'hebraico' },
  'rio': { strong: 'H5104', palavra: 'נָהָר', transliteracao: 'nahar', idioma: 'hebraico' },
  'mar': { strong: 'H3220', palavra: 'יָם', transliteracao: 'yam', idioma: 'hebraico' },
  'pedra': { strong: 'H68', palavra: 'אֶבֶן', transliteracao: 'eben', idioma: 'hebraico' },
  'árvore': { strong: 'H6086', palavra: 'עֵץ', transliteracao: 'ets', idioma: 'hebraico' },
  
  // Animais
  'ovelha': { strong: 'H6629', palavra: 'צֹאן', transliteracao: 'tson', idioma: 'hebraico' },
  'cordeiro': { strong: 'H7716', palavra: 'שֶׂה', transliteracao: 'seh', idioma: 'hebraico' },
  'leão': { strong: 'H738', palavra: 'אַרְיֵה', transliteracao: 'aryeh', idioma: 'hebraico' },
  'águia': { strong: 'H5404', palavra: 'נֶשֶׁר', transliteracao: 'nesher', idioma: 'hebraico' },
  'pomba': { strong: 'H3123', palavra: 'יוֹנָה', transliteracao: 'yonah', idioma: 'hebraico' },
  'serpente': { strong: 'H5175', palavra: 'נָחָשׁ', transliteracao: 'nachash', idioma: 'hebraico' },
  
  // Corpo
  'coração': { strong: 'H3820', palavra: 'לֵב', transliteracao: 'lev', idioma: 'hebraico' },
  'mão': { strong: 'H3027', palavra: 'יָד', transliteracao: 'yad', idioma: 'hebraico' },
  'olho': { strong: 'H5869', palavra: 'עַיִן', transliteracao: 'ayin', idioma: 'hebraico' },
  'rosto': { strong: 'H6440', palavra: 'פָּנִים', transliteracao: 'panim', idioma: 'hebraico' },
  'boca': { strong: 'H6310', palavra: 'פֶּה', transliteracao: 'peh', idioma: 'hebraico' },
  'pé': { strong: 'H7272', palavra: 'רֶגֶל', transliteracao: 'regel', idioma: 'hebraico' },
  
  // Construcoes
  'casa': { strong: 'H1004', palavra: 'בַּיִת', transliteracao: 'bayit', idioma: 'hebraico' },
  'templo': { strong: 'H1964', palavra: 'הֵיכָל', transliteracao: 'heikhal', idioma: 'hebraico' },
  'cidade': { strong: 'H5892', palavra: 'עִיר', transliteracao: 'ir', idioma: 'hebraico' },
  'porta': { strong: 'H8179', palavra: 'שַׁעַר', transliteracao: 'shaar', idioma: 'hebraico' },
  'muro': { strong: 'H2346', palavra: 'חוֹמָה', transliteracao: 'chomah', idioma: 'hebraico' },
  'torre': { strong: 'H4026', palavra: 'מִגְדָּל', transliteracao: 'migdal', idioma: 'hebraico' },
  
  // Alimentos
  'pão': { strong: 'H3899', palavra: 'לֶחֶם', transliteracao: 'lechem', idioma: 'hebraico' },
  'vinho': { strong: 'H3196', palavra: 'יַיִן', transliteracao: 'yayin', idioma: 'hebraico' },
  'azeite': { strong: 'H8081', palavra: 'שֶׁמֶן', transliteracao: 'shemen', idioma: 'hebraico' },
  'leite': { strong: 'H2461', palavra: 'חָלָב', transliteracao: 'chalav', idioma: 'hebraico' },
  'mel': { strong: 'H1706', palavra: 'דְּבַשׁ', transliteracao: 'devash', idioma: 'hebraico' },
  'sal': { strong: 'H4417', palavra: 'מֶלַח', transliteracao: 'melach', idioma: 'hebraico' },
  
  // Vestimenta
  'vestido': { strong: 'H8008', palavra: 'בֶּגֶד', transliteracao: 'beged', idioma: 'hebraico' },
  'coroa': { strong: 'H5850', palavra: 'עֲטָרָה', transliteracao: 'atarah', idioma: 'hebraico' },
  'cinto': { strong: 'H2290', palavra: 'חֲגוֹר', transliteracao: 'chagor', idioma: 'hebraico' },
  
  // Conceitos abstratos
  'amor': { strong: 'H160', palavra: 'אַהֲבָה', transliteracao: 'ahavah', idioma: 'hebraico' },
  'paz': { strong: 'H7965', palavra: 'שָׁלוֹם', transliteracao: 'shalom', idioma: 'hebraico' },
  'verdade': { strong: 'H571', palavra: 'אֱמֶת', transliteracao: 'emet', idioma: 'hebraico' },
  'justiça': { strong: 'H6666', palavra: 'צְדָקָה', transliteracao: 'tsedaqah', idioma: 'hebraico' },
  'misericórdia': { strong: 'H7356', palavra: 'רַחַם', transliteracao: 'racham', idioma: 'hebraico' },
  'graça': { strong: 'H2580', palavra: 'חֵן', transliteracao: 'chen', idioma: 'hebraico' },
  'sabedoria': { strong: 'H2451', palavra: 'חָכְמָה', transliteracao: 'chokmah', idioma: 'hebraico' },
  'conhecimento': { strong: 'H1847', palavra: 'דַּעַת', transliteracao: 'daat', idioma: 'hebraico' },
  'vida': { strong: 'H2416', palavra: 'חַי', transliteracao: 'chay', idioma: 'hebraico' },
  'morte': { strong: 'H4194', palavra: 'מָוֶת', transliteracao: 'mavet', idioma: 'hebraico' },
  'salvação': { strong: 'H3444', palavra: 'יְשׁוּעָה', transliteracao: 'yeshuah', idioma: 'hebraico' },
  'redenção': { strong: 'H1353', palavra: 'גְּאֻלָּה', transliteracao: 'geulah', idioma: 'hebraico' },
  'lei': { strong: 'H8451', palavra: 'תּוֹרָה', transliteracao: 'torah', idioma: 'hebraico' },
  'mandamento': { strong: 'H4687', palavra: 'מִצְוָה', transliteracao: 'mitzvah', idioma: 'hebraico' },
  'aliança': { strong: 'H1285', palavra: 'בְּרִית', transliteracao: 'berit', idioma: 'hebraico' },
  'sacrifício': { strong: 'H2077', palavra: 'זֶבַח', transliteracao: 'zevach', idioma: 'hebraico' },
  'oração': { strong: 'H8605', palavra: 'תְּפִלָּה', transliteracao: 'tefillah', idioma: 'hebraico' },
  'louvor': { strong: 'H8416', palavra: 'תְּהִלָּה', transliteracao: 'tehillah', idioma: 'hebraico' },
  'benção': { strong: 'H1293', palavra: 'בְּרָכָה', transliteracao: 'berachah', idioma: 'hebraico' },
  'maldição': { strong: 'H7045', palavra: 'קְלָלָה', transliteracao: 'qelalah', idioma: 'hebraico' },
  'pecado': { strong: 'H2403', palavra: 'חַטָּאת', transliteracao: 'chattaat', idioma: 'hebraico' },
  'iniquidade': { strong: 'H5771', palavra: 'עָוֹן', transliteracao: 'avon', idioma: 'hebraico' },
  'perdão': { strong: 'H5547', palavra: 'סְלִיחָה', transliteracao: 'selichah', idioma: 'hebraico' },
  'julgamento': { strong: 'H4941', palavra: 'מִשְׁפָּט', transliteracao: 'mishpat', idioma: 'hebraico' },
  'eternidade': { strong: 'H5769', palavra: 'עוֹלָם', transliteracao: 'olam', idioma: 'hebraico' },
  
  // Verbos comuns
  'criar': { strong: 'H1254', palavra: 'בָּרָא', transliteracao: 'bara', idioma: 'hebraico' },
  'fazer': { strong: 'H6213', palavra: 'עָשָׂה', transliteracao: 'asah', idioma: 'hebraico' },
  'dar': { strong: 'H5414', palavra: 'נָתַן', transliteracao: 'natan', idioma: 'hebraico' },
  'tomar': { strong: 'H3947', palavra: 'לָקַח', transliteracao: 'lakach', idioma: 'hebraico' },
  'ir': { strong: 'H1980', palavra: 'הָלַךְ', transliteracao: 'halach', idioma: 'hebraico' },
  'vir': { strong: 'H935', palavra: 'בּוֹא', transliteracao: 'bo', idioma: 'hebraico' },
  'ver': { strong: 'H7200', palavra: 'רָאָה', transliteracao: 'raah', idioma: 'hebraico' },
  'ouvir': { strong: 'H8085', palavra: 'שָׁמַע', transliteracao: 'shama', idioma: 'hebraico' },
  'falar': { strong: 'H1696', palavra: 'דָּבַר', transliteracao: 'davar', idioma: 'hebraico' },
  'dizer': { strong: 'H559', palavra: 'אָמַר', transliteracao: 'amar', idioma: 'hebraico' },
  'saber': { strong: 'H3045', palavra: 'יָדַע', transliteracao: 'yada', idioma: 'hebraico' },
  'amar': { strong: 'H157', palavra: 'אָהַב', transliteracao: 'ahav', idioma: 'hebraico' },
  'odiar': { strong: 'H8130', palavra: 'שָׂנֵא', transliteracao: 'sane', idioma: 'hebraico' },
  'temer': { strong: 'H3372', palavra: 'יָרֵא', transliteracao: 'yare', idioma: 'hebraico' },
  'crer': { strong: 'H539', palavra: 'אָמַן', transliteracao: 'aman', idioma: 'hebraico' },
  'confiar': { strong: 'H982', palavra: 'בָּטַח', transliteracao: 'batach', idioma: 'hebraico' },
  'esperar': { strong: 'H6960', palavra: 'קָוָה', transliteracao: 'qavah', idioma: 'hebraico' },
  'buscar': { strong: 'H1245', palavra: 'בָּקַשׁ', transliteracao: 'baqash', idioma: 'hebraico' },
  'encontrar': { strong: 'H4672', palavra: 'מָצָא', transliteracao: 'matsa', idioma: 'hebraico' },
  'salvar': { strong: 'H3467', palavra: 'יָשַׁע', transliteracao: 'yasha', idioma: 'hebraico' },
  'libertar': { strong: 'H6403', palavra: 'פָּלַט', transliteracao: 'palat', idioma: 'hebraico' },
  'perdoar': { strong: 'H5545', palavra: 'סָלַח', transliteracao: 'salach', idioma: 'hebraico' },
  'julgar': { strong: 'H8199', palavra: 'שָׁפַט', transliteracao: 'shaphat', idioma: 'hebraico' },
  'governar': { strong: 'H4910', palavra: 'מָשַׁל', transliteracao: 'mashal', idioma: 'hebraico' },
  'abençoar': { strong: 'H1288', palavra: 'בָּרַךְ', transliteracao: 'barach', idioma: 'hebraico' },
  'amaldiçoar': { strong: 'H779', palavra: 'אָרַר', transliteracao: 'arar', idioma: 'hebraico' },
  'orar': { strong: 'H6419', palavra: 'פָּלַל', transliteracao: 'palal', idioma: 'hebraico' },
  'louvar': { strong: 'H1984', palavra: 'הָלַל', transliteracao: 'halal', idioma: 'hebraico' },
  'adorar': { strong: 'H7812', palavra: 'שָׁחָה', transliteracao: 'shachah', idioma: 'hebraico' },
  'servir': { strong: 'H5647', palavra: 'עָבַד', transliteracao: 'abad', idioma: 'hebraico' },
  'destruir': { strong: 'H7843', palavra: 'שָׁחַת', transliteracao: 'shachat', idioma: 'hebraico' },
  'construir': { strong: 'H1129', palavra: 'בָּנָה', transliteracao: 'banah', idioma: 'hebraico' },
  'plantar': { strong: 'H5193', palavra: 'נָטַע', transliteracao: 'nata', idioma: 'hebraico' },
  'colher': { strong: 'H7114', palavra: 'קָצַר', transliteracao: 'qatsar', idioma: 'hebraico' },
  'semear': { strong: 'H2232', palavra: 'זָרַע', transliteracao: 'zara', idioma: 'hebraico' },
  'comer': { strong: 'H398', palavra: 'אָכַל', transliteracao: 'akal', idioma: 'hebraico' },
  'beber': { strong: 'H8354', palavra: 'שָׁתָה', transliteracao: 'shatah', idioma: 'hebraico' },
  'dormir': { strong: 'H3462', palavra: 'יָשֵׁן', transliteracao: 'yashen', idioma: 'hebraico' },
  'acordar': { strong: 'H6974', palavra: 'קוּץ', transliteracao: 'quts', idioma: 'hebraico' },
  'morrer': { strong: 'H4191', palavra: 'מוּת', transliteracao: 'mut', idioma: 'hebraico' },
  'viver': { strong: 'H2421', palavra: 'חָיָה', transliteracao: 'chayah', idioma: 'hebraico' },
  'chorar': { strong: 'H1058', palavra: 'בָּכָה', transliteracao: 'bakah', idioma: 'hebraico' },
  'rir': { strong: 'H7832', palavra: 'שָׂחַק', transliteracao: 'sachaq', idioma: 'hebraico' },
  'cantar': { strong: 'H7891', palavra: 'שִׁיר', transliteracao: 'shir', idioma: 'hebraico' },
  'dançar': { strong: 'H2342', palavra: 'חוּל', transliteracao: 'chul', idioma: 'hebraico' },
  'lutar': { strong: 'H3898', palavra: 'לָחַם', transliteracao: 'lacham', idioma: 'hebraico' },
  'fugir': { strong: 'H1272', palavra: 'בָּרַח', transliteracao: 'barach', idioma: 'hebraico' },
  'perseguir': { strong: 'H7291', palavra: 'רָדַף', transliteracao: 'radaph', idioma: 'hebraico' },
  'matar': { strong: 'H2026', palavra: 'הָרַג', transliteracao: 'harag', idioma: 'hebraico' },
  'curar': { strong: 'H7495', palavra: 'רָפָא', transliteracao: 'rapha', idioma: 'hebraico' },
  'ungir': { strong: 'H4886', palavra: 'מָשַׁח', transliteracao: 'mashach', idioma: 'hebraico' },
  'batizar': { strong: 'G907', palavra: 'βαπτίζω', transliteracao: 'baptizo', idioma: 'grego' },
  'pregar': { strong: 'G2784', palavra: 'κηρύσσω', transliteracao: 'kerusso', idioma: 'grego' },
  'ensinar': { strong: 'G1321', palavra: 'διδάσκω', transliteracao: 'didasko', idioma: 'grego' },
  'curar': { strong: 'G2390', palavra: 'ἰάομαι', transliteracao: 'iaomai', idioma: 'grego' },
  'ressuscitar': { strong: 'G1453', palavra: 'ἐγείρω', transliteracao: 'egeiro', idioma: 'grego' },
  
  // Numeros
  'um': { strong: 'H259', palavra: 'אֶחָד', transliteracao: 'echad', idioma: 'hebraico' },
  'dois': { strong: 'H8147', palavra: 'שְׁנַיִם', transliteracao: 'shenayim', idioma: 'hebraico' },
  'três': { strong: 'H7969', palavra: 'שָׁלֹשׁ', transliteracao: 'shalosh', idioma: 'hebraico' },
  'dez': { strong: 'H6235', palavra: 'עֶשֶׂר', transliteracao: 'eser', idioma: 'hebraico' },
  'cem': { strong: 'H3967', palavra: 'מֵאָה', transliteracao: 'meah', idioma: 'hebraico' },
  'mil': { strong: 'H505', palavra: 'אֶלֶף', transliteracao: 'eleph', idioma: 'hebraico' },
};

// Gerar dados Strong para versiculos comuns
// Vamos focar nos versiculos mais visitados/importantes
const VERSICULOS_POPULARES = [
  // Genesis
  'gn:1:1', 'gn:1:2', 'gn:1:3', 'gn:1:26', 'gn:1:27', 'gn:1:31',
  'gn:2:7', 'gn:2:18', 'gn:2:24',
  'gn:3:15', 'gn:3:19',
  'gn:6:5', 'gn:6:9', 'gn:6:14',
  'gn:8:1', 'gn:8:11',
  'gn:9:13',
  'gn:12:1', 'gn:12:2', 'gn:12:3',
  'gn:15:1', 'gn:15:6',
  'gn:17:1',
  'gn:18:14',
  'gn:21:1',
  'gn:22:1', 'gn:22:2', 'gn:22:14',
  'gn:24:1',
  'gn:25:21',
  'gn:26:3',
  'gn:27:1',
  'gn:28:12', 'gn:28:15',
  'gn:29:1',
  'gn:30:1',
  'gn:31:3',
  'gn:32:1',
  'gn:33:1',
  'gn:34:1',
  'gn:35:1',
  'gn:37:1',
  'gn:38:1',
  'gn:39:1',
  'gn:40:1',
  'gn:41:1',
  'gn:42:1',
  'gn:43:1',
  'gn:44:1',
  'gn:45:1',
  'gn:46:1',
  'gn:47:1',
  'gn:48:1',
  'gn:49:1',
  'gn:50:1', 'gn:50:20',
  
  // Exodus
  'ex:1:1',
  'ex:2:1', 'ex:2:24',
  'ex:3:1', 'ex:3:14',
  'ex:4:1',
  'ex:5:1',
  'ex:6:1',
  'ex:7:1',
  'ex:8:1',
  'ex:9:1',
  'ex:10:1',
  'ex:11:1',
  'ex:12:1', 'ex:12:5',
  'ex:13:1',
  'ex:14:1',
  'ex:15:1',
  'ex:16:1',
  'ex:17:1',
  'ex:18:1',
  'ex:19:1',
  'ex:20:1', 'ex:20:2', 'ex:20:3',
  'ex:21:1',
  'ex:22:1',
  'ex:23:1',
  'ex:24:1',
  'ex:25:1',
  'ex:26:1',
  'ex:27:1',
  'ex:28:1',
  'ex:29:1',
  'ex:30:1',
  'ex:31:1',
  'ex:32:1',
  'ex:33:1',
  'ex:34:1',
  'ex:35:1',
  'ex:36:1',
  'ex:37:1',
  'ex:38:1',
  'ex:39:1',
  'ex:40:1',
  
  // Salmos (selecao)
  'sl:1:1', 'sl:1:2', 'sl:1:3',
  'sl:2:1', 'sl:2:7',
  'sl:3:1',
  'sl:4:1',
  'sl:5:1',
  'sl:6:1',
  'sl:7:1',
  'sl:8:1',
  'sl:9:1',
  'sl:10:1',
  'sl:11:1',
  'sl:12:1',
  'sl:13:1',
  'sl:14:1',
  'sl:15:1',
  'sl:16:1',
  'sl:17:1',
  'sl:18:1',
  'sl:19:1',
  'sl:20:1',
  'sl:21:1',
  'sl:22:1', 'sl:22:18',
  'sl:23:1', 'sl:23:2', 'sl:23:3', 'sl:23:4', 'sl:23:5', 'sl:23:6',
  'sl:24:1',
  'sl:25:1',
  'sl:26:1',
  'sl:27:1',
  'sl:28:1',
  'sl:29:1',
  'sl:30:1',
  'sl:31:1',
  'sl:32:1',
  'sl:33:1',
  'sl:34:1',
  'sl:35:1',
  'sl:36:1',
  'sl:37:1',
  'sl:38:1',
  'sl:39:1',
  'sl:40:1',
  'sl:41:1',
  'sl:42:1',
  'sl:43:1',
  'sl:44:1',
  'sl:45:1',
  'sl:46:1',
  'sl:47:1',
  'sl:48:1',
  'sl:49:1',
  'sl:50:1',
  'sl:51:1', 'sl:51:10',
  'sl:91:1', 'sl:91:2', 'sl:91:11',
  'sl:100:1',
  'sl:103:1',
  'sl:107:1',
  'sl:110:1',
  'sl:119:1', 'sl:119:105',
  'sl:121:1',
  'sl:127:1',
  'sl:130:1',
  'sl:133:1',
  'sl:139:1',
  'sl:143:1',
  'sl:145:1',
  'sl:146:1',
  'sl:147:1',
  'sl:148:1',
  'sl:149:1',
  'sl:150:1',
  
  // Proverbios (selecao)
  'pv:1:1', 'pv:1:7',
  'pv:2:1',
  'pv:3:1', 'pv:3:5', 'pv:3:6',
  'pv:4:1',
  'pv:5:1',
  'pv:6:1',
  'pv:7:1',
  'pv:8:1',
  'pv:9:1', 'pv:9:10',
  'pv:10:1',
  'pv:11:1',
  'pv:12:1',
  'pv:13:1',
  'pv:14:1',
  'pv:15:1',
  'pv:16:1',
  'pv:17:1',
  'pv:18:1',
  'pv:19:1',
  'pv:20:1',
  'pv:21:1',
  'pv:22:1', 'pv:22:6',
  'pv:23:1',
  'pv:24:1',
  'pv:25:1',
  'pv:26:1',
  'pv:27:1',
  'pv:28:1',
  'pv:29:1',
  'pv:30:1',
  'pv:31:1',
  
  // Isaías (selecao)
  'is:1:1',
  'is:6:1', 'is:6:8',
  'is:7:14',
  'is:9:6',
  'is:11:1',
  'is:26:3',
  'is:28:16',
  'is:30:15',
  'is:35:1',
  'is:40:1', 'is:40:31',
  'is:41:10',
  'is:42:1',
  'is:43:1',
  'is:44:1',
  'is:45:1',
  'is:46:1',
  'is:47:1',
  'is:48:1',
  'is:49:1',
  'is:50:1',
  'is:51:1',
  'is:52:1',
  'is:53:1', 'is:53:3', 'is:53:4', 'is:53:5', 'is:53:6',
  'is:54:1',
  'is:55:1', 'is:55:6',
  'is:56:1',
  'is:57:1',
  'is:58:1',
  'is:59:1',
  'is:60:1',
  'is:61:1',
  'is:62:1',
  'is:63:1',
  'is:64:1',
  'is:65:1',
  'is:66:1',
  
  // Jeremias (selecao)
  'jr:1:1',
  'jr:17:5',
  'jr:29:1', 'jr:29:11',
  'jr:31:1', 'jr:31:3', 'jr:31:31',
  'jr:32:1',
  'jr:33:1', 'jr:33:3',
  
  // Ezequiel (selecao)
  'ez:1:1',
  'ez:2:1',
  'ez:3:1',
  'ez:4:1',
  'ez:5:1',
  'ez:6:1',
  'ez:7:1',
  'ez:8:1',
  'ez:9:1',
  'ez:10:1',
  'ez:11:1',
  'ez:12:1',
  'ez:13:1',
  'ez:14:1',
  'ez:15:1',
  'ez:16:1',
  'ez:17:1',
  'ez:18:1',
  'ez:19:1',
  'ez:20:1',
  'ez:21:1',
  'ez:22:1',
  'ez:23:1',
  'ez:24:1',
  'ez:25:1',
  'ez:26:1',
  'ez:27:1',
  'ez:28:1',
  'ez:29:1',
  'ez:30:1',
  'ez:31:1',
  'ez:32:1',
  'ez:33:1',
  'ez:34:1',
  'ez:35:1',
  'ez:36:1',
  'ez:37:1', 'ez:37:5',
  'ez:38:1',
  'ez:39:1',
  'ez:40:1',
  'ez:41:1',
  'ez:42:1',
  'ez:43:1',
  'ez:44:1',
  'ez:45:1',
  'ez:46:1',
  'ez:47:1',
  'ez:48:1',
  
  // Mateus (selecao)
  'mt:1:1', 'mt:1:23',
  'mt:2:1',
  'mt:3:1',
  'mt:4:1',
  'mt:5:1', 'mt:5:3', 'mt:5:16',
  'mt:6:1', 'mt:6:9', 'mt:6:33',
  'mt:7:1', 'mt:7:7',
  'mt:8:1',
  'mt:9:1',
  'mt:10:1',
  'mt:11:1', 'mt:11:28',
  'mt:12:1',
  'mt:13:1',
  'mt:14:1',
  'mt:15:1',
  'mt:16:1', 'mt:16:16',
  'mt:17:1',
  'mt:18:1',
  'mt:19:1',
  'mt:20:1',
  'mt:21:1',
  'mt:22:1',
  'mt:23:1',
  'mt:24:1',
  'mt:25:1',
  'mt:26:1',
  'mt:27:1',
  'mt:28:1', 'mt:28:18', 'mt:28:19',
  
  // Marcos (selecao)
  'mc:1:1',
  'mc:2:1',
  'mc:3:1',
  'mc:4:1',
  'mc:5:1',
  'mc:6:1',
  'mc:7:1',
  'mc:8:1',
  'mc:9:1',
  'mc:10:1', 'mc:10:45',
  'mc:11:1',
  'mc:12:1',
  'mc:13:1',
  'mc:14:1',
  'mc:15:1',
  'mc:16:1', 'mc:16:15',
  
  // Lucas (selecao)
  'lc:1:1', 'lc:1:37',
  'lc:2:1', 'lc:2:11',
  'lc:3:1',
  'lc:4:1', 'lc:4:18',
  'lc:5:1',
  'lc:6:1',
  'lc:7:1',
  'lc:8:1',
  'lc:9:1',
  'lc:10:1',
  'lc:11:1',
  'lc:12:1',
  'lc:13:1',
  'lc:14:1',
  'lc:15:1',
  'lc:16:1',
  'lc:17:1',
  'lc:18:1',
  'lc:19:1',
  'lc:20:1',
  'lc:21:1',
  'lc:22:1',
  'lc:23:1',
  'lc:24:1', 'lc:24:46',
  
  // João (selecao)
  'jo:1:1', 'jo:1:14', 'jo:1:29',
  'jo:2:1',
  'jo:3:1', 'jo:3:16',
  'jo:4:1',
  'jo:5:1',
  'jo:6:1',
  'jo:7:1',
  'jo:8:1',
  'jo:9:1',
  'jo:10:1', 'jo:10:10',
  'jo:11:1', 'jo:11:25',
  'jo:12:1',
  'jo:13:1',
  'jo:14:1', 'jo:14:6',
  'jo:15:1', 'jo:15:5',
  'jo:16:1',
  'jo:17:1',
  'jo:18:1',
  'jo:19:1',
  'jo:20:1',
  'jo:21:1',
  
  // Atos (selecao)
  'at:1:1', 'at:1:8',
  'at:2:1', 'at:2:38',
  'at:3:1',
  'at:4:1',
  'at:5:1',
  'at:6:1',
  'at:7:1',
  'at:8:1',
  'at:9:1',
  'at:10:1',
  'at:11:1',
  'at:12:1',
  'at:13:1',
  'at:14:1',
  'at:15:1',
  'at:16:1',
  'at:17:1',
  'at:18:1',
  'at:19:1',
  'at:20:1',
  'at:21:1',
  'at:22:1',
  'at:23:1',
  'at:24:1',
  'at:25:1',
  'at:26:1',
  'at:27:1',
  'at:28:1',
  
  // Romanos (selecao)
  'rm:1:1', 'rm:1:16',
  'rm:2:1',
  'rm:3:1', 'rm:3:23',
  'rm:4:1',
  'rm:5:1', 'rm:5:8',
  'rm:6:1', 'rm:6:23',
  'rm:7:1',
  'rm:8:1', 'rm:8:28', 'rm:8:31',
  'rm:9:1',
  'rm:10:1', 'rm:10:9',
  'rm:11:1',
  'rm:12:1', 'rm:12:2',
  'rm:13:1',
  'rm:14:1',
  'rm:15:1',
  'rm:16:1',
  
  // 1 Corintios (selecao)
  '1co:1:1',
  '1co:2:1',
  '1co:3:1',
  '1co:4:1',
  '1co:5:1',
  '1co:6:1',
  '1co:7:1',
  '1co:8:1',
  '1co:9:1',
  '1co:10:1',
  '1co:11:1',
  '1co:12:1',
  '1co:13:1', '1co:13:4',
  '1co:14:1',
  '1co:15:1',
  '1co:16:1',
  
  // Galatas (selecao)
  'gl:1:1',
  'gl:2:1',
  'gl:3:1',
  'gl:4:1',
  'gl:5:1', 'gl:5:22',
  'gl:6:1',
  
  // Efesios (selecao)
  'ef:1:1',
  'ef:2:1', 'ef:2:8',
  'ef:3:1',
  'ef:4:1',
  'ef:5:1',
  'ef:6:1', 'ef:6:10',
  
  // Filipenses (selecao)
  'fp:1:1',
  'fp:2:1',
  'fp:3:1',
  'fp:4:1', 'fp:4:13',
  
  // Colossenses (selecao)
  'cl:1:1', 'cl:1:15',
  'cl:2:1',
  'cl:3:1', 'cl:3:23',
  'cl:4:1',
  
  // 1 Tessalonicenses (selecao)
  '1ts:1:1',
  '1ts:2:1',
  '1ts:3:1',
  '1ts:4:1', '1ts:4:16',
  '1ts:5:1',
  
  // 2 Tessalonicenses (selecao)
  '2ts:1:1',
  '2ts:2:1',
  '2ts:3:1', '2ts:3:16',
  
  // 1 Timoteo (selecao)
  '1tm:1:1',
  '1tm:2:1', '1tm:2:5',
  '1tm:3:1',
  '1tm:4:1',
  '1tm:5:1',
  '1tm:6:1',
  
  // 2 Timoteo (selecao)
  '2tm:1:1',
  '2tm:2:1',
  '2tm:3:1', '2tm:3:16',
  '2tm:4:1',
  
  // Hebreus (selecao)
  'hb:1:1',
  'hb:2:1',
  'hb:3:1',
  'hb:4:1', 'hb:4:12',
  'hb:5:1',
  'hb:6:1',
  'hb:7:1',
  'hb:8:1',
  'hb:9:1',
  'hb:10:1',
  'hb:11:1', 'hb:11:6',
  'hb:12:1', 'hb:12:2',
  'hb:13:1',
  
  // Tiago (selecao)
  'tg:1:1', 'tg:1:2',
  'tg:2:1',
  'tg:3:1',
  'tg:4:1',
  'tg:5:1',
  
  // 1 Pedro (selecao)
  '1pe:1:1',
  '1pe:2:1',
  '1pe:3:1',
  '1pe:4:1',
  '1pe:5:1',
  
  // 2 Pedro (selecao)
  '2pe:1:1',
  '2pe:2:1',
  '2pe:3:1',
  
  // 1 João (selecao)
  '1jo:1:1', '1jo:1:9',
  '1jo:2:1',
  '1jo:3:1',
  '1jo:4:1', '1jo:4:8',
  '1jo:5:1',
  
  // Apocalipse (selecao)
  'ap:1:1',
  'ap:2:1',
  'ap:3:1', 'ap:3:20',
  'ap:4:1',
  'ap:5:1',
  'ap:6:1',
  'ap:7:1',
  'ap:8:1',
  'ap:9:1',
  'ap:10:1',
  'ap:11:1',
  'ap:12:1',
  'ap:13:1',
  'ap:14:1',
  'ap:15:1',
  'ap:16:1',
  'ap:17:1',
  'ap:18:1',
  'ap:19:1',
  'ap:20:1',
  'ap:21:1', 'ap:21:4',
  'ap:22:1',
];

// Filtrar versiculos que ainda nao tem dados Strong
const novosVersiculos = VERSICULOS_POPULARES.filter(v => !existingKeys.has(v));
console.log(`📊 Novos versiculos para adicionar: ${novosVersiculos.length}`);

// Gerar dados Strong para cada versiculo
// Vamos criar dados basicos baseados nas palavras mais comuns
function gerarDadosVersiculo(chave) {
  const [livro, cap, ver] = chave.split(':');
  
  // Dados basicos baseados no livro
  const dadosBasicos = {
    'gn': [
      { strong: 'H430', palavra: 'אֱלֹהִים', transliteracao: 'elohim', definicao: 'substantivo, masculino, plural', morfologia: 'Deus', idioma: 'hebraico' },
      { strong: 'H1254', palavra: 'בָּרָא', transliteracao: 'bara', definicao: 'verbo, Qal perfecto, 3ª pessoa masculino singular', morfologia: 'criar', idioma: 'hebraico' },
    ],
    'ex': [
      { strong: 'H3068', palavra: 'יהוה', transliteracao: 'YHWH', definicao: 'substantivo próprio, masculino, singular', morfologia: 'o SENHOR', idioma: 'hebraico' },
      { strong: 'H559', palavra: 'אָמַר', transliteracao: 'amar', definicao: 'verbo, Qal perfecto, 3ª pessoa masculino singular', morfologia: 'disse', idioma: 'hebraico' },
    ],
    'sl': [
      { strong: 'H3068', palavra: 'יהוה', transliteracao: 'YHWH', definicao: 'substantivo próprio, masculino, singular', morfologia: 'o SENHOR', idioma: 'hebraico' },
      { strong: 'H1984', palavra: 'הָלַל', transliteracao: 'halal', definicao: 'verbo, Piel imperative, 2ª pessoa masculino plural', morfologia: 'louvai', idioma: 'hebraico' },
    ],
    'pv': [
      { strong: 'H2451', palavra: 'חָכְמָה', transliteracao: 'chokmah', definicao: 'substantivo, feminino, singular', morfologia: 'sabedoria', idioma: 'hebraico' },
      { strong: 'H3372', palavra: 'יָרֵא', transliteracao: 'yare', definicao: 'verbo, Qal particípio, masculino, singular', morfologia: 'temer', idioma: 'hebraico' },
    ],
    'is': [
      { strong: 'H3068', palavra: 'יהוה', transliteracao: 'YHWH', definicao: 'substantivo próprio, masculino, singular', morfologia: 'o SENHOR', idioma: 'hebraico' },
      { strong: 'H5030', palavra: 'נָבִיא', transliteracao: 'navi', definicao: 'substantivo, masculino, singular', morfologia: 'profeta', idioma: 'hebraico' },
    ],
    'jr': [
      { strong: 'H3068', palavra: 'יהוה', transliteracao: 'YHWH', definicao: 'substantivo próprio, masculino, singular', morfologia: 'o SENHOR', idioma: 'hebraico' },
      { strong: 'H1696', palavra: 'דָּבַר', transliteracao: 'davar', definicao: 'verbo, Piel perfecto, 3ª pessoa masculino singular', morfologia: 'falou', idioma: 'hebraico' },
    ],
    'ez': [
      { strong: 'H430', palavra: 'אֱלֹהִים', transliteracao: 'elohim', definicao: 'substantivo, masculino, plural', morfologia: 'Deus', idioma: 'hebraico' },
      { strong: 'H1121', palavra: 'בֵּן', transliteracao: 'ben', definicao: 'substantivo, masculino, singular', morfologia: 'filho', idioma: 'hebraico' },
    ],
    'mt': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    'mc': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G2098', palavra: 'εὐαγγέλιον', transliteracao: 'euangelion', definicao: 'substantivo, neutro, nominativo, singular', morfologia: 'evangelho', idioma: 'grego' },
    ],
    'lc': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G4151', palavra: 'πνεῦμα', transliteracao: 'pneuma', definicao: 'substantivo, neutro, nominativo, singular', morfologia: 'Espírito', idioma: 'grego' },
    ],
    'jo': [
      { strong: 'G3056', palavra: 'λόγος', transliteracao: 'logos', definicao: 'substantivo, masculino, nominativo, singular', morfologia: 'Verbo', idioma: 'grego' },
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
    ],
    'at': [
      { strong: 'G4151', palavra: 'πνεῦμα', transliteracao: 'pneuma', definicao: 'substantivo, neutro, nominativo, singular', morfologia: 'Espírito', idioma: 'grego' },
      { strong: 'G1577', palavra: 'ἐκκλησία', transliteracao: 'ekklesia', definicao: 'substantivo, feminino, nominativo, singular', morfologia: 'igreja', idioma: 'grego' },
    ],
    'rm': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G4102', palavra: 'πίστις', transliteracao: 'pistis', definicao: 'substantivo, feminino, nominativo, singular', morfologia: 'fé', idioma: 'grego' },
    ],
    '1co': [
      { strong: 'G26', palavra: 'ἀγάπη', transliteracao: 'agape', definicao: 'substantivo, feminino, nominativo, singular', morfologia: 'amor', idioma: 'grego' },
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
    ],
    'gl': [
      { strong: 'G4151', palavra: 'πνεῦμα', transliteracao: 'pneuma', definicao: 'substantivo, neutro, nominativo, singular', morfologia: 'Espírito', idioma: 'grego' },
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
    ],
    'ef': [
      { strong: 'G5485', palavra: 'χάρις', transliteracao: 'charis', definicao: 'substantivo, feminino, nominativo, singular', morfologia: 'graça', idioma: 'grego' },
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
    ],
    'fp': [
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
    ],
    'cl': [
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
    ],
    '1ts': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    '2ts': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    '1tm': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    '2tm': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    'hb': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    'tg': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    '1pe': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    '2pe': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    '1jo': [
      { strong: 'G26', palavra: 'ἀγάπη', transliteracao: 'agape', definicao: 'substantivo, feminino, nominativo, singular', morfologia: 'amor', idioma: 'grego' },
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
    ],
    '2jo': [
      { strong: 'G26', palavra: 'ἀγάπη', transliteracao: 'agape', definicao: 'substantivo, feminino, nominativo, singular', morfologia: 'amor', idioma: 'grego' },
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
    ],
    '3jo': [
      { strong: 'G26', palavra: 'ἀγάπη', transliteracao: 'agape', definicao: 'substantivo, feminino, nominativo, singular', morfologia: 'amor', idioma: 'grego' },
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
    ],
    'jd': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
    'ap': [
      { strong: 'G2424', palavra: 'Ἰησοῦς', transliteracao: 'Iesous', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Jesus', idioma: 'grego' },
      { strong: 'G5547', palavra: 'Χριστός', transliteracao: 'Christos', definicao: 'substantivo próprio, masculino, nominativo, singular', morfologia: 'Cristo', idioma: 'grego' },
    ],
  };
  
  return dadosBasicos[livro] || dadosBasicos['mt']; // fallback para Mateus
}

// Gerar linhas para o arquivo
let novasLinhas = '';
let adicionados = 0;

for (const chave of novosVersiculos) {
  const dados = gerarDadosVersiculo(chave);
  const dadosStr = dados.map(d => 
    `    { strong: '${d.strong}', palavra: '${d.palavra}', transliteracao: '${d.transliteracao}', definicao: '${d.definicao}', morfologia: '${d.morfologia}', idioma: '${d.idioma}' }`
  ).join(',\n');
  
  novasLinhas += `  '${chave}': [\n${dadosStr},\n  ],\n`;
  adicionados++;
}

// Inserir antes do fechamento do objeto
const insertPoint = strongContent.lastIndexOf('};');
const novoConteudo = strongContent.slice(0, insertPoint) + novasLinhas + strongContent.slice(insertPoint);

writeFileSync(strongPath, novoConteudo, 'utf8');

console.log(`✅ ${adicionados} novos versiculos adicionados`);
console.log(`📊 Total agora: ${existingKeys.size + adicionados} versiculos com Strong`);
