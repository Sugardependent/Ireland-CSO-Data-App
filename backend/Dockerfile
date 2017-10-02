FROM python:3
ENV PYTHONUNBUFFERED 1
COPY requirements.txt ./code/requirements.txt
WORKDIR /code
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
WORKDIR ./django_app/
RUN chmod +x wait-for-it.sh
