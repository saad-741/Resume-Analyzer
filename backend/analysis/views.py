from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from resumes.models import Resume

from .models import Analysis
from .serializers import AnalysisSerializer
from .services.gemini import analyze_resume


class AnalyzeResumeView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, resume_id):

        resume = get_object_or_404(
            Resume,
            id=resume_id,
            user=request.user,
        )

        try:
            result = analyze_resume(resume.extracted_text)

            print("\n=========== PARSED RESULT ===========")
            print(result)
            print("=====================================\n")

        except Exception as e:
            import traceback

            traceback.print_exc()

            return Response(
                {
                    "detail": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        try:
            analysis, created = Analysis.objects.update_or_create(
                resume=resume,
                defaults={
                    "ats_score": result["ats_score"],
                    "grammar_score": result["grammar_score"],
                    "summary": result["summary"],
                    "strengths": result["strengths"],
                    "weaknesses": result["weaknesses"],
                    "missing_skills": result["missing_skills"],
                    "suggestions": result["suggestions"],
                    "raw_response": result,
                },
            )

        except Exception as e:
            import traceback

            traceback.print_exc()

            return Response(
                {
                    "detail": f"Database Error: {str(e)}",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        serializer = AnalysisSerializer(analysis)

        return Response(serializer.data)


class AnalysisDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, resume_id):

        analysis = get_object_or_404(
            Analysis,
            resume__id=resume_id,
            resume__user=request.user,
        )

        serializer = AnalysisSerializer(analysis)

        return Response(serializer.data)