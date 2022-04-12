# from django.urls import path

# from . import views


# urlpatterns = [
#     path('create/', views.AddStrollingPath.as_view()),
#     path('view/', views.GetStrollingPath.as_view()),
# ]

from rest_framework import routers

from . import views
from django.urls import path


def get_router():

    router = routers.DefaultRouter()
    router.register(r'user', views.UserViewset)
    router.register(r'path_geom', views.Path_geomViewset)
    return router