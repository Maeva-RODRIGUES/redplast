# Image de base officielle Python
FROM python:3

# Variables d'environnement pour Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Crée le dossier de travail
WORKDIR /app

# Installer les dépendances système (libmysqlclient-dev pour mysqlclient)
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev gcc \
    && rm -rf /var/lib/apt/lists/*

# Copier requirements.txt et installer les dépendances Python
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copier tout le projet dans le container
COPY . /app/

# Expose le port (à adapter si besoin)
EXPOSE 8000

ARG SECRET_KEY
ENV SECRET_KEY=$SECRET_KEY

RUN mkdir -p /app/staticfiles

# Commande de démarrage (avec gunicorn en production)
CMD python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 2 --log-level info

