# -*- coding: utf-8 -*-
"""
Build script to generate the final page.tsx with 100 sentence diagrams.
Combines OT diagrams from gen.py and NT diagrams from nt_01-07.py.
"""

import json
import os

# Import OT diagrams
from gen import diagrams as ot_diagrams

# Import NT diagrams
from nt_01 import nt_batch_1
from nt_02 import nt_batch_2
from nt_03 import nt_batch_3
from nt_04 import nt_batch_4
from nt_05 import nt_batch_5
from nt_06 import nt_batch_6
from nt_07 import nt_batch_7

# Combine all NT diagrams
nt_diagrams = []
nt_diagrams.extend(nt_batch_1)
nt_diagrams.extend(nt_batch_2)
nt_diagrams.extend(nt_batch_3)
nt_diagrams.extend(nt_batch_4)
nt_diagrams.extend(nt_batch_5)
nt_diagrams.extend(nt_batch_6)
nt_diagrams.extend(nt_batch_7)

# Combine OT + NT
all_diagrams = ot_diagrams + nt_diagrams

print(f"OT diagrams: {len(ot_diagrams)}")
print(f"NT diagrams: {len(nt_diagrams)}")
print(f"Total diagrams: {len(all_diagrams)}")

def escape_ts(s):
    """Escape string for TypeScript."""
    return s.replace('\\', '\\\\').replace('"', '\\"')

def generate_typescript_diagram(diagram):
    """Generate TypeScript code for a single diagram entry."""
    ref = diagram['ref']
    livro = diagram['livro']
    traducao = escape_ts(diagram['traducao'])
    grego = escape_ts(diagram['grego'])
    explicacao = escape_ts(diagram['explicacao'])
    
    nodes_str = generate_nodes(diagram['diagrama'], 6)
    notes_str = generate_notes(diagram['notas'])
    
    lines = [
        "  {",
        f'    ref: "{ref}",',
        f'    livro: "{livro}",',
        f'    traducao: "{traducao}",',
        f'    grego: "{grego}",',
        f"    diagrama: {nodes_str},",
        f'    explicacao: "{explicacao}",',
        f"    notas: {notes_str}",
        "  }"
    ]
    return "\n".join(lines)

def generate_nodes(nodes, indent=6):
    """Generate TypeScript for diagram nodes."""
    if not nodes:
        return "[]"
    
    pad = " " * indent
    lines = ["["]
    
    for i, node in enumerate(nodes):
        id_val = node['id']
        type_val = node['type']
        text_val = escape_ts(node['text'])
        
        parts = [
            f'{pad}{{',
            f'id: "{id_val}"',
            f', type: "{type_val}"',
            f', text: "{text_val}"'
        ]
        
        if 'greek' in node and node['greek']:
            greek_val = escape_ts(node['greek'])
            parts.append(f', greek: "{greek_val}"')
        
        if 'strong' in node and node['strong']:
            strong_val = node['strong']
            parts.append(f', strong: "{strong_val}"')
        
        if 'children' in node and node['children']:
            children_str = generate_nodes(node['children'], indent + 2)
            parts.append(f", children: {children_str}")
        
        parts.append("}")
        node_str = "".join(parts)
        lines.append(node_str)
        
        if i < len(nodes) - 1:
            lines[-1] += ","
    
    close_pad = pad[:-2] if len(pad) >= 2 else ""
    lines.append(close_pad + "}]")
    return "\n".join(lines)

def generate_notes(notes):
    """Generate TypeScript array for notes."""
    escaped = []
    for note in notes:
        escaped.append('"' + escape_ts(note) + '"')
    return "[" + ", ".join(escaped) + "]"

# Generate the complete DIAGRAMAS array
diagrams_ts_lines = []
diagrams_ts_lines.append("const DIAGRAMAS: SentenceDiagram[] = [")

for i, diagram in enumerate(all_diagrams):
    entry = generate_typescript_diagram(diagram)
    diagrams_ts_lines.append(entry)
    if i < len(all_diagrams) - 1:
        diagrams_ts_lines.append(",")

diagrams_ts_lines.append("];")

diagrams_ts = "\n".join(diagrams_ts_lines)

# Read the original file to get the component code (everything before and after DIAGRAMAS)
with open('page.tsx', 'r', encoding='utf-8') as f:
    original = f.read()

# Find the DIAGRAMAS array boundaries
diag_start = original.find("const DIAGRAMAS: SentenceDiagram[] = [")
if diag_start == -1:
    raise ValueError("Could not find DIAGRAMAS array in original file")

# Find the end of DIAGRAMAS array (];)
depth = 0
diag_end = diag_start
for i, char in enumerate(original[diag_start:], diag_start):
    if char == '[':
        depth += 1
    elif char == ']':
        depth -= 1
        if depth == 0:
            diag_end = i + 2  # Include ];
            break

# Get the header (before DIAGRAMAS)
header = original[:diag_start].rstrip()

# Get the footer (after DIAGRAMAS) - everything from the component code
footer_start = original.find("\n\n", diag_end)
if footer_start == -1:
    footer_start = diag_end + 1
footer = original[footer_start:].lstrip('\n')

# Combine: header + new DIAGRAMAS + footer
new_content = header + "\n\n" + diagrams_ts + "\n\n" + footer

# Write the new file
with open('page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\nGenerated page.tsx with {len(all_diagrams)} diagrams")
print(f"File size: {len(new_content)} characters")
