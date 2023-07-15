from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ArticleSerializer, CommentSerializer
from article.models import Article, Comment
from accounts.models import Clinic

@api_view(['GET', 'PUT', 'DELETE'])
def detail_update_delete_article(request, article_pk):
    
    def article_detail():
        article = get_object_or_404(Article, pk=article_pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update_article():
        article = get_object_or_404(Article, pk=article_pk)

        if article.user == request.user:
            serializer = ArticleSerializer(instance=article, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

    def delete_article():
        article = get_object_or_404(Article, pk=article_pk)

        if article.user == request.user:
            article.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


    if request.method == 'GET':
        return article_detail()

    elif request.method == 'PUT':
        return update_article()

    elif request.method == 'DELETE':
        return delete_article()
        

@api_view(['GET', 'POST'])
def create_article_or_list(request):

    def articles():
        articles = Article.objects.all().order_by('-pk')
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def create_article():
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    
    if request.method == 'GET':
        return articles()
    
    elif request.method == 'POST':
        return create_article()


@api_view(['GET'])
def articles_by_clinic(request, clinic_pk):
    clinic = get_object_or_404(Clinic, pk=clinic_pk)
    articles = Article.objects.filter(user=clinic.user.pk)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_articles(request):
    category = request.GET.get('category')
    ordering = request.GET.get('ordering')

    def filter_category():
        if category:
            return Q(category=category)
        return ~Q(category=category)
    
    def order_by_created_at():
        # 과거순으로 보기
        if ordering == 'created_at_ascending':
            return 'created_at'
        # 최신순으로 보기
        return '-pk'

    articles = Article.objects.filter(
        filter_category(),
    ).order_by(
        order_by_created_at()
    )

    # if not articles:
    #     articles = Article.objects.all()

    serializer = ArticleSerializer(articles, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def create_comment(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article, user=request.user)
        comments = article.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def delete_comment(request, article_pk, comment_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)

    if comment.user == request.user:
        comment.delete()
        comments = article.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
