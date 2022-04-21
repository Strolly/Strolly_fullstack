from rest_framework import viewsets
from rest_framework.views import APIView
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

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

    def list(self, request, *args, **kwargs):
        serializer = Path_geomSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request,format=None):
        serializer = Path_geomSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
    



