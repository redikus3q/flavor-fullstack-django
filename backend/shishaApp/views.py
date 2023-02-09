from shishaApp.serializers import FlavorSerializer, FlavorListSerializer, CommentSerializer, CommentListSerializer
from .models import Flavor, Comment
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User

import json


@csrf_exempt
def handle_flavors(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data['name']
        price = data['price']
        imageLink = data['imageLink']
        description = data['description']
        flavor = Flavor.objects.create(name=name,
                                       price=price,
                                       imageLink=imageLink,
                                       description=description)
        flavorSerializer = FlavorSerializer(flavor)
        jsonFlavor = flavorSerializer.data
        return JsonResponse(jsonFlavor)

    if request.method == 'GET':
        flavors = Flavor.objects.all()
        flavorsSerializer = FlavorListSerializer(flavors)
        jsonFlavors = flavorsSerializer.data
        return JsonResponse(jsonFlavors, safe=False)


@csrf_exempt
@permission_classes([IsAuthenticated])
def handle_flavor(request, id):
    if request.method == 'DELETE':
        flavor = get_object_or_404(Flavor, pk=id)
        flavor.delete()
        return JsonResponse({'success': True})

    if request.method == 'GET':
        flavor = get_object_or_404(Flavor, pk=id)
        flavorSerializer = FlavorSerializer(flavor)
        jsonFlavor = flavorSerializer.data
        return JsonResponse(jsonFlavor)


@csrf_exempt
def handle_comments(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        flavorId = data['flavorId']
        text = data['text']
        flavor = get_object_or_404(Flavor, pk=flavorId)

        userToken = request.headers['Authorization']
        userTokenObj = AccessToken(userToken)
        userId = userTokenObj['user_id']
        user = get_object_or_404(User, pk=userId)

        comment = Comment.objects.create(flavor=flavor, text=text, user=user)
        commentSerializer = CommentSerializer(comment)
        jsonComment = commentSerializer.data
        return JsonResponse(jsonComment)


@csrf_exempt
def handle_flavor_comments(request, id):
    if request.method == 'GET':
        flavor = get_object_or_404(Flavor, pk=id)
        comments = Comment.objects.filter(flavor=flavor)
        commentSerializer = CommentListSerializer(comments)
        jsonComments = commentSerializer.data
        return JsonResponse(jsonComments, safe=False)


@csrf_exempt
def handle_comment(request, id):
    if request.method == "DELETE":
        comment = get_object_or_404(Comment, pk=id)
        comment.delete()
        return JsonResponse({'success': True})