import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InputField = ({ label, value, onChange, placeholder, required }) => (
  <div className="mb-6">
    <label className="block text-google-dark-gray mb-2 font-semibold">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-red"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, required }) => (
  <div className="mb-6">
    <label className="block text-google-dark-gray mb-2 font-semibold">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-google-gray rounded focus:outline-none focus:ring-2 focus:ring-google-red"
      required={required}
    >
      <option value="">Choisissez...</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

function FeedbackForm() {
  const { state } = useLocation();
  const [rating, setRating] = useState(state?.rating || null);
  const [details, setDetails] = useState({
    service: '',
    personne: '',
    satisfaction: '',
    recommandation: '',
  });
  const navigate = useNavigate();

  const handleRatingSelect = (selectedRating) => setRating(selectedRating);

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = { rating, ...details };
    console.log('Feedback soumis :', feedbackData);

    if (rating >= 4) {
      const googleReviewText = `J’ai bénéficié de ${details.service} avec ${details.personne}. ${
        details.satisfaction === 'oui' ? 'Tout s’est très bien passé' : 'Quelques petits ajustements possibles'
      }. ${details.recommandation === 'oui' ? 'Je recommande absolument !' : 'Je pourrais recommander.'}`;
      console.log('Texte pour Google Reviews :', googleReviewText);
      window.location.href = 'https://www.google.com/search?q=leave+a+review';
    } else {
      navigate('/');
    }
  };

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
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingSelect(star)}
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

        <form onSubmit={handleSubmit}>
          <div className="mb-6 p-4 bg-google-gray rounded-lg">
            <p className="text-google-dark-gray">
              Votre note : <span className="font-bold">{rating} ★</span>
            </p>
          </div>

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

export default FeedbackForm;