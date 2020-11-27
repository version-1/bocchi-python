from django.urls import include, path
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('api/', include('api.urls')),
    path('api/v1', include('api.v1.urls')),
    path('api/v1/users/', include('api.v1.users.urls')),
    path('api/v1/users/tweets/', include('api.v1.users.tweets.urls')),
    path('api/v1/users/tweet-collections/', include('api.v1.users.tweet_collections.urls')),
    path('api/v1/users/schedulers/', include('api.v1.users.schedulers.urls')),
    url(r'^api/v1/auth', obtain_jwt_token)
]
