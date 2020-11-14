from api.v1.tweets import views
from django.urls import path

urlpatterns = [
    path('', views.TweetList.as_view())
]
