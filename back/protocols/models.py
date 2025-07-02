from django.db import models
from simple_history.models import HistoricalRecords  
import logging 

logger = logging.getLogger(__name__) 

class Protocol(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    author = models.CharField(max_length=100)
    icon = models.CharField(max_length=10, blank=True)
    category = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    history = HistoricalRecords()

    def __str__(self):
        return self.title

 
    def delete(self, *args, **kwargs):
        logger.warning(f"TENTATIVE DE SUPPRESSION INTERDITE pour Protocol ID={self.id}")
        raise Exception("❌Suppression interdite pour les Protocols.")
    
