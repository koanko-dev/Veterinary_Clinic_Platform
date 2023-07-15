from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Review
from accounts.models import Clinic
from .serializers import ReviewSerializer


@api_view(['GET', 'POST'])
def create_review_or_list(request):
    def reviews():
        reviews = Review.objects.all().order_by('-pk')
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


@api_view(['GET'])
def search_reviews(request):
    pet_species = request.GET.get('pet_species')
    clinic_category = request.GET.get('clinic_category')
    clinic_area = request.GET.get('clinic_area')
    ordering = request.GET.get('ordering')

    def filter_pet_species():
        if pet_species:
            return Q(pet_species=pet_species)
        return ~Q(pet_species=pet_species)

    def filter_clinic_category():
        if clinic_category:
            return Q(clinic_category=clinic_category)
        return ~Q(clinic_category=clinic_category)

    def filter_clinic_area():
        if clinic_area:
            return Q(clinic_area=clinic_area)
        return ~Q(clinic_area=clinic_area)

    def order_by_rating_price():
        # 낮은별점순으로 보기
        if ordering == 'rating_ascending':
            return 'rating'
        # 높은별점순으로 보기
        elif ordering == 'rating_descending':
            return '-rating'
        # 낮은가격순으로 보기
        elif ordering == 'price_ascending':
            return 'price'
        # 높은가격순으로 보기
        elif ordering == 'price_descending':
            return '-price'
        # 최신순으로 보기
        return '-pk'

    reviews = Review.objects.filter(
        filter_pet_species(),
        filter_clinic_category(),
        filter_clinic_area()
    ).order_by(
        order_by_rating_price()
    )

    # if not reviews:
    #     reviews = Review.objects.all()

    serializer = ReviewSerializer(reviews, many=True)

    return Response(serializer.data)