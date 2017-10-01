#!/bin/sh

/bin/sh -c "../venv/bin/python manage.py migrate"
/bin/sh -c "../venv/bin/uwsgi uwsgiconfig.ini"

