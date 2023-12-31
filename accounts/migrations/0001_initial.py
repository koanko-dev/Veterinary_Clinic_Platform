# Generated by Django 4.2.2 on 2023-07-10 04:05

import accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=30, unique=True)),
                ('img', models.ImageField(blank=True, null=True, upload_to=accounts.models.user_img_upload_to)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Clinic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clinic_name', models.CharField(max_length=30)),
                ('bio', models.TextField()),
                ('img', models.ImageField(blank=True, null=True, upload_to=accounts.models.clinic_main_img_upload_to)),
                ('address', models.CharField(max_length=50)),
                ('address_area', models.CharField(choices=[('종로구', '종로구'), ('중구', '중구'), ('용산구', '용산구'), ('성동구', '성동구'), ('광진구', '광진구'), ('동대문구', '동대문구'), ('중랑구', '중랑구'), ('성북구', '성북구'), ('강북구', '강북구'), ('도봉구', '도봉구'), ('노원구', '노원구'), ('은평구', '은평구'), ('서대문구', '서대문구'), ('마포구', '마포구'), ('양천구', '양천구'), ('강서구', '강서구'), ('구로구', '구로구'), ('금천구', '금천구'), ('영등포구', '영등포구'), ('동작구', '동작구'), ('관악구', '관악구'), ('서초구', '서초구'), ('강남구', '강남구'), ('송파구', '송파구'), ('강동구', '강동구')], max_length=4)),
                ('specialized_field', models.CharField(choices=[('소화기 질환', '소화기 질환'), ('호흡기 질환', '호흡기 질환'), ('순환기 질환', '순환기 질환'), ('신장/비뇨기 질환', '신장/비뇨기 질환'), ('피부 질환', '피부 질환'), ('신경 질환', '신경 질환'), ('이비인후과 질환', '이비인후과 질환'), ('기타 질환', '기타 질환'), ('비교기외과 수술', '비교기외과 수술'), ('종양외과 수술', '종양외과 수술'), ('정형외과 수술', '정형외과 수술'), ('소화기외과 수술', '소화기외과 수술'), ('산과 수술', '산과 수술'), ('중성화 수술', '중성화 수술'), ('기타 수술', '기타 수술')], max_length=10)),
                ('specialized_species', models.CharField(choices=[('고양이', '고양이'), ('강아지', '강아지'), ('새', '새'), ('그 외 종류', '그 외 종류')], max_length=10)),
                ('rating', models.FloatField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clinic_info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GeneralUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pet_name', models.CharField(max_length=30)),
                ('pet_species', models.CharField(choices=[('고양이', '고양이'), ('강아지', '강아지'), ('새', '새'), ('그 외 종류', '그 외 종류')], max_length=10)),
                ('address_area', models.CharField(choices=[('종로구', '종로구'), ('중구', '중구'), ('용산구', '용산구'), ('성동구', '성동구'), ('광진구', '광진구'), ('동대문구', '동대문구'), ('중랑구', '중랑구'), ('성북구', '성북구'), ('강북구', '강북구'), ('도봉구', '도봉구'), ('노원구', '노원구'), ('은평구', '은평구'), ('서대문구', '서대문구'), ('마포구', '마포구'), ('양천구', '양천구'), ('강서구', '강서구'), ('구로구', '구로구'), ('금천구', '금천구'), ('영등포구', '영등포구'), ('동작구', '동작구'), ('관악구', '관악구'), ('서초구', '서초구'), ('강남구', '강남구'), ('송파구', '송파구'), ('강동구', '강동구')], max_length=4)),
                ('following_clinics', models.ManyToManyField(related_name='followers', to='accounts.clinic')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='general_user_info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
