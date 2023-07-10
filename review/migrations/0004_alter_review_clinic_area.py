# Generated by Django 4.2.2 on 2023-07-10 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0003_alter_review_clinic_area'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='clinic_area',
            field=models.CharField(choices=[('종로구', '종로구'), ('중구', '중구'), ('용산구', '용산구'), ('성동구', '성동구'), ('광진구', '광진구'), ('동대문구', '동대문구'), ('중랑구', '중랑구'), ('성북구', '성북구'), ('강북구', '강북구'), ('도봉구', '도봉구'), ('노원구', '노원구'), ('은평구', '은평구'), ('서대문구', '서대문구'), ('마포구', '마포구'), ('양천구', '양천구'), ('강서구', '강서구'), ('구로구', '구로구'), ('금천구', '금천구'), ('영등포구', '영등포구'), ('동작구', '동작구'), ('관악구', '관악구'), ('서초구', '서초구'), ('강남구', '강남구'), ('송파구', '송파구'), ('강동구', '강동구')], max_length=4),
        ),
    ]
