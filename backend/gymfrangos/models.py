from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
"""
Existe o UserManager padrão, mas como alteramos (removemos o username como obrigatório) 
no modelo de usuário (CustomUser), precisamos criar um gestor (manager) personalizado.
"""
class CustomUserManager(BaseUserManager): # BaseUserManager class gerencia modelos de usuário no Django
    """Gerencia criação de usuários e superusuários"""
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O email é obrigatório")
        email = self.normalize_email(email) # garante email seja salvo corretamente | Exemplo@GMAIL.com → exemplo@gmail.com
        extra_fields.setdefault("is_active", True) 
        user = self.model(email=email, **extra_fields) # cria novo usuário
        user.set_password(password) # Django criptografa a senha automaticamente
        user.save(using=self._db) # Suporte para múltiplos bancos de dados 
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser precisa ter is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser precisa ter is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    # Deixa campo 'username' não obrigatório
    username = models.CharField(max_length=150, null=True, blank=True, unique=True)
    # Email como identificador único
    email = models.EmailField(unique=True)

    # # Define que o login do usuário e do superusuário será feito pelo email
    USERNAME_FIELD = 'email'

    # Define quais campos são obrigatórios ao criar um superusuário, aplicado APENAS ao superusuário
    # Por padrão, os campos obrigatórios são USERNAME_FIELD(por padrão username) e password
    REQUIRED_FIELDS = [] # Nenhum campo extra obrigatório para superusuário, além de email que foi colocado como obrigatório
    # createsuperuser só pedirá email e password.

    # Vincula o CustomUser ao CustomUserManager para gerenciar a criação de usuários
    objects = CustomUserManager()

    def __str__(self):
        return 'Email | {self.email}'


