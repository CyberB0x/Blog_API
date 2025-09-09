from rest_framework import viewsets, permissions, filters
from .models import Post
from .serializers import PostSerializer
from .permissions import IsOwnerOrReadOnly

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

    # settings permissions
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # add search
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'body']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

