from rest_framework import serializers
from .models import Path_geom, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class Path_geomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Path_geom
        fields = '__all__'