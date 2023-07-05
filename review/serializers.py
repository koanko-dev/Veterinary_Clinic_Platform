from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'general_user', 'clinic', 'title', 'pet_species',
                  'clinic_category', 'price', 'content', 'rating',)
