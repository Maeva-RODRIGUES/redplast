from django.contrib import admin
from .models import Protocol

@admin.register(Protocol)
class ProtocolAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'icon', 'created_at')
    search_fields = ('title', 'author', 'category')
    list_filter = ('category', 'author', 'created_at')


