import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Importation des hooks React `useState` (pour gérer l'état) et React Router DOM `useLocation` (pour accéder à l'état transmis via la navigation) et `useNavigate` (pour rediriger l'utilisateur).

// Composant réutilisable pour un champ d'entrée de type texte
const InputField = ({ label, value, onChange, placeholder, required }) => (
  <div className="mb-6">
    {/* Label pour décrire le champ */}
    <label className="block text-google-dark-gray mb-2 font-semibold">{label}</label>
    {/* Champ d'entrée pour collecter des données texte */}
    <input
      type="text"
      value={value} // Lien avec l'état du parent
      onChange={onChange} // Gestionnaire d'événements pour mettre à jour l'état
      className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-red"
      placeholder={placeholder} // Texte indicatif dans le champ
      required={required} // Ajoute une validation si nécessaire
    />
  </div>
);

// Composant réutilisable pour un champ de sélection (dropdown)
const SelectField = ({ label, value, onChange, options, required }) => (
  <div className="mb-6">
    {/* Label pour décrire la liste déroulante */}
    <label className="block text-google-dark-gray mb-2 font-semibold">{label}</label>
    {/* Menu de sélection */}
    <select
      value={value} // Lien avec l'état du parent
      onChange={onChange} // Mise à jour de l'état lorsque l'utilisateur sélectionne une option
      className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-red"
      required={required} // Validation si nécessaire
    >
      {/* Option par défaut */}
      <option value="">Choisissez...</option>
      {/* Affichage d'une liste d'options dynamiquement */}
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

function FeedbackForm() {
  const { state } = useLocation(); // Récupère l'état transmis à cette page (par ex. l'évaluation précédente)
  const [rating, setRating] = useState(state?.rating || null); // Stocke la note donnée initialement
  const [details, setDetails] = useState({
    service: '',         // Champs pour l'information sur le service
    personne: '',        // Champ pour la personne qui a fourni le service
    satisfaction: '',    // Indique si tout s’est bien passé
    recommandation: '',  // Contient la recommandation ou les suggestions
  });
  const navigate = useNavigate(); // Permet la redirection programmatique

  const handleRatingSelect = (selectedRating) => setRating(selectedRating);
  // Fonction pour gérer la sélection d'une évaluation (note)

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut

    // Consolide les données du feedback
    const feedbackData = { rating, ...details };
    console.log('Feedback soumis :', feedbackData);

    if (rating >= 4) {
      // Si la note donnée est ≥ 4, génère un texte pour une revue positive
      const googleReviewText = `J’ai bénéficié de ${details.service} avec ${details.personne}. ${
        details.satisfaction === 'oui' ? 'Tout s’est très bien passé' : 'Quelques petits ajustements possibles'
      }. ${details.recommandation === 'oui' ? 'Je recommande absolument !' : 'Je pourrais recommander.'}`;
      console.log('Texte pour Google Reviews :', googleReviewText);
      // Redirection vers Google Reviews
      window.location.href = 'https://www.google.com/search?q=leave+a+review';
    } else {
      // Si la note est < 4, l'utilisateur est redirigé vers la page d'accueil
      navigate('/');
    }
  };

  // Si aucune note n'est donnée, affiche l'écran pour demander une évaluation
  if (!rating) {
    return (
      <div className="min-h-screen bg-google-gray flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-google-dark-gray mb-6 text-center">
            Comment évaluez-vous notre service ?
          </h1>
          <p className="text-google-dark-gray mb-6 text-center">
            Donnez-nous votre note en cliquant sur une étoile.
          </p>
          <div className="flex justify-center space-x-4">
            {/* Affichage des étoiles pour l'évaluation */}
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingSelect(star)} // Gestion de la sélection d'une note
                className="text-4xl text-yellow-500 hover:text-yellow-600 transition-colors"
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Affichage du formulaire une fois que la note a été donnée
  return (
    <div className="min-h-screen bg-google-gray flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-google-dark-gray mb-6 text-center">
          {rating >= 4 ? 'Merci pour votre évaluation !' : 'Dites-Nous Plus'}
        </h1>
        <p className="text-google-dark-gray mb-6 text-center">
          {rating >= 4
            ? 'Partagez votre expérience positive avec nous.'
            : 'Aidez-nous à comprendre comment nous améliorer.'}
        </p>

        {/* Formulaire principal */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6 p-4 bg-google-gray rounded-lg">
            <p className="text-google-dark-gray">
              Votre note : <span className="font-bold">{rating} ★</span>
            </p>
          </div>

          {/* Champs Input pour collecter des informations sur le service */}
          <InputField
            label="Quelle service/prestation avez-vous bénéficié ?"
            value={details.service}
            onChange={(e) => setDetails({ ...details, service: e.target.value })}
            placeholder="Ex : Consultation, Réparation..."
            required
          />

          <InputField
            label="Avec qui s’est déroulé la prestation ?"
            value={details.personne}
            onChange={(e) => setDetails({ ...details, personne: e.target.value })}
            placeholder="Nom ou rôle de la personne..."
            required
          />

          {/* Si évaluation positive, demande des informations complémentaires */}
          {rating >= 4 ? (
            <>
              <SelectField
                label="Est-ce que tout s’est bien passé ?"
                value={details.satisfaction}
                onChange={(e) => setDetails({ ...details, satisfaction: e.target.value })}
                options={['oui', 'non']}
                required
              />

              <SelectField
                label="Nous recommanderiez-vous à votre entourage ?"
                value={details.recommandation}
                onChange={(e) => setDetails({ ...details, recommandation: e.target.value })}
                options={['oui', 'non']}
                required
              />
            </>
          ) : (
            <InputField
              label="Comment souhaiteriez-vous qu’on améliore notre prestation ? (Notre but est que vous soyez 100% satisfait)"
              value={details.recommandation}
              onChange={(e) => setDetails({ ...details, recommandation: e.target.value })}
              placeholder="Vos suggestions..."
              required
            />
          )}

          {/* Bouton de soumission du formulaire */}
          <button
            type="submit"
            className="w-full bg-google-red text-white p-3 rounded-lg hover:bg-google-dark-gray transition-colors"
          >
            {rating >= 4 ? 'Envoyer et Partager sur Google' : 'Envoyer les Retours'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm; // Exportation du composant pour l'utiliser ailleurs dans l'application