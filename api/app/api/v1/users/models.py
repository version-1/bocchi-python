from django.contrib.auth.models import User
from django.db import models
from api.v1.models import Base

# Create your models here.
class Twitter(Base):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    consumer_key = models.CharField(max_length=255)
    consumer_secret_key = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255)
    access_token_secret = models.CharField(max_length=255)
    status = models.PositiveIntegerField()
