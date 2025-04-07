from rest_framework.permissions import BasePermission

class FirebaseIsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and 'uid' in request.user) # request.user existe e contém 'uid'