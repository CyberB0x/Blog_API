from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    # author is read-only, will display the username

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'body', 'author', 'created_at', 'updated_at', 'is_published']
