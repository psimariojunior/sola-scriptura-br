import json
import urllib.request
import sys
import time

OLLAMA_URL = 'http://localhost:11434/api/chat'
MODEL = 'llama3.1:8b'

with open('/tmp/english-comments.json', 'r') as f:
    english = json.load(f)

print(f'Total para traduzir: {len(english)}')

def translate_batch(comments):
    prompt = f"""Voce e um tradutor biblico profissional. Traduza estes comentarios de Matthew Henry do ingles para portugues brasileiro culto e teologicamente preciso.

REGRAS:
- Traduza APENAS o campo 'texto' (a string entre aspas apos 'Matthew Henry')
- Mantenha EXATAMENTE o formato: add('livro', cap, v, 'Matthew Henry', 'texto traduzido', 'tipo')
- Nao mude livro, capitulo, versiculo ou tipo
- Use portugues brasileiro formal e teologico
- Retorne APENAS as linhas traduzidas, nada mais

"""
    for i, c in enumerate(comments):
        prompt += f"{i+1}. {c['text']}\n"

    data = json.dumps({
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False,
        "options": {"temperature": 0.2, "num_ctx": 4096}
    }).encode('utf-8')

    req = urllib.request.Request(OLLAMA_URL, data=data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read())
        return result.get('message', {}).get('content', '')

batch_size = 5
results = {}
translated = 0
errors = 0

for i in range(0, len(english), batch_size):
    batch = english[i:i+batch_size]
    batch_num = i // batch_size + 1
    total_batches = (len(english) + batch_size - 1) // batch_size

    sys.stdout.write(f'[{batch_num}/{total_batches}] ')
    sys.stdout.flush()

    try:
        result = translate_batch(batch)
        result_lines = [l.strip() for l in result.split('\n') if l.strip().startswith('add(')]

        for j, item in enumerate(batch):
            if j < len(result_lines):
                line = result_lines[j]
                if any(c in line for c in 'àáâãçéêíóôõúûÀÁÂÃÇÉÊÍÓÔÕÚÛ'):
                    results[item['line']] = line
                else:
                    results[item['line']] = item['text']
            else:
                results[item['line']] = item['text']
            translated += 1

        sys.stdout.write(f'ok ({translated}/{len(english)})\n')
        sys.stdout.flush()
    except Exception as e:
        sys.stdout.write(f'ERRO: {e}\n')
        sys.stdout.flush()
        errors += 1
        for item in batch:
            results[item['line']] = item['text']

    time.sleep(0.3)

with open('/tmp/translated-comments.json', 'w') as f:
    json.dump(results, f, ensure_ascii=False)

print(f'\nConcluido: {translated} traduzidos, {errors} erros')
