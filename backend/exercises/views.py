from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend # Permite "filtragem exata" baseada nos campos do modelo
from rest_framework.filters import SearchFilter # Habilita "busca textual", permitindo pesquisas parciais
from rest_framework.pagination import LimitOffsetPagination # Permite paginar os resultados da API
from .models import Exercise
from .serializers import ExerciseSerializer
from authentication.permissions import FirebaseIsAuthenticated
from rest_framework.decorators import permission_classes # Permite definir permissões para as views
from rest_framework.response import Response # Permite retornar respostas em formato JSON

@permission_classes([FirebaseIsAuthenticated]) # Permite acesso apenas a usuários autenticados via Firebase
class CustomPagination(LimitOffsetPagination):
    default_limit = 20 # Adiciona LIMIT 20 na query SQL, assim nao pega todos os registros do db
    max_limit = 50
    
    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.count,
            'results': data
        })
    
    # Para evitar a contagem completa, que pode ser lenta em tabelas grandes
    def paginate_queryset(self, queryset, request, view=None):
        self.count = None  # Desativa a contagem total
        return super().paginate_queryset(queryset, request, view)

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

    pagination_class = CustomPagination