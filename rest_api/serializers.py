from rest_framework import serializers
from .models import Path_geom, User
from rest_framework_gis import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class Path_geomSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = Path_geom
        geo_field = 'geom'
        fields = '__all__'