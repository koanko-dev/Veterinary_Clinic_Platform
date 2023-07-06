from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Article, Comment
from accounts.models import Clinic


class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id', 'username',)

class CommentSerializer(serializers.ModelSerializer):
    class ArticleSerializer(serializers.ModelSerializer):    
        class Meta:
            model = Article
            fields = ('id', 'title', 'content')

    article = ArticleSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'article', 'user', 'content',)


class ArticleSerializer(serializers.ModelSerializer):
    class UserClinicSerializer(serializers.ModelSerializer):
        class ClinicSerializer(serializers.ModelSerializer):
             class Meta:
                model = Clinic
                fields = ('id', 'clinic_name', 'address_area',)
        clinic_info = ClinicSerializer(read_only=True, many=True)

        class Meta:
            model = get_user_model()
            fields = ('id', 'username', 'clinic_info',)

    class CommentSerializer(serializers.ModelSerializer):
        user = UserSerializer(read_only=True)
        class Meta:
                model = Comment
                fields = ('id', 'user', 'content',)

    comments = CommentSerializer(read_only=True, many=True)
    user = UserClinicSerializer(read_only=True)
                      
    class Meta:
        model = Article
        fields = ('id', 'user', 'title', 'content', 'comments',)