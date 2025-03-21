"""
Django settings for api_root project.

Generated by 'django-admin startproject' using Django 5.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
from decouple import config
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',

      # Apps do projeto
    'gymfrangos',
    "authentication",  # App de autenticação
    "exercises",  # App de exercícios

    'rest_framework_simplejwt',
    'rest_framework.authtoken',
    'dj_rest_auth',
    'dj_rest_auth.registration',  # Para registro (signup)
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',

    'django_filters',
]

SITE_ID = 1

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"  # Exibe o e-mail no console

# garantir que o Django use o modelo de usuário personalizado
AUTH_USER_MODEL = "authentication.CustomUser"

# Configurações do allauth (para registro)
ACCOUNT_EMAIL_REQUIRED = True  # O email é obrigatório
ACCOUNT_UNIQUE_EMAIL = True  # django-allauth impede múltiplos emails VERIFICADOS
ACCOUNT_USERNAME_REQUIRED = True  # O username é obrigatório
ACCOUNT_LOGIN_METHODS = {'email'}
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# Configurações do dj-rest-auth
REST_AUTH = {
    'USE_JWT': True,  # Usar JWT para autenticação
    'JWT_AUTH_COOKIE': 'jwt-auth',  # Nome do cookie para armazenar o token JWT
    'JWT_AUTH_REFRESH_COOKIE': 'jwt-refresh',  # Nome do cookie para armazenar o token de refresh
    'JWT_AUTH_HTTPONLY': True,  # Garante que os cookies são HTTP-only, protege contra ataques XSS
    'JWT_AUTH_SAMESITE': 'Lax',  # Evita envio de cookies em requisições externas não intencionais, protege contra CSRF
    'JWT_AUTH_SECURE': False,  # Apenas envia os cookies em conexões HTTPS - Ativar em produção
}
CORS_ALLOW_CREDENTIALS = True  # Permite envio de cookies/tokens nas requisições

# Configurações específicas para Google
CLIENT_ID = config('GOOGLE_CLIENT_ID')
CLIENT_SECRET = config('GOOGLE_CLIENT_SECRET')

LOGIN_REDIRECT_URL = 'http://localhost:5173/dashboard'
SOCIALACCOUNT_LOGIN_ON_GET = True

# Autentique se já existir uma conta local com este endereço de e-mail
SOCIALACCOUNT_EMAIL_AUTHENTICATION = True
# Conecte a conta local e a conta social se já existir uma conta local com esse endereço de e-mail
SOCIALACCOUNT_EMAIL_AUTHENTICATION_AUTO_CONNECT = True

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': CLIENT_ID,
            'secret': CLIENT_SECRET,
            'key': ''
        },
        'SCOPE': ['profile', 'email'], # app solicita acesso ao perfil básico do usuário e ao endereço de email
        'AUTH_PARAMS': {
            'access_type': 'online', # só precisa de acesso aos dados do usuário enquanto ele estiver online
        }
    }
}

# Configuração extra para garantir que os cookies JWT sejam apagados no logout
REST_AUTH_SERIALIZERS = {
    'TOKEN_SERIALIZER': 'dj_rest_auth.serializers.JWTSerializer',
}

MIDDLEWARE = [
    "allauth.account.middleware.AccountMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    
]

ROOT_URLCONF = 'backend.api_root.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

# Configurações para servir arquivos estáticos durante o desenvolvimento
# Garante que o Django procure arquivos estáticos na pasta backend/static.
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),  # Caminho para a pasta static
]

WSGI_APPLICATION = 'backend.api_root.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, '..', 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",  # URL do frontend em desenvolvimento
# ]
CORS_ORIGIN_ALLOW_ALL= True # Não recomendado em produção

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination', # Paginação
        'PAGE_SIZE': 20,  # Define quantos exercícios serão retornados por requisição
}

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    # `allauth` specific authentication methods, such as login by email
    'allauth.account.auth_backends.AuthenticationBackend',
)

