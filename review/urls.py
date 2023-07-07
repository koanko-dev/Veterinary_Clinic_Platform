from django.urls import path
from . import views

urlpatterns = [
    # api/reviews/
    path('', views.create_review_or_list),
    path('<int:review_pk>/', views.detail_update_delete_review),
    path('clinic/<int:clinic_pk>/', views.reviews_by_clinic),

    path('search/', views.search_reviews),
]