from django.urls import path
from .views.auth_views import RegisterView, LoginView

"""
'as_view()' converte a classe LoginView em uma função que o Django pode usar para processar requisições
'name' é um identificador único para a rota, pode ser usado para referenciá-la posteriormente
função 'reverse' obtem a URL completa de uma rota usando seu 'name'
"""
urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),  # Rota para registro
    path('api/login/', LoginView.as_view(), name='login'),  # Rota para login
]
