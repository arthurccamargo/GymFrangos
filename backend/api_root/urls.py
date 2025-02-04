from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls), # Rota para o painel de administração do Django
    path('auth/', include('rest_framework_social_oauth2.urls')),  # Rota para autenticação social
    path('', include('gymfrangos.urls')),  # Inclui as URLs de gymfrangos

    # Se a URL não for de uma API, serve o index.html do React
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='react'),
]
