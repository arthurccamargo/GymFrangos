import firebase_admin
from firebase_admin import auth
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import UserProfile
from .serializers import UserProfileSerializer

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
