from rest_framework import serializers

from .models import JobMatchAnalysis


class JobMatchAnalysisSerializer(serializers.ModelSerializer):

    resume_title = serializers.CharField(
        source="resume.title",
        read_only=True,
    )

    company = serializers.CharField(
        source="job_description.company",
        read_only=True,
    )

    position = serializers.CharField(
        source="job_description.position",
        read_only=True,
    )

    class Meta:

        model = JobMatchAnalysis

        fields = "__all__"