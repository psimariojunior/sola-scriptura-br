import re

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix: find entries where conteudo starts with '" and fix the opening quote
# Pattern: conteudo: '" -> conteudo: '
# This means the string delimiter is " and the content starts with '"
# We need to escape the internal double quotes

# Approach: find all conteudo values and escape internal double quotes
def fix_conteudo(match):
    full = match.group(0)
    # The conteudo value is between the first " after "conteudo: " and the last " before ",    categoria"
    # Find the value
    start = full.find('conteudo: "') + len('conteudo: "')
    # Find the end - it's before ",    categoria"
    end = full.rfind('",    categoria')
    if start < len('conteudo: "') or end < 0:
        return full
    
    value = full[start:end]
    # Escape any unescaped double quotes in the value
    # But we need to be careful not to escape the quotes that are part of the string
    # The issue is quotes like "Ouve" inside the string
    # We need to escape them: "Ouve" -> \"Ouve\"
    fixed_value = value.replace('"', '\\"')
    return full[:start] + fixed_value + full[end:]

# Actually, let me take a simpler approach
# The issue is that some entries have: conteudo: '"text"more text"'
# Where the outer " delimiters conflict with inner " 
# Fix by replacing: conteudo: '" -> conteudo: '
# And then ensure the string ends with " properly

# Better approach: find lines with the pattern and fix them
lines = content.split('\n')
fixed_lines = []

for line in lines:
    if 'conteudo: "' in line:
        # Find the conteudo value
        idx = line.find('conteudo: "')
        if idx >= 0:
            prefix = line[:idx + len('conteudo: "')]
            rest = line[idx + len('conteudo: "'):]
            # Find the end of the conteudo value
            # It should end before ",    categoria"
            cat_idx = rest.rfind('",    categoria')
            if cat_idx >= 0:
                value = rest[:cat_idx]
                suffix = rest[cat_idx:]
                # Escape internal double quotes
                fixed_value = value.replace('"', '\\"')
                line = prefix + fixed_value + suffix
    fixed_lines.append(line)

content = '\n'.join(fixed_lines)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed conteudo quotes")

# Verify
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Count how many entries have unescaped quotes
issues = len(re.findall(r"conteudo: \"[^\"]*\"[^\"]*\"", content))
print(f"Potential remaining issues: {issues}")
