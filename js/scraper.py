import json
import re
import requests
from bs4 import BeautifulSoup

def extrair_requisitos_wiki(url_pagina):
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
    nome_item = titulo_elem.get_text(strip=True) if titulo_elem else "Desconhecido"
    
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

    return {
        "title": nome_item,
        "url": url_pagina,
        "requirements": requirements
    }

if __name__ == "__main__":
    try:
        with open("urls.txt", "r", encoding="utf-8") as f:
            urls = [linha.strip() for linha in f if linha.strip()]
    except FileNotFoundError:
        print("[-] Arquivo 'urls.txt' não encontrado! Crie um arquivo com as URLs na mesma pasta.")
        urls = []

    resultados_gerais = []
    
    for url in urls:
        dados_item = extrair_requisitos_wiki(url)
        if dados_item:
            resultados_gerais.append(dados_item)

    if resultados_gerais:
        with open("resultado_lote.json", "w", encoding="utf-8") as f:
            json.dump(resultados_gerais, f, indent=4, ensure_ascii=False)
        print(f"\n[SUCESSO] {len(resultados_gerais)} itens processados e salvos no arquivo 'resultado_lote.json'!")
