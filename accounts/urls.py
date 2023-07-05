from django.urls import path
from . import views

urlpatterns = [
    # api/accounts/u/
    path('<str:username>/', views.profile),
    path('<str:username>/save_info/', views.save_info_by_group),
]