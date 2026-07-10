import re

filepath = r'C:\Sola Scriptura BR\src\data\lexicon\hebraico.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

def fix_translit(match):
    val = match.group(1)
    val = val.replace("'", "")
    return "transliteracao: '" + val + "'"

# Pattern: transliteracao: 'xxx'yyy' where internal apostrophe breaks things
content = re.sub(r"transliteracao: '([^']*'[^',]*)'", fix_translit, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
