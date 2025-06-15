from django.contrib import admin
from .models import Protocol

@admin.register(Protocol)
class ProtocolAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at")  
    search_fields = ("title", "author")
    list_filter = ("created_at",)

