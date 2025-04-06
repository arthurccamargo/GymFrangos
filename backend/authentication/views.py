<<<<<<< HEAD
import uuid
import firebase_admin
import re
from firebase_admin import auth
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import UserProfile
from .serializers import UserProfileSerializer

@api_view(['POST'])
def handle_social_login(request):
    try:
        # 1. Extrai o token do header Authorization
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header.startswith('Bearer '):
            return Response(
                {"error": "Token de autenticação inválido."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        id_token = auth_header.split(' ')[1] # Pega o token JWT enviado pelo Firebase
        # Verifica o token do Firebase 
        decoded_token = auth.verify_id_token(id_token, clock_skew_seconds=10) # Aceita 10 segundos de diferença
        uid = decoded_token['uid']

        # 2. Verifica se usuário já existe
        try:
            user = UserProfile.objects.get(uid=uid)
            return Response({
                "status": "success",
                "user": UserProfileSerializer(user).data
            })
        except UserProfile.DoesNotExist:
            email = decoded_token.get('email') # Dados do token do Firebase
            firebase_name = decoded_token.get('name', '')

            # 3. Gera username único automaticamente
            username = generate_username(email, firebase_name)

            # 4. Cria usuário no banco de dados sem interação do usuário
            user = UserProfile.objects.create(
                uid=uid,
                email=email,
                username=username
            )

            return Response({
                "status": "success",
                "user": UserProfileSerializer(user).data
            })
    except Exception as e:
        return Response(
            {"error": str(e)},
        status=status.HTTP_400_BAD_REQUEST
    )

def generate_username(email, name=None):
    """
    Gera um username único baseado em email ou nome do Google.
    1. Extrai a base do nome ou email
    2. Remove caracteres inválidos
    3. Adiciona sufixo numérico se necessário
    """
    # Passo 1: Cria base do username
    if name:
        base = re.sub(r'[^\w]', '', name).lower()[:20]  # Remove caracteres especiais
    else:
        base = email.split('@')[0][:20]  # Pega parte antes do @

    # Passo 2: Verifica unicidade e adiciona sufixo se necessário
    username = base
    counter = 1
    
    while UserProfile.objects.filter(username=username).exists():
        username = f"{base}_{counter}"
        counter += 1
        
        # Previne loops infinitos (fallback seguro)
        if counter > 100:
            username = f"{base}_{uuid.uuid4().hex[:4]}"
            break
    
    return username
    

@api_view(['POST'])
def check_username(request):
    username = request.data.get("username")
    if not username:
        return Response({"error": "Nome de usuário é necessário"}, status=status.HTTP_400_BAD_REQUEST)
    
    if UserProfile.objects.filter(username=username).exists():
        return Response({"error": "Nome de usuário já existe"}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"sucess": "Nome de usuário disponível"}, status=status.HTTP_200_OK)


class RegisterUserView(APIView):
    def post(self, request):
        try:
            # Extrai o token do header Authorization
            auth_header = request.META.get('HTTP_AUTHORIZATION', '')
            if not auth_header.startswith('Bearer '):
                return Response(
                    {"error": "Token de autenticação inválido."},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            id_token = auth_header.split(' ')[1] # Pega o token JWT enviado pelo Firebase
            # Verifica o token do Firebase 
            decoded_token = auth.verify_id_token(id_token, clock_skew_seconds=10) # Aceita 10 segundos de diferença
            uid = decoded_token['uid']
            email = decoded_token.get('email')
            username = request.data.get('username')

            if not username:
                return Response({"error": "Nome de usuário é necessário"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Criar o usuário no banco de dados
            user = UserProfile.objects.create(
                uid=uid,
                email=email,
                username=username
            )
            serializer = UserProfileSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            # Se algo der errado, deleta o usuário do Firebase
            if 'uid' in locals():
                try:
                    auth.delete_user(uid)
                except:
                    pass
            
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

=======
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
