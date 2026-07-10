from django.conf import settings
from django.db import models

class Resume(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="resumes",
    )
    title = models.CharField(max_length=255)
    # file = models.FileField(upload_to="resumes/")
    file = models.URLField()
    public_id = models.CharField(
        max_length=255,
        blank=True,
        default=""
    )

    extracted_text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
    
