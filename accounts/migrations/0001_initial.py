# Generated by Django 4.2.2 on 2023-07-05 06:02

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


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
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Clinic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clinic_name', models.CharField(max_length=30)),
                ('bio', models.TextField()),
                ('address', models.CharField(max_length=50)),
                ('address_area', models.CharField(choices=[('종로구', '종로구'), ('중구', '중구'), ('용산구', '용산구'), ('성동구', '성동구'), ('광진구', '광진구'), ('동대문구', '동대문구'), ('중랑구', '중랑구'), ('성북구', '성북구'), ('강북구', '강북구'), ('도봉구', '도봉구'), ('노원구', '노원구'), ('은평구', '은평구'), ('서대문구', '서대문구'), ('마포구', '마포구'), ('양천구', '양천구'), ('강서구', '강서구'), ('구로구', '구로구'), ('금천구', '금천구'), ('영등포구', '영등포구'), ('동작구', '동작구'), ('관악구', '관악구'), ('서초구', '서초구'), ('강남구', '강남구'), ('송파구', '송파구'), ('강동구', '강동구')], max_length=4)),
                ('specialized_field', models.CharField(choices=[('고양이', '고양이'), ('강아지', '강아지'), ('새', '새'), ('그 외 종류', '그 외 종류')], max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
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
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
