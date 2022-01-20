from rest_framework import serializers
from .models import StrollingPath

class StrollingPathSerializer(serializers.ModelSerializer):
    class Meta:
        fields =(
            'id',
            'name',
            'description',
        )
        model = StrollingPath