from django.db import models

from resumes.models import Resume
from jobs.models import JobDescription


class JobMatchAnalysis(models.Model):

    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="job_matches",
    )

    job_description = models.ForeignKey(
        JobDescription,
        on_delete=models.CASCADE,
        related_name="job_matches",
    )

    match_percentage = models.PositiveIntegerField()

    matching_skills = models.JSONField(
        default=list,
    )

    missing_skills = models.JSONField(
        default=list,
    )

    missing_keywords = models.JSONField(
        default=list,
    )

    strengths = models.JSONField(
        default=list,
    )

    weaknesses = models.JSONField(
        default=list,
    )

    recommendations = models.JSONField(
        default=list,
    )

    summary = models.TextField()

    raw_response = models.JSONField(
        default=dict,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["-created_at"]

        constraints = [
            models.UniqueConstraint(
                fields=["resume", "job_description"],
                name="unique_resume_job_match",
            )
        ]

    def __str__(self):
        return (
            f"{self.resume.title} → "
            f"{self.job_description.company} "
            f"({self.match_percentage}%)"
        )