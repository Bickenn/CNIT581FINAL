# Generated by Django 5.0.4 on 2024-04-22 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('researchweb', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='authUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=15)),
                ('email', models.CharField(max_length=100)),
                ('fname', models.CharField(max_length=50)),
                ('lname', models.CharField(max_length=50)),
            ],
        ),
    ]
