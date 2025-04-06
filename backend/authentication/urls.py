<<<<<<< HEAD
from django.urls import path
from .views import RegisterUserView, check_username, handle_social_login

"""
'as_view()' converte a classe RegisterUserView em uma função que o Django pode usar para processar requisições
=======
from django.urls import path, include
from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import UserDetailsView
from .views import CustomRegisterView

"""
'as_view()' converte a classe LoginView em uma função que o Django pode usar para processar requisições
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
'name' é um identificador único para a rota, pode ser usado para referenciá-la posteriormente
função 'reverse' obtem a URL completa de uma rota usando seu 'name'
"""
urlpatterns = [
<<<<<<< HEAD
    path("logingoogle/", handle_social_login, name="logingoogle"),
    path("register/", RegisterUserView.as_view(), name="register"),
    path("check-username/", check_username, name="check-username")
=======
    path('', include('dj_rest_auth.urls')),  # Endpoints de autenticação (login, logout, etc.)
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('registration/', CustomRegisterView.as_view()),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='account_confirm_email'),
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
]
