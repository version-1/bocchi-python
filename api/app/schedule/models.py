from django.db import models
from user.models import User
from api.models import Base, gen_uuid
from tweet.models import Collection, Post

# Create your models here.
class Schedule(Base):
    uuid = models.UUIDField(default=gen_uuid)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    execution_time = models.PositiveIntegerField()
    type = models.PositiveIntegerField()

class ScheduleTweetCollection(Base):
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    class Meta:
       db_table = "schedule_tweet_collection"

class ScheduleTweetPost(Base):
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    class Meta:
       db_table = "schedule_tweet_post"

