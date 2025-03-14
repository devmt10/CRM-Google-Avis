import React from 'react';

function Sidebar() {
  const handleAddReview = () => {
    const stars = prompt('Nombre d’étoiles (1-5) :');
    const text = prompt('Texte de l’avis :');
    if (stars && text) alert(`Avis ajouté : ${stars} ★ - ${text}`);
  };

  return (
    <aside className="w-64 bg-google-dark-gray text-white p-6">
      <h2 className="text-xl font-bold mb-6">Outils d'Avis</h2>
      <ul className="space-y-4">
        <li><a href="#" className="hover:text-google-yellow transition-colors">Tableau de Bord</a></li>
        <li><a href="#" className="hover:text-google-yellow transition-colors">Avis</a></li>
        <li><a href="#" className="hover:text-google-yellow transition-colors">Statistiques</a></li>
        <li>
          <button
            onClick={handleAddReview}
            className="hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer"
          >
            Ajouter un Avis
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar; // Ensure this is present