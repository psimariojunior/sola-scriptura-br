with open(r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

line = lines[30]
print(f"Line length: {len(line)}")
print(f"First 100 chars: {repr(line[:100])}")
# Check if it has conteudo
if 'conteudo' in line:
    idx = line.find('conteudo')
    print(f"Found 'conteudo' at position {idx}")
    print(f"Around it: {repr(line[idx:idx+50])}")
else:
    print("No 'conteudo' found")
    # Check what's there
    if 'dt:6:4' in line:
        idx = line.find('dt:6:4')
        print(f"Found dt:6:4 at position {idx}")
