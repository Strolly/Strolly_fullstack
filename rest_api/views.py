from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User, Path_geom
from .serializers import UserSerializer, Path_geomSerializer
from django.contrib.gis.geos import GEOSGeometry
from rest_framework import status

class UserViewset(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class = UserSerializer
    filter_fields = ['id']

class Path_geomViewset(viewsets.ModelViewSet):
    queryset=Path_geom.objects.all()
    serializer_class = Path_geomSerializer

    def create(self, request, *args, **kwargs):
        request.data['geom'] = GEOSGeometry(str(request.data['geom']))
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        



