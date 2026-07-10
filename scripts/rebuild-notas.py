import re
import json

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all entries using a more robust approach
# Each entry is: "key": { fields }
entries = {}
# Find all "key": { patterns and extract the content
pattern = r'"([a-z0-9]+:\d+:\d+)":\s*\{'
for match in re.finditer(pattern, content):
    key = match.group(1)
    start = match.end()
    # Find matching closing brace
    depth = 1
    pos = start
    while pos < len(content) and depth > 0:
        if content[pos] == '{':
            depth += 1
        elif content[pos] == '}':
            depth -= 1
        pos += 1
    if depth == 0:
        entry_content = content[start:pos-1]
        entries[key] = entry_content

print(f"Extracted {len(entries)} entries")

# Now rebuild the file with proper formatting
header = '''export interface NotaEstudo {
  versiculo: string;
  titulo: string;
  conteudo: string;
  categoria: 'teologia' | 'historia' | 'linguas' | 'aplicacao' | 'arqueologia' | 'profecia' | 'cristologia' | 'soteriologia';
  referencia?: string;
}

export const notas: Record<string, NotaEstudo> = {
'''

lines = [header]
for key, body in entries.items():
    # Clean up the body - fix encoding issues
    body = body.replace('\ufffd', '?')  # replacement char
    # Fix mojibake patterns
    body = body.replace('ï¿½', 'é')
    body = body.replace('Ã©', 'é')
    body = body.replace('Ã£', 'ã')
    body = body.replace('Ã§', 'ç')
    body = body.replace('Ã³', 'ó')
    body = body.replace('Ã¡', 'á')
    body = body.replace('Ãª', 'ê')
    body = body.replace('Ã´', 'ô')
    body = body.replace('Ãº', 'ú')
    body = body.replace('Ã­', 'í')
    body = body.replace('Ã¢', 'â')
    body = body.replace('Ãµ', 'õ')
    
    # Ensure proper field extraction
    lines.append(f'  "{key}": {{{body}}},\n')

lines.append('};\n')

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"Rewrote file with {len(entries)} entries")
