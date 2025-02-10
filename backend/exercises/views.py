from rest_framework import generics
from .models import Exercise
from .serializers import ExerciseSerializer

class ExerciseListView(generics.ListAPIView): # permite consultas GET para obter múltiplos registros
    queryset = Exercise.objects.all() # retorna todos os exercícios cadastrados
    
    # converte os objetos Exercise para JSON antes de enviá-los para o frontend
    serializer_class = ExerciseSerializer 