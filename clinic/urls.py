from django.urls import path
from . import views

urlpatterns = [
    # api/clinics/
    path('', views.clinics),
    path('search/', views.search_clinics),
    path('<str:name>/', views.clinic_detail),
]