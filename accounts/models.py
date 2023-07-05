from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

PET_CHOICES = [
    ('고양이', '고양이'),
    ('강아지', '강아지'),
    ('새', '새'),
    ('그 외 종류', '그 외 종류'),
]

AREA_CHOICES = [
        ('종로구', '종로구'),
        ('중구', '중구'),
        ('용산구', '용산구'),
        ('성동구', '성동구'),
        ('광진구', '광진구'),
        ('동대문구', '동대문구'),
        ('중랑구', '중랑구'),
        ('성북구', '성북구'),
        ('강북구', '강북구'),
        ('도봉구', '도봉구'),
        ('노원구', '노원구'),
        ('은평구', '은평구'),
        ('서대문구', '서대문구'),
        ('마포구', '마포구'),
        ('양천구', '양천구'),
        ('강서구', '강서구'),
        ('구로구', '구로구'),
        ('금천구', '금천구'),
        ('영등포구', '영등포구'),
        ('동작구', '동작구'),
        ('관악구', '관악구'),
        ('서초구', '서초구'),
        ('강남구', '강남구'),
        ('송파구', '송파구'),
        ('강동구', '강동구'),
    ]

class User(AbstractUser):
    pass

class Clinic(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    clinic_name = models.CharField(max_length=30)
    bio = models.TextField()
    address = models.CharField(max_length=50)
    address_area = models.CharField(max_length=4, choices=AREA_CHOICES)
    specialized_field = models.CharField(max_length=10, choices=PET_CHOICES)

class GeneralUser(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    pet_name = models.CharField(max_length=30)
    pet_species = models.CharField(max_length=10, choices=PET_CHOICES)
    address_area = models.CharField(max_length=4, choices=AREA_CHOICES)
    following_clinics = models.ManyToManyField(Clinic, related_name='followers')