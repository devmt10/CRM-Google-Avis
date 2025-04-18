// Importation de React et du Hook `useNavigate` de React Router DOM
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  // `useNavigate` est utilisé pour naviguer entre les routes de votre application.

  // Navigation vers l'accueil
  const handleHomeClick = () => {
    navigate('/');
    // Redirige l'utilisateur vers la page d'accueil `/`.
  };

  // Navigation vers les statistiques mensuelles
  const handleMonthlyClick = () => {
    navigate('/monthly');
    // Redirige l'utilisateur vers la route `/monthly` pour le graphique mensuel.
  };

  // Navigation vers les statistiques annuelles
  const handleYearlyClick = () => {
    navigate('/yearly');
    // Redirige l'utilisateur vers la route `/yearly` pour le graphique annuel.
  };

  return (
    <nav className="bg-google-blue text-white p-4 flex items-center justify-between shadow-md">
      {/* Barre de navigation avec fond bleu et texte blanc */}

      {/* Logo ou texte représentant le logo dans la partie gauche */}
      <div className="w-32 h-12 bg-google-gray flex items-center justify-center">
        <span className="text-google-dark-gray">Logo Google Avis</span>
        {/* Remplacez ce texte par une image si besoin */}
      </div>

      {/* Section des liens et boutons de navigation */}
      <div className="space-x-6 flex items-center">
        {/* Lien vers le tableau de bord (non programmatique ici) */}
        <a href="#" className="hover:text-google-yellow transition-colors">
          Tableau de Bord
        </a>

        {/* Bouton pour accéder au graphique mensuel */}
        <button
          onClick={handleMonthlyClick}
          // Navigue vers la route `/monthly`.
          className="hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer"
        >
          Graphique Mensuel
        </button>

        {/* Bouton pour accéder au graphique annuel */}
        <button
          onClick={handleYearlyClick}
          // Navigue vers la route `/yearly`.
          className="hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer"
        >
          Graphique Annuel
        </button>

        {/* Lien vers des paramètres généraux (juste un placeholder ici) */}
        <a href="#" className="hover:text-google-yellow transition-colors">
          Paramètres
        </a>

        {/* Bouton permettant de retourner à la page d'accueil */}
        <button
          onClick={handleHomeClick}
          // Redirection vers l'accueil.
          className="text-white hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer text-2xl"
          title="Retour à l'accueil"
        >
          🏠
          {/* Emoji Maison qui agit comme un indicateur visuel pour l'accueil */}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;