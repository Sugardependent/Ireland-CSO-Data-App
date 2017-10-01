FROM ubuntu:16.04

#install packages
RUN apt-get update
RUN apt-get -y install nginx python3 python3-pip python3-venv postgresql postgresql-contrib nano wget curl python-software-properties nginx

#install node
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get -y install nodejs

#Get code
WORKDIR /home/
COPY . /home/
RUN cat /etc/hosts
RUN chmod +x wait-for-it.sh
RUN chmod +x run_app.sh

#setup python
WORKDIR /home/backend
#RUN ls -al
RUN pyvenv venv
RUN venv/bin/pip install --upgrade pip
RUN venv/bin/pip install -r requirements.txt
WORKDIR /home/backend/django_app
#RUN /bin/sh -c "../venv/bin/python manage.py migrate"
#RUN /bin/sh -c "../venv/bin/uwsgi uwsgiconfig.ini &"


RUN cp /home/nginx/nginx.conf /etc/nginx/sites-available/default
#RUN /bin/sh -c "systemctl start nginx"
#RUN /bin/sh -c "nginx -s reload"


