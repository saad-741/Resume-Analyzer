from rest_framework import serializers
from .models import Resume
from analysis.serializers import AnalysisSerializer

class ResumeSerializer(serializers.ModelSerializer):
    analysis = AnalysisSerializer(read_only=True)

    class Meta:
        model = Resume

        fields = "__all__"

        read_only_fields = [
            "user",
            "file",
            "public_id",
        ]