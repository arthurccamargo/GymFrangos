from rest_framework import serializers
from allauth.account.models import EmailAddress
from dj_rest_auth.registration.serializers import RegisterSerializer
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
        return value
