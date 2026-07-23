'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Volume2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DicionarioEntry {
  palavra: string;
  definicao: string;
  sinonimos?: string[];
  exemplos?: string[];
  strong?: string;
}

// Common Portuguese Bible words with definitions
const DICIONARIO: Record<string, DicionarioEntry> = {
  'graça': { palavra: 'Graça', definicao: 'Favor imerecido de Deus. O termo grego "charis" (χάρις) significa favor, benevolência, bondade. Na teologia, refere-se ao favor imerecido de Deus para com os pecadores.', sinonimos: ['favor', 'benevolência', 'misericórdia'], strong: 'G5485' },
  'fé': { palavra: 'Fé', definicao: 'Confiança firme em Deus e em Suas promessas. O grego "pistis" (πίστις) indica convicção, confiança, crença. É a certeza das coisas que se esperam.', sinonimos: ['crença', 'confiança', 'convicção'], strong: 'G4102' },
  'amor': { palavra: 'Amor', definicao: 'Sentimento profundo de afeição e dedicação. O grego "agape" (ἀγάπη) refere-se ao amor incondicional e sacrificial de Deus.', sinonimos: ['caridade', 'afeição', 'ternura'], strong: 'G26' },
  'paz': { palavra: 'Paz', definicao: 'Estado de tranquilidade e harmonia. O hebraico "shalom" (שָׁלוֹם) significa completude, bem-estar, prosperidade espiritual.', sinonimos: ['harmonia', 'tranquilidade', 'sossego'], strong: 'H7965' },
  'justiça': { palavra: 'Justiça', definicao: 'Qualidade de ser justo e reto. O grego "dikaiosyne" (δικαιοσύνη) refere-se à retidão perante Deus e os homens.', sinonimos: ['retidão', 'equidade', 'retidão'], strong: 'G1343' },
  'misericórdia': { palavra: 'Misericórdia', definicao: 'Compaixão e perdão para com os necessitados. O hebraico "chesed" (חֶסֶד) é o amor leal e constante de Deus.', sinonimos: ['compaixão', 'piedade', 'clemência'], strong: 'H2617' },
  'salvação': { palavra: 'Salvação', definicao: 'Libertação do pecado e da morte eterna. O grego "soteria" (σωτηρία) significa libertação, preservação, segurança.', sinonimos: ['redenção', 'libertação', 'resgate'], strong: 'G4991' },
  'pecado': { palavra: 'Pecado', definicao: 'Transgressão da lei de Deus. O grego "hamartia" (ἁμαρτία) significa errar o alvo, não atingir o padrão de Deus.', sinonimos: ['transgressão', 'iniquidade', 'culpa'], strong: 'G266' },
  'arrependimento': { palavra: 'Arrependimento', definicao: 'Mudança de mente e direção. O grego "metanoia" (μετάνοια) significa mudança de mente, conversão.', sinonimos: ['conversão', 'contrição', 'penitência'], strong: 'G3341' },
  'perdão': { palavra: 'Perdão', definicao: 'Ato de remitir ofensas. O grego "aphesis" (ἄφεσις) significa libertação, remissão, cancelamento de dívida.', sinonimos: ['remissão', 'absolvição', 'clemência'], strong: 'G859' },
  'oração': { palavra: 'Oração', definicao: 'Comunicação com Deus. O grego "proseuche" (προσευχή) refere-se à súplica, petição, ação de graças a Deus.', sinonimos: ['súplica', 'petição', 'intercessão'], strong: 'G4335' },
  'igreja': { palavra: 'Igreja', definicao: 'Assembleia de crentes em Cristo. O grego "ekklesia" (ἐκκλησία) significa assembleia convocada, congregação.', sinonimos: ['assembleia', 'congregação', 'comunidade'], strong: 'G1577' },
  'evangelho': { palavra: 'Evangelho', definicao: 'Boa nova da salvação em Cristo. O grego "euangelion" (εὐαγγέλιον) significa boa notícia, mensagem de alegria.', sinonimos: ['boa nova', 'mensagem', 'verdade'], strong: 'G2098' },
  'batismo': { palavra: 'Batismo', definicao: 'Imersão em água como símbolo de morte e ressurreição com Cristo. O grego "baptisma" (βάπτισμα) significa imersão.', sinonimos: ['imersão', 'batismo'], strong: 'G908' },
  'comunhão': { palavra: 'Comunhão', definicao: 'Participação e união com Cristo e outros crentes. O grego "koinonia" (κοινωνία) significa participação, comunhão, parceria.', sinonimos: ['participação', 'união', 'comunidade'], strong: 'G2842' },
  'sabedoria': { palavra: 'Sabedoria', definicao: 'Capacidade de discernir e aplicar conhecimento. O grego "sophia" (σοφία) refere-se à sabedoria divina e prática.', sinonimos: ['discernimento', 'prudência', 'entendimento'], strong: 'G4678' },
  'verdade': { palavra: 'Verdade', definicao: 'Realidade conforme Deus a revela. O grego "aletheia" (ἀλήθεια) significa verdade, realidade, sinceridade.', sinonimos: ['realidade', 'veracidade', 'fidelidade'], strong: 'G225' },
  'vida': { palavra: 'Vida', definicao: 'Existência em plenitude com Deus. O grego "zoe" (ζωή) refere-se à vida eterna, vida abundante em Cristo.', sinonimos: ['existência', 'vitalidade', 'sopro'], strong: 'G2222' },
  'morte': { palavra: 'Morte', definicao: 'Separação física e espiritual. O grego "thanatos" (θάνατος) refere-se à morte física e espiritual.', strong: 'G2288' },
  'ressurreição': { palavra: 'Ressurreição', definicao: 'Ressurgimento dos mortos. O grego "anastasis" (ἀνάστασις) significa levantar-se, ressurreição.', strong: 'G386' },
  'glória': { palavra: 'Glória', definicao: 'Manifestação da excelência de Deus. O grego "doxa" (δόξα) significa honra, glória, esplendor.', sinonimos: ['honra', 'esplendor', 'majestade'], strong: 'G1391' },
  'espírito': { palavra: 'Espírito', definicao: 'Parte imaterial do ser humano. O grego "pneuma" (πνεῦμα) refere-se ao espírito, sopro, vento.', strong: 'G4151' },
  'coração': { palavra: 'Coração', definicao: 'Centro da vida interior. O grego "kardia" (καρδία) refere-se ao coração, mente, vontade.', strong: 'G2588' },
  'reino': { palavra: 'Reino', definicao: 'Domínio soberano de Deus. O grego "basileia" (βασιλεία) refere-se ao governo, reino, domínio.', strong: 'G932' },
  'aliança': { palavra: 'Aliança', definicao: 'Pacto solene entre Deus e o homem. O hebraico "berith" (בְּרִית) significa pacto, aliança, contrato.', sinonimos: ['pacto', 'contrato', 'acordo'], strong: 'H1285' },
  'sacrifício': { palavra: 'Sacrifício', definicao: 'Oferta a Deus. O grego "thusia" (θυσία) refere-se à oferta, sacrifício, imolação.', strong: 'G2378' },
  'santificação': { palavra: 'Santificação', definicao: 'Processo de ser tornado santo. O grego "hagiasmos" (ἁγιασμός) significa separação para Deus, santificação.', strong: 'G38' },
  'redenção': { palavra: 'Redenção', definicao: 'Libertação pelo pagamento de preço. O grego "apolutrosis" (ἀπολύτρωσις) significa libertação, resgate.', sinonimos: ['resgate', 'libertação'], strong: 'G629' },
  'propiciação': { palavra: 'Propiciação', definicao: 'Satisfação da justiça divina. O grego "hilasmos" (ἱλασμός) significa expiação, propiciação.', strong: 'G2434' },
  'reconciliação': { palavra: 'Reconciliação', definicao: 'Restauração da relação com Deus. O grego "katallage" (καταλλαγή) significa reconciliação, restauração.', strong: 'G2643' },
  'regeneração': { palavra: 'Regeneração', definicao: 'Novo nascimento espiritual. O grego "paliggenesia" (παλιγγενεσία) significa novo nascimento, regeneração.', strong: 'G3824' },
  'eleição': { palavra: 'Eleição', definicao: 'Escolha soberana de Deus. O grego "ekloge" (ἐκλογή) significa escolha, seleção.', strong: 'G1589' },
  'predestinação': { palavra: 'Predestinação', definicao: 'Determinação antecipada de Deus. O grego "proorizo" (προορίζω) significa determinar de antemão.', strong: 'G4309' },
  'providência': { palavra: 'Providência', definicao: 'Cuidado soberano de Deus. O latim "providentia" significa previsão, cuidado, provisão.' },
  'criação': { palavra: 'Criação', definicao: 'Ato de Deus de trazer à existência. O grego "ktisis" (κτίσις) refere-se à criação, criatura.', strong: 'G2937' },
  'juízo': { palavra: 'Juízo', definicao: 'Ato de Deus de julgar. O grego "krisis" (κρίσις) refere-se ao julgamento, juízo.', strong: 'G2920' },
  'eternidade': { palavra: 'Eternidade', definicao: 'Existência sem fim. O grego "aion" (αἰών) refere-se à era, eternidade.', strong: 'G165' },
  'céu': { palavra: 'Céu', definicao: 'Morada de Deus. O grego "ouranos" (οὐρανός) refere-se ao céu, firmamento.', strong: 'G3772' },
  'inferno': { palavra: 'Inferno', definicao: 'Lugar de punição eterna. O grego "geenna" (γέεννα) refere-se ao vale de Hinom, inferno.', strong: 'G1067' },
  'anjo': { palavra: 'Anjo', definicao: 'Mensageiro celestial. O grego "angelos" (ἄγγελος) significa mensageiro, anjo.', strong: 'G32' },
  'diabo': { palavra: 'Diabo', definicao: 'Adversário de Deus. O grego "diabolos" (διάβολος) significa acusador, caluniador.', strong: 'G1228' },
  'tentação': { palavra: 'Tentação', definicao: 'Provação ou indução ao mal. O grego "peirasmos" (πειρασμός) significa tentação, prova.', strong: 'G3986' },
  'obediência': { palavra: 'Obediência', definicao: 'Submissão à vontade de Deus. O grego "hypakoe" (ὑπακοή) significa obediência, submissão.', strong: 'G5218' },
  'santidade': { palavra: 'Santidade', definicao: 'Pureza e separação para Deus. O grego "hagiotes" (ἁγιότης) refere-se à santidade.', strong: 'G42' },
  'humildade': { palavra: 'Humildade', definicao: 'Virtude de reconhecer a dependência de Deus. O grego "tapeinophrosyne" (ταπεινοφροσύνη) significa humildade.', strong: 'G5012' },
  'paciência': { palavra: 'Paciência', definicao: 'Capacidade de suportar com calma. O grego "makrothumia" (μακροθυμία) significa longanimidade, paciência.', strong: 'G3115' },
  'alegria': { palavra: 'Alegria', definicao: 'Sentimento de contentamento em Deus. O grego "chara" (χαρά) significa alegria, gozo.', strong: 'G5479' },
  'esperança': { palavra: 'Esperança', definicao: 'Expectativa confiante em Deus. O grego "elpis" (ἐλπίς) significa esperança, expectativa.', strong: 'G1680' },
  'bondade': { palavra: 'Bondade', definicao: 'Qualidade de ser bom. O grego "chrestotes" (χρηστότης) significa benignidade, bondade.', strong: 'G5544' },
  'fidelidade': { palavra: 'Fidelidade', definicao: 'Lealdade e constância. O grego "pistis" (πίστις) significa fidelidade, lealdade.', strong: 'G4102' },
  'mansidão': { palavra: 'Mansidão', definicao: 'Suavidade de caráter. O grego "praotes" (πραΰτης) significa mansidão, gentileza.', strong: 'G4240' },
  'temperança': { palavra: 'Temperança', definicao: 'Domínio próprio. O grego "egkrateia" (ἐγκράτεια) significa domínio próprio, temperança.', strong: 'G1466' },
};

