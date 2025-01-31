from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls), # Rota para o painel de administração do Django
    path('auth/', include('rest_framework_social_oauth2.urls')),  # Rota para autenticação social
    path('', TemplateView.as_view(template_name='index.html')), # Rota para página inicial do site
    path('', include('gymfrangos.urls')),  # Inclui as URLs de gymfrangos
]
