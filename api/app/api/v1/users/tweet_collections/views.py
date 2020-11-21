from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from tweet.serializers import CollectionSerializer

class TweetCollection(APIView):
    def get(self, request, format=None):
        tweets = request.user.collection_set.all()
        serializer = CollectionSerializer(tweets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # TODO
        return Response({ "message": "ok" })

    def patch(self, request, format=None):
        # TODO
        return Response({ "message": "ok" })

    def delete(self, request, format=None):
        return Response({ "message": "ok" })

class CollectionTweet(APIView):
    def get(self, request, format=None):
        # TODO
        return Response({ "message": "ok" })

