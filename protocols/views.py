from django.shortcuts import render

from rest_framework import viewsets
from .models import Protocol
from .serializers import ProtocolSerializer

class ProtocolViewSet(viewsets.ModelViewSet):
    queryset = Protocol.objects.all()
    serializer_class = ProtocolSerializer
