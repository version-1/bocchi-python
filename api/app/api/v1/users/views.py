from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.serializers import UserSerializer, TwitterSerializer
from user.models import Twitter, User
from tweet.serializers import PostSerializer

class UserList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class Twitter(APIView):
    def get(self, request, format=None):
        serializer = TwitterSerializer(request.user.twitter)
        return Response(serializer.data)

