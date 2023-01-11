from django.urls import path
from . import views

urlpatterns = [
    path('flavor/', views.handle_flavors, name='handle_flavors'),
    path('flavor/<id>', views.handle_flavor, name='handle_flavor'),
    path('comments/', views.handle_comments, name='handle_comments'),
    path('comments/flavor/<id>', views.handle_flavor_comments, name='handle_comments'),
]