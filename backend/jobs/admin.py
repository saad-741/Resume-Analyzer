from django.contrib import admin

from .models import JobDescription

@admin.register(JobDescription)
class JobDescriptionAdmin(admin.ModelAdmin):

    list_display = (
        "company",
        "position",
        "user",
        "created_at",
    )
    search_fields = (
        "company",
        "position",
        "title",
    )
