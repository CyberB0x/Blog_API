from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Grants read access to all user
    Write/modify/delete - only allowed the object's author
    """

    def has_object_permissions(self, request, view, obj):
        # Allow safe methods (GET, HEAD, OPTIONS) for everyone
        if request.methor in permissions.SAFE_METHODS:
            return True


        # For unsafe methods (POST, PUT, PATCH, DELETE)
        # only the post's author is allowed
        return obj.author == request.user