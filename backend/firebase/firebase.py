# Usa o Firebase Admin SDK para operações privilegiadas no servidor
import os
import firebase_admin
from firebase_admin import credentials, storage
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

# Obtém o caminho do JSON das credenciais do Firebase do .env
FIREBASE_CREDENTIALS_PATH = os.getenv("FIREBASE_CREDENTIALS")
BUCKET_NAME = os.getenv("FIREBASE_STORAGE_BUCKET")  

if not FIREBASE_CREDENTIALS_PATH:
    raise ValueError("O caminho do arquivo de credenciais do Firebase não está definido!")

# Inicializa o Firebase
cred = credentials.Certificate(FIREBASE_CREDENTIALS_PATH)

# Evita inicializar o Firebase mais de uma vez
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred, {
    'storageBucket': BUCKET_NAME
})

# Exporta o bucket para ser usado em outros módulos
def get_storage_bucket():
    return storage.bucket()
