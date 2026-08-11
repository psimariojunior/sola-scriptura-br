import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'src', 'app', 'diagramas', 'page.tsx');

const lines = [];
const w = s => lines.push(s);
const wn = s => lines.push(s + '\n');

// Build the file
w("'use client';");
w("");
w("import { useState } from 'react';");
w("import { BookOpen, ChevronDown, ChevronRight, Info, Search } from 'lucide-react';");
w("");
w("interface DiagramNode {");
w("  id: string;");
w("  type: 'subject' | 'predicate' | 'object' | 'modifier' | 'conjunction' | 'complement' | 'adverbial' | 'vocative' | 'interjection';");
w("  text: string;");
w("  greek?: string;");
w("  strong?: string;");
w("  children?: DiagramNode[];");
w("}");
w("");
w("interface SentenceDiagram {");
w("  ref: string;");
w("  livro: string;");
w("  traducao: string;");
w("  grego: string;");
w("  diagrama: DiagramNode[];");
w("  explicacao: string;");
w("  notas: string[];");
w("}");
w("");
w("const DIAGRAMAS: SentenceDiagram[] = [");

// Helper to add a diagram entry
function addDiagram(ref, livro, traducao, grego, nodes, explicacao, notas) {
  w("  {");
  w(`    ref: '${ref}',`);
  w(`    livro: '${livro}',`);
  w(`    traducao: '${traducao.replace(/'/g, "\\'")}',`);
  // grego might have single quotes - use template literal approach
  w(`    grego: \`${grego}\`,`);
  w("    diagrama: [");
  for (const node of nodes) {
    w(`      { id: '${node.id}', type: '${node.type}', text: \`${node.text}\`, greek: \`${node.greek || ''}\`, strong: '${node.strong || ''}'${node.children ? `, children: [` : '' }`);
    if (node.children) {
      for (const child of node.children) {
        w(`        { id: '${child.id}', type: '${child.type}', text: \`${child.text}\`, greek: \`${child.greek || ''}\`, strong: '${child.strong || ''}' },`);
      }
      w("      ]},");
    } else {
      w("      },");
    }
  }
  w("    ],");
  w(`    explicacao: \`${explicacao}\`,`);
  w("    notas: [");
  for (const nota of notas) {
    w(`      \`${nota}\`,`);
  }
  w("    ],");
  w("  },");
}

// Now generate each diagram entry...
// I'll build it as a template literal string approach instead.

writeFileSync(outPath, lines.join('') + 'PLACEHOLDER');
console.log('Need to use template literal approach');
