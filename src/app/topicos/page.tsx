'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { hrefFromRef } from '@/lib/bibliaHref';
import { motion } from 'framer-motion';
import { Tag, Search, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Topico {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  categoria: string;
  versiculos: Array<{ ref: string; texto: string }>;
}

const TOPICOS: Topico[] = [
  {
    id: 'nomes-deus', nome: 'Nomes de Deus', icone: '👑', cor: 'from-amber-500 to-orange-500', categoria: 'Deus',
    versiculos: [
      { ref: 'Êxodo 3:14', texto: 'Eu Sou o que Sou (YHWH — Jeová, o Deus existente)' },
      { ref: 'Gênesis 17:1', texto: 'Deus Todo-Poderoso (El Shaddai)' },
      { ref: 'Salmos 23:1', texto: 'O Senhor é o meu Pastor (Jehovah Roi)' },
      { ref: 'Êxodo 15:26', texto: 'O Senhor que te sara (Jehovah Rapha)' },
      { ref: 'Juízes 6:24', texto: 'O Senhor é paz (Jehovah Shalom)' },
      { ref: 'Jeremias 23:6', texto: 'O Senhor, nossa justiça (Jehovah Tsidkenu)' },
      { ref: 'Salmos 46:1', texto: 'Deus é o nosso refúgio e fortaleza (Elohei Mikvah)' },
      { ref: 'Isaías 9:6', texto: 'Pai da Eternidade, Príncipe da Paz (Sar Shalom)' },
      { ref: 'João 1:1', texto: 'O Verbo (Logos) — a Palavra de Deus' },
      { ref: '1 João 4:8', texto: 'Deus é amor (Theos Agape)' },
    ],
  },
  {
    id: 'fe', nome: 'Fé', icone: '✝️', cor: 'from-blue-500 to-cyan-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'Hebreus 11:1', texto: 'Ora, a fé é o firme fundamento das coisas que se esperam' },
      { ref: 'Romanos 10:17', texto: 'A fé vem pelo ouvir, e o ouvir pela palavra de Deus' },
      { ref: 'Habacuque 2:4', texto: 'O justo viverá da fé' },
      { ref: 'Efésios 2:8', texto: 'Pela graça sois salvos, por meio da fé' },
      { ref: 'Mateus 17:20', texto: 'Se tiverdes fé como um grão de mostarda...' },
      { ref: 'Marcos 11:22', texto: 'Tende fé em Deus' },
      { ref: 'Hebreus 11:6', texto: 'Sem fé é impossível agradar a Deus' },
      { ref: 'Gálatas 2:20', texto: 'A vida que agora vivo na carne, vivo-a na fé do Filho de Deus' },
      { ref: '2 Coríntios 5:7', texto: 'Andamos por fé, e não por vista' },
      { ref: 'Tiago 2:17', texto: 'A fé, se não tiver obras, é morta' },
    ],
  },
  {
    id: 'amor', nome: 'Amor de Deus', icone: '❤️', cor: 'from-red-500 to-pink-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'João 3:16', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito' },
      { ref: 'Romanos 5:8', texto: 'Deus prova o seu amor para conosco em que Cristo morreu por nós' },
      { ref: '1 João 4:8', texto: 'Deus é amor' },
      { ref: '1 João 4:19', texto: 'Nós o amamos a ele, porque ele nos amou primeiro' },
      { ref: 'Jeremias 31:3', texto: 'Com amor eterno eu te amei' },
      { ref: 'Salmos 136:1', texto: 'Porque para sempre é a sua misericórdia' },
      { ref: 'Romanos 8:38-39', texto: 'Nada nos poderá separar do amor de Deus' },
      { ref: 'Efésios 3:18-19', texto: 'Conhecer o amor de Cristo que excede todo entendimento' },
      { ref: '1 Coríntios 13:4-7', texto: 'O amor é sofredor, é benigno; o amor não inveja...' },
      { ref: 'Cânticos 8:6', texto: 'O amor é forte como a morte' },
    ],
  },
  {
    id: 'oracao', nome: 'Oração', icone: '🙏', cor: 'from-purple-500 to-violet-500', categoria: 'Prática',
    versiculos: [
      { ref: 'Mateus 6:9-13', texto: 'Pai nosso que estás nos céus, santificado seja o teu nome...' },
      { ref: 'Filipenses 4:6', texto: 'Não vos preocupeis com coisa alguma; antes apresentai a Deus as vossas petições' },
      { ref: '1 Tessalonicenses 5:17', texto: 'Orai sem cessar' },
      { ref: 'Tiago 5:16', texto: 'A oração fervorosa do justo pode muito em seus efeitos' },
      { ref: 'Mateus 7:7', texto: 'Pedi, e dar-se-vos-á; buscai, e encontrareis' },
      { ref: 'João 14:13-14', texto: 'Tudo quanto pedirdes em meu nome, eu o farei' },
      { ref: 'Romanos 8:26', texto: 'O Espírito intercede por nós com gemidos inexprimíveis' },
      { ref: 'Salmos 145:18', texto: 'Perto está o Senhor de todos os que o invocam' },
      { ref: 'Jeremias 33:3', texto: 'Clama a mim, e responder-te-ei' },
      { ref: 'Mateus 26:41', texto: 'Vigiai e orai, para que não entreis em tentação' },
    ],
  },
  {
    id: 'salvacao', nome: 'Salvação', icone: '🕊️', cor: 'from-emerald-500 to-green-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Efésios 2:8-9', texto: 'Pela graça sois salvos, por meio da fé; e isto não vem de vós' },
      { ref: 'Romanos 6:23', texto: 'O dom gratuito de Deus é a vida eterna em Cristo Jesus' },
      { ref: 'Atos 4:12', texto: 'Em nenhum outro há salvação' },
      { ref: 'João 14:6', texto: 'Eu sou o caminho, a verdade e a vida' },
      { ref: 'Romanos 10:9', texto: 'Se confessares com a tua boca que Jesus é o Senhor... serás salvo' },
      { ref: 'João 3:3', texto: 'Se alguém não nascer de novo, não pode ver o reino de Deus' },
      { ref: 'Tito 3:5', texto: 'Nos salvou por meio do lavar da regeneração e da renovação do Espírito Santo' },
      { ref: '2 Coríntios 5:17', texto: 'Se alguém está em Cristo, nova criatura é' },
      { ref: 'Romanos 8:1', texto: 'Agora, pois, nenhuma condenação há para os que estão em Cristo Jesus' },
      { ref: 'João 10:28', texto: 'Eu lhes dou a vida eterna, e jamais perecerão' },
    ],
  },
  {
    id: 'paz', nome: 'Paz', icone: '☮️', cor: 'from-sky-500 to-blue-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'João 14:27', texto: 'Deixo-vos a paz, a minha paz vos dou' },
      { ref: 'Filipenses 4:7', texto: 'A paz de Deus, que excede todo o entendimento, guardará os vossos corações' },
      { ref: 'Isaías 26:3', texto: 'Tu conservarás em paz perfeita aquele cuja mente está firme em ti' },
      { ref: 'Salmos 29:11', texto: 'O Senhor dará força ao seu povo; o Senhor abençoará o seu povo com paz' },
      { ref: 'Romanos 5:1', texto: 'Tendo sido justificados pela fé, temos paz com Deus' },
      { ref: 'Colossenses 3:15', texto: 'A paz de Deus presida em vossos corações' },
      { ref: 'Isaías 9:6', texto: 'Príncipe da Paz' },
      { ref: 'Salmos 4:8', texto: 'Em paz me deitarei e também dormirei' },
      { ref: '2 Tessalonicenses 3:16', texto: 'O Senhor da paz vos conceda a paz sempre e de toda maneira' },
      { ref: 'Provérbios 16:7', texto: 'Quando os caminhos do homem agradam ao Senhor, até os seus inimigos traz paz' },
    ],
  },
  {
    id: 'sabedoria', nome: 'Sabedoria', icone: '📖', cor: 'from-yellow-500 to-amber-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'Provérbios 9:10', texto: 'O temor do Senhor é o princípio da sabedoria' },
      { ref: 'Tiago 1:5', texto: 'Se algum de vós tem falta de sabedoria, peça-a a Deus' },
      { ref: 'Provérbios 3:5-6', texto: 'Confia no Senhor de todo o teu coração' },
      { ref: '1 Coríntios 1:25', texto: 'A loucura de Deus é mais sábia do que os homens' },
      { ref: 'Colossenses 2:3', texto: 'Em Cristo estão escondidos todos os tesouros da sabedoria' },
      { ref: 'Provérbios 2:6', texto: 'O Senhor dá a sabedoria; da sua boca vem o conhecimento' },
      { ref: 'Eclesiastes 7:12', texto: 'A sabedoria protege, como protege o dinheiro' },
      { ref: 'Provérbios 4:7', texto: 'A sabedoria é a coisa principal; adquire pois a sabedoria' },
      { ref: '1 Coríntios 3:18-19', texto: 'A sabedoria deste mundo é loucura diante de Deus' },
      { ref: 'Salmos 111:10', texto: 'O temor do Senhor é o princípio da sabedoria' },
    ],
  },
  {
    id: 'esperanca', nome: 'Esperança', icone: '🌟', cor: 'from-orange-500 to-amber-500', categoria: 'Virtudes',
    versiculos: [
      { ref: 'Romanos 15:13', texto: 'O Deus de esperança vos encha de todo o gozo e paz' },
      { ref: 'Jeremias 29:11', texto: 'Eu bem sei os pensamentos que tenho a vosso respeito; pensamentos de paz' },
      { ref: 'Salmos 42:11', texto: 'Espera em Deus, porque ainda o louvarei' },
      { ref: 'Isaías 40:31', texto: 'Os que esperam no Senhor renovarão as forças' },
      { ref: 'Hebreus 11:1', texto: 'A fé é o firme fundamento das coisas que se esperam' },
      { ref: 'Romanos 8:24-25', texto: 'Esperamos com paciência' },
      { ref: 'Lamentações 3:25', texto: 'Bom é o Senhor para com os que nele esperam' },
      { ref: 'Salmos 39:7', texto: 'Agora, Senhor, que espero? A minha esperança está em ti' },
      { ref: 'Tito 2:13', texto: 'Esperando a bem-aventurada esperança' },
      { ref: 'Salmos 130:5', texto: 'Eu espero no Senhor, a minha alma espera' },
    ],
  },
  {
    id: 'providencia', nome: 'Providência de Deus', icone: '🛡️', cor: 'from-indigo-500 to-blue-500', categoria: 'Deus',
    versiculos: [
      { ref: 'Mateus 6:26', texto: 'Olhai para as aves do céu, que não semeiam nem ceifam; vosso Pai celestial as alimenta' },
      { ref: 'Mateus 6:33', texto: 'Buscai primeiro o reino de Deus, e todas estas coisas vos serão acrescentadas' },
      { ref: 'Filipenses 4:19', texto: 'O meu Deus suprirá todas as vossas necessidades' },
      { ref: 'Salmos 23:1', texto: 'O Senhor é o meu pastor; nada me faltará' },
      { ref: 'Romanos 8:28', texto: 'Todas as coisas contribuem juntamente para o bem' },
      { ref: 'Salmos 34:10', texto: 'Os jovens necessitam e passam fome, mas os que buscam ao Senhor não faltarão nenhum bem' },
      { ref: 'Gênesis 22:14', texto: 'O Senhor proverá (Jehovah Jireh)' },
      { ref: 'Deuteronômio 31:8', texto: 'O Senhor é quem vai adiante de ti; ele estará contigo' },
      { ref: 'Salmos 37:25', texto: 'Não vi justo desamparado, nem a sua semente a mendigar pão' },
      { ref: 'Isaías 41:10', texto: 'Não temas, porque eu sou contigo' },
    ],
  },
  {
    id: 'profecias-cristo', nome: 'Profecias sobre Cristo', icone: '📜', cor: 'from-rose-500 to-red-500', categoria: 'Profecia',
    versiculos: [
      { ref: 'Isaías 7:14', texto: 'A virgem conceberá e dará à luz um filho (cumprida em Mateus 1:23)' },
      { ref: 'Miquéias 5:2', texto: 'De ti me sairá o que há de ser governador em Israel (cumprida em Mateus 2:6)' },
      { ref: 'Isaías 9:6', texto: 'Porque um menino nos nasceu (cumprida em Lucas 2:11)' },
      { ref: 'Salmos 22:16', texto: 'Transpassaram as minhas mãos e os meus pés (cumprida em João 20:25)' },
      { ref: 'Salmos 16:10', texto: 'Não deixarás a minha alma no inferno (cumprida em Atos 2:31)' },
      { ref: 'Zacarias 11:12', texto: 'Avaliaram o meu salário em trinta moedas de prata (cumprida em Mateus 26:15)' },
      { ref: 'Isaías 53:5', texto: 'Ferido por causa das nossas transgressões (cumprida em 1 Pedro 2:24)' },
      { ref: 'Daniel 9:26', texto: 'Depois das sessenta e duas semanas será cortado o Ungido (cumprida em Mateus 27)' },
      { ref: 'Salmos 110:1', texto: 'Assenta-te à minha direita (cumprida em Hebreus 1:3)' },
      { ref: 'Apocalipse 1:7', texto: 'Eis que vem com as nuvens (profecia futura)' },
    ],
  },
  {
    id: 'graca', nome: 'Graça', icone: '💧', cor: 'from-cyan-500 to-blue-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Efésios 2:8', texto: 'Pela graça sois salvos, por meio da fé' },
      { ref: 'Romanos 3:24', texto: 'Sendo justificados de graça, por sua graça' },
      { ref: '2 Coríntios 12:9', texto: 'A minha graça te basta' },
      { ref: 'Romanos 5:15', texto: 'A graça de Deus e o dom pela graça de um só homem, Jesus Cristo' },
      { ref: 'Tito 2:11', texto: 'A graça de Deus se manifestou' },
      { ref: '1 Pedro 5:12', texto: 'Na verdadeira graça de Deus, permanecei' },
      { ref: 'Hebreus 4:16', texto: 'Entremos com confiança ao trono da graça' },
      { ref: 'Efésios 1:7', texto: 'Temos a redenção por meio do seu sangue, o perdão dos pecados, pela riqueza da sua graça' },
      { ref: 'Romanos 6:14', texto: 'Pois o pecado não terá domínio sobre vós, visto que não estais debaixo da lei, mas debaixo da graça' },
      { ref: 'Atos 20:24', texto: 'Testificar do evangelho da graça de Deus' },
    ],
  },
  {
    id: 'justificacao', nome: 'Justificação', icone: '⚖️', cor: 'from-blue-500 to-indigo-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Romanos 3:24', texto: 'Sendo justificados de graça, por sua graça, mediante a redenção' },
      { ref: 'Romanos 5:1', texto: 'Tendo sido justificados pela fé, temos paz com Deus' },
      { ref: 'Romanos 4:3', texto: 'Abraao creu em Deus, e isso lhe foi imputado como justiça' },
      { ref: 'Gálatas 2:16', texto: 'O homem não é justificado pelas obras da lei, mas pela fé em Jesus Cristo' },
      { ref: 'Tiago 2:24', texto: 'O homem é justificado pelas obras, e não somente pela fé' },
      { ref: 'Romanos 8:33', texto: 'Quem intentará accusation contra os escolhidos de Deus? É Deus quem os justifica' },
      { ref: 'Efésios 2:9', texto: 'Não vem de vós, é dom de Deus' },
      { ref: 'Isaías 53:11', texto: 'O meu servo justo justificará a muitos' },
      { ref: '1 Coríntios 1:30', texto: 'Cristo se fez para nós sabedoria, justiça, santificação e redenção' },
      { ref: 'Filipenses 3:9', texto: 'A justiça que vem de Deus, pela fé em Cristo' },
    ],
  },
  {
    id: 'santificacao', nome: 'Santificação', icone: '✨', cor: 'from-violet-500 to-purple-500', categoria: 'Doutrina',
    versiculos: [
      { ref: '1 Tessalonicenses 4:3', texto: 'A vontade de Deus é a vossa santificação' },
      { ref: 'Hebreus 12:14', texto: 'Segui a paz com todos, e a santificação, sem a qual ninguém verá o Senhor' },
      { ref: '1 Pedro 1:15-16', texto: 'Sede santos, porque eu sou santo' },
      { ref: 'Romanos 12:1', texto: 'Oferentai o vosso corpo em sacrificio vivo, santo e agradável a Deus' },
      { ref: '2 Coríntios 7:1', texto: 'Purifiquemo-nos de toda a contaminação da carne e do espírito, perfazendo a santificação no temor de Deus' },
      { ref: 'Filipenses 2:12-13', texto: 'Operai a vossa salvação com temor e tremor, pois Deus é quem opera em vós' },
      { ref: 'Gálatas 5:22-23', texto: 'O fruto do Espírito é amor, gozo, paz, longanimidade, benignidade, bondade, fé' },
      { ref: 'Colossenses 3:12', texto: 'Vesti-vos, como eleitos de Deus, santos e amados, de entranhas de misericórdia' },
      { ref: '1 João 3:3', texto: 'Todo aquele que nele tem esta esperança, purifica-se a si mesmo' },
      { ref: '1 Tessalonicenses 5:23', texto: 'O próprio Deus de paz vos santifique inteiramente' },
    ],
  },
  {
    id: 'igreja', nome: 'Igreja', icone: '⛪', cor: 'from-amber-500 to-yellow-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Mateus 16:18', texto: 'Edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela' },
      { ref: 'Efésios 1:22-23', texto: 'Deus o constituiu sobre todas as coisas como cabeça da igreja, que é o seu corpo' },
      { ref: 'Atos 2:42', texto: 'Perseveravam na doutrina dos apóstolos, na comunhão, na fração do pão e nas orações' },
      { ref: 'Romanos 12:4-5', texto: 'Assim nós, embora muitos, somos um corpo em Cristo' },
      { ref: '1 Coríntios 12:12-13', texto: 'Pois, assim como o corpo é um e tem muitos membros, assim também Cristo' },
      { ref: 'Efésios 4:11-13', texto: 'Cristo deu apóstolos, profetas, evangelistas, pastores e mestres para aperfeiçoar os santos' },
      { ref: '1 Pedro 2:9', texto: 'Vós sois linho escolhido, sacerdócio real, nação santa' },
      { ref: 'Hebreus 10:24-25', texto: 'Não deixemos de congregar-nos' },
      { ref: 'Colossenses 1:18', texto: 'Cristo é a cabeça da igreja, que é o seu corpo' },
      { ref: 'Efésios 5:25', texto: 'Cristo amou a igreja e a si mesmo se entregou por ela' },
    ],
  },
  {
    id: 'escatologia', nome: 'Fim dos Tempos', icone: '⏰', cor: 'from-red-500 to-rose-500', categoria: 'Profecia',
    versiculos: [
      { ref: 'Mateus 24:36', texto: 'Aquele dia e hora ninguém sabe, nem os anjos do céu, nem o Filho, senão só o Pai' },
      { ref: '1 Tessalonicenses 4:16-17', texto: 'O Senhor mesmo descerá do céu... e os mortos em Cristo ressuscitarão primeiro' },
      { ref: 'Apocalipse 21:1', texto: 'Vi um novo céu e uma nova terra' },
      { ref: 'Mateus 25:31', texto: 'Quando o Filho do Homem vier na sua glória, todos os anjos santos com ele' },
      { ref: '2 Pedro 3:10', texto: 'O dia do Senhor virá como um ladrão' },
      { ref: '1 Coríntios 15:51-52', texto: 'Nós não dormiremos, mas seremos transformados num instante' },
      { ref: 'Daniel 12:2', texto: 'Muitos dos que dormem na terra despertarão, uns para a vida eterna' },
      { ref: 'Mateus 24:14', texto: 'O evangelho do reino será pregado em todo o mundo' },
      { ref: 'Apocalipse 20:12', texto: 'Vi os mortos, grandes e pequenos, diante do trono' },
      { ref: '2 Tessalonicenses 1:7', texto: 'Quando o Senhor Jesus for revelado do céu com os seus anjos poderosos' },
    ],
  },
  {
    id: 'angelologia', nome: 'Anjos', icone: '👼', cor: 'from-sky-500 to-cyan-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Hebreus 1:14', texto: 'Não são todos espíritos ministradores, enviados para servir a favor dos que hão de herdar a salvação?' },
      { ref: 'Salmo 91:11', texto: 'Porque aos seus anjos mandará a teu respeito, que te guardem em todos os teus caminhos' },
      { ref: 'Lucas 15:10', texto: 'Há alegria na presença dos anjos de Deus por um pecador que se arrepende' },
      { ref: 'Mateus 18:10', texto: 'Os seus anjos nos céus veem continuamente o rosto do meu Pai celestial' },
      { ref: 'Daniel 6:22', texto: 'Deus enviou o seu anjo e fechou a boca dos leões' },
      { ref: 'Atos 12:7-8', texto: 'Um anjo do Senhor se aproximou e uma luz resplandeceu na cela' },
      { ref: 'Apocalipse 5:11', texto: 'Vi muitos anjos ao redor do trono... a sua voz era de muitas águas' },
      { ref: '1 Tessalonicenses 4:16', texto: 'O Senhor mesmo descerá do céu com grito de comando, com voz de arcanjo' },
      { ref: 'Judas 1:9', texto: 'O arcanjo Miguel, quando contendia com o diabo' },
      { ref: 'Isaías 6:2', texto: 'Seraphins, cada um tinha seis asas' },
    ],
  },
  {
    id: 'demonologia', nome: 'Demônios', icone: '⚠️', cor: 'from-gray-500 to-slate-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Efésios 6:12', texto: 'Não temos que lutar contra a carne e o sangue, mas contra principados e potestades' },
      { ref: '1 Pedro 5:8', texto: 'O diabo, vosso adversário, como leão ruge, busquando a quem devorar' },
      { ref: 'Tiago 4:7', texto: 'Sujeitai-vos logo a Deus; resisti ao diabo, e fugirá de vós' },
      { ref: '1 João 4:4', texto: 'Maior é aquele que está em vós do que aquele que está no mundo' },
      { ref: 'Efésios 6:11', texto: 'Vesti-vos com toda a armadura de Deus, para poderdes ficar firmes contra as ciladas do diabo' },
      { ref: 'Lucas 10:17', texto: 'Até os demônios nos são sujeitos pelo teu nome' },
      { ref: 'Marcos 5:9', texto: 'Chamo-me Legião, porque somos muitos' },
      { ref: '2 Coríntios 11:14', texto: 'O próprio Satanás se transfigura em anjo de luz' },
      { ref: 'Apocalipse 12:9', texto: 'O grande dragão, a serpente antiga, que se chama Diabo e Satanás' },
      { ref: 'Colossenses 2:15', texto: 'Despojando os principados e potestades, os expôs publicamente' },
    ],
  },
  {
    id: 'cristologia', nome: 'Cristo', icone: '✝️', cor: 'from-amber-500 to-yellow-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus' },
      { ref: 'João 1:14', texto: 'O Verbo se fez carne e habitou entre nós' },
      { ref: 'Colossenses 1:15-16', texto: 'Ele é a imagem do Deus invisível, o primogênito de toda a criação' },
      { ref: 'Filipenses 2:6-7', texto: 'Tendo a forma de Deus, não teve por usurpação ser igual a Deus, mas esvaziou-se a si mesmo' },
      { ref: 'Hebreus 1:3', texto: 'Estando a expressão da sua glória e a imagem exata do seu ser' },
      { ref: '1 Timóteo 3:16', texto: 'Deus se manifestou na carne, foi justificado no espírito' },
      { ref: 'João 14:9', texto: 'Quem me vê a mim, vê o Pai' },
      { ref: 'Isaías 9:6', texto: 'Um menino nos nasceu, um filho nos é dado' },
      { ref: 'Mateus 1:23', texto: 'Virgem conceberá e dará à luz um filho, e chamarão o seu nome Immanuel' },
      { ref: 'Revelação 19:16', texto: 'REI DOS REIS E SENHOR DOS SENHORES' },
    ],
  },
  {
    id: 'pneumatologia', nome: 'Espírito Santo', icone: '🕊️', cor: 'from-teal-500 to-emerald-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'João 14:26', texto: 'O Consolador, o Espírito Santo, vos ensinará todas as coisas' },
      { ref: 'Atos 1:8', texto: 'Recebereis poder, quando o Espírito Santo descer sobre vós' },
      { ref: 'Gálatas 5:22-23', texto: 'O fruto do Espírito é amor, gozo, paz, longanimidade, benignidade, bondade, fé' },
      { ref: '1 Coríntios 12:4-7', texto: 'Há diversidade de dons, mas o mesmo Espírito' },
      { ref: 'Romanos 8:26', texto: 'O Espírito mesmo intercede por nós com gemidos inexprimíveis' },
      { ref: 'Efésios 4:30', texto: 'Não entristeçais o Espírito Santo de Deus' },
      { ref: 'João 16:13', texto: 'Quando vier o Espírito da verdade, ele vos guiará a toda a verdade' },
      { ref: 'Atos 2:4', texto: 'Todos foram cheios do Espírito Santo e começaram a falar noutras línguas' },
      { ref: '1 Coríntios 6:19', texto: 'O vosso corpo é templo do Espírito Santo que habita em vós' },
      { ref: 'Romanos 8:11', texto: 'O Espírito daquele que ressuscitou Jesus dentre os mortos, habita em vós' },
    ],
  },
  {
    id: 'pecado', nome: 'Pecado', icone: '🔴', cor: 'from-red-600 to-red-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Romanos 3:23', texto: 'Todos pecaram e estão destituídos da glória de Deus' },
      { ref: 'Romanos 6:23', texto: 'O salário do pecado é a morte' },
      { ref: '1 João 1:8', texto: 'Se dissermos que não temos pecado, enganamo-nos a nós mesmos' },
      { ref: 'Tiago 1:15', texto: 'O pecado, quando consumado, gera a morte' },
      { ref: '1 João 3:4', texto: 'Todo aquele que pratica o pecado transgride a Lei' },
      { ref: 'Romanos 7:13', texto: 'O pecado, tomando ocasão pelo mandamento, produziu em mim toda a cobiça' },
      { ref: 'Isaías 59:2', texto: 'As vossas iniquidades fazem separação entre vós e o vosso Deus' },
      { ref: 'Gênesis 4:7', texto: 'O pecado está à porta; e para ti será o seu desejo, mas tu deverás dominá-lo' },
      { ref: '1 Coríntios 15:56', texto: 'O pecado tem o seu poder na Lei' },
      { ref: 'Efésios 2:1-2', texto: 'Estáveis mortos em vossos delitos e pecados' },
    ],
  },
  {
    id: 'nova-alianca', nome: 'Nova Aliança', icone: '📜', cor: 'from-amber-600 to-yellow-600', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Jeremias 31:31', texto: 'Porei a minha lei no meio deles, e a escreverei no seu coração' },
      { ref: 'Lucas 22:20', texto: 'Este cálice é a nova alança no meu sangue' },
      { ref: 'Hebreus 8:8-10', texto: 'Eis que dias vêm, diz o Senhor, em que farei uma nova aliança' },
      { ref: 'Hebreus 9:15', texto: 'Para que, chamados à herança eterna, recebamos a promessa' },
      { ref: '2 Coríntios 3:6', texto: 'A letra mata, mas o Espírito vivifica' },
      { ref: 'Hebreus 10:16', texto: 'Porei as minhas leis nos seus corações, e nas suas mentes as escreverei' },
      { ref: 'Mateus 26:28', texto: 'Este é o meu sangue, o sangue da nova alança, derramado por muitos' },
      { ref: 'Efésios 2:12', texto: 'Sem Deus, sem esperança e sem Deus no mundo' },
      { ref: 'Romanos 8:2', texto: 'A lei do Espírito de vida me livrou da lei do pecado e da morte' },
      { ref: 'Hebreus 12:24', texto: 'A Jesus, mediador da nova alança' },
    ],
  },
  {
    id: 'reino-de-deus', nome: 'Reino de Deus', icone: '👑', cor: 'from-yellow-600 to-amber-600', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Mateus 6:33', texto: 'Buscai primeiro o reino de Deus e a sua justiça' },
      { ref: 'Marcos 1:15', texto: 'O tempo está consumado, e o reino de Deus está próximo' },
      { ref: 'Lucas 17:21', texto: 'O reino de Deus está entre vós' },
      { ref: 'João 3:3', texto: 'Se alguém não nascer de novo, não pode ver o reino de Deus' },
      { ref: 'Romanos 14:17', texto: 'O reino de Deus não é comida nem bebida, mas justiça, paz e alegria no Espírito' },
      { ref: 'Mateus 13:31-32', texto: 'O reino dos céus é semelhante a um grão de mostarda' },
      { ref: 'Daniel 2:44', texto: 'O Deus do céu estabelecerá um reino que nunca será destruído' },
      { ref: 'Apocalipse 11:15', texto: 'Os reinos do mundo são do nosso Senhor e do Seu Cristo' },
      { ref: 'Mateus 25:34', texto: 'Vinde, benditos do meu Pai, herde o reino preparado para vós desde a fundação do mundo' },
      { ref: '2 Pedro 1:11', texto: 'Ser-vos-á amplamente concedida a entrada no reino eterno' },
    ],
  },
  {
    id: 'adoracao', nome: 'Adoração', icone: '🎵', cor: 'from-fuchsia-500 to-pink-500', categoria: 'Prática',
    versiculos: [
      { ref: 'João 4:23-24', texto: 'Adoradores o Pai procura em espírito e em verdade' },
      { ref: 'Salmo 95:1', texto: 'Cantai jubilosamente ao Senhor, todo o mundo' },
      { ref: 'Salmo 150:6', texto: 'Tudo o que tem fôlego louve ao Senhor' },
      { ref: 'Romanos 12:1', texto: 'Oferentai o vosso corpo em sacrificio vivo, santo e agradável a Deus' },
      { ref: 'Efésios 5:19', texto: 'Falando entre vós em salmos, e hinos, e canções espirituais' },
      { ref: 'Hebreus 13:15', texto: 'Seja-nos o louvor, continuo sacrifice a Deus' },
      { ref: 'Colossenses 3:16', texto: 'Instruí-vos e aconselhai-vos mutuamente em salmos, hinos e cânticos espirituais' },
      { ref: 'Apocalipse 4:11', texto: 'Tu és digno, Senhor, de receber a glória, e a honra, e o poder' },
      { ref: 'Salmo 29:2', texto: 'Adorai ao Senhor na beleza da sua santidade' },
      { ref: '1 Crônicas 16:29', texto: 'Adorai ao Senhor no adorno da sua santidade' },
    ],
  },
  {
    id: 'familia', nome: 'Família', icone: '👨‍👩‍👧‍👦', cor: 'from-rose-500 to-pink-500', categoria: 'Prática',
    versiculos: [
      { ref: 'Efésios 5:25', texto: 'Maridos, amai vossas mulheres, como também Cristo amou a igreja' },
      { ref: 'Efésios 6:4', texto: 'Pais, não provoqueis à ira os vossos filhos, mas criai-os na disciplina e instrução do Senhor' },
      { ref: 'Colossenses 3:18-19', texto: 'Mulhes, sujeitai-vos aos vossos maridos... Maridos, amai as vossas mulheres' },
      { ref: 'Provérbios 22:6', texto: 'Instrui o menino no caminho em que deve andar' },
      { ref: 'Josué 24:15', texto: 'Eu e a minha casa serviremos ao Senhor' },
      { ref: 'Deuteronômio 6:6-7', texto: 'Estas palavras que eu te ordeno estarão no teu coração, e as ensinarás' },
      { ref: '1 Timóteo 3:4-5', texto: 'Governando bem a sua própria casa' },
      { ref: '1 Timóteo 5:8', texto: 'Se alguém não prove para os seus, e principalmente para os da sua casa, renegou a fé' },
      { ref: 'Provérbios 14:1', texto: 'A mulher sábia edifica a sua casa' },
      { ref: 'Mateus 19:19', texto: 'Honra teu pai e tua mãe' },
    ],
  },
  {
    id: 'trabalho', nome: 'Trabalho', icone: '🔨', cor: 'from-orange-500 to-red-500', categoria: 'Prática',
    versiculos: [
      { ref: 'Colossenses 3:23', texto: 'Tudo quanto fizerdes, fazei-o de coração, como para o Senhor' },
      { ref: 'Provérbios 14:23', texto: 'Em todo trabalho há ganho, mas as palavras vazias conduzem à pobreza' },
      { ref: '2 Tessalonicenses 3:10', texto: 'Se alguém não quer trabalhar, não coma' },
      { ref: 'Gênesis 2:15', texto: 'Tomou Deus o homem e o colocou no jardim do Éden, para o lavrar e guardar' },
      { ref: 'Provérbios 12:24', texto: 'A mão dos diligentes terá domínio' },
      { ref: 'Eclesiastes 9:10', texto: 'Tudo quanto te vier à mão para fazeres, faz-o conforme as tuas forças' },
      { ref: 'Efésios 4:28', texto: 'Trabalhe com as mãos o que é honesto' },
      { ref: 'Provérbios 6:6', texto: 'Vai à formiga, ó preguiçoso; olha para os seus caminhos, e sê sábio' },
      { ref: 'Colossenses 3:24', texto: 'Do Senhor recebereis a recompensa da herança' },
      { ref: '1 Coríntios 15:58', texto: 'Sede firmes e constantes, sempre abundantes na obra do Senhor' },
    ],
  },
  {
    id: 'justica-social', nome: 'Justiça Social', icone: '⚖️', cor: 'from-emerald-600 to-teal-600', categoria: 'Prática',
    versiculos: [
      { ref: 'Miquéias 6:8', texto: 'Ele te declarou, ó homem, o que é bom: praticar a justiça, amar a misericórdia e andar humildemente com o teu Deus' },
      { ref: 'Isaías 1:17', texto: 'Aprendei a fazer o bem; buscai a justiça, protegei o oprimido' },
      { ref: 'Provérbios 31:8-9', texto: 'Abre a tua boca pelo calado, pela causa de todos os desamparados' },
      { ref: 'Mateus 25:40', texto: 'Em verdade vos digo que cada vez que o fizestes a um destes meus pequenos irmãos, a mim o fizestes' },
      { ref: 'Tiago 1:27', texto: 'A religião pura e imaculada, diante do nosso Deus Pai, é esta: visitar os órfãos e as viúvas' },
      { ref: 'Zacarias 7:9', texto: 'Exercitai o juízo justo, e fazei misericórdia cada um com o seu irmão' },
      { ref: 'Lucas 4:18', texto: 'Espírito do Senhor é sobre mim, porque me ungiu para pregar boas novas aos pobres' },
      { ref: 'Amós 5:24', texto: 'Corra o juízo como as águas, e a justiça como um ribeiro perene' },
      { ref: 'Isaías 58:6', texto: 'Não é este o jejum que eu escolhi: desatar as cadeias da injustiça' },
      { ref: 'Mateus 5:7', texto: 'Bem-aventurados os misericordiosos, porque eles alcançarão misericórdia' },
    ],
  },
  {
    id: 'criacao', nome: 'Criação', icone: '🌍', cor: 'from-green-500 to-emerald-500', categoria: 'Doutrina',
    versiculos: [
      { ref: 'Gênesis 1:1', texto: 'No princípio criou Deus os céus e a terra' },
      { ref: 'Salmo 19:1', texto: 'Os céus narram a glória de Deus, e o firmamento anuncia a obra das suas mãos' },
      { ref: 'Romanos 1:20', texto: 'As coisas invisíveis dele se veem claramente, desde a criação do mundo' },
      { ref: 'Colossenses 1:16', texto: 'Porque nele foram criadas todas as coisas que há nos céus e na terra' },
      { ref: 'João 1:3', texto: 'Tudo foi feito por ele, e sem ele nada do que foi feito seria feito' },
      { ref: 'Gênesis 1:31', texto: 'E viu Deus tudo o que fizera, e eis que era muito bom' },
      { ref: 'Salmo 104:24', texto: 'Quantas são as tuas obras, ó Senhor! Todas fizeste com sabedoria' },
      { ref: 'Isaías 45:18', texto: 'Ele formou a terra e a fez; ele a estabeleceu, não a criou para ser vazia' },
      { ref: 'Efésios 3:9', texto: 'Deus, que criou todas as coisas por Jesus Cristo' },
      { ref: 'Apocalipse 4:11', texto: 'Tu criaste todas as coisas, e por tua vontade existem e foram criadas' },
    ],
  },
  {
    id: 'meio-ambiente', nome: 'Meio Ambiente', icone: '🌱', cor: 'from-lime-500 to-green-500', categoria: 'Prática',
    versiculos: [
      { ref: 'Gênesis 2:15', texto: 'Tomou o homem e o colocou no jardim, para o lavrar e guardar' },
      { ref: 'Salmo 24:1', texto: 'Do Senhor é a terra, e a sua plenitude' },
      { ref: 'Salmo 115:16', texto: 'O céu, sim, os céus são do Senhor; mas a terra ele a deu aos filhos dos homens' },
      { ref: 'Números 35:33', texto: 'Não contaminareis a terra em que estais' },
      { ref: 'Isaías 24:5', texto: 'A terra está profanada debaixo dos seus habitantes, porque transgrediram as leis' },
      { ref: 'Apocalipse 11:18', texto: 'E destruirás os que destroem a terra' },
      { ref: 'Romanos 8:21', texto: 'A própria criação será libertada da servidão da corrupção' },
      { ref: 'Jeremias 2:7', texto: 'Introduzi-os na terra que lhes dei... e eles profanaram a minha herança' },
      { ref: 'Levítico 25:3-5', texto: 'A terra descansará sabático ao Senhor' },
      { ref: 'Provérbios 12:10', texto: 'O justo cuida da vida dos seus animais' },
    ],
  },
];

