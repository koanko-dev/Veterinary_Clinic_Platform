from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from .models import Clinic, GeneralUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email',)

class ClinicSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('username',)

    user = UserSerializer(read_only=True)

    class Meta:
        model = Clinic
        fields = ('id', 'user', 'clinic_name', 'bio', 'address', 'address_area', 'specialized_field', 'rating',)

class GeneralUserSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('username',)

    user = UserSerializer(read_only=True)
    following_clinics = UserSerializer(read_only=True, many=True)

    class Meta:
        model = GeneralUser
        fields = ('id', 'user', 'pet_name', 'pet_species', 'address_area', 'following_clinics',)
        # m to m 처리 필요
