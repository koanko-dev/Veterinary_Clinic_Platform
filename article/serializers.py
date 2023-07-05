from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Article, Comment
from accounts.models import Clinic

class ArticleSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class ClinicSerializer(serializers.ModelSerializer):
             class Meta:
                model = Clinic
                fields = ('id', 'clinic_name', 'address_area',)

        clinic_info = ClinicSerializer(read_only=True, many=True)

        class Meta:
            model = get_user_model()
            fields = ('id', 'username', 'clinic_info',)

    user = UserSerializer(read_only=True)
                      
    class Meta:
        model = Article
        fields = ('id', 'user', 'title', 'content',)

class CommentSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id', 'username',)
    
    class ArticleSerializer(serializers.ModelSerializer):    
        class Meta:
            model = Article
            fields = ('id', 'title', 'content')

    article = ArticleSerializer()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'article', 'user', 'content',)