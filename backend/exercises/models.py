from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=100, unique=True) # name é chave única
    body_part = models.CharField(max_length=100) # parte do corpo trabalhada
    equipment = models.CharField(max_length=100)  # equipamento necessário
    gif_url = models.URLField()
    series = models.IntegerField(default=3)
    repetitions = models.IntegerField(default=10)

    def __str__(self):
        return self.name
