from django.urls import path
from . import views

urlpatterns = [
    # api/accounts/
    path('google/login/', views.google_login),
    path('google/callback/', views.google_callback),
    path('google/login/finish/', views.GoogleLogin.as_view()),

    path('kakao/login/', views.kakao_login),
    path('kakao/callback/', views.kakao_callback),
    path('kakao/login/finish/', views.KakaoLogin.as_view()),

    path('<str:username>/', views.profile),
    path('groups/<str:user_pk>/', views.save_info_by_group),
    path('follow/<str:clinic_pk>/', views.follow),
]