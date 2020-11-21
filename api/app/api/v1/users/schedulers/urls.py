from api.v1.users.schedulers import views
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('', views.SchedulerList.as_view()),
]
