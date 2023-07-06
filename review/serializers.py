from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Review
from accounts.models import Clinic

class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id', 'username',)

class ClinicSerializer(serializers.ModelSerializer):
        class Meta:
            model = Clinic
            fields = ('id', 'clinic_name',)

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    clinic = ClinicSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ('id', 'user', 'clinic', 'title', 'pet_species',
                  'clinic_category', 'price', 'content', 'rating',)
