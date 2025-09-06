from django.db import models
from django.conf import settings
from django.utils.text import slugify

class Post(models.Model):
    title = models.CharField(max_length=200) # Post header
    slug = models.SlugField(unique=True, blank=True) # Slug
    body = models.TextField() # body Post
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts"
    ) # author post

    created_at = models.DateTimeField(auto_now_add=True) # created date
    updated_at = models.DateTimeField(auto_now=True) # update date
    is_published = models.BooleanField(default=True) # Flag published

    def save(self, *args, **kwargs):
        if not self.slug:
            # Automatically generate slug from title
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


    def __str__(self):
        return self.title



