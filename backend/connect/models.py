from django.db import models

# Create your models here.
class CsvModel(models.Model):
    date = models.DateField()
    close = models.FloatField()
    volume = models.FloatField()
    symbol = models.CharField(max_length=10)
