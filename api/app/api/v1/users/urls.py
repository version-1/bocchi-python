from rest_framework import routers
from api.v1.users import views
from django.urls import path

router = routers.DefaultRouter()

urlpatterns = [
    path('', views.UserList.as_view())
]
