from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

"""
UserAdmin é uma classe do Django que gerencia como os modelos de usuário 
aparecem e são manipulados no painel de administração do Django

Usamos um modelo de usuário personalizado (CustomUser), então
precisamos definir um UserAdmin também customizado
"""
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "is_staff", "is_active")  # Define quais colunas aparecem na lista de usuários no Admin
    list_filter = ("is_staff", "is_active")  # Filtros laterais no Admin

    # Define quais campos aparecem ao editar um usuário existente no Django Admin
    fieldsets = ( 
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important Dates", {"fields": ("last_login", "date_joined")}),
    )
    # Define quais campos aparecem ao adicionar um novo usuário pelo Django Admin
    add_fieldsets = (
        (None, {
            "classes": ("wide",), # configuração visual para tornar o formulário mais largo
            "fields": ("email", "password1", "password2", "is_staff", "is_active"),
        }),
    )
    search_fields = ("email",) # permite buscar usuários pelo email.
    ordering = ("email",) # ordena os usuários em ordem alfabética pelo email

    def save_model(self, request, obj, form, change):
        """Garante que a senha será criptografada ao salvar um novo usuário pelo admin."""
        if form.cleaned_data.get("password"): # verifica se o formulário contém um campo de senha preenchido
            obj.set_password(form.cleaned_data["password"]) # criptografa a senha do "obj" CustomUser antes de salvá-la no banco de dados
        super().save_model(request, obj, form, change) # chamamos super() para manter o funcionamento normal do Django Admin

admin.site.register(CustomUser, CustomUserAdmin)
