from rest_framework import serializers
from schedule.models import Schedule

class ScheduleSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    uuid = serializers.CharField(required=False, allow_blank=True, max_length=100)
    content = serializers.CharField(required=False, allow_blank=True)
    status = serializers.CharField(required=False, allow_blank=True, max_length=255)

    def create(self, validated_data):
        """
        Create and return a new `UserSerializer` instance, given the validated data.
        """
        return Schedule.objects.create(**validated_data)
