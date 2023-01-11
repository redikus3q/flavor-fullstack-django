from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='login'),
    path('getUser/', views.getUser, name='getUser'),
    path('register/', views.register, name='register')
]