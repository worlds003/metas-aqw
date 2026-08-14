import json
import re
import requests
from bs4 import BeautifulSoup

def processar_pagina(url_pagina):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    print(f"\n[+] Processando: {url_pagina}")
    resposta = requests.get(url_pagina, headers=headers)
    
    if resposta.status_code != 200:
        print(f"[-] Erro ao acessar a página. Código: {resposta.status_code}")
        return None

    soup = BeautifulSoup(resposta.text, 'html.parser')
    
    titulo_elem = soup.find(id="page-title")
    nome_item = titulo_elem.get_text(strip=True) if titulo_elem else "Item Desconhecido"
    
    conteudo = soup.find(id="page-content")
    if not conteudo:
        print("[-] Conteúdo principal não encontrado.")
        return None

    requirements = []
    for elemento in conteudo.find_all(['p', 'li', 'td']):
        texto = elemento.get_text(strip=True)
        match = re.search(r'^(.*?)\s+x(\d+)', texto, re.IGNORECASE)
        if match:
            nome_req = match.group(1).strip()
            max_qtd = int(match.group(2))
            nome_req = re.sub(r'\[.*?\]', '', nome_req).strip()
            
            if not any(r['name'] == nome_req for r in requirements):
                is_daily = "daily" in texto.lower() or "diária" in texto.lower()
                requirements.append({
                    "name": nome_req,
                    "max": max_qtd,
                    "isDaily": is_daily
                })

    reqs_js_lines = []
    for req in requirements:
        reqs_js_lines.append(f'                    {{ name: "{req["name"]}", current: 0, max: {req["max"]}, isDaily: {str(req["isDaily"]).lower()} }}')
    
    reqs_str = ",\n".join(reqs_js_lines)
    chave_preset = re.sub(r'[^a-z0-9]', '', nome_item.lower())
    
    codigo_js = f"""    {chave_preset}: {{
        title: "{nome_item}",
        wiki: "{url_pagina}",
        steps: [
            {{
                title: "Passo 1: {nome_item}",
                description: "Materiais necessários para fundir {nome_item}.",
                requirements: [
{reqs_str}
                ]
            }}
        ]
    }},"""
    return codigo_js

if __name__ == "__main__":
    try:
        with open("urls.txt", "r", encoding="utf-8") as f:
            urls = [linha.strip() for linha in f if linha.strip() and not linha.startswith("#")]
    except FileNotFoundError:
        print("[-] Arquivo 'urls.txt' não encontrado! Crie um arquivo 'urls.txt' na mesma pasta.")
        urls = []

    todos_blocos = []
    for url in urls:
        bloco = processar_pagina(url)
        if bloco:
            todos_blocos.append(bloco)

    if todos_blocos:
        resultado_final = "\n\n".join(todos_blocos)
        with open("presets_lote_gerados.js", "w", encoding="utf-8") as f:
            f.write(resultado_final)
        print(f"\n[SUCESSO] {len(todos_blocos)} itens processados e salvos em 'presets_lote_gerados.js'!")
