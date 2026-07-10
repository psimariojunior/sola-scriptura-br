with open(r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

line = lines[30]
idx = line.find('conteudo: "')
if idx >= 0:
    val_start = idx + len('conteudo: "')
    cat_idx = line.rfind('",    categoria')
    if cat_idx >= 0:
        val = line[val_start:cat_idx]
        # Count unescaped double quotes
        count = 0
        for i, c in enumerate(val):
            if c == '"' and (i == 0 or val[i-1] != '\\'):
                count += 1
        print(f"Unescaped quotes: {count}")
        if count > 0:
            # Show context around first unescaped quote
            for i, c in enumerate(val):
                if c == '"' and (i == 0 or val[i-1] != '\\'):
                    start = max(0, i-10)
                    end = min(len(val), i+15)
                    print(f"  Position {i}: ...{val[start:end]}...")
                    break
    else:
        print("No end marker found")
else:
    print("No conteudo found")
