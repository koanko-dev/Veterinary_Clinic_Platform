from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

class UserManager(BaseUserManager):
    def create_user(self, email, username, password, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=email,
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email=None, username=None, password=None, **extra_fields):
        superuser = self.create_user(
            email=email,
            username=username,
            password=password,
        )
        
        superuser.is_staff = True
        superuser.is_superuser = True
        
        superuser.save(using=self._db)
        return superuser

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30)
    email = models.EmailField(max_length=30, unique=True, null=False, blank=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']



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

class Clinic(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='clinic_info')
    clinic_name = models.CharField(max_length=30)
    bio = models.TextField()
    address = models.CharField(max_length=50)
    address_area = models.CharField(max_length=4, choices=AREA_CHOICES)
    specialized_field = models.CharField(max_length=10, choices=CLINIC_CATEGORY_CHOICES)
    specialized_species = models.CharField(max_length=10, choices=PET_CHOICES)
    rating = models.FloatField(default=0)

class GeneralUser(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='general_user_info')
    pet_name = models.CharField(max_length=30)
    pet_species = models.CharField(max_length=10, choices=PET_CHOICES)
    address_area = models.CharField(max_length=4, choices=AREA_CHOICES)
    following_clinics = models.ManyToManyField(Clinic, related_name='followers')