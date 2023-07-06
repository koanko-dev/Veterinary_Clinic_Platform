from django.urls import path
from . import views

urlpatterns = [
    # api/clinics/
    path('', views.clinics),
]