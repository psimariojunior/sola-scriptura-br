import re

filepath = r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the export statement
export_line = -1
for i, line in enumerate(lines):
    if 'export const notas' in line:
        export_line = i
        break

if export_line == -1:
    print("Could not find export statement")
    exit(1)

# Get header (everything up to and including the export line)
header_lines = lines[:export_line + 1]

# Get the opening brace
for i, line in enumerate(lines[export_line:], export_line):
    if '{' in line:
        header_lines = lines[:i + 1]
        break

# Parse entries - each entry is on one or more lines
# Entry pattern: "key": { ... },
entries = {}
current_key = None
current_entry_lines = []
in_entry = False

for i in range(len(header_lines), len(lines)):
    line = lines[i]
    stripped = line.strip()
    
    # Check for start of new entry
    key_match = re.match(r'\s*"([^"]+)":\s*\{', stripped)
    if key_match:
        # Save previous entry
        if current_key and current_entry_lines:
            entries[current_key] = current_entry_lines
        current_key = key_match.group(1)
        current_entry_lines = [line]
        in_entry = True
        continue
    
    if in_entry:
        current_entry_lines.append(line)
        # Check if entry ends
        if stripped.endswith('},') or stripped.endswith('}'):
            if current_key:
                entries[current_key] = current_entry_lines
            current_key = None
            current_entry_lines = []
            in_entry = False

# Save last entry
if current_key and current_entry_lines:
    entries[current_key] = current_entry_lines

print(f"Found {len(entries)} entries")

# Remove duplicates - keep last occurrence
seen_keys = set()
unique_entries = []
for key in entries:
    if key in seen_keys:
        continue
    seen_keys.add(key)
    unique_entries.append((key, entries[key]))

print(f"Unique entries: {len(unique_entries)}")

# Rebuild file
new_lines = header_lines
for key, entry_lines in unique_entries:
    new_lines.extend(entry_lines)

# Add closing
new_lines.append('\n};\n')

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Done")
