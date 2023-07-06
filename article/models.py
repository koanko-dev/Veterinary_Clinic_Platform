from django.db import models

from django.conf import settings

class Article(models.Model):
    PET_CHOICES = [
        ('고양이', '고양이'),
        ('강아지', '강아지'),
        ('새', '새'),
        ('그 외 종류', '그 외 종류'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()
    category = models.CharField(max_length=10, choices=PET_CHOICES)

class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=200)