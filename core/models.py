from django.db import models

# Create your models here.
class Dashboard(models.Model):
    name = models.CharField(max_length=300)
    serialization = models.TextField()
