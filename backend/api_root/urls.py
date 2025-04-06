from django.contrib import admin
from django.urls import path, include
<<<<<<< HEAD
=======
from django.views.generic import TemplateView
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299

urlpatterns = [
    path('admin/', admin.site.urls), # Rota para o painel de administração do Django
    path('auth/', include('authentication.urls')),  # Inclui as URLs de authentication
    path('api/exercises/', include('exercises.urls')),  # Inclui as URLs de exercises
<<<<<<< HEAD
=======
    path('accounts/', include('allauth.urls')), # URLs para confirmação de e-mail e outras ações
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
]
