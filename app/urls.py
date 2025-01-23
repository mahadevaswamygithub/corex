
from django.urls import path, include
from app.routers import app_router
urlpatterns = [
    path('app/', include(app_router.urls))
]