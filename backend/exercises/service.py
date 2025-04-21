import requests
from decouple import config
from .models import Exercise
from backend.firebase.firebase import get_storage_bucket  # Importa a função para obter o bucket do Firebase
import tempfile
import os
from urllib.parse import urlparse
import time
from PIL import Image
import io

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



def update_exercises_with_webp_thumbnails():
    """Atualiza todos os exercícios com thumbnails WebP"""
    bucket = get_storage_bucket()
    page = 0
    exercises_updated = 0
    has_more = True
    failed_exercises = []

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
                try:
                    # Tenta encontrar o exercício correspondente no banco de dados
                    exercise = Exercise.objects.filter(name=item['name']).first()
                    
                    if not exercise:
                        print(f"Exercício {item['name']} não encontrado no banco de dados")
                        failed_exercises.append({
                            'name': item['name'],
                            'error': 'Não encontrado no banco de dados'
                        })
                        continue
                    
                    # Se já tem thumbnail, pula
                    if exercise.thumbnail_url:
                        continue
                    
                    # Processa o WebP
                    webp_url = extract_first_frame_and_convert_to_webp(
                        item['gifUrl'],
                        item['name'],
                        bucket, max_size=(300, 300)  # Tamanho de teste
                    )
                    
                    if not webp_url:
                        raise Exception("Falha ao criar WebP")
                    
                    # Atualiza o exercício
                    exercise.thumbnail_url = webp_url
                    exercise.save()
                    exercises_updated += 1
                    print(f"Thumbnail atualizada para {item['name']}")
                    
                except Exception as e:
                    print(f"Erro ao processar {item['name']}: {str(e)}")
                    failed_exercises.append({
                        'name': item['name'],
                        'error': str(e)
                    })
            
            page += 1
            print(f"Página {page} processada. Exercícios atualizados: {exercises_updated}")
            
        except Exception as e:
            print(f"Erro durante a importação: {str(e)}")
            break

    # Salva relatório de falhas
    with open('failed_thumbnails.log', 'w') as f:
        for exercise in failed_exercises:
            f.write(f"{exercise['name']} | {exercise.get('error', 'Erro desconhecido')}\n")

    print(f"Concluído! {exercises_updated} thumbnails atualizadas.")
    print(f"{len(failed_exercises)} exercícios falharam (ver 'failed_thumbnails.log')")


def extract_first_frame_and_convert_to_webp(gif_url, exercise_name, bucket, max_size=(400, 400)):
    """Extrai o primeiro frame do GIF, converte para WebP, redimensiona e faz upload"""
    try:
        # Baixa o GIF
        response = requests.get(gif_url)
        response.raise_for_status()
        
        if 'image/gif' not in response.headers.get('content-type', ''):
            raise ValueError("O arquivo não é um GIF válido")
        
        with Image.open(io.BytesIO(response.content)) as img:
            first_frame = img.convert('RGB')
            
            # Redimensiona mantendo aspect ratio
            first_frame.thumbnail(max_size, Image.LANCZOS)
            
            safe_name = "".join(c if c.isalnum() else "_" for c in exercise_name)
            filename = f"thumbnails/{safe_name}.webp"
            
            blob = bucket.blob(filename)
            if blob.exists():
                blob.make_public()
                return blob.public_url
            
            with io.BytesIO() as output:
                first_frame.save(output, format='WEBP', quality=80)
                webp_data = output.getvalue()
            
            blob.upload_from_string(webp_data, content_type='image/webp')
            blob.make_public()
            return blob.public_url
            
    except Exception as e:
        print(f"Erro ao processar WebP para {exercise_name}: {str(e)}")
        return None

def test_single_exercise_processing():
    """Função para testar com um único exercício antes de processar todos"""
    bucket = get_storage_bucket()
    
    # Escolha um exercício específico para testar
    test_exercise_name = "3/4 sit-up"  # O mesmo que causou erro
    
    # Primeiro verifica na API
    api_response = requests.get(
        f"{EXERCISEDB_API_URL}?name={test_exercise_name}",
        headers=HEADERS
    )
    api_response.raise_for_status()
    api_data = api_response.json()
    
    if not api_data:
        print(f"Exercício '{test_exercise_name}' não encontrado na API")
        return
    
    api_exercise = api_data[0]
    print(f"Processando exercício: {api_exercise['name']}")
    print(f"URL do GIF original: {api_exercise['gifUrl']}")
    
    # Verifica no seu banco de dados
    db_exercise = Exercise.objects.filter(name=api_exercise['name']).first()
    if not db_exercise:
        print("Exercício não encontrado no banco de dados")
        return
    
    print("Thumbnail atual no banco:", db_exercise.thumbnail_url)
    
    # Processa o WebP - AGORA COM OS PARÂMETROS CORRETOS
    webp_url = extract_first_frame_and_convert_to_webp(
        gif_url=api_exercise['gifUrl'],
        exercise_name=api_exercise['name'],
        bucket=bucket,
        max_size=(300, 300)  # Tamanho de teste
    )
    
    if webp_url:
        print("WebP criado com sucesso:", webp_url)
        
        # Pré-visualização (opcional)
        blob = bucket.get_blob(webp_url.split('/')[-1])
        if blob:
            print(f"Tamanho do arquivo: {blob.size / 1024:.2f} KB")
        
        # Atualiza no banco (comente se quiser só testar)
        db_exercise.thumbnail_url = webp_url
        db_exercise.save()
        print("Banco de dados atualizado!")
    else:
        print("Falha ao criar WebP")