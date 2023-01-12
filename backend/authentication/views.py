from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
import json


@csrf_exempt
def getUser(request):
    try:
        userToken = request.headers['Authorization']
    except:
        return JsonResponse("", safe=False)

    try:
        userTokenObj = AccessToken(userToken)
    except:
        return JsonResponse("", safe=False)
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
    return TokenObtainPairView.as_view()(request)
