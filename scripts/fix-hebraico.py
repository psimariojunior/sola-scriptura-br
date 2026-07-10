import re

filepath = r'C:\Sola Scriptura BR\src\data\lexicon\hebraico.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

fixed = 0
for i, line in enumerate(lines):
    # Find transliteracao values and fix any internal apostrophes
    # Replace 'pa'al' with 'paal', 'ya'aqov' with 'yaaqov', etc.
    if 'transliteracao:' in line:
        # Extract the transliteracao value
        match = re.search(r"transliteracao: '([^']*)'", line)
        if not match:
            # There's an apostrophe issue - find and fix
            match2 = re.search(r"transliteracao: '([^']*)'([^,])", line)
            if match2:
                val = match2.group(1).replace("'", "")
                line = line[:match2.start(1)] + val + line[match2.end(1):]
                lines[i] = line
                fixed += 1
            else:
                # Try another pattern: transliteracao: 'xxx'yyy'
                match3 = re.search(r"transliteracao: '([^']*)'('[^,])", line)
                if match3:
                    val = match3.group(1).replace("'", "")
                    line = line[:match3.start(1)] + val + "'" + line[match3.end(2)+1:]
                    lines[i] = line
                    fixed += 1

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"Fixed {fixed} lines")
