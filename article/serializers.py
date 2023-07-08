from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Article, Comment
from accounts.models import Clinic


class UserSerializer(serializers.ModelSerializer):
        img = serializers.ImageField(required=False)
        class Meta:
            model = get_user_model()
            fields = ('id', 'username', 'img',)

class CommentSerializer(serializers.ModelSerializer):
    class ArticleSerializer(serializers.ModelSerializer):    
        class Meta:
            model = Article
            fields = ('id', 'title', 'content')

    article = ArticleSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'article', 'user', 'content', 'created_at',)


class ArticleSerializer(serializers.ModelSerializer):
    class UserClinicSerializer(serializers.ModelSerializer):
        class ClinicSerializer(serializers.ModelSerializer):
             class Meta:
                model = Clinic
                fields = ('id', 'clinic_name', 'address_area',)
        clinic_info = ClinicSerializer(read_only=True, many=True)

        img = serializers.ImageField(required=False)

        class Meta:
            model = get_user_model()
            fields = ('id', 'username', 'clinic_info', 'img',)

    class CommentSerializer(serializers.ModelSerializer):
        user = UserSerializer(read_only=True)
        class Meta:
                model = Comment
                fields = ('id', 'user', 'content', 'created_at',)

    comments = CommentSerializer(read_only=True, many=True)
    user = UserClinicSerializer(read_only=True)

    img = serializers.ImageField(required=False)
        
    class Meta:
        model = Article
        fields = ('id', 'user', 'title', 'img', 'content', 'category', 'created_at', 'updated_at', 'comments', )