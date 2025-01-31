from rest_framework import serializers
from django.contrib.auth import get_user_model # obtém o modelo de usuário(CustomUser) atual do Django

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User # especifica que este serializer é baseado no modelo CustomUser 
        fields = ['id', 'email', 'password'] # campos de CustomUser incluídos no JSON de entrada e saída

        # write_only significa que o campo password será aceito na entrada, 
        # mas não será retornado na resposta JSON
        extra_kwargs = {'password': {'write_only': True}} 

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
