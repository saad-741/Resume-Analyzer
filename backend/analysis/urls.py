from django.urls import path

from .views import (
    AnalyzeResumeView,
    AnalysisDetailView,
)

urlpatterns = [

    path(
        "<int:resume_id>/",
        AnalyzeResumeView.as_view(),
        name="analyze-resume",
    ),

    path(
        "result/<int:resume_id>/",
        AnalysisDetailView.as_view(),
        name="analysis-detail",
    ), 
]

