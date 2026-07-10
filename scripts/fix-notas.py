import re

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix missing commas: add comma after } if next non-whitespace line starts with "
# Also handle the case where } is at end of line
content = re.sub(r'\}\s*\n\s*"', '},\n  "', content)

# Remove duplicate entries - keep last occurrence of each key
# Find all entries with their keys
entries = re.findall(r'  "([^"]+)":\s*\{[^}]+\}(?:\s*,)?', content)
seen = {}
for entry in entries:
    seen[entry] = entry  # keep last

# This approach is too complex. Let me just fix the commas properly.
# The real issue is missing commas between entries.

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed commas")

# Now verify
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Check for remaining issues
lines = content.split('\n')
issues = 0
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped == '}' and i + 1 < len(lines):
        next_stripped = lines[i+1].strip()
        if next_stripped.startswith('"'):
            issues += 1
            print(f"Still missing comma at line {i+1}")

print(f"Remaining issues: {issues}")
