import firebase_admin
from firebase_admin import auth
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import UserProfile
from .serializers import UserProfileSerializer

class RegisterUserView(APIView):
    def post(self, request):
        # Debug: Log dos headers recebidos
        print("\nHeaders recebidos:", request.META.keys())


        # Extrai o token do header Authorization
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header or not auth_header.startswith('Bearer '):
            print("\nErro: Header Authorization faltando ou mal formatado")
            return Response(
                {"error": "Cabeçalho de autorização inválido. Use 'Bearer <token>'."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        id_token = auth_header.split('Bearer ')[1] # Pega o token JWT do Firebase enviado pelo frontend
        print("\nToken recebido (truncado):", id_token[:50] + "...")  # Log parcial do token

        if not id_token:
            return Response({"error": "Token de autenticação é obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verifica o token do Firebase 
            decoded_token = auth.verify_id_token(id_token, clock_skew_seconds=10) # Aceita 10 segundos de diferença
            print("\nToken decodificado com Sucesso")  # Debug

            uid = decoded_token["uid"]
            email = decoded_token.get("email") # Pega o email do token JWT
            username = request.data.get("username") # Pega o nome de usuário do frontend

            if not username:
                print("\nErro: Username faltando ou vazio")
                return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Verifica se o username já existe
            if UserProfile.objects.filter(username=username).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Criar o usuário no banco de dados
            user = UserProfile.objects.create(
                uid=uid,
                email=email,
                username=username
            )
            serializer = UserProfileSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            print(f"\nErro inesperado: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
