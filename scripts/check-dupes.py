import re

with open(r'C:\Sola Scriptura BR\src\data\biblia\notas\index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

keys = re.findall(r'"([a-z0-9]+:\d+:\d+)"', content)
seen = {}
dupes = []
for k in keys:
    if k in seen:
        dupes.append(k)
    seen[k] = seen.get(k, 0) + 1
print(f'Total keys: {len(keys)}')
print(f'Unique keys: {len(seen)}')
print(f'Duplicates: {len(dupes)}')
if dupes:
    for d in dupes[:10]:
        print(f'  {d}: {seen[d]}x')
