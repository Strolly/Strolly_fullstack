from django.shortcuts import render

# Create your views here.

from .models import StrollingPath
from .serializers import StrollingPathSerializer
from rest_framework.generics import ListAPIView,CreateAPIView

class AddStrollingPath(CreateAPIView):
    queryset=StrollingPath.objects.all()
    serializer_class = StrollingPathSerializer

class GetStrollingPath(ListAPIView):
    queryset=StrollingPath.objects.all()
    serializer_class = StrollingPathSerializer