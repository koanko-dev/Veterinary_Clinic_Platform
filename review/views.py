from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Review
from accounts.models import Clinic
from .serializers import ReviewSerializer


@api_view(['GET', 'POST'])
def create_review_or_list(request):
    def reviews():
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def create_review():
        clinic = get_object_or_404(Clinic, pk=request.data['clinic_id'])
        review_serializer = ReviewSerializer(data=request.data)

        if review_serializer.is_valid(raise_exception=True):
            review_serializer.save(clinic=clinic, user=request.user)
            
            clinic_reviews = Review.objects.filter(clinic=clinic)
            clinic.rating = sum(d.rating for d in clinic_reviews) / len(clinic_reviews)
            clinic.save()
            return Response(review_serializer.data, status=status.HTTP_201_CREATED)


    if request.method == 'GET':
        return reviews()
    
    elif request.method == 'POST':
        return create_review()
    

@api_view(['GET', 'PUT', 'DELETE'])
def detail_update_delete_review(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)

    def review_detail():
        serializer = ReviewSerializer(review)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update_review():
        if review.user == request.user:
            serializer = ReviewSerializer(instance=review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

                clinic = get_object_or_404(Clinic, pk=review.clinic.id)
                clinic_reviews = Review.objects.filter(clinic=clinic)
                clinic.rating = sum(d.rating for d in clinic_reviews) / len(clinic_reviews)
                clinic.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

    def delete_review():
        if review.user == request.user:
            review.delete()

            clinic = get_object_or_404(Clinic, pk=review.clinic.id)
            clinic_reviews = Review.objects.filter(clinic=clinic)
            clinic.rating = sum(d.rating for d in clinic_reviews) / len(clinic_reviews)
            clinic.save()
            return Response(status=status.HTTP_204_NO_CONTENT)


    if request.method == 'GET':
        return review_detail()

    elif request.method == 'PUT':
        return update_review()

    elif request.method == 'DELETE':
        return delete_review()
    

@api_view(['GET'])
def reviews_by_clinic(request, clinic_pk):
    clinic = get_object_or_404(Clinic, pk=clinic_pk)
    reviews = Review.objects.filter(user=clinic.user.pk)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


def filtered_reviews(request):
    pass
