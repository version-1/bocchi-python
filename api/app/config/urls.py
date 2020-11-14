from django.urls import include, path
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('api/', include('api.urls')),
    path('api/v1', include('api.v1.urls')),
    path('api/v1/users', include('api.v1.users.urls')),
    path('api/v1/tweets', include('api.v1.tweets.urls')),
    url(r'^api/v1/auth', obtain_jwt_token)
]
