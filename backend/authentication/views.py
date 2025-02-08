from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics #contém classes base do DRF que facilitam a criação de views
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny #permite que usuários autenticado ou não acesse essa view
from .serializers import UserSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """View para registro de usuário"""

    # queryset conjunto de dados que a view manipula (todos os usuários)
    queryset = User.objects.all() # queryset não é realmente usado, mas é obrigatório
    permission_classes = [AllowAny] # permite que qualquer pessoa acesse a view
    serializer_class = UserSerializer # UserSerializer usado para validar e criar o usuário

    # método create é chamado quando uma requisição POST é feita para a view
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        username = request.data.get('username')

        # verifica se o email já existe no banco de dados
        if User.objects.filter(email=email).exists(): 
            return Response(
                {"message": "This email is already registered"}, status=status.HTTP_400_BAD_REQUEST)
        # verifica se o username já existe no banco de dados
        if User.objects.filter(username=username).exists():
            return Response({"message": "This username is already taken"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data) # instancia o UserSerializer com esses dados
        serializer.is_valid(raise_exception=True) # valida os dados com base nas regras do UserSerializer
        # Se os dados forem inválidos, gera automaticamente uma resposta de erro HTTP 400
        user = serializer.save() # usa o método create() do serializer, salva o usuário no banco de dados 

        """
        Na prática, quando o usuário se registra:
        1. Ele recebe estes dois tokens
        2. O access token é usado para fazer requisições autenticadas (geralmente válido por pouco tempo, tipo 5-15 minutos)
        3. Quando o access token expira, o refresh token pode ser usado para gerar um novo access token (geralmente válido por mais tempo, tipo 24h ou 7 dias)
        4. Isso proporciona uma experiência segura mas conveniente para o usuário
        """
        refresh = RefreshToken.for_user(user) # cria um refresh token para o usuário recém-criado
        return Response({
            "message": "User registered successfully",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_201_CREATED)

class LoginView(TokenObtainPairView): # faz a autenticação do usuário e retorna os tokens JWT
    """ View para login de usuário """
    permission_classes = [AllowAny]  # permite que qualquer pessoa acesse a view de login

    def post(self, request, *args, **kwargs):
        username_or_email = request.data.get('username_or_email')  # O campo pode ser username ou email
        password = request.data.get('password')

        if not username_or_email or not password:
            return Response({"detail": "Username or email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Tenta obter o usuário com base no email se não contiver '@' então busca por username
        try:
            user = User.objects.get(email=username_or_email) if '@' in username_or_email else User.objects.get(username=username_or_email)
        except User.DoesNotExist:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Verifica se a senha corresponde
        if not user.check_password(password):
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Gera os tokens JWT
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK)
