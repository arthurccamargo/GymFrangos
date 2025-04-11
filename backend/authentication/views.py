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
from .permissions import FirebaseIsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

@permission_classes([AllowAny])  # Permite acesso não autenticado
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
@permission_classes([AllowAny])  # Permite acesso não autenticado
def check_username(request):
    print("\nRequestData: ", request.data)
    username = request.data.get("username")
    print("\nusername", username)
    if not username:
        return Response({"error": "Nome de usuário é necessário"}, status=status.HTTP_400_BAD_REQUEST)
    
    if UserProfile.objects.filter(username=username).exists():
        return Response({"error": "Nome de usuário já existe"}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"sucess": "Nome de usuário disponível"}, status=status.HTTP_200_OK)

# ---------------------------------------------------------------------------------------------
# VIEWS PROTEGIDAS POR AUTENTICAÇÃO FIREBASE
# ---------------------------------------------------------------------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])  # Permite acesso não autenticado - sem token
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
        decoded_token = auth.verify_id_token(id_token)
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

            print("Criou o usuario em handle_social_login") # DEBUG

            return Response({
                "status": "success",
                "user": UserProfileSerializer(user).data
            })
    except Exception as e:
        return Response(
            {"error": str(e)},
        status=status.HTTP_400_BAD_REQUEST
    )

class RegisterUserView(APIView):
    permission_classes = [AllowAny]  # Permite acesso não autenticado
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
            decoded_token = auth.verify_id_token(id_token)
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


@api_view(['GET'])
@permission_classes([FirebaseIsAuthenticated]) # Permissão personalizada para autenticação Firebase
def get_user_data(request, uid):
    # Verifica se o UID solicitado corresponde ao UID do token
    if request.user.get('uid') != uid:
        return Response({"error": "Não autorizado"}, status=status.HTTP_403_FORBIDDEN)

    try:
        user = UserProfile.objects.get(uid=uid)
        # Serializa os dados
        data = {
            'uid': user.uid,
            'email': user.email,
            'username': user.username,
            'height': user.height,
            'weight': user.weight,
            'gym': user.gym,
            'created_at': user.created_at,
            'updated_at': user.updated_at
        }
        return Response(data, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response({"error": "Usuário não encontrado"}, 
                        status=status.HTTP_404_NOT_FOUND)
    