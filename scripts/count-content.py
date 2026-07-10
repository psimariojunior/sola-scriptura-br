import re

# Count chronology
with open(r'C:\Sola Scriptura BR\src\data\biblia.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the cronologia array
crono_start = content.find('export const cronologia')
if crono_start > 0:
    crono_section = content[crono_start:]
    eventos = crono_section.count('{ ano:')
    print(f"Cronologia: {eventos} eventos")

# Count personagens
pers_start = content.find('export const personagens')
if pers_start > 0:
    pers_section = content[pers_start:]
    # Count entries by counting 'nome:' before the array ends
    chars = pers_section.count('{ nome:')
    print(f"Personagens: {chars}")

# Count doutrinas
dout_start = content.find('export const doutrinas')
if dout_start > 0:
    dout_section = content[dout_start:]
    chars = dout_section.count('{ nome:')
    print(f"Doutrinas: {chars}")

# Count locations
with open(r'C:\Sola Scriptura BR\src\data\biblia\locais.ts', 'r', encoding='utf-8') as f:
    loc = f.read()
locs = loc.count('{ nome:')
print(f"Locais: {locs}")

# Count Greek
with open(r'C:\Sola Scriptura BR\src\data\lexicon\grego.ts', 'r', encoding='utf-8') as f:
    grego = f.read()
print(f"Lexico Grego: {grego.count('{ strong:')}")

# Count Hebrew
with open(r'C:\Sola Scriptura BR\src\data\lexicon\hebraico.ts', 'r', encoding='utf-8') as f:
    heb = f.read()
print(f"Lexico Hebraico: {heb.count('{ strong:')}")

# Count notas
with open(r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts', 'r', encoding='utf-8') as f:
    notas = f.read()
notas_count = notas.count('{ livro:')
print(f"Notas de estudo: {notas_count}")

# Count comentarios
with open(r'C:\Sola Scriptura BR\src\data\comentarios.ts', 'r', encoding='utf-8') as f:
    com = f.read()
com_count = com.count('{ livro:')
print(f"Comentarios: {com_count}")
