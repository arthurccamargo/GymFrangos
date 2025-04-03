import os
import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

# Obtém o caminho do JSON das credenciais do Firebase do .env
firebase_credentials_path = os.getenv("FIREBASE_CREDENTIALS")

if not firebase_credentials_path:
    raise ValueError("O caminho do arquivo de credenciais do Firebase não está definido!")

# Inicializa o Firebase
cred = credentials.Certificate(firebase_credentials_path)

# Evita inicializar o Firebase mais de uma vez
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
