#!/bin/bash
export DJANGO_SETTINGS_MODULE=trem.settings_dev
python3 ./manage.py makemigrations
python3 ./manage.py migrate
python3 ./manage.py runserver 8000
