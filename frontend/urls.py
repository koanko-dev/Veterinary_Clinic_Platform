from django.urls import path, re_path
from . import views

urlpatterns = [
    # path('', views.index),
    # path('auth/<str:authPath>', views.index),
    re_path(r'.*', views.index),
]