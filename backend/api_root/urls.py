from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls), # Rota para o painel de administração do Django
    path('auth/', include('authentication.urls')),  # Inclui as URLs de authentication
    path('api/exercises/', include('exercises.urls')),  # Inclui as URLs de exercises

    # Se a URL não for de uma API, serve o index.html do React
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='react'),
]
