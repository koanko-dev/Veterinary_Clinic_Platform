from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ArticleSerializer, CommentSerializer
from article.models import Article, Comment
from accounts.models import Clinic


@api_view(['POST'])
def create_article(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(['PUT'])
def update_article(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)

    if article.user == request.user:
        serializer = ArticleSerializer(instance=article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_article(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)

    if article.user == request.user:
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def article_detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = ArticleSerializer(article)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def articles_by_clinic(request, clinic_pk):
    clinic = get_object_or_404(Clinic, pk=clinic_pk)
    articles = Article.objects.filter(user=clinic.user.pk)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


def filtered_articles(request):
    pass


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
