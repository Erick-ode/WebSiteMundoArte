# Generated by Django 4.1.7 on 2023-03-26 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artworld', '0009_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(upload_to='products/'),
        ),
    ]
