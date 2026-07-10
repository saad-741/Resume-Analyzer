from django.contrib import admin
from .models import Analysis


@admin.register(Analysis)
class AnalysisAdmin(admin.ModelAdmin):

    list_display = (
        "resume",
        "ats_score",
        "grammar_score",
        "created_at",
    )

    search_fields = (
        "resume__title",
        "resume__user__username",
    )

    list_filter = (
        "created_at",
    )