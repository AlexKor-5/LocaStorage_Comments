from django.db import models

class todo(models.Model):
    body = models.CharField(max_length=200)
    index = models.IntegerField()
    done = models.BooleanField(default=False)
