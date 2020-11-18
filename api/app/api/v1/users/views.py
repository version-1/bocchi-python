from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.models import Twitter
from user.serializers import UserSerializer, TwitterSerializer
from user.models import User
from tweet.serializers import PostSerializer


class UserList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class Twitter(APIView):
    def get(self, request, format=None):
        serializer = TwitterSerializer(request.user.twitter)
        return Response(serializer.data)

class TweetPost(APIView):
    def get(self, request, format=None):
        tweets = request.user.tweets
        serializer = PostSerializer(tweets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        request.data.update({ 'user': request.user.id })
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
