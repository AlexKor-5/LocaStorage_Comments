# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_auto_20201030_1826'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='index',
            field=models.BigIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='created',
            field=models.CharField(max_length=50),
        ),
    ]
