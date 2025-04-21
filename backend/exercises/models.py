from django.db import models

class Exercise(models.Model):
    # primeiro valor(advanced) é armazenado no banco de dados
    # o segundo valor(avancado) é legível para humanos, que será exibido em formulários e no Django Admin
    DIFFICULTY_CHOICES = [
        ('beginner', 'Iniciante'),
        ('intermediate', 'Intermediário'),
        ('advanced', 'Avançado'),
    ]

    name = models.CharField(max_length=100, unique=True) # name é chave única
    body_part = models.CharField(max_length=100) # parte do corpo trabalhada
    equipment = models.CharField(max_length=100)  # equipamento necessário
    gif_url = models.URLField()
    thumbnail_url = models.URLField()
    target = models.CharField(max_length=100)
    difficulty = models.CharField(
        max_length=12,  # Tamanho max para as opções
        choices=DIFFICULTY_CHOICES,  
        default='beginner'  # Valor padrão
    )

    def __str__(self):
        return self.name
