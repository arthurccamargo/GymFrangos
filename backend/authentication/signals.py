from django.db.models.signals import post_save
from django.dispatch import receiver
from allauth.account.models import EmailAddress
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=EmailAddress)
def delete_unverified_users_with_same_email(sender, instance, **kwargs):
    """
    Se um usuário verificar o email, outros usuários não verificados com o mesmo email serão excluídos automaticamente
    """
    if instance.verified:
        User.objects.filter(
            email=instance.email,
            emailaddress__verified=False
        ).delete()
