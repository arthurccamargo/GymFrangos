from django.urls import path, include
from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import UserDetailsView
from .views import CustomRegisterView

"""
'as_view()' converte a classe LoginView em uma função que o Django pode usar para processar requisições
'name' é um identificador único para a rota, pode ser usado para referenciá-la posteriormente
função 'reverse' obtem a URL completa de uma rota usando seu 'name'
"""
urlpatterns = [
    path('', include('dj_rest_auth.urls')),  # Endpoints de autenticação (login, logout, etc.)
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('registration/', CustomRegisterView.as_view()),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='account_confirm_email'),
]
