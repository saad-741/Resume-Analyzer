from django.urls import path

from .views import (
    AnalyzeJobMatchView,
    JobMatchHistoryView,
    JobMatchDetailView,
)

urlpatterns = [

    path(
        "",
        AnalyzeJobMatchView.as_view(),
        name="job-match",
    ),

    path(
        "history/",
        JobMatchHistoryView.as_view(),
        name="job-match-history",
    ),

    path(
        "<int:pk>/",
        JobMatchDetailView.as_view(),
        name="job-match-detail",
    ),
]