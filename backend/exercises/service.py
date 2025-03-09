import requests
from decouple import config
from .models import Exercise

EXERCISEDB_API_URL = "https://exercisedb.p.rapidapi.com/exercises"
RAPIDAPI_KEY = config('RAPIDAPI_KEY')

# Cabeçalhos necessários para autenticação na API
HEADERS = {
    "x-rapidapi-key": RAPIDAPI_KEY, 
    "x-rapidapi-host": "exercisedb.p.rapidapi.com"
}

def fetch_exercises():
    """
    Busca exercícios da API ExerciseDB e armazena no banco de dados
    A API retorna apenas 10 exercícios por requisição, então usamos um loop
    para percorrer todas as páginas.
    """
    page = 0  # Inicializa a variável da página
    exercises_saved = 0  # Contador de exercícios salvos

    while exercises_saved < 100:  # Loop para buscar os 100 primeiras exercicios da API
        # Faz a requisição GET para a API, passando a página atual e o limite de 10 exercícios por vez
        response = requests.get(f"{EXERCISEDB_API_URL}?offset={page*10}&limit=10", headers=HEADERS)
        data = response.json() # converte a resposta JSON para um dicionário Python
        # Se não houver mais exercícios (a API não retorna mais dados), o loop para
        if not data:
            break
        """
        Mesmo sem unique=True, a função fetch_exercises() já evita duplicatas porque está usando update_or_create(), que: 
        1 Procura um exercício com o mesmo name.
            1.1    Se existe, atualiza os campos.
            1.2 Se não existe, cria um novo exercício.
        """
        for item in data:
            """ Percorre os exercícios retornados e os insere ou atualiza no banco de dados """
            Exercise.objects.update_or_create( 
                name=item['name'],  # Nome do exercício (chave única para evitar duplicatas)
                defaults={
                    'body_part': item['bodyPart'],
                    'equipment': item['equipment'],
                    'gif_url': item['gifUrl'],
                    'target' : item['target'],
                    'secondaryMuscles' : item['secondaryMuscles'],
                    'instructions' : item['instructions'],
                }
            )
            exercises_saved += 1  # incrementa o contador de exercícios salvos

        page += 1  # passa para a próxima página de exercícios

    # Exibe quantos exercícios foram salvos no banco
    print(f"{exercises_saved} exercícios foram salvos no banco de dados!")