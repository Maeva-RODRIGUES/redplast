from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Protocol
from .serializers import ProtocolSerializer


class ProtocolViewSet(viewsets.ModelViewSet):
    queryset = Protocol.objects.all()
    serializer_class = ProtocolSerializer
    permission_classes = [permissions.AllowAny]  
    
    def perform_create(self, serializer):
        # Associer l'utilisateur connecté comme auteur
        # serializer.save(author=self.request.user)
        serializer.save()
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Récupérer les protocoles par catégorie"""
        category = request.query_params.get('category')
        if category:
            protocols = self.queryset.filter(category=category)
            serializer = self.get_serializer(protocols, many=True)
            return Response(serializer.data)
        return Response({'error': 'Paramètre category requis'}, status=400)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Statistiques des protocoles"""
        total_protocols = self.queryset.count()
        categories_count = {}
        
        for choice in Protocol.CATEGORY_CHOICES:
            category_key = choice[0]
            category_name = choice[1]
            count = self.queryset.filter(category=category_key).count()
            categories_count[category_name] = count
        
        return Response({
            'total_protocols': total_protocols,
            'categories': categories_count,
            'total_authors': self.queryset.values('author').distinct().count()
        })