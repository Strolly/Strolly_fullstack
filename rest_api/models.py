from django.contrib.gis.db import models

# Create your models here.
class User(models.Model):
    id = models.CharField(max_length=200, primary_key=True)
    email = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    adresse = models.TextField(blank=True)
    age = models.TextField(blank=True)
    picture = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Path_geom(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.CharField(max_length=200, blank=False)
    geom = models.LineStringField(null=True)
    length = models.CharField(max_length=50)
    type = models.TextField()

    def __str__(self):
        return self.name
