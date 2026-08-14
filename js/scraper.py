import json
import requests
from bs4 import BeautifulSoup

def extrair_requisitos_wiki(url_pagina):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    print(f"\n[+] Conectando à página: {url_pagina}")
    resposta = requests.get(url_pagina, headers=headers)
    
    if resposta.status_code != 200:
        print(f"[-] Erro ao acessar a página. Código: {resposta.status_code}")
        return None

    # Analisa o HTML da página usando o BeautifulSoup
    soup = BeautifulSoup(resposta.text, 'html.parser')
    
    # Extrai o título oficial do item/classe da wiki
    titulo_elem = soup.find(id="page-title")
    nome_item = titulo_elem.get_text(strip=True) if titulo_elem else "Desconhecido"
    
    # O conteúdo principal da página no Wikidot fica dentro da div 'page-content'
    conteudo = soup.find(id="page-content")
    if not conteudo:
        print("[-] Conteúdo principal não encontrado.")
        return None

    requisitos = []

    # Varre os elementos de parágrafos e listas onde costumam ficar os requisitos de craft/drop
    for elemento in conteudo.find_all(['p', 'li', 'td']):
        texto = elemento.get_text(strip=True)
        # Filtra textos curtos ou vazios que contenham dicas de itens
        if texto and len(texto) < 150:
            if any(termo in texto.lower() for termo in ['x', 'item', 'merge', 'quest', 'drop']):
                if texto not in requisitos:
                    requisitos.append(texto)

    dados = {
        "item_name": nome_item,
        "url": url_pagina,
        "requirements": requisitos
    }
    
    return dados

if __name__ == "__main__":
    # Exemplo prático interativo
    url_alvo = input("Cole a URL exata da página da Wiki (ex: http://aqwwiki.wikidot.com/void-crystal-b): ").strip()
    
    if url_alvo:
        resultado = extrair_requisitos_wiki(url_alvo)
        if resultado:
            print("\n[SUCESSO] Dados extraídos:")
            print(json.dumps(resultado, indent=4, ensure_ascii=False))
            
            # Salva o resultado automaticamente em um arquivo JSON local
            with open("resultado_scraping.json", "w", encoding="utf-8") as f:
                json.dump(resultado, f, indent=4, ensure_ascii=False)
            print("\n[+] Salvo com sucesso no arquivo 'resultado_scraping.json'!")
