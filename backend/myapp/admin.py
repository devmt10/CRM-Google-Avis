from django.contrib import admin
from .models import Avis

class AvisAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'rating', 'date', 'responded')  # Affiche la réponse et l'état
    search_fields = ('user_name', 'comment')  # Permet de rechercher les avis par utilisateur ou commentaire
    list_filter = ('responded',)  # Filtre les avis en fonction de l'état de la réponse

    # Ajout d'un champ de texte pour que l'administrateur puisse répondre
    def save_model(self, request, obj, form, change):
        if obj.response and not obj.responded:  # Si une réponse est ajoutée et n'a pas encore été marquée comme répondue
            obj.responded = True  # Marquer l'avis comme répondu
        super().save_model(request, obj, form, change)  # Enregistre l'avis avec la réponse

admin.site.register(Avis, AvisAdmin)