"""
Configuration des URLs pour le projet backend.

La liste `urlpatterns` associe les URLs aux vues.
Pour plus d'informations, veuillez consulter :
    https://docs.djangoproject.com/en/5.2/topics/http/urls/

Exemples :
Vues basées sur des fonctions :
    1. Ajouter une importation :  from my_app import views
    2. Ajouter une URL dans urlpatterns :  path('', views.home, name='home')
Vues basées sur des classes :
    1. Ajouter une importation :  from other_app.views import Home
    2. Ajouter une URL dans urlpatterns :  path('', Home.as_view(), name='home')
Inclure une autre configuration URL :
    1. Importer la fonction include() : from django.urls import include, path
    2. Ajouter une URL dans urlpatterns :  path('blog/', include('blog.urls'))
"""

from django.contrib import admin  # Importation pour accéder à l'interface d'administration
from django.urls import path, include  # Importation pour définir des routes et inclure d'autres fichiers URL
from myapp.views import home  # Importation de la vue `home` depuis l'application `myapp`

# Liste des chemins d'URL et des vues associées
urlpatterns = [
    path("admin/", admin.site.urls),  # Route pour accéder à l'interface d'administration (/admin/)
    path("api/google/accounts/", include("myapp.urls")),
    # Route pour inclure les URLs définies dans le fichier myapp.urls (fonctionnalité API)

    path("", home, name="home"),  # Route pour la page d'accueil (rien après le domaine, juste "/")
]
