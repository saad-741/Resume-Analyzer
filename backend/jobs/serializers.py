from rest_framework import serializers

from .models import JobDescription


class JobDescriptionSerializer(serializers.ModelSerializer):

    class Meta:

        model = JobDescription

        fields = (
            "id",
            "title",
            "company",
            "position",
            "description",
            "created_at",
        )

        read_only_fields = (
            "id",
            "created_at",
        )

