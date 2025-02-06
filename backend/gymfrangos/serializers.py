from rest_framework import serializers
from django.contrib.auth import get_user_model # obtém o modelo de usuário(CustomUser) atual do Django

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User # especifica que este serializer é baseado no modelo CustomUser 
        fields = ['id', 'email', 'username', 'password'] # campos de CustomUser incluídos no JSON de entrada e saída

        # write_only significa que o campo password será aceito na entrada, 
        # mas não será retornado na resposta JSON
        extra_kwargs = {'password': {'write_only': True}} 

    def validate(self, data):
        # Verifica se todos os campos obrigatórios estão presentes
        if not data.get('email') or not data.get('username') or not data.get('password'):
            raise serializers.ValidationError("Email, username and password are required.")
        return data    

    def create(self, validated_data): #cria um usuário no banco de dados
        return User.objects.create_user(**validated_data)
