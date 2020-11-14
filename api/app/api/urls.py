from rest_framework import routers
from api import views
from django.urls import path

urlpatterns = [
    path('', views.index)
]
