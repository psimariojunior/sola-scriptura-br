import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const filePath = 'src/app/diagramas/page.tsx';
const dataDir = 'scripts/diagram-parts';

let content = readFileSync(filePath, 'utf-8');

// Read all part files and concatenate
const parts = readdirSync(dataDir)
  .filter(f => f.startsWith('part-') && f.endsWith('.txt'))
  .sort()
  .map(f => readFileSync(join(dataDir, f), 'utf-8'));

const newData = parts.join('\n');

// Find the insertion point - right before the closing of DIAGRAMAS array
const marker = "      'ἐγκράυτεια = dominio proprio',\n    ],\n  },];";

if (!content.includes(marker)) {
  // Try alternative marker
  const altMarker = "'ἐγκράυτεια = dominio proprio',";
  const idx = content.lastIndexOf("'ἐγκράυτεια = dominio proprio',");
  if (idx === -1) {
    console.error('Could not find insertion marker in page.tsx');
    process.exit(1);
  }
  // Find the },]; after this
  const afterIdx = content.indexOf('},];', idx);
  if (afterIdx === -1) {
    console.error('Could not find array closing');
    process.exit(1);
  }
  const insertPoint = afterIdx + '},];'.length;
  content = content.slice(0, insertPoint - 4) + ',\n' + newData + '\n  }];' + content.slice(insertPoint + 4);
} else {
  content = content.replace(marker, marker.replace('},];', ',\n' + newData + '\n  },];'));
}

writeFileSync(filePath, content, 'utf-8');
console.log(`Done! Added ${parts.length} parts. File updated.`);
