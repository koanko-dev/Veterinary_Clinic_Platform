from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import UserSerializer, ClinicSerializer, GeneralUserSerializer

@api_view(['GET'])
def profile(request, username):
    # myuser2.groups.all()[0].id
    # myuser2.groups.all()[0].name
    # User.objects.filter(groups=1)
    # if request.user.groups.filter(name='Clinic Members').exsists()
    user = get_object_or_404(get_user_model(), username=username)

    return Response(UserSerializer(user).data)

@api_view(['POST'])
def save_info_by_group(request, username):
    user = get_object_or_404(get_user_model(), username=username)

    if user.groups.all():
        serializer = ClinicSerializer(data=request.data)
    else:
        serializer = GeneralUserSerializer(data=request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=user)
        return Response(serializer.data)
    
    