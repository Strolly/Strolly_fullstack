from django.shortcuts import render
from rest_framework import viewsets, mixins

# Create your views here.

from .models import User, Path_geom
from .serializers import UserSerializer, Path_geomSerializer


class User(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class = UserSerializer

class Path_geom(viewsets.ModelViewSet):
    queryset=Path_geom.objects.all()
    serializer_class = UserSerializer