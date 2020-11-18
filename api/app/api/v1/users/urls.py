from api.v1.users import views
from django.urls import path

urlpatterns = [
    path('twitter', views.Twitter.as_view()),
    path('tweets', views.TweetPost.as_view()),
    path('', views.UserList.as_view())
]
