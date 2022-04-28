# from rest_framework import routers

# from . import views
# from django.urls import path


# def get_router():
#     router = routers.DefaultRouter()
#     router.register(r'user', views.UserViewset)
#     router.register(r'path_geom', views.Path_geomViewset)
#     return router

from . import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('user', views.UserViewset.as_view({'get': 'list'})),
    path('path_geom', views.Path_geomViewset.as_view({'post': 'create', 'get': 'list'})),
    path('intersect', views.Intersected_pathsViewset.as_view({'get': 'list'})),
]

urlpatterns = format_suffix_patterns(urlpatterns)
