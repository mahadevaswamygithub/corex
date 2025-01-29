from rest_framework import serializers
from app.models import User
from auditlog.models import LogEntry
from django.contrib.contenttypes.models import ContentType

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ['id', 'username', 'email', 'password'] 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}  
        }

    def create(self, validated_data):
        """
        Create a new user instance. Password is required during creation.
        """
        password = validated_data.pop('password', None) 
        if not password:
            raise serializers.ValidationError({"password": "This field is required."})
        instance = self.Meta.model(**validated_data)
        instance.set_password(password)  
        instance.save()
        return instance

    def update(self, instance, validated_data):
        """
        Update an existing user instance. Password is optional during updates.
        """
        password = validated_data.pop('password', None)  
        m2m_fields = {}
        for attr, value in list(validated_data.items()):
            if isinstance(self.fields[attr], serializers.ManyRelatedField):
                m2m_fields[attr] = value
                validated_data.pop(attr)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password: 
            instance.set_password(password)
        instance.save()
        for attr, value in m2m_fields.items():
            getattr(instance, attr).set(value)

        return instance


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
