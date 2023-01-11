from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User
import json


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


@csrf_exempt
def getUser(request):
    userToken = request.headers['Authorization']
    userTokenObj = AccessToken(userToken)
    userId = userTokenObj['user_id']
    user = User.objects.get(id=userId)
    return JsonResponse({
        'username': user.username,
        "firstname": user.first_name,
        "lastname": user.last_name,
        "admin": user.is_superuser,
    })


@csrf_exempt
def register(request):
    body = json.loads(request.body)
    User.objects.create_user(username=body['username'],
                                    email=body['email'],
                                    password=body['password'])
    return MyTokenObtainPairView.as_view()(request)
