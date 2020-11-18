from rest_framework import serializers
from tweet.models import Post, Collection
from user.models import User

class PostSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    uuid = serializers.CharField(required=False, allow_blank=True, max_length=100)
    content = serializers.CharField(required=False, allow_blank=True)
    status = serializers.CharField(required=False, allow_blank=True, max_length=255)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    def create(self, validated_data):
        """
        Create and return a new `UserSerializer` instance, given the validated data.
        """
        return Post.objects.create(**validated_data)

class CollectionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    key = serializers.CharField(required=False, allow_blank=True, max_length=100)
    name = serializers.CharField(required=False, allow_blank=True, max_length=255)

    def create(self, validated_data):
        """
        Create and return a new `UserSerializer` instance, given the validated data.
        """
        return Collection.objects.create(**validated_data)
