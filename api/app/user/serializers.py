from rest_framework import serializers
from user.models import User, Twitter

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.CharField(required=False, allow_blank=True, max_length=100)
    username = serializers.CharField(required=False, allow_blank=True, max_length=100)
    first_name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=100)

    def create(self, validated_data):
        """
        Create and return a new `UserSerializer` instance, given the validated data.
        """
        return User.objects.create(**validated_data)

class TwitterSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    consumer_key = serializers.CharField(allow_blank=True, max_length=255)
    consumer_secret_key = serializers.CharField(allow_blank=True, max_length=255)
    access_token = serializers.CharField(allow_blank=True, max_length=255)
    access_token_secret = serializers.CharField(allow_blank=True, max_length=255)
    status = serializers.IntegerField()

    def create(self, validated_data):
        """
        Create and return a new `UserSerializer` instance, given the validated data.
        """
        return Twitter.objects.create(**validated_data)
