from rest_framework.routers import DefaultRouter
from .views import PostViewSet

roter = DefaultRouter()
roter.register(r'posts', PostViewSet, basename='post')

urlpatterns = roter.urls