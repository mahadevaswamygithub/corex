from rest_framework.routers import DefaultRouter
from app.views import UserViewSet, LogEntryViewSet

app_router = DefaultRouter()
app_router.register('users', UserViewSet)
app_router.register('logs', LogEntryViewSet)