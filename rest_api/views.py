from itsdangerous import Serializer
from rest_framework import viewsets
from rest_framework.views import APIView
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

class Path_geomViewset(APIView):
    queryset=Path_geom.objects.all()
    serializer_class = Path_geomSerializer

    def get(self, request):
        path = Path_geom.objects.all()
        serializer = Path_geomSerializer(path, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Path_geomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
        
        



