import re

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Nuclear option: replace ALL content between conteudo: " and the last " before categoria
# with properly escaped version
new_lines = []
for line in content.split('\n'):
    if 'conteudo: "' not in line:
        new_lines.append(line)
        continue
    
    # Find the structure: conteudo: "...",    categoria: "..."
    # We need to find where the conteudo string actually ends
    # The pattern is: the LAST " before ,    categoria
    
    # Find ",    categoria or ",  categoria
    cat_match = re.search(r'",\s+categoria:', line)
    if not cat_match:
        new_lines.append(line)
        continue
    
    end_pos = cat_match.start()
    
    # Find where conteudo value starts
    cont_match = re.search(r'conteudo:\s*"', line)
    if not cont_match:
        new_lines.append(line)
        continue
    
    start_pos = cont_match.end()
    
    # Extract the value
    value = line[start_pos:end_pos]
    
    # The value might have unescaped quotes. Escape them all.
    # But first, check if there are already escaped quotes
    value = value.replace('\\"', '"')  # unescape first
    value = value.replace('"', '\\"')  # then re-escape
    
    # Rebuild the line
    new_line = line[:start_pos] + value + line[end_pos:]
    new_lines.append(new_line)

result = '\n'.join(new_lines)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(result)

print("Fixed all entries")

# Verify by checking if any line has unescaped quotes in conteudo
issues = 0
for line in new_lines:
    if 'conteudo: "' in line:
        cat_match = re.search(r'",\s+categoria:', line)
        if cat_match:
            cont_match = re.search(r'conteudo:\s*"', line)
            if cont_match:
                value = line[cont_match.end():cat_match.start()]
                # Check for unescaped quotes
                unescaped = len(re.findall(r'(?<!\\)"', value))
                if unescaped > 0:
                    issues += 1
                    if issues <= 2:
                        print(f"Issue: {value[:60]}...")

print(f"Remaining issues: {issues}")
