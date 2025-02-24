from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # 'username' é obrigatório e único
    username = models.CharField(max_length=150, unique=True)
    # 'email' é obrigatório e único
    email = models.EmailField(unique=True)

    # Define que o login do usuário e do superusuário será feito pelo email
    USERNAME_FIELD = 'email'

    # Define quais campos são obrigatórios ao criar um superusuário, aplicado APENAS ao superusuário
    # Por padrão, os campos obrigatórios são USERNAME_FIELD(por padrão username) e password
    REQUIRED_FIELDS = ['username'] # username obrigatório para superusuário, além de email que foi colocado como obrigatório
    # createsuperuser só pedirá email e password.

    def __str__(self):
        return self.email