interface DicionarioContextualProps {
  palavra: string;
  children: React.ReactNode;
  className?: string;
}

export function DicionarioContextual({ palavra, children, className }: DicionarioContextualProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  const entry = DICIONARIO[palavra.toLowerCase()];

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!entry) return;
    e.stopPropagation();
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: Math.min(rect.left, window.innerWidth - 320),
        y: rect.bottom + 8,
      });
    }
    setShowTooltip(true);
  }, [entry]);

  useEffect(() => {
    if (!showTooltip) return;
    const close = () => setShowTooltip(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [showTooltip]);

  if (!entry) return <span className={className}>{children}</span>;

  return (
    <>
      <span ref={ref} onClick={handleClick}
        className={cn('cursor-pointer border-b border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 transition-all', className)}>
        {children}
      </span>

      <AnimatePresence>
        {showTooltip && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            className="fixed z-[100] w-72 rounded-xl border border-border bg-card shadow-xl overflow-hidden"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
            onClick={e => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-border/40 bg-muted/30">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-medium">{entry.palavra}</h4>
                <button onClick={() => setShowTooltip(false)} className="p-1 rounded-lg hover:bg-muted/50">
                  <X className="w-3 h-3" />
                </button>
              </div>
              {entry.strong && (
                <span className="text-[10px] font-mono text-primary">{entry.strong}</span>
              )}
            </div>
            <div className="px-4 py-3 space-y-2">
              <p className="text-xs leading-relaxed">{entry.definicao}</p>
              {entry.sinonimos && entry.sinonimos.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Sinônimos</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.sinonimos.map(s => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
