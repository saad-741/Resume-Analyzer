from rest_framework import serializers
from .models import Analysis


class AnalysisSerializer(serializers.ModelSerializer):

    resume_title = serializers.CharField(
        source="resume.title",
        read_only=True
    )

    class Meta:

        model = Analysis

        fields = [
            "id",
            "resume",
            "resume_title",
            "ats_score",
            "grammar_score",
            "summary",
            "strengths",
            "weaknesses",
            "missing_skills",
            "suggestions",
            "created_at",
        ]

        read_only_fields = fields