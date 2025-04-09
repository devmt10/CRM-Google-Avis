# auth.py
import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ['https://www.googleapis.com/auth/business.manage']

def authenticate():
    creds = None
    token_path = 'credentials.json'
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            flow.redirect_uri = 'http://localhost:8001/oauth2callback'
            creds = flow.run_local_server(port=8001, prompt='consent')
        with open(token_path, 'w') as token:
            token.write(creds.to_json())
    return creds

def list_accounts_and_locations():
    """List all accounts and their locations to find account_id and location_id."""
    creds = authenticate()
    try:
        # Use Account Management API to list accounts
        account_service = build('mybusinessaccountmanagement', 'v1', credentials=creds)
        accounts = account_service.accounts().list().execute()
        for account in accounts.get('accounts', []):
            account_id = account['name'].split('/')[-1]
            print(f"Account ID: {account_id}, Name: {account.get('accountName', 'No name')}")

            # Use Business Information API to list locations
            location_service = build('mybusinessbusinessinformation', 'v1', credentials=creds)
            locations = location_service.accounts().locations().list(parent=f'accounts/{account_id}').execute()
            for location in locations.get('locations', []):
                location_id = location['name'].split('/')[-1]
                print(f"  Location ID: {location_id}, Name: {location.get('title', 'No title')}")
    except HttpError as error:
        print(f"Error listing accounts/locations: {error}")

if __name__ == '__main__':
    creds = authenticate()
    print("Authentification réussie ! Le token est prêt à être utilisé.")
    list_accounts_and_locations()