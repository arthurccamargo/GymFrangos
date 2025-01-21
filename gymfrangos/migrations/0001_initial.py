# Generated by Django 5.1.5 on 2025-01-21 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(default='', max_length=150)),
                ('user_email', models.EmailField(default='', max_length=254)),
            ],
        ),
    ]
