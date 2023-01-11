from rest_framework import serializers
from .models import Flavor, Comment


class FlavorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Flavor
        fields = '__all__'


class FlavorListSerializer(serializers.ListSerializer):
    child = FlavorSerializer()


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'


class CommentListSerializer(serializers.ListSerializer):
    child = CommentSerializer()