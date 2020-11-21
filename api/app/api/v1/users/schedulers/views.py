from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from schedule.serializers import ScheduleSerializer

class SchedulerList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, req, format=None):
        schedulers = req.user.schedule_set.all()
        serializer = ScheduleSerializer(schedulers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # TODO
        return Response({ "message": "ok" })

    def delete(self, request, format=None):
        return Response({ "message": "ok" })

