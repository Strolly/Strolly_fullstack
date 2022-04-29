from rest_framework import viewsets
from rest_framework.views import APIView
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view

from .models import User, Path_geom
from .serializers import UserSerializer, Path_geomSerializer
from django.contrib.gis.geos import GEOSGeometry
from rest_framework import status
from django.db import connection

class UserViewset(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class = UserSerializer
    filter_fields = ['id']

class Path_geomViewset(viewsets.ModelViewSet):
    
    serializer_class = Path_geomSerializer

    def list(self, request, *args, **kwargs):
        queryset=Path_geom.objects.all()
        serializer = Path_geomSerializer(queryset, many=True)
        return Response(serializer.data)
        

    def create(self, request,format=None):
        serializer = Path_geomSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class Intersected_pathsViewset(viewsets.ModelViewSet):
    queryset=Path_geom.objects.all()

    def list(self, request, *args, **kwargs):
        route_name = request.query_params.get('route')
        cursor = connection.cursor()
        sql_query = f"""select id, userid, json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(rest_api_path_geom.*)::json)), length, type, name, color from rest_api_path_geom as rest_api_path_geom(id, userid, geom, length, type, color, name) where ST_Intersects((select rest_api_path_geom.geom::geometry from rest_api_path_geom where rest_api_path_geom.name = '{route_name}'), rest_api_path_geom.geom::geometry) group by id"""
        cursor.execute(sql_query)
        response = cursor.fetchall()
        return Response(response)
    
    



