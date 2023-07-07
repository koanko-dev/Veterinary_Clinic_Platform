from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import UserSerializer, ClinicSerializer, GeneralUserSerializer

import os
from dotenv import load_dotenv

load_dotenv()

state = os.getenv("STATE")
BASE_URL = 'http://localhost:8000/'
GOOGLE_CALLBACK_URI = BASE_URL + 'api/accounts/google/callback/'

def google_login(request):
    scope = "https://www.googleapis.com/auth/userinfo.email"
    client_id = os.getenv("SOCIAL_AUTH_GOOGLE_CLIENT_ID")
    return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&response_type=code&redirect_uri={GOOGLE_CALLBACK_URI}&scope={scope}")

from json import JSONDecodeError
from django.http import JsonResponse
import requests
import os
from rest_framework import status
from .models import *
from allauth.socialaccount.models import SocialAccount

def google_callback(request):
    client_id = os.getenv("SOCIAL_AUTH_GOOGLE_CLIENT_ID")
    client_secret = os.getenv("SOCIAL_AUTH_GOOGLE_SECRET")
    code = request.GET.get('code')

    # 1. 받은 코드로 구글에 access token 요청
    token_req = requests.post(f"https://oauth2.googleapis.com/token?client_id={client_id}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={GOOGLE_CALLBACK_URI}&state={state}")
    
    ### 1-1. json으로 변환 & 에러 부분 파싱
    token_req_json = token_req.json()
    error = token_req_json.get("error")

    ### 1-2. 에러 발생 시 종료
    if error is not None:
        raise JSONDecodeError(error)

    ### 1-3. 성공 시 access_token 가져오기
    access_token = token_req_json.get('access_token')

    #################################################################

    # 2. 가져온 access_token으로 이메일값을 구글에 요청
    email_req = requests.get(f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}")
    email_req_status = email_req.status_code

    ### 2-1. 에러 발생 시 400 에러 반환
    if email_req_status != 200:
        return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
    
    ### 2-2. 성공 시 이메일 가져오기
    email_req_json = email_req.json()
    email = email_req_json.get('email')

    #################################################################

    # 3. 전달받은 이메일, access_token, code를 바탕으로 회원가입/로그인
    try:
        # 전달받은 이메일로 등록된 유저가 있는지 탐색
        user = User.objects.get(email=email)

        # FK로 연결되어 있는 socialaccount 테이블에서 해당 이메일의 유저가 있는지 확인
        social_user = SocialAccount.objects.get(user=user)

        # 있는데 구글계정이 아니어도 에러
        if social_user.provider != 'google':
            return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)

        # 이미 Google로 제대로 가입된 유저 => 로그인 & 해당 유저의 key 발급
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(f"{BASE_URL}api/accounts/google/login/finish/", data=data)
        accept_status = accept.status_code

        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)

        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)

    except User.DoesNotExist:
        # 전달받은 이메일로 기존에 가입된 유저가 아예 없으면 => 새로 회원가입 & 해당 유저의 key 발급
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(f"{BASE_URL}api/accounts/google/login/finish/", data=data)
        accept_status = accept.status_code

        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)

        accept_json = accept.json()
        accept_json.pop('user', None)
        user = User.objects.get(email=email)
        user.username = email.split('@')[0]
        user.save()
        return JsonResponse(accept_json)
        
	# except SocialAccount.DoesNotExist:
    # 	# User는 있는데 SocialAccount가 없을 때 (=일반회원으로 가입된 이메일일때)
    #     return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)

from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.google import views as google_view

class GoogleLogin(SocialLoginView):
    adapter_class = google_view.GoogleOAuth2Adapter
    callback_url = GOOGLE_CALLBACK_URI
    client_class = OAuth2Client
    
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
    
