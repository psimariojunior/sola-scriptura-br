import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const heb = readFileSync(resolve(ROOT, 'src/data/lexicon/hebraico.ts'), 'utf8');
const entries = heb.match(/strong:\s*"H\d+"[^}]+/g) || [];

// Count Portuguese vs English definitions
let ptCount = 0;
let enCount = 0;
const enSamples = [];

for (const entry of entries) {
  const defMatch = entry.match(/definicao:\s*"([^"]+)"/);
  if (!defMatch) continue;
  
  const def = defMatch[1];
  
  // Check if it looks English (starts with lowercase English words)
  const englishPatterns = /^(a |an |the |to |of |in |on |at |for |with |from |by |or |and |but |not |is |are |was |were |be |been |being |have |has |had |do |does |did |will |would |shall |should |can |could |may |might |must )/i;
  const englishWords = /^(father|mother|son|daughter|brother|sister|man|woman|people|nation|king|queen|lord|god|word|thing|place|water|fire|earth|heaven|sun|moon|star|mountain|valley|river|sea|city|house|door|way|path|road|hand|foot|eye|ear|heart|soul|spirit|life|death|light|darkness|good|evil|righteous|wicked|truth|lie|love|hate|peace|war|joy|sorrow|hope|fear|faith|grace|mercy|justice|judgment|law|commandment|covenant|sacrifice|priest|prophet|angel|servant|master|slave|enemy|friend|neighbor|stranger|orphan|widow|poor|rich|strong|weak|wise|fool|young|old|great|small|high|low|long|short|new|first|last|many|few|all|none|one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand|properly|concrete|abstract|figuratively|literally|specifically|generally|commonly|especially|particularly|specifically|exactly|precisely|approximately|about|around|near|far|close|distant|above|below|over|under|before|after|between|among|through|into|onto|upon|against|toward|towards|until|till|since|while|during|within|without|besides|except|beyond|behind|beside|beneath|along|across|past|future|present|ancient|modern|early|late|soon|slowly|quickly|fast|suddenly|immediately|gradually|continually|constantly|perpetually|forever|eternally|everlasting|eternal|endless|infinite|boundless|limitless|unlimited|without end|without limit|without measure|without number|innumerable|countless|immeasurable|unfathomable|incomprehensible|inconceivable|indescribable|ineffable|wonderful|marvelous|glorious|magnificent|splendid|excellent|perfect|complete|whole|full|entire|total|absolute|utter|sheer|pure|clean|clear|bright|shining|radiant|brilliant|resplendent|majestic|august|noble|grand|mighty|powerful|robust|sturdy|firm|solid|stable|steady|sure|certain|true|real|genuine|authentic|legitimate|valid|sound|reasonable|logical|rational|sensible|wise|prudent|discreet|cautious|careful|attentive|watchful|vigilant|alert|aware|conscious|mindful|thoughtful|considerate|kind|gentle|tender|soft|meek|humble|lowly|modest|unassuming|quiet|calm|peaceful|tranquil|serene|still|motionless|unmoved|unchanged|unaltered|constant|faithful|loyal|devoted|dedicated|committed|steadfast|unwavering|unshaken|immovable|fixed|established|settled|rooted|grounded|founded|based|built|constructed|formed|made|created|fashioned|shaped|molded|framed|designed|planned|intended|purposed|determined|resolved|decided|appointed|designated|chosen|selected|picked|elected|preferred|favored|blessed|happy|fortunate|lucky|successful|prosperous|thriving|flourishing|growing|increasing|multiplying|abounding|overflowing|plentiful|abundant|copious|ample|sufficient|enough|adequate|fitting|proper|suitable|appropriate|correct|right|just|fair|equitable|impartial|unbiased|neutral|objective|balanced|even|level|flat|smooth|straight|direct|upright|erect|vertical|horizontal|parallel|perpendicular|diagonal|oblique|slanting|sloping|inclined|leaning|tilting|bending|curving|twisting|turning|rotating|spinning|revolving|circling|orbiting|cycling|recurring|repeating|returning|coming back|going back|turning back|reversing|inverting|overturning|upsetting|overthrowing|toppling|falling|dropping|descending|sinking|plunging|diving|submerging|immersing|baptizing|washing|cleansing|purifying|cleaning|sanctifying|consecrating|dedicating|devoting|offering|presenting|showing|displaying|revealing|disclosing|uncovering|exposing|manifesting|demonstrating|proving|confirming|verifying|validating|authenticating|certifying|attesting|witnessing|testifying|declaring|proclaiming|announcing|publishing|preaching|teaching|instructing|training|educating|disciplining|correcting|rebuking|reproving|chastening|punishing|judging|sentencing|condemning|acquitting|justifying|vindicating|defending|protecting|guarding|preserving|keeping|maintaining|sustaining|supporting|upholding|strengthening|empowering|enabling|permitting|allowing|letting|suffering|enduring|bearing|tolerating|accepting|receiving|taking|seizing|capturing|catching|holding|keeping|retaining|preserving|saving|delivering|rescuing|freeing|releasing|loosing|untying|binding|tying|fastening|attaching|connecting|joining|uniting|combining|merging|mixing|blending|mingling|associating|fellowshipping|communing|communicating|conversing|speaking|talking|saying|telling|relating|narrating|describing|explaining|interpreting|translating|rendering|expressing|uttering|pronouncing|articulating|voicing|calling|naming|designating|identifying|recognizing|acknowledging|confessing|admitting|declaring|affirming|asserting|maintaining|insisting|persisting|continuing|proceeding|advancing|progressing|moving forward|going forward|pressing on|pushing forward|driving on|leading on|guiding on|directing|steering|navigating|piloting|controlling|governing|ruling|reigning|dominating|prevailing|triumphing|conquering|overcoming|defeating|vanquishing|subduing|subjugating|bringing under|putting under|placing under|setting under|establishing under|subjecting|submitting|yielding|surrendering|giving up|letting go|releasing from|freeing from|delivering from|rescuing from|saving from|preserving from|protecting from|defending from|guarding from|keeping from|preventing from|hindering from|restraining from|holding back from|turning from|departing from|leaving from|fleeing from|escaping from|running from|hiding from|concealing from|covering from|sheltering from|protecting against|defending against|guarding against|watching against)/i;
  
  if (englishPatterns.test(def) || englishWords.test(def)) {
    enCount++;
    if (enSamples.length < 20) {
      enSamples.push(def.substring(0, 80));
    }
  } else {
    ptCount++;
  }
}

console.log(`📊 Estado real do lexico hebraico:`);
console.log(`  - Em portugues: ${ptCount}`);
console.log(`  - Em ingles: ${enCount}`);
console.log(`  - Total: ${ptCount + enCount}`);

console.log(`\n📝 Amostras em ingles:`);
for (const s of enSamples) {
  console.log(`  - ${s}`);
}
