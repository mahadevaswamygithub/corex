
from django.urls import path, include
from app.routers import app_router

from django.urls import path
from .views import DownloadCostCSV

urlpatterns = [
    path('app/', include(app_router.urls)),
    path('download-cost/', DownloadCostCSV.as_view(), name='download-cost'),
]