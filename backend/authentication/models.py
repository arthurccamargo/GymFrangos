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