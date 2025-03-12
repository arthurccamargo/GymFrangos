import sys
import os
import django
import random
from faker import Faker

# Caminho absoluto para o diretório do backend
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "backend")))

# Configurar Django para acessar o banco de dados
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.api_root.settings")
django.setup()


from exercises.models import Exercise

fake = Faker()

difficulties = ['beginner', 'intermediate', 'advanced']
body_parts = ['Peito', 'Costas', 'Pernas', 'Ombros', 'Braços', 'Abdômen']
equipments = ['Halteres', 'Barra', 'Máquina', 'Peso corporal', 'Corda', 'Kettlebell']
targets = ['Peitoral', 'Dorsais', 'Quadríceps', 'Deltoides', 'Bíceps', 'Tríceps', 'Core']
secondary_muscles = ['Antebraço', 'Panturrilha', 'Trapézio', 'Glúteos', 'Serrátil', 'Flexores']

def generate_exercises(n=50):
    exercises = []
    for _ in range(n):
        name = fake.unique.word().capitalize() + " Exercise"
        body_part = random.choice(body_parts)
        equipment = random.choice(equipments)
        gif_url = fake.image_url()
        target = random.choice(targets)
        secondary_muscle = random.choice(secondary_muscles)
        instructions = fake.sentence()
        series = random.randint(3, 5)
        repetitions = random.randint(8, 15)
        difficulty = random.choice(difficulties)

        exercise = Exercise(
            name=name,
            body_part=body_part,
            equipment=equipment,
            gif_url=gif_url,
            target=target,
            secondaryMuscles=secondary_muscle,
            instructions=instructions,
            series=series,
            repetitions=repetitions,
            difficulty=difficulty
        )
        exercises.append(exercise)
    
    Exercise.objects.bulk_create(exercises)
    print(f"{n} exercícios adicionados ao banco de dados!")

if __name__ == "__main__":
    generate_exercises()
