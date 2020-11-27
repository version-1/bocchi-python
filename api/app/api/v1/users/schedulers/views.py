from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from schedule.serializers import ScheduleSerializer
from schedule.models import ScheduleTweetCollection
from tweet.models import Collection

class SchedulerList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, req, format=None):
        schedulers = req.user.schedule_set.all()
        serializer = ScheduleSerializer(schedulers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        request.data.update({ 'user': request.user.id })
        serializer = ScheduleSerializer(data=request.data)
        if serializer.is_valid():
            schedule = serializer.save()
            collections = Collection.objects.filter(pk__in=request.data['collection_ids'])
            relations = []
            for collection in collections:
                record = ScheduleTweetCollection(schedule=schedule, collection=collection)
                relations.append(record)
            ScheduleTweetCollection.objects.bulk_create(relations)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        return Response({ "message": "ok" })

