import re

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# More aggressive approach: find ALL double-quoted strings inside conteudo fields
# and escape internal quotes

# For each line containing an entry
new_lines = []
for line in content.split('\n'):
    if 'conteudo: "' not in line or 'categoria:' not in line:
        new_lines.append(line)
        continue
    
    # Find the start of conteudo value
    idx = line.find('conteudo: "')
    if idx < 0:
        new_lines.append(line)
        continue
    
    before = line[:idx + len('conteudo: "')]
    after_start = idx + len('conteudo: "')
    
    # Find the end - look for the LAST occurrence of ",    categoria before the end
    # Work backwards from the end of the line
    end_marker = '",    categoria'
    end_idx = line.rfind(end_marker)
    if end_idx < 0:
        end_marker = '",categoria'
        end_idx = line.rfind(end_marker)
    if end_idx < 0:
        new_lines.append(line)
        continue
    
    value = line[after_start:end_idx]
    rest = line[end_idx:]
    
    # Escape all double quotes in value
    escaped_value = value.replace('"', '\\"')
    
    new_line = before + escaped_value + rest
    new_lines.append(new_line)

result = '\n'.join(new_lines)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(result)

print("Fixed")

# Verify
count = 0
for line in new_lines:
    if 'conteudo: \\"' in line:
        count += 1
print(f"Lines with escaped quotes in conteudo: {count}")
