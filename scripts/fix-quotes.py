import re

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Strategy: for each line that contains an entry, properly escape quotes in conteudo
lines = content.split('\n')
new_lines = []

for line in lines:
    if 'conteudo: "' in line and 'categoria:' in line:
        # This is an entry line with conteudo
        # Find the conteudo value boundaries
        idx = line.find('conteudo: "')
        if idx < 0:
            new_lines.append(line)
            continue
        
        prefix = line[:idx + len('conteudo: "')]
        rest = line[idx + len('conteudo: "'):]
        
        # Find where conteudo ends - look for '",    categoria' or '",  categoria'
        cat_patterns = ['",    categoria', '",  categoria']
        cat_idx = -1
        for pat in cat_patterns:
            idx2 = rest.rfind(pat)
            if idx2 >= 0:
                cat_idx = idx2
                break
        
        if cat_idx < 0:
            new_lines.append(line)
            continue
        
        value = rest[:cat_idx]
        suffix = rest[cat_idx:]
        
        # Escape any unescaped double quotes in the value
        # But don't double-escape already escaped ones
        fixed_value = value.replace('\\"', '"')  # first unescape any already escaped
        fixed_value = fixed_value.replace('"', '\\"')  # then escape all
        
        new_line = prefix + fixed_value + suffix
        new_lines.append(new_line)
    else:
        new_lines.append(line)

content = '\n'.join(new_lines)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all conteudo quotes")

# Verify by counting potential issues
issues = 0
for line in new_lines:
    if 'conteudo: "' in line and 'categoria:' in line:
        idx = line.find('conteudo: "')
        rest = line[idx + len('conteudo: "'):]
        # Check if there are unescaped quotes
        cat_idx = rest.rfind('",    categoria')
        if cat_idx < 0:
            cat_idx = rest.rfind('",  categoria')
        if cat_idx >= 0:
            value = rest[:cat_idx]
            # Count quotes that aren't escaped
            unescaped = len(re.findall(r'(?<!\\)"', value))
            if unescaped > 0:
                issues += 1
                if issues <= 3:
                    print(f"Issue in line: ...{value[:80]}...")

print(f"Total remaining issues: {issues}")
