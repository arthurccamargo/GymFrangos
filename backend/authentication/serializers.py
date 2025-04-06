from rest_framework import serializers
<<<<<<< HEAD
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
=======
from allauth.account.models import EmailAddress
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from .models import CustomUser

class CustomRegisterSerializer(RegisterSerializer):
    def validate_email(self, value):
        # Verifica se o e-mail já foi registrado e não foi verificado
        if CustomUser.objects.filter(email=value).exists():
            user = CustomUser.objects.get(email=value)
            email_address = EmailAddress.objects.filter(user=user, email=value).first()
            if email_address and not email_address.verified:
                raise serializers.ValidationError(
                    "Este e-mail está em uso, mas ainda não foi verificado. Verifique seu e-mail ou utilize outro."
                )
            if email_address and email_address.verified:
                raise serializers.ValidationError(
                    "Este e-mail está em uso e já foi verificado. Utilize outro email."
                )
        return value

class CustomUserSerializer(UserDetailsSerializer):
    username = serializers.CharField(read_only=False)  # Força a inclusão do username

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'first_name', 'last_name']
        extra_kwargs = {
            'email': {'read_only': True},  # Opcional
        }
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
