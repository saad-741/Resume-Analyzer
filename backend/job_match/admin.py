from django.contrib import admin

from .models import JobMatchAnalysis


@admin.register(JobMatchAnalysis)
class JobMatchAnalysisAdmin(admin.ModelAdmin):

    list_display = (
        "resume",
        "job_description",
        "match_percentage",
        "created_at",
    )

    list_filter = (
        "created_at",
    )

    search_fields = (
        "resume__title",
        "job_description__company",
        "job_description__position",
    )

 
