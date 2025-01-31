from django.urls import path
from .views.auth_views import RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # Rota para registro
    path('login/', LoginView.as_view(), name='login'),  # Rota para login
]
