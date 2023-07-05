from django.urls import path
from . import views

urlpatterns = [
    # api/review/
    path('create_review/', views.create_review),
    path('<int:review_pk>/update_review/', views.update_review),
    path('<int:review_pk>/delete_review/', views.delete_review),

    path('<int:clinic_pk>/', views.reviews_by_clinic),
    path('', views.filtered_reviews),
]