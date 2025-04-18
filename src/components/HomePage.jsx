// Importation des bibliothèques React et React Router DOM
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// `useParams` permet d'accéder aux paramètres de l'URL (ex: businessId dans ce cas).
// `useNavigate` est utilisé pour rediriger l'utilisateur programmatique vers une autre page.

function HomePage() {
  const { businessId } = useParams();
  // On récupère `businessId` depuis les paramètres de l'URL (passé lors de l'appel depuis une route).
  const [rating, setRating] = useState(0);
  // État pour sauvegarder la note donnée par l'utilisateur (entre 1 et 5 étoiles).
  const [comment, setComment] = useState('');
  // État pour stocker les commentaires supplémentaires fournis par l'utilisateur.
  const [answers, setAnswers] = useState({
    accueil: '',  // État - évaluation de l’accueil
    qualite: '',  // État - évaluation de la qualité du service
    rapidite: '', // État - évaluation de la rapidité
  });
  const navigate = useNavigate();
  // Hook pour naviguer et rediriger vers d'autres pages.

  // Gestion de la sélection d'une note (1 à 5 étoiles)
  const handleRating = (star) => {
    setRating(star);
    // Met à jour l'état `rating` avec la valeur cliquée
  };

  // Soumission du formulaire de feedback
  const handleSubmit = (e) => {
    e.preventDefault();  // Empêche le rechargement par défaut de la page après la soumission

    if (rating >= 4) {
      // Si la note est 4 ou 5, on redirige automatiquement l'utilisateur vers Google Reviews.
      const googleReviewUrl = `https://g.page/r/${businessId}/review?text=${encodeURIComponent(comment)}`;
      // Lien spécifique pour Google Reviews incluant un commentaire pré-rempli.
      window.location.href = googleReviewUrl; // Redirection vers le lien Google.
    } else if (rating > 0) {
      // Si la note est entre 1 à 3, redirection vers le formulaire `FeedbackForm`.
      navigate('/feedback', { state: { rating, comment, answers } });
      // On transmet l'état (rating, commentaire et réponses aux questions) à la nouvelle route.
    }
    // Pas d'action si l'utilisateur n'a pas sélectionné de note (rating = 0).
  };

  // Gestion de la redirection vers la zone admin
  const handleAdminAccess = () => {
    navigate('/admin'); // Navigue vers la route dédiée à l'administration
  };

  // Gestion de la redirection vers `Kingdom Ads`
  const handleKingdomAdsAccess = () => {
    navigate('/kingdomads'); // Navigue vers la page dédiée à `Kingdom Ads`
  };

  return (
    <div className="min-h-screen bg-google-gray flex items-center justify-center p-6">
      {/* Section principale avec un fond gris, centrée à l'écran */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Conteneur du formulaire avec une bordure arrondie, centré horizontalement */}
        <h1 className="text-3xl font-bold text-google-dark-gray mb-6 text-center">
          Évaluez Notre Service
        </h1>

        {/* Évaluation sous forme d'étoiles */}
        <div className="flex justify-center mb-6">
          {/* Création dynamique des étoiles (entre 1 et 5) */}
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star} // Clé unique pour chaque étoile
              onClick={() => handleRating(star)} // Mise à jour de la note sélectionnée
              className={`text-4xl mx-1 ${
                star <= rating ? 'text-google-yellow' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Bloc des questions */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-google-dark-gray mb-2">
              Comment trouvez-vous l'accueil ?
            </label>
            <input
              type="text"
              value={answers.accueil} // Valeur liée à l'état "accueil"
              onChange={(e) => setAnswers({ ...answers, accueil: e.target.value })}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-blue"
              placeholder="Votre réponse..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-google-dark-gray mb-2">
              Quelle est votre opinion sur la qualité du service ?
            </label>
            <input
              type="text"
              value={answers.qualite} // État pour la qualité
              onChange={(e) => setAnswers({ ...answers, qualite: e.target.value })}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-blue"
              placeholder="Votre réponse..."
            />
          </div>
          <div className="mb-6">
            <label className="block text-google-dark-gray mb-2">
              La rapidité du service vous convient-elle ?
            </label>
            <input
              type="text"
              value={answers.rapidite} // État pour la rapidité
              onChange={(e) => setAnswers({ ...answers, rapidite: e.target.value })}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-blue"
              placeholder="Votre réponse..."
            />
          </div>

          {/* Champ pour les commentaires */}
          <div className="mb-6">
            <label className="block text-google-dark-gray mb-2">
              Commentaires supplémentaires
            </label>
            <textarea
              value={comment} // État pour les commentaires supplémentaires
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-blue"
              placeholder="Ajoutez vos commentaires ici..."
            />
          </div>

          {/* Boutons de soumission et accès secondaires */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-google-blue text-white p-2 rounded hover:bg-google-dark-blue"
            >
              Soumettre
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleAdminAccess} // Redirection vers la page admin
                className="text-google-dark-gray hover:text-google-blue underline"
              >
                Accès Admin
              </button>
              <button
                type="button"
                onClick={handleKingdomAdsAccess} // Redirection vers la page Kingdom Ads
                className="text-google-dark-gray hover:text-google-blue underline"
              >
                Accès Kingdom Ads
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomePage;