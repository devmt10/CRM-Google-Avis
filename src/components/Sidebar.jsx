import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Déterminer si on est sur une page Kingdom Ads
  const isKingdomAds = location.pathname.startsWith('/kingdomads');

  const handleAddReview = () => {
    const stars = prompt('Nombre d’étoiles (1-5) :');
    const text = prompt('Texte de l’avis :');
    if (stars && text) alert(`Avis ajouté : ${stars} ★ - ${text}`);
  };

  return (
    <aside className="w-64 bg-google-dark-gray text-white p-6">
      <h2 className="text-xl font-bold mb-6">
        {isKingdomAds ? 'Navigation' : 'Outils d’Avis'}
      </h2>
      <ul className="space-y-4">
        {isKingdomAds ? (
          // Options pour Kingdom Ads
          <>
            <li>
              <button
                onClick={() => navigate('/kingdomads')}
                className="hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer"
              >
                Tableau de Bord
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/kingdomads/statistics')}
                className="hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer"
              >
                Statistiques
              </button>
            </li>
          </>
        ) : (
          // Options complètes pour /admin (ton ancien Sidebar)
          <>
            <li>
              <a
                href="#"
                onClick={() => navigate('/admin')}
                className="hover:text-google-yellow transition-colors"
              >
                Tableau de Bord
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => navigate('/admin')} // À ajuster si tu veux une route spécifique pour Avis
                className="hover:text-google-yellow transition-colors"
              >
                Avis
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => navigate('/admin')} // À ajuster si tu veux une route spécifique pour Stats
                className="hover:text-google-yellow transition-colors"
              >
                Statistiques
              </a>
            </li>
            <li>
              <button
                onClick={handleAddReview}
                className="hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer"
              >
                Ajouter un Avis
              </button>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;