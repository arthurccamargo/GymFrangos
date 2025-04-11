from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend # Permite "filtragem exata" baseada nos campos do modelo
from rest_framework.filters import SearchFilter # Habilita "busca textual", permitindo pesquisas parciais
from .models import Exercise
from .serializers import ExerciseSerializer
from authentication.permissions import FirebaseIsAuthenticated
from rest_framework.decorators import permission_classes # Permite definir permissões para as views

@permission_classes([FirebaseIsAuthenticated]) # Permite acesso apenas a usuários autenticados via Firebase
class ExerciseListView(generics.ListAPIView): # Permite consultas GET para obter múltiplos registros
    queryset = Exercise.objects.all().order_by('id') # Retorna todos os exercícios cadastrados
    
    # Converte os objetos Exercise para JSON antes de enviá-los para o frontend
    serializer_class = ExerciseSerializer 

    filter_backends = [DjangoFilterBackend, SearchFilter] # Define dois tipos de filtragem para a API

    # Permite filtragem por campos exatos na URL 
    filterset_fields = ['body_part', 'equipment', 'difficulty'] # É sensível a maiúsculas, ex:/exercises/?body_part=chest

    # Permite buscas parciais no campo name
    search_fields = ['name'] # NÂO sensível a maiúsculas, ex: /exercises/?search=cable