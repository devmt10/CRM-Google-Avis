from django.db import models

class Avis(models.Model):
    user_name = models.CharField(max_length=100)  # Nom de l'utilisateur
    rating = models.IntegerField()  # Note de l'avis
    comment = models.TextField()  # Commentaire de l'avis
    date = models.DateTimeField(auto_now_add=True)  # Date de l'avis
    response = models.TextField(blank=True, null=True)  # Réponse de l'administrateur
    responded = models.BooleanField(default=False)  # Indicateur si l'avis a été répondu

    def __str__(self):
        return f"Avis de {self.user_name} - {self.rating} étoiles"