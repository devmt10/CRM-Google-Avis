import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FeedbackForm() {
  const { state } = useLocation(); // Data from HomePage (rating, comment, answers)
  const [details, setDetails] = useState({
    raison: '', // Reason for dissatisfaction
    detailsProbleme: '', // Details of the issue
    amelioration: '', // Suggestions for improvement
    contact: '', // Optional contact info
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = { ...state, ...details };
    console.log('Feedback soumis :', feedbackData); // Log for debugging
    alert('Merci pour vos retours ! Nous vous contacterons si nécessaire.'); //WIP
    // TODO: Send feedbackData to Django backend later
    navigate('/'); // Back to homepage
  };

  return (
    <div className="min-h-screen bg-google-gray flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-google-dark-gray mb-6 text-center">
          Dites-Nous Plus
        </h1>
        <p className="text-google-dark-gray mb-6 text-center">
          Votre avis compte ! Aidez-nous à comprendre pourquoi vous n’êtes pas satisfait(e) pour que nous puissions nous améliorer.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Résumé de l'évaluation initiale */}
          {state && (
            <div className="mb-6 p-4 bg-google-gray rounded-lg">
              <p className="text-google-dark-gray">
                Votre note : <span className="font-bold">{state.rating} ★</span>
              </p>
              {state.comment && (
                <p className="text-google-dark-gray">
                  Commentaire : {state.comment}
                </p>
              )}
            </div>
          )}

          {/* Raison principale */}
          <div className="mb-6">
            <label className="block text-google-dark-gray mb-2 font-semibold">
              Quelle est la raison principale de votre insatisfaction ?
            </label>
            <select
              value={details.raison}
              onChange={(e) => setDetails({ ...details, raison: e.target.value })}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-red"
              required
            >
              <option value="">Choisissez une raison...</option>
              <option value="accueil">Mauvais accueil</option>
              <option value="qualite">Qualité du service insuffisante</option>
              <option value="rapidite">Service trop lent</option>
              <option value="autre">Autre (précisez ci-dessous)</option>
            </select>
          </div>

          {/* Détails du problème */}
          <div className="mb-6">
            <label className="block text-google-dark-gray mb-2 font-semibold">
              Pouvez-vous nous donner plus de détails sur ce qui n’a pas fonctionné ?
            </label>
            <textarea
              value={details.detailsProbleme}
              onChange={(e) => setDetails({ ...details, detailsProbleme: e.target.value })}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-red"
              placeholder="Expliquez-nous ce qui s’est passé..."
              rows="4"
              required
            />
          </div>

          {/* Suggestions d'amélioration */}
          <div className="mb-6">
            <label className="block text-google-dark-gray mb-2 font-semibold">
              Que pouvons-nous faire pour améliorer votre expérience ?
            </label>
            <textarea
              value={details.amelioration}
              onChange={(e) => setDetails({ ...details, amelioration: e.target.value })}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-red"
              placeholder="Vos suggestions sont précieuses..."
              rows="4"
            />
          </div>

          {/* Contact (facultatif) */}
          <div className="mb-6">
            <label className="block text-google-dark-gray mb-2 font-semibold">
              Souhaitez-vous être contacté(e) pour discuter de votre retour ? (Facultatif)
            </label>
            <input
              type="text"
              value={details.contact}
              onChange={(e) => setDetails({ ...details, contact: e.target.value })}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-red"
              placeholder="Email ou numéro de téléphone..."
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-google-red text-white p-3 rounded-lg hover:bg-google-dark-gray transition-colors"
          >
            Envoyer les Retours
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;