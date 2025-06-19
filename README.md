# Redplast - Interface de gestion des protocoles

Projet de fictif pour l'Université de Bordeaux pour accompagner la réduction de l'usage du plastique en laboratoire de recherche.

## Architecture du projet

- **Backend** : Django + Django REST Framework
- **Frontend** : Vue.js 3 + TypeScript + Tailwind CSS + DaisyUI
- **Base de données** : SQLite (développement) et MariaDB en production

## Installation et démarrage

### Backend Django

1. Créer un environnement virtuel Python :
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

2. Installer les dépendances :
```bash
pip install -r requirements.txt
```

3. Effectuer les migrations :
```bash
python manage.py migrate
```

4. Créer un superutilisateur (optionnel) :
```bash
python manage.py createsuperuser
```

5. Démarrer le serveur Django :
```bash
python manage.py runserver
```

Le backend sera accessible sur `http://127.0.0.1:8000/`
L'interface d'administration Django sur `http://127.0.0.1:8000/admin/`

### Frontend Vue.js

1. Aller dans le dossier frontend :
```bash
cd frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur de développement :
```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173/`

## Fonctionnalités

### Backend (API REST)
- Gestion des protocoles (CRUD)
- Catégorisation des protocoles
- Système d'auteurs (utilisateurs Django)
- API de statistiques
- Interface d'administration Django

### Frontend
- Interface moderne et responsive
- Affichage des protocoles en cartes
- Système de badges par catégorie
- Statistiques en temps réel
- Animations et micro-interactions

## API Endpoints

- `GET /api/protocols/` - Liste tous les protocoles
- `POST /api/protocols/` - Crée un nouveau protocole
- `GET /api/protocols/{id}/` - Détails d'un protocole
- `PUT /api/protocols/{id}/` - Met à jour un protocole
- `DELETE /api/protocols/{id}/` - Supprime un protocole
- `GET /api/protocols/by_category/?category=collecte` - Protocoles par catégorie
- `GET /api/protocols/stats/` - Statistiques

## Modèle de données

### Protocol
- `title` : Titre du protocole
- `description` : Description détaillée
- `author` : Auteur (relation vers User)
- `category` : Catégorie (collecte, alternatives, réutilisation, analyse, formation, stérilisation)
- `icon` : Icône emoji
- `created_at` : Date de création
- `updated_at` : Date de modification

## Développement

### Ajouter des protocoles
1. Via l'interface d'administration Django (`/admin/`)
2. Via l'API REST avec des outils comme Postman
3. Via le shell Django : `python manage.py shell`

### Build pour la production
```bash
cd frontend
npm run build
```

Les fichiers statiques seront générés dans `frontend/dist/` et servis par Django.

## Technologies utilisées

- **Backend** : Django 4.2, Django REST Framework, django-cors-headers
- **Frontend** : Vue.js 3, TypeScript, Vite, Tailwind CSS, DaisyUI, Axios
- **Base de données** : SQLite (développement), PostgreSQL (production recommandée)
