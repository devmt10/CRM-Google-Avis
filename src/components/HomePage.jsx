import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function HomePage() {
  const { businessId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [answers, setAnswers] = useState({
    accueil: '',
    qualite: '',
    rapidite: '',
  });
  const navigate = useNavigate();

  const handleRating = (star) => {
    setRating(star);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating >= 4) {
      // Redirection directe vers Google Reviews pour 4 et 5 étoiles
      const googleReviewUrl = `https://g.page/r/${businessId}/review?text=${encodeURIComponent(comment)}`;
      window.location.href = googleReviewUrl;
    } else if (rating > 0) {
      // Navigation vers FeedbackForm pour 1-3 étoiles
      navigate('/feedback', { state: { rating, comment, answers } });
    }
    // Pas d’alerte, rien si rating est 0 (pas encore sélectionné)
  };

  const handleAdminAccess = () => {
    navigate('/admin');
  };

  const handleKingdomAdsAccess = () => {
    navigate('/kingdomads');
  };

  return (
    <div className="min-h-screen bg-google-gray flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-google-dark-gray mb-6 text-center">
          Évaluez Notre Service
        </h1>

        {/* Star Rating */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className={`text-4xl mx-1 ${
                star <= rating ? 'text-google-yellow' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Questions */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-google-dark-gray mb-2">
              Comment trouvez-vous l'accueil ?
            </label>
            <input
              type="text"
              value={answers.accueil}
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
              value={answers.qualite}
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
              value={answers.rapidite}
              onChange={(e) => setAnswers({ ...answers, rapidite: e.target.value })}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-blue"
              placeholder="Votre réponse..."
            />
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-google-dark-gray mb-2">
              Commentaires supplémentaires
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-blue"
              placeholder="Ajoutez vos commentaires ici..."
            />
          </div>

          {/* Submit Button et Accès */}
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
                onClick={handleAdminAccess}
                className="text-google-dark-gray hover:text-google-blue underline"
              >
                Accès Admin
              </button>
              <button
                type="button"
                onClick={handleKingdomAdsAccess}
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