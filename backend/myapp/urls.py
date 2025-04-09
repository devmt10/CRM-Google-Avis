from django.urls import path
from . import views

urlpatterns = [
    path("oauth2callback", views.google_auth_callback, name="google_auth_callback"),  # Route pour le callback OAuth2
]