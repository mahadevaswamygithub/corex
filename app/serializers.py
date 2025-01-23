from rest_framework import serializers
from app.models import User
from auditlog.models import LogEntry
from django.contrib.contenttypes.models import ContentType

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']


class LogEntrySerializer(serializers.ModelSerializer):
    action = serializers.CharField(source='get_action_display')
    model_name = serializers.SerializerMethodField()
    # user_name = serializers.SerializerMethodField()

    class Meta:
        model = LogEntry
        fields = '__all__'

    def get_model_name(self, obj):
        content_type = ContentType.objects.get(id=obj.content_type_id)
        return content_type.model

    # def get_user_name(self, obj):
    #     return obj.user.username if obj.user else None
