from rest_framework.permissions import BasePermission

class FirebaseIsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user ) # request.user existe e  VER: and 'uid' in request.user contém 'uid'