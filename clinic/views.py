from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
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
