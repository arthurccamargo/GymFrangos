from firebase_admin import auth
from firebase_admin.exceptions import FirebaseError
from rest_framework.authentication import BaseAuthentication

# Decodifica token e armazena em request.user
class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header.startswith('Bearer '):
            return None
        
        token = auth_header.split(' ')[1]
        try:
            decoded = auth.verify_id_token(token)
            return (decoded, None)  # Retorna (user, None)
        except FirebaseError:
            return None