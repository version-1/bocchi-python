from api.v1.users.tweet_collections import views
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('', views.TweetCollection.as_view()),
    path('<int:id>/tweets', views.CollectionTweet.as_view()),
]
