from django.apps import AppConfig

class AuthenticationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
<<<<<<< HEAD
    name = 'authentication'
=======
    name = 'authentication'

    def ready(self):
        import authentication.signals  # Importa os sinais quando a app inicia
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
