import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ['https://www.googleapis.com/auth/business.manage']

def authenticate():
    creds = None
    token_path = 'token.json'  # Chemin pour stocker le token
    credentials_path = '../../credentials.json'  # Chemin vers credentials.json

    # Vérifiez si credentials.json existe
    if not os.path.exists(credentials_path):
        raise FileNotFoundError(f"Le fichier credentials.json est introuvable au chemin : {credentials_path}")

    # Charger le token existant s'il existe
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)

    # Si le token est invalide ou absent, démarrer le processus d'authentification
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
            flow.redirect_uri = 'http://localhost:8001/oauth2callback'
            creds = flow.run_local_server(port=8001, prompt='consent')
        # Sauvegarder le nouveau token
        with open(token_path, 'w') as token:
            token.write(creds.to_json())
    return creds

def list_accounts_and_locations():
    """Lister tous les comptes et leurs emplacements pour trouver account_id et location_id."""
    creds = authenticate()
    try:
        # Utiliser l'API Account Management pour lister les comptes
        account_service = build('mybusinessaccountmanagement', 'v1', credentials=creds)
        accounts = account_service.accounts().list().execute()
        for account in accounts.get('accounts', []):
            account_id = account['name'].split('/')[-1]
            print(f"Account ID: {account_id}, Name: {account.get('accountName', 'No name')}")

            # Utiliser l'API Business Information pour lister les emplacements
            location_service = build('mybusinessbusinessinformation', 'v1', credentials=creds)
            locations = location_service.accounts().locations().list(parent=f'accounts/{account_id}').execute()
            for location in locations.get('locations', []):
                location_id = location['name'].split('/')[-1]
                print(f"  Location ID: {location_id}, Name: {location.get('title', 'No title')}")
    except HttpError as error:
        print(f"Erreur lors de la liste des comptes/emplacements : {error}")

if __name__ == '__main__':
    try:
        creds = authenticate()
        print("Authentification réussie ! Le token est prêt à être utilisé.")
        list_accounts_and_locations()
    except FileNotFoundError as e:
        print(f"Erreur : {e}")
    except Exception as e:
        print(f"Une erreur inattendue s'est produite : {e}")