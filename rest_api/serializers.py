from rest_framework import serializers
from .models import Path_geom, User
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class Path_geomSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Path_geom
        geo_field = 'geom'
        fields = '__all__'