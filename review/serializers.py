from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Review
from accounts.models import Clinic

class UserSerializer(serializers.ModelSerializer):
        img = serializers.ImageField(required=False)
        class Meta:
            model = get_user_model()
            fields = ('id', 'username', 'img')

class ClinicSerializer(serializers.ModelSerializer):
        class Meta:
            model = Clinic
            fields = ('id', 'clinic_name',)

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    clinic = ClinicSerializer(read_only=True)

    img = serializers.ImageField(required=False)

    class Meta:
        model = Review
        fields = ('id', 'user', 'clinic', 'clinic_area', 'title', 'img', 'pet_species',
                  'clinic_category', 'price', 'content', 'rating', 'created_at', 'updated_at',)
