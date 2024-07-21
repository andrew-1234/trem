from django.contrib import admin
from .models import Note


class NoteAdmin(admin.ModelAdmin[Note]):
    # List of fields to display in the list view
    list_display = (
        "id",
        "title",
        "content",
        "created_at",
        "updated_at",
        "tags",
        "slug",
    )
    list_display_links = ("title",)
    readonly_fields = ("id", "created_at", "updated_at", "slug")


admin.site.register(Note, NoteAdmin)
