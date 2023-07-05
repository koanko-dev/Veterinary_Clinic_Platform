from django.db import models

from accounts.models import GeneralUser, Clinic

class Review(models.Model):
    PET_CHOICES = [
        ('고양이', '고양이'),
        ('강아지', '강아지'),
        ('새', '새'),
        ('etc', '그 외 종류'),
    ]

    CLINIC_CATEGORY_CHOICES = [
        ('소화기 질환', '소화기 질환'),
        ('호흡기 질환', '호흡기 질환'),
        ('순환기 질환', '순환기 질환'),
        ('신장/비뇨기 질환', '신장/비뇨기 질환'),
        ('피부 질환', '피부 질환'),
        ('신경 질환', '신경 질환'),
        ('이비인후과 질환', '이비인후과 질환'),
        ('기타 질환', '기타 질환'),
        ('비교기외과 수술', '비교기외과 수술'),
        ('종양외과 수술', '종양외과 수술'),
        ('정형외과 수술', '정형외과 수술'),
        ('소화기외과 수술', '소화기외과 수술'),
        ('산과 수술', '산과 수술'),
        ('중성화 수술', '중성화 수술'),
        ('기타 수술', '기타 수술'),
    ]

    general_user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    pet_species = models.CharField(max_length=10, choices=PET_CHOICES)
    clinic_category = models.CharField(max_length=10, choices=CLINIC_CATEGORY_CHOICES)
    price = models.IntegerField()
    content = models.TextField()
    rating = models.IntegerField()
