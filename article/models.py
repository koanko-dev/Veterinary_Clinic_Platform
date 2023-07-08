from django.db import models

from django.conf import settings

def article_img_upload_to(instance, filename):
    return 'article_imgs/{filename}'.format(filename=filename)

class Article(models.Model):
    PET_CHOICES = [
        ('고양이', '고양이'),
        ('강아지', '강아지'),
        ('새', '새'),
        ('그 외 종류', '그 외 종류'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    img = models.ImageField(upload_to=article_img_upload_to, blank=True, null=True)
    content = models.TextField()
    category = models.CharField(max_length=10, choices=PET_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)