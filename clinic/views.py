from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from accounts.models import Clinic
from accounts.serializers import ClinicSerializer

@api_view(['GET'])
def clinics(request):
    clinics = Clinic.objects.all()
    serializer = ClinicSerializer(clinics, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def clinic_detail(request, name):
    clinic = get_object_or_404(Clinic, clinic_name=name)
    serializer = ClinicSerializer(clinic)
    return Response(serializer.data)

@api_view(['GET'])
def search_clinics(request):
    address_area = request.GET.get('address_area')
    specialized_field = request.GET.get('specialized_field')
    specialized_species = request.GET.get('specialized_species')
    ordering = request.GET.get('ordering')

    def filter_address_area():
        if address_area:
            return Q(address_area=address_area)
        return ~Q(address_area=address_area)

    def filter_specialized_field():
        if specialized_field:
            return Q(specialized_field=specialized_field)
        return ~Q(specialized_field=specialized_field)

    def filter_specialized_species():
        if specialized_species:
            return Q(specialized_species=specialized_species)
        return ~Q(specialized_species=specialized_species)
    
    def order_by_rating():
        # 낮은별점순으로 보기
        if ordering == 'rating_ascending':
            return 'rating'
        # 높은별점순으로 보기
        elif ordering == 'rating_descending':
            return '-rating'
        # 최신순으로 보기
        return '-pk'

    clinics = Clinic.objects.filter(
        filter_address_area(),
        filter_specialized_field(),
        filter_specialized_species()
    ).order_by(
        order_by_rating()
    )

    # if not clinics:
    #     clinics = Clinic.objects.all()

    serializer = ClinicSerializer(clinics, many=True)

    return Response(serializer.data)
