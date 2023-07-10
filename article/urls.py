from django.urls import path
from . import views

urlpatterns = [
    # api/articles/
    path('', views.create_article_or_list),
    path('search/', views.search_articles),
    path('<int:article_pk>/', views.detail_update_delete_article),
    path('clinic/<int:clinic_pk>/', views.articles_by_clinic),

    path('<int:article_pk>/comments/', views.create_comment),
    path('<int:article_pk>/comments/<int:comment_pk>/', views.delete_comment),
]