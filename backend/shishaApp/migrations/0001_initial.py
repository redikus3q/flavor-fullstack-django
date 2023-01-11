# Generated by Django 4.1 on 2022-12-19 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Flavor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('price', models.IntegerField()),
                ('imageLink', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=300, null=True)),
            ],
        ),
    ]