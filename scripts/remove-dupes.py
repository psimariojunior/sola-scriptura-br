import re

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the export statement and the data
# Pattern: export const notas: Record<string, NotaEstudo> = { ... };
# We need to parse the entries and remove duplicates

# Extract all entries with their full content
# Each entry looks like: "key": { ... }
entries = []
pattern = r'  "([^"]+)": \{([^}]+)\}'
for match in re.finditer(pattern, content):
    key = match.group(1)
    body = match.group(2)
    entries.append((key, body))

# Remove duplicates - keep last occurrence
seen = {}
unique_entries = []
for key, body in entries:
    seen[key] = len(unique_entries)
    unique_entries.append((key, body))

# Rebuild the file
# Get the header (everything before the first entry)
first_entry_match = re.search(r'  "gn:1:1":', content)
if first_entry_match:
    header = content[:first_entry_match.start()]
else:
    header = content[:content.find('{') + 1] + '\n'

# Get the footer (everything after the last entry)
last_entry_match = re.search(r'  "[^"]+": \{[^}]+\}\s*\}\s*;?\s*$', content, re.DOTALL)
if last_entry_match:
    footer_start = last_entry_match.end()
    footer = content[footer_start:]
else:
    footer = '\n};\n'

# Build new content
new_content = header
for i, (key, body) in enumerate(unique_entries):
    new_content += f'  "{key}": {{{body}}},\n'
new_content += footer

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Removed {len(entries) - len(unique_entries)} duplicates')
print(f'Final count: {len(unique_entries)} unique entries')
