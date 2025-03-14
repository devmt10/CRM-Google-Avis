import React from 'react';
import ReviewGraph from './ReviewGraph';

function MainContent() {
  const recentReviews = [
    { id: 1, stars: 5, text: 'Service excellent !', date: '2025-03-10' },
    { id: 2, stars: 2, text: 'Trop lent.', date: '2025-03-12' },
  ];

  const handleRespond = (reviewId) => {
    const response = prompt('Entrez votre réponse :');
    if (response) alert(`Réponse envoyée pour l’avis ${reviewId} : ${response}`);
  };

  const handleExportStats = () => {
    const stats = JSON.stringify({ fiveStar: 12, oneStar: 2, total: 14 });
    const blob = new Blob([stats], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'statistiques.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex-1 p-6 bg-white">
      <h1 className="text-3xl font-bold text-google-dark-gray mb-4">Tableau de Bord Google Avis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-google-gray rounded-lg shadow">
          <h2 className="text-xl font-semibold text-google-blue mb-2">Derniers Avis</h2>
          {recentReviews.map((review) => (
            <div key={review.id} className="mb-4">
              <p className="text-google-dark-gray">
                <span className="font-bold">{review.stars} ★</span> - {review.text} ({review.date})
              </p>
              <button
                onClick={() => handleRespond(review.id)}
                className="mt-2 text-google-blue hover:text-google-yellow underline"
              >
                Répondre
              </button>
            </div>
          ))}
        </div>
        <div>
          <ReviewGraph />
          <button
            onClick={handleExportStats}
            className="mt-4 w-full bg-google-green text-white p-2 rounded-lg hover:bg-google-dark-gray transition-colors"
          >
            Exporter les Statistiques
          </button>
        </div>
      </div>
    </main>
  );
}

export default MainContent; // Ensure this is present