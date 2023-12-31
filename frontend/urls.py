from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    path('auth', views.index),
    path('logout', views.index),
    path('user/<int:id>', views.index),
    path('clinics', views.index),
    path('clinics/<str:name>', views.index),
    path('reviews', views.index),
    path('reviews/<int:rnum>', views.index),
    path('reviews/<int:rnum>/edit', views.index),
    path('reviews/new/<int:cnum>', views.index),
    path('articles', views.index),
    path('articles/<int:anum>', views.index),
    path('articles/<int:anum>/edit', views.index),
    path('articles/new', views.index),
]