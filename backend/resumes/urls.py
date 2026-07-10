from django.urls import path

from .views import (
    ResumeListCreateView,
    ResumeDetailView,
)

urlpatterns = [

    path( "", ResumeListCreateView.as_view(), ),
    path( "<int:pk>/", ResumeDetailView.as_view(), ),

]
 

# from .views import (
#     ResumeUploadView,
#     ResumeListView,
#     ResumeDetailView,
#     ResumeDeleteView,
#     AnalyzeResumeView,
#     ResumeAnalysisView,
# )

# urlpatterns = [
#     path("", ResumeListView.as_view()),
#     path("", ResumeUploadView.as_view()),

#     path("<int:pk>/", ResumeDetailView.as_view()),
#     path("<int:pk>/delete/", ResumeDeleteView.as_view()),

#     path("<int:resume_id>/analyze/", AnalyzeResumeView.as_view()),
#     path("<int:resume_id>/analysis/", ResumeAnalysisView.as_view()),
# ]