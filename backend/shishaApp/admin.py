from django.contrib import admin
from .models import Flavor, Comment

# Register your models here.

admin.site.register(Flavor)
admin.site.register(Comment)