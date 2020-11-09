from django.urls import include, path

urlpatterns = [
    path('api/', include('api.urls')),
    path('api/v1', include('api.v1.urls')),
    #api/authアプリケーションのURLconf読み込み
    # path('api/auth/', include('djoser.urls.jwt'))
]
