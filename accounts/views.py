from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import UserSerializers

@api_view(['GET'])
def profile(request, username):
    user = get_object_or_404(get_user_model(), username=username)

    return Response(UserSerializers(user).data)

