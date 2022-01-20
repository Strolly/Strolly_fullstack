from django.urls import path

from . import views

urlpatterns = [
    path('create/', views.AddStrollingPath.as_view()),
    path('view/', views.GetStrollingPath.as_view()),
]