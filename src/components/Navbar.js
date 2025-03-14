import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav className="bg-google-blue text-white p-4 flex items-center justify-between shadow-md">
      <div className="w-32 h-12 bg-google-gray flex items-center justify-center">
        <span className="text-google-dark-gray">Logo Google Avis</span>
      </div>
      <div className="space-x-6 flex items-center">
        <a href="#" className="hover:text-google-yellow transition-colors">Tableau de Bord</a>
        <a href="#" className="hover:text-google-yellow transition-colors">Avis</a>
        <a href="#" className="hover:text-google-yellow transition-colors">Analytique</a>
        <a href="#" className="hover:text-google-yellow transition-colors">Paramètres</a>
        <button
          onClick={handleHomeClick}
          className="text-white hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer text-2xl"
          title="Retour à l'accueil"
        >
          🏠
        </button>
      </div>
    </nav>
  );
}

export default Navbar; // Ensure this is present