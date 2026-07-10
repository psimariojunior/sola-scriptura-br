import re

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix missing commas: } followed by optional whitespace and then " at start of new entry
# Pattern: }  "key": { -> },  "key": {
content = re.sub(r'\}\s*\n\s*"', '},\n  "', content)

# Also fix same-line cases: }  "key": { -> },  "key": {
content = re.sub(r'\}\s+"([a-z0-9]+:)', r'}, "\1', content)

# Fix trailing }} at end - should be }}
# The file ends with }}; which is the closing of the record and the statement

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed")

# Verify no more issues
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Count entries
entries = re.findall(r'"[a-z0-9]+:\d+:\d+"', content)
print(f"Total entries found: {len(entries)}")

# Check for remaining }" without comma
remaining = re.findall(r'\}"[^;,\s]', content)
print(f"Remaining issues: {len(remaining)}")
