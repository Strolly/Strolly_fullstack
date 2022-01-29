from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    age = models.TextField()
    adresse = models.TextField()

    def __str__(self):
        return self.name

class Path_geom(models.Model):
    id = models.AutoField(primary_key=True)
    geom = models.TextField()
    length = models.CharField(max_length=50)
    type = models.TextField()

    def __str__(self):
        return self.name