from django.shortcuts import render
from rest_framework import viewsets
from app.serializers import UserSerializer, LogEntrySerializer
from app.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    AllowAny
)
from auditlog.models import LogEntry

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        return super().get_queryset()


    @action(detail=False, methods=['get'], url_path='user-profile')
    def user_profile(self, request):
        user = self.get_queryset().get(id=request.user.id)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=200)


class LogEntryViewSet(viewsets.ModelViewSet):
    queryset = LogEntry.objects.all()
    serializer_class = LogEntrySerializer
    permission_classes = [IsAuthenticated]