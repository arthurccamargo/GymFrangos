from django.db import models

# Create your models here.
class User(models.Model):
    user_name = models.CharField(max_length=150, default='')
    user_email = models.EmailField(default='')

    def __str__(self):
        return f'Name: {self.user_name} | E-mail: {self.user_email}'


