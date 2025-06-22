from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProtocolViewSet

router = DefaultRouter()
router.register(r'protocols', ProtocolViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
