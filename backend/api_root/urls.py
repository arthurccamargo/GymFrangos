from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls), # Rota para o painel de administração do Django
    path('auth/', include('authentication.urls')),  # Inclui as URLs de authentication
    path('api/exercises/', include('exercises.urls')),  # Inclui as URLs de exercises
    path('accounts/', include('allauth.urls')), # URLs para confirmação de e-mail e outras ações
]
