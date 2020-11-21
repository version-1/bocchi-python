from api.v1.users import views
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('', views.UserList.as_view()),
    path('twitter', views.Twitter.as_view()),
]
