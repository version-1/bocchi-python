from django.db import models
from django.contrib.auth.models import User
from api.models import Base, gen_uuid

# Create your models here.
class Post(Base):
    uuid = models.UUIDField(default=gen_uuid)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    status = models.PositiveIntegerField()

class Collection(Base):
    key = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()

class PostCollection(Base):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    count = models.PositiveIntegerField()
    lastPostedAt = models.DateTimeField()
    class Meta:
       db_table = "tweet_post_collection"
