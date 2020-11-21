from api.v1.users.tweets import views
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('', views.TweetPost.as_view()),
]
