from rest_framework import serializers
from tweet.models import Post, Collection
from user.models import User
from api.serializers import Base

class CollectionSerializer(Base):
    key = serializers.CharField(required=False, allow_blank=True, max_length=100)
    name = serializers.CharField(required=False, allow_blank=True, max_length=255)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    def create(self, validated_data):
        """
        Create and return a new `UserSerializer` instance, given the validated data.
        """
        return Collection.objects.create(**validated_data)
class PostSerializer(Base):
    uuid = serializers.CharField(required=False, allow_blank=True, max_length=100)
    content = serializers.CharField(required=False, allow_blank=True)
    status = serializers.CharField(required=False, allow_blank=True, max_length=255)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    collections = CollectionSerializer(read_only=True, many=True)

    def create(self, validated_data):
        """
        Create and return a new `UserSerializer` instance, given the validated data.
        """
        return Post.objects.create(**validated_data)

