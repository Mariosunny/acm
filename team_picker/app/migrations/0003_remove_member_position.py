# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-30 19:53
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20170930_1835'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='member',
            name='position',
        ),
    ]
