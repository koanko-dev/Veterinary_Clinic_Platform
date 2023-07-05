from django.db import models

from accounts.models import Clinic, GeneralUser

class Article(models.Model):
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()

class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    general_user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)