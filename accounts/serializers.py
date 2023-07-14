from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Clinic, GeneralUser
from review.serializers import ReviewSerializer



class UserSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(required=False)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'img',)



class ClinicSerializer(serializers.ModelSerializer):
    class GeneralUserSerializer(serializers.ModelSerializer):
        user = UserSerializer(read_only=True)
        class Meta:
            model = GeneralUser
            fields = ('id', 'user', 'pet_name', 'pet_species', 'address_area',)

    user = UserSerializer(read_only=True)
    reviews = ReviewSerializer(read_only=True, many=True)
    followers = GeneralUserSerializer(read_only=True, many=True)

    img = serializers.ImageField(required=False)

    class Meta:
        model = Clinic
        fields = ('id', 'user', 'clinic_name', 'bio', 'img', 'address', 'address_area', 'specialized_field', 'specialized_species', 'rating', 'followers', 'reviews', )


class GeneralUserSerializer(serializers.ModelSerializer):
    class ClinicSerializer(serializers.ModelSerializer):
        user = UserSerializer(read_only=True)
        class Meta:
            model = Clinic
            fields = ('id', 'user', 'clinic_name', 'bio', 'address', 'address_area', 'specialized_field', 'specialized_species', 'rating',)

    user = UserSerializer(read_only=True)
    following_clinics = ClinicSerializer(read_only=True, many=True)

    class Meta:
        model = GeneralUser
        fields = ('id', 'user', 'pet_name', 'pet_species', 'address_area', 'following_clinics',)
