from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from tweet.serializers import PostSerializer

class TweetList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        tweets = Tweet.objects.all()
        serializer = PostSerializer(tweets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        return Response({})
