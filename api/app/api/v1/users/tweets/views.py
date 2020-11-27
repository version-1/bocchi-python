from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from tweet.serializers import PostSerializer
from tweet.models import Post, Collection, PostCollection

# Create your views here.
class TweetPost(APIView):
    def get(self, request, format=None):
        tweets = request.user.post_set.all()
        serializer = PostSerializer(tweets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        user = request.user

        request.data.update({ 'user': user.id })
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save()
            collections = Collection.objects.filter(pk__in=request.data['collection_ids'])
            relations = []
            for collection in collections:
                record = PostCollection(post=post, collection=collection)
                relations.append(record)
            PostCollection.objects.bulk_create(relations)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TweetPostDetail(APIView):
    def get(self, request, uuid, format=None):
        post = Post.objects.get(uuid=uuid)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def patch(self, request, uuid, format=None):
        post = Post.objects.get(uuid=uuid)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def delete(self, request, uuid, format=None):
        post = Post.objects.get(uuid=uuid)
        serializer = PostSerializer(post)
        post.delete()
        return Response(serializer.data)
