from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Deixa campo 'username' não obrigatório
    username = models.CharField(max_length=150, null=True, blank=True, unique=True)
    # Email como identificador único
    email = models.EmailField(unique=True)

    # Campo de email como o campo de identificação do usuário
    USERNAME_FIELD = 'email'

    # Campos obrigatórios ao criar um usuário (além de USERNAME_FIELD e password)
    REQUIRED_FIELDS = []

    def __str__(self):
        return 'Email | {self.email}'


