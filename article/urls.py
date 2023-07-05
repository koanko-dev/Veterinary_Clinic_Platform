from django.urls import path
from . import views

urlpatterns = [
    # api/article/
    path('create_article/', views.create_article),
    path('<int:article_pk>/update_article/', views.update_article),
    path('<int:article_pk>/delete_article/', views.delete_article),
    path('<int:article_pk>/', views.article_detail),

    path('clinic/<int:clinic_pk>/', views.articles_by_clinic),
    path('', views.filtered_articles),

    path('<int:article_pk>/create_comment/', views.create_comment),
    path('<int:article_pk>/comments/<int:comment_pk>/delete_comment/', views.delete_comment),
]