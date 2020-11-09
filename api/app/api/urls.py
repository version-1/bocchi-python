from rest_framework import routers
from api import views
from django.urls import path

router = routers.DefaultRouter()

urlpatterns = [
    path('', views.index)
]
