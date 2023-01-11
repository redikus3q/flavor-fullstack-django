from django.db import models
from django.conf import settings

# Create your models here.
class Flavor(models.Model):
    name = models.CharField(max_length=30)
    price = models.IntegerField()
    imageLink = models.TextField()
    description = models.TextField(null=True)

    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name = 'Flavor'
        verbose_name_plural = 'Flavors'

class Comment(models.Model):
    text = models.TextField()
    date = models.DateField(auto_now_add=True)
    flavor = models.ForeignKey(Flavor, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'