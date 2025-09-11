from rest_framework import viewsets, permissions, filters
from .models import Post
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import PostSerializer
from .permissions import IsOwnerOrReadOnly

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # add search
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = ['is_published']
    search_fields = ['title', 'body']
    ordering_fields = ['created_at', 'updated_at']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

