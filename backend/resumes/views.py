from rest_framework import generics, status 
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Resume
from .serializers import ResumeSerializer
from .services.extractor import extract_text
from utils.cloudinary import upload_resume
import cloudinary.uploader

class ResumeListCreateView(generics.ListCreateAPIView):

    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Resume.objects.filter( user=self.request.user )

    def create(self, request, *args, **kwargs):
        uploaded_file = request.FILES["file"]

        extracted_text = extract_text(uploaded_file)

        uploaded = upload_resume(uploaded_file)

        resume = Resume.objects.create(
            user=request.user,
            title=request.data["title"],
            file=uploaded["url"],
            public_id=uploaded["public_id"],
            extracted_text=extracted_text,
        )

        serializer = ResumeSerializer(resume)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
 


class ResumeDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        resume = self.get_object()

        if resume.public_id:
            cloudinary.uploader.destroy(
                resume.public_id,
                resource_type="raw",
            )

        resume.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)