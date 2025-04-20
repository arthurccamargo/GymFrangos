import requests
from decouple import config
from .models import Exercise
from backend.firebase.firebase import get_storage_bucket  # Importa a função para obter o bucket do Firebase
import tempfile
import os
from urllib.parse import urlparse
import time

EXERCISEDB_API_URL = "https://exercisedb.p.rapidapi.com/exercises"
RAPIDAPI_KEY = config('RAPIDAPI_KEY')

HEADERS = {
    "x-rapidapi-key": RAPIDAPI_KEY, 
    "x-rapidapi-host": "exercisedb.p.rapidapi.com"
}

def download_and_upload_gif(gif_url, exercise_name, bucket):
    """Baixa o GIF e faz upload para o Firebase Storage, retornando apenas a URL do Storage"""
    try:
        # Extrai a extensão do arquivo
        parsed_url = urlparse(gif_url)
        file_ext = os.path.splitext(parsed_url.path)[1] or '.gif'
        
        # Cria um nome de arquivo seguro
        safe_name = "".join(c if c.isalnum() else "_" for c in exercise_name)
        filename = f"exercises/{safe_name}{file_ext}"
        
        # Verifica se o arquivo já existe no Storage
        blob = bucket.blob(filename)
        if blob.exists():  # Se já existe, retorna a URL diretamente
            blob.make_public()
            return blob.public_url
        
        # Baixa o GIF
        response = requests.get(gif_url)
        response.raise_for_status()
        
        # Valida se é realmente um GIF
        if 'image/gif' not in response.headers.get('content-type', ''):
            raise ValueError("O arquivo não é um GIF válido")
        
        # Faz upload para o Firebase
        blob.upload_from_string(
            response.content,
            content_type='image/gif'
        )
        
        # Retorna a URL pública
        blob.make_public()
        return blob.public_url
    except Exception as e:
        print(f"Erro ao processar GIF para {exercise_name}: {str(e)}")
        return None

def fetch_all_exercises():
    """Busca TODOS os exercícios da API e armazena no banco de dados"""
    bucket = get_storage_bucket()
    page = 0
    exercises_saved = 0
    has_more = True
    failed_exercises = []  # Lista para armazenar falhas

    while has_more:
        try:
            response = requests.get(
                f"{EXERCISEDB_API_URL}?offset={page*10}&limit=10",
                headers=HEADERS
            )
            
            if response.status_code == 429:  # Rate limit
                wait_time = int(response.headers.get('Retry-After', 60))
                print(f"Rate limit atingido. Esperando {wait_time} segundos...")
                time.sleep(wait_time)
                continue
                
            response.raise_for_status()
            data = response.json()
            
            if not data:
                has_more = False
                break
            
            for item in data:
                # Tenta fazer upload do GIF para o Storage
                storage_gif_url = download_and_upload_gif(item['gifUrl'], item['name'], bucket)
                
                if not storage_gif_url:
                    print(f"Pulando exercício {item['name']} - falha no upload do GIF")
                    failed_exercises.append({
                        'name': item['name'],
                        'original_gif_url': item['gifUrl'],
                        'error': 'Falha no upload para Storage'
                    })
                    continue  # Não salva exercícios sem GIF no Storage
                
                # Salva APENAS se conseguir armazenar o GIF no Storage
                Exercise.objects.update_or_create(
                    name=item['name'],
                    defaults={
                        'body_part': item['bodyPart'],
                        'equipment': item['equipment'],
                        'gif_url': storage_gif_url,  # SEMPRE a URL do Storage
                        'target': item['target'],
                    }
                )
                exercises_saved += 1
            
            page += 1
            print(f"Exercícios processados: {exercises_saved}")
            
        except Exception as e:
            print(f"Erro durante a importação: {str(e)}")
            break

    # Salva relatório de falhas
    with open('failed_exercises.log', 'w') as f:
        for exercise in failed_exercises:
            f.write(f"{exercise['name']} | {exercise['original_gif_url']}\n")

    print(f"Concluído! {exercises_saved} exercícios salvos.")
    print(f"{len(failed_exercises)} exercícios falharam (ver 'failed_exercises.log')")