from rest_framework import routers
from api.v1 import views
from django.urls import path

router = routers.DefaultRouter()

urlpatterns = [
    path('', views.index)
]
