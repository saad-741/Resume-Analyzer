from django.db import models
from resumes.models import Resume


class Analysis(models.Model):

    resume = models.OneToOneField(
        Resume,
        on_delete=models.CASCADE,
        related_name="analysis",
    )

    ats_score = models.PositiveSmallIntegerField()
    grammar_score = models.PositiveSmallIntegerField()
    summary = models.TextField(blank=True)
    strengths = models.JSONField(default=list)
    weaknesses = models.JSONField(default=list)
    missing_skills = models.JSONField(default=list)
    suggestions = models.JSONField(default=list)
    raw_response = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
 
    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Analysis - {self.resume.title}"