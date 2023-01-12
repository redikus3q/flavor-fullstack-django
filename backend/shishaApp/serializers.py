from rest_framework import serializers
from .models import Flavor, Comment
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


class FlavorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Flavor
        fields = '__all__'


class FlavorListSerializer(serializers.ListSerializer):
    child = FlavorSerializer()


class CommentSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField('get_username')

    def get_username(self, obj):
        user = get_object_or_404(User, pk=obj.user.id)
        return user.username

    class Meta:
        model = Comment
        fields = '__all__'


class CommentListSerializer(serializers.ListSerializer):
    child = CommentSerializer()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'id', 'first_name', 'last_name')


class UserListSerializer(serializers.ListSerializer):
    child = UserSerializer()
