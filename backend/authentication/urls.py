from django.urls import path
from .views import RegisterUserView, check_username

"""
'as_view()' converte a classe RegisterUserView em uma função que o Django pode usar para processar requisições
'name' é um identificador único para a rota, pode ser usado para referenciá-la posteriormente
função 'reverse' obtem a URL completa de uma rota usando seu 'name'
"""
urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("check-username/", check_username, name="check-username")
]
