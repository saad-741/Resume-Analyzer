from django.contrib import admin
from .models import Resume

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "user",
        "created_at",
    )
    list_filter = (
        "created_at",
    )
    search_fields = (
        "title",
        "user__username",
        "user__email",
    )
    readonly_fields = (
        "created_at",
        "extracted_text",
    )
    ordering = (
        "-created_at",
    )
    fieldsets = (
        (
            "Resume Information",
            {
                "fields": (
                    "user",
                    "title",
                    "file",
                )
            },
        ),
        (
            "Extracted Text",
            {
                "fields": (
                    "extracted_text",
                ),
            },
        ),
        (
            "Metadata",
            {
                "fields": (
                    "created_at",
                ),
            },
        ),
    )