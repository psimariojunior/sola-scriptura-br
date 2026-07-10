import re

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

# Read with UTF-8
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace mojibake characters
replacements = {
    'ï¿½': 'é',
    'ï¿½': 'ã',
    'ï¿½': 'ç',
    'ï¿½': 'ó',
    'ï¿½': 'á',
    'ï¿½': 'ê',
    'ï¿½': 'ô',
    'ï¿½': 'ú',
    'ï¿½': 'í',
    'ï¿½': 'â',
    'ï¿½': 'õ',
}

for bad, good in replacements.items():
    content = content.replace(bad, good)

# Also try to fix any remaining encoding issues
# Replace any remaining sequences that look like mojibake
content = re.sub(r'ï¿½', '?', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed encoding")

# Verify
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

remaining = content.count('ï¿½')
print(f"Remaining mojibake: {remaining}")
