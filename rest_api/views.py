from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User, Path_geom
from .serializers import UserSerializer, Path_geomSerializer


class User(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class = UserSerializer
    filter_fields = ['id']

class Path_geom(viewsets.ModelViewSet):
    queryset=Path_geom.objects.all()
    serializer_class = Path_geomSerializer