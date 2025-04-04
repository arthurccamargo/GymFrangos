from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), # Rota para o painel de administração do Django
    path('auth/', include('authentication.urls')),  # Inclui as URLs de authentication
    path('api/exercises/', include('exercises.urls')),  # Inclui as URLs de exercises
]
