from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import JobDescription
from .serializers import JobDescriptionSerializer


class JobDescriptionListCreateView(generics.ListCreateAPIView):

    serializer_class = JobDescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobDescription.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


class JobDescriptionDetailView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = JobDescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobDescription.objects.filter(
            user=self.request.user
        )