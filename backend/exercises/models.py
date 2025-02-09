from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=100)
    body_part = models.CharField(max_length=100)
    target_muscle = models.CharField(max_length=100)
    equipment = models.CharField(max_length=100)
    gif_url = models.URLField()
    series = models.IntegerField(default=3)
    repetitions = models.IntegerField(default=10)

    def __str__(self):
        return self.name
