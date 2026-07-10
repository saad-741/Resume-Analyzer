from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from resumes.models import Resume
from jobs.models import JobDescription

from .models import JobMatchAnalysis
from .serializers import JobMatchAnalysisSerializer


from .services.gemini import analyze_job_match


class JobMatchDetailView(RetrieveAPIView):

    serializer_class = JobMatchAnalysisSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return JobMatchAnalysis.objects.filter(
            resume__user=self.request.user
        )

class JobMatchHistoryView(ListAPIView):

    serializer_class = JobMatchAnalysisSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return JobMatchAnalysis.objects.filter(

            resume__user=self.request.user

        ).select_related(

            "resume",
            "job_description"

        ).order_by("-created_at")

class AnalyzeJobMatchView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        resume_id = request.data.get("resume_id")
        job_id = request.data.get("job_description_id")

        if not resume_id or not job_id:

            return Response(
                {
                    "detail":
                    "resume_id and job_description_id are required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        resume = Resume.objects.get(
            id=resume_id,
            user=request.user,
        )

        job = JobDescription.objects.get(
            id=job_id,
            user=request.user,
        )

        result = analyze_job_match(
            resume.extracted_text,
            job.description,
        )

        analysis, created = JobMatchAnalysis.objects.update_or_create(
            resume=resume,
            job_description=job,
            defaults={

                "match_percentage":
                result["match_percentage"],

                "matching_skills":
                result["matching_skills"],

                "missing_skills":
                result["missing_skills"],

                "missing_keywords":
                result["missing_keywords"],

                "strengths":
                result["strengths"],

                "weaknesses":
                result["weaknesses"],

                "recommendations":
                result["recommendations"],

                "summary":
                result["summary"],

                "raw_response":
                result,
            }
        )

        serializer = JobMatchAnalysisSerializer(
            analysis
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

 
    
