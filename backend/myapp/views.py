from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .auth import list_accounts_and_locations
from django.http import HttpResponse


class GoogleAccountsView(APIView):
    permission_classes = [IsAuthenticated]  # Facultatif, selon vos besoins

    def get(self, request):
        try:
            data = list_accounts_and_locations()  # Appelle la fonction pour récupérer les données
            return Response(data, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenue sur la page d'accueil !")

def google_auth_callback(request):
    return HttpResponse("Callback OAuth2 reçu avec succès !")