export default function TopicosPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('all');
  const [expandedTopico, setExpandedTopico] = useState<string | null>(null);

  const categorias = useMemo(() => [...new Set(TOPICOS.map(t => t.categoria))], []);

  const filtrados = useMemo(() => {
    let result = TOPICOS;
    if (busca) {
      const termo = busca.toLowerCase();
      result = result.filter(t =>
        t.nome.toLowerCase().includes(termo) ||
        t.versiculos.some(v => v.ref.toLowerCase().includes(termo) || v.texto.toLowerCase().includes(termo))
      );
    }
    if (filtroCategoria !== 'all') {
      result = result.filter(t => t.categoria === filtroCategoria);
    }
    return result;
  }, [busca, filtroCategoria]);

  return (
    <PageShell maxWidth="4xl">
          <PageHero icon={Tag} title={<>Índice <span className="italic text-primary">Tópico</span></>} subtitle="Encontre versículos organizados por temas — nomes de Deus, profecias, virtudes e doutrinas" />

          <div className="space-y-3 mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar tema ou versículo..."
                className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              {busca && <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                <X className="w-4 h-4" /></button>}
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
              <button onClick={() => setFiltroCategoria('all')}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  filtroCategoria === 'all' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                Todos
              </button>
              {categorias.map(cat => (
                <button key={cat} onClick={() => setFiltroCategoria(cat)}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    filtroCategoria === cat ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtrados.map((topico, i) => {
              const isExpanded = expandedTopico === topico.id;
              return (
                <motion.div key={topico.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn('rounded-2xl border overflow-hidden transition-all cursor-pointer',
                    isExpanded ? 'border-primary/30 bg-primary/5 col-span-1 md:col-span-2' : 'border-border/50 bg-card/50 hover:border-primary/20')}
                  onClick={() => setExpandedTopico(isExpanded ? null : topico.id)}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                        {topico.icone}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{topico.nome}</h3>
                        <p className="text-[10px] text-muted-foreground">{topico.versiculos.length} versículos · {topico.categoria}</p>
                      </div>
                      <ChevronRight className={cn('w-4 h-4 text-muted-foreground transition-transform', isExpanded && 'rotate-90')} />
                    </div>

                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-4 space-y-2">
                        {topico.versiculos.map((v, j) => (
                          <Link key={j} href={hrefFromRef(v.ref)} onClick={(e) => e.stopPropagation()} className="flex gap-3 px-3 py-2.5 rounded-xl bg-muted/30 hover:bg-primary/5 transition-all">
                            <span className="text-xs font-bold text-primary flex-shrink-0 w-24">{v.ref}</span>
                            <p className="text-xs text-foreground/80 leading-relaxed">{v.texto}</p>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
    </PageShell>
  );
}
