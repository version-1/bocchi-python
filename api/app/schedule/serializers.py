from rest_framework import serializers

class ScheduleSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    uuid = serializers.CharField(required=False, allow_blank=True, max_length=100)
    content = serializers.CharField(required=False, allow_blank=True)
    status = serializers.CharField(required=False, allow_blank=True, max_length=255)

    def create(self, validated_data):
        """
        Create and return a new `UserSerializer` instance, given the validated data.
        """
        return Snippet.objects.create(**validated_data)
