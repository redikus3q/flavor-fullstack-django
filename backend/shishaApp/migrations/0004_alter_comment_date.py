# Generated by Django 4.1 on 2022-12-19 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shishaApp', '0003_alter_comment_text_alter_flavor_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]