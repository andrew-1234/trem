# Generated by Django 5.0.7 on 2024-08-29 04:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trem_app', '0008_rename_thread_note_parent_note_is_reply'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='parent',
            new_name='thread',
        ),
        migrations.RemoveField(
            model_name='note',
            name='is_reply',
        ),
    ]
