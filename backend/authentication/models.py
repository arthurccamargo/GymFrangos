<<<<<<< HEAD
from django.db import models

class UserProfile(models.Model):
    uid = models.CharField(max_length=255, unique=True) # ID do Firebase
    email = models.EmailField(max_length=255, unique=True) # Email do Firebase
    username =  models.CharField(max_length=150, unique=True) # Nome do usuário
    height = models.FloatField(null=True, blank=True) # Altura do usuário
    weight = models.FloatField(null=True, blank=True) # Peso do usuário
    gym = models.CharField(max_length=150, null=True, blank=True) # Nome da academia do usuário
    created_at = models.DateTimeField(auto_now_add=True) # Data de criação do perfil
    updated_at = models.DateTimeField(auto_now=True) # Data da última atualização do perfil

def __str__(self):
    return self.username
=======
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


>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
