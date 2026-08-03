#!/bin/bash
# Traduz comentarios Matthew Henry EN -> PT-BR usando Ollama local
# Roda em background: nohup bash /tmp/translate.sh &

OLLAMA="http://localhost:11434/api/chat"
MODEL="llama3.1:8b"
INPUT="/tmp/english-comments.json"
OUTPUT="/tmp/translated-results.jsonl"
PROGRESS="/tmp/translate-progress.txt"

# Limpar arquivo de saida
> "$OUTPUT"
> "$PROGRESS"

TOTAL=$(python3 -c "import json; print(len(json.load(open('$INPUT'))))")
echo "Total: $TOTAL" > "$PROGRESS"

python3 -c "
import json, urllib.request, time, sys

english = json.load(open('$INPUT'))
OLLAMA = '$OLLAMA'
MODEL = '$MODEL'
out = open('$OUTPUT', 'a')
prog = open('$PROGRESS', 'w')

def translate(batch):
    numbered = '\n'.join(f'{i+1}. {c[\"text\"]}' for i, c in enumerate(batch))
    prompt = f'''Traduza estes comentarios biblicos de Matthew Henry do ingles para portugues brasileiro teologico.
REGRAS:
- Mantenha EXATAMENTE o formato: add('livro', cap, v, 'Matthew Henry', 'texto traduzido', 'tipo')
- Nao mude livro, capitulo, versiculo ou tipo
- Use portugues brasileiro formal e teologico
- Retorne APENAS as linhas traduzidas, nada mais

{numbered}'''
    data = json.dumps({'model': MODEL, 'messages': [{'role': 'user', 'content': prompt}], 'stream': False, 'options': {'temperature': 0.2, 'num_ctx': 4096}}).encode()
    req = urllib.request.Request(OLLAMA, data=data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.loads(r.read()).get('message',{}).get('content','')

done = 0
errors = 0
batch_size = 3

for i in range(0, len(english), batch_size):
    batch = english[i:i+batch_size]
    try:
        result = translate(batch)
        lines = [l.strip() for l in result.split('\n') if l.strip().startswith('add(')]
        for j, item in enumerate(batch):
            if j < len(lines):
                out.write(json.dumps({'line': item['line'], 'text': lines[j]}) + '\n')
            else:
                out.write(json.dumps({'line': item['line'], 'text': item['text']}) + '\n')
            done += 1
    except Exception as e:
        for item in batch:
            out.write(json.dumps({'line': item['line'], 'text': item['text']}) + '\n')
        done += len(batch)
        errors += 1
    prog.write(f'{done}/{len(english)} erros:{errors}\n')
    prog.flush()
    out.flush()
    time.sleep(1)

prog.write(f'CONCLUIDO: {done}/{len(english)} erros:{errors}\n')
" 2>&1

echo "Script finalizado" >> "$PROGRESS"
