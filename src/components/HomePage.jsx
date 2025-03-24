
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// A mettre à jour selon les dispositions d'Alexandre

function HomePage() {
  const { businessId } = useParams(); // Récupère l'ID du business à partir de l'URL, App.js mise à jour
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
//Vérifier rédirection à la page du business
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 5) {
      const googleReviewUrl = `https://g.page/r/${businessId}/review?text=${encodeURIComponent(comment)}`;
      window.location.href = googleReviewUrl;
    } else if (rating < 4 && rating > 0) {
      navigate('/feedback', { state: { rating, comment, answers } });
    } else {
      alert('Merci pour votre évaluation !');
    }
  };

  const handleAdminAccess = () => {
    navigate('/admin');
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

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button type="submit" className="bg-google-blue text-white p-2 rounded hover:bg-google-dark-blue">
              Soumettre
            </button>
            <button
              type="button"
              onClick={handleAdminAccess}
              className="text-google-dark-gray hover:text-google-blue"
            >
              Accès Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
