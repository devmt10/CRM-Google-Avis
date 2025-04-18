from pathlib import Path
import os
from dotenv import load_dotenv  # Pour charger les variables d'environnement stockées dans un fichier `.env`
from decouple import config  # Pour accéder aux variables d'environnement de manière sécurisée

# Charger les variables d'environnement
load_dotenv()

# Définir le chemin de base du projet (chemin absolu jusqu'au dossier parent du fichier actuel)
BASE_DIR = Path(__file__).resolve().parent.parent

# Paramètres rapides pour la configuration du projet - ne convient pas pour un environnement de production
# Voir : https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# 🚨 AVERTISSEMENT : Gardez la clé secrète pour la production (ne l'exposez pas dans le code source)
SECRET_KEY = config("SECRET_KEY",
                    default="django-insecure-default-key")  # Assurez-vous de mettre une clé sécurisée dans `.env`

# 🚨 AVERTISSEMENT : "DEBUG=True" ne doit jamais être activé en production car cela révèle des informations sensibles
DEBUG = config("DEBUG", default=False, cast=bool)

# Liste des hôtes autorisés à accéder à votre application (utile pour la production)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="127.0.0.1,localhost").split(",")

# Définition des applications installées et disponibles dans votre projet
INSTALLED_APPS = [
    "django.contrib.admin",  # Interface admin de Django
    "django.contrib.auth",  # Module d'authentification intégrée
    "django.contrib.contenttypes",  # Gestion des types de contenu
    "corsheaders",  # Middleware pour autoriser CORS (Cross-Origin Resource Sharing)
    "django.contrib.sessions",  # Gestion des sessions de l'utilisateur
    "django.contrib.messages",  # Gestion des messages flash
    "django.contrib.staticfiles",  # Gestion des fichiers statiques
    "rest_framework",  # Framework RESTful pour créer des API
]

# Middleware (chaîne spéciale de traitements exécutés pour chaque requête HTTP)
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # Middleware pour gérer les requêtes CORS
    "django.middleware.security.SecurityMiddleware",  # Amélioration de la sécurité HTTP
    "django.contrib.sessions.middleware.SessionMiddleware",  # Gère les sessions côté serveur
    "django.middleware.common.CommonMiddleware",  # Middleware pour les requêtes communes
    "django.middleware.csrf.CsrfViewMiddleware",  # Protection contre les attaques CSRF
    "django.contrib.auth.middleware.AuthenticationMiddleware",  # Gère l'authentification de l'utilisateur
    "django.contrib.messages.middleware.MessageMiddleware",  # Pour gérer les messages flash
    "django.middleware.clickjacking.XFrameOptionsMiddleware",  # Protection contre le clickjacking
]

# Déclaration des fichiers URL en lien avec le routage de Django
ROOT_URLCONF = "backend.urls"

# Configurations des moteurs de templates
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",  # Utilisation du moteur de templates Django
        "DIRS": [],  # Liste des répertoires où Django doit chercher les fichiers de template
        "APP_DIRS": True,  # Active la recherche automatique des templates dans les dossiers d'applications
        "OPTIONS": {  # Options pour personnaliser les templates
            "context_processors": [  # Liste des processeurs de contexte activés
                "django.template.context_processors.request",  # Ajoute l'objet request dans les templates
                "django.contrib.auth.context_processors.auth",  # Ajoute des variables d'authentification
                "django.contrib.messages.context_processors.messages",  # Ajoute les messages dans les templates
            ],
        },
    },
]

# Nom de l'application WSGI (utilisé pour le déploiement)
WSGI_APPLICATION = "backend.wsgi.application"

# Configuration de la base de données (PostgreSQL dans ce cas)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # Utilisation de PostgreSQL comme moteur de base de données
        'NAME': 'obtenir_avis',  # Nom de la base de données
        'USER': '',  # Nom d'utilisateur PostgreSQL - doit être configuré
        'PASSWORD': '',  # Mot de passe PostgreSQL - doit être configuré
        'HOST': 'localhost',  # Hôte de la base de données (localhost pour local)
        'PORT': '5432',  # Port par défaut utilisé par PostgreSQL
    }
}

# Configuration de la validation des mots de passe pour renforcer la sécurité
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
        # Empêche d'utiliser un mot de passe trop similaire au nom d'utilisateur et aux informations personnelles
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        # Exige une longueur minimale du mot de passe
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
        # Empêche l'utilisation de mots de passe trop communs
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
        # Empêche les mots de passe entièrement numériques
    },
]

# Internationalisation (traductions et gestion des fuseaux horaires)
LANGUAGE_CODE = "fr-fr"  # Langue par défaut (français de France)
TIME_ZONE = "UTC"  # Fuseau horaire par défaut
USE_I18N = True  # Active la gestion des traductions
USE_TZ = True  # Active la gestion du fuseau horaire

# Configuration des fichiers statiques
STATIC_URL = "/static/"  # URL pour accéder aux fichiers statiques
STATIC_ROOT = BASE_DIR / "staticfiles"  # Répertoire où les fichiers statiques seront collectés
MEDIA_URL = "/media/"  # URL pour accéder aux fichiers médias
MEDIA_ROOT = BASE_DIR / "media"  # Répertoire où les fichiers médias seront stockés

# Type de clé principale par défaut pour les modèles (utilisation de BigAutoField)
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Configuration de CORS (Cross-Origin Resource Sharing)
CORS_ALLOW_ALL_ORIGINS = DEBUG  # Permet toutes les origines si "DEBUG=True" (utile uniquement en développement)
if not DEBUG:
    # Pour un environnement de production, seules les origines indiquées dans la variable d'environnement sont autorisées
    CORS_ALLOWED_ORIGINS = config("CORS_ALLOWED_ORIGINS", default="http://localhost:3000").split(",")